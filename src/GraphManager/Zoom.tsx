// object with an `id` property
export interface HasID {
  id: string;
  mergeCount?: number;
}

// links btween objects with `id` property
export interface LinkBetweenHasIDs {
  source: HasID;
  target: HasID;
  value?: number;
}

// HasID and LinkBetweenHasIDs is the zoom interface to the force-graph, since
// all it needs are objects with IDs and links between objects with IDs.
export interface GraphDataMerged {
  nodes: HasID[];
  links: LinkBetweenHasIDs[];
}

export interface ZoomFn {
  (args: ZoomArgs, state: ZoomState): void;
}

export enum ZoomDirection {
  In,
  Out,
}

export enum ZoomOperationType {
  Merge,
}

export interface ZoomOperation {
  type: ZoomOperationType;
  removedNodes: HasID[];
  removedLinks: LinkBetweenHasIDs[];
}

export interface ZoomArgs {
  // number of nodes to merge/un-merge when zooming In/Out
  steps: number;
  // zoom In or Out
  direction: ZoomDirection;
  // the graph data currently in use by force, that will be modified by a zoom
  // operation
  graphData: GraphDataMerged; // XXX(skep): should probably move this to ZoomState
}

export interface ZoomState {
  zoomOperations: ZoomOperation[];
}

// zoomStep performs `steps` zoom steps, where zooming in by N steps merges N
// nodes into other nodes, reducing the total node count by N.
export const zoomStep: ZoomFn = (args: ZoomArgs, state: ZoomState): void => {
  if (args.direction === ZoomDirection.In) {
    zoomStepIn(args, state);
  } else if (args.direction === ZoomDirection.Out) {
    zoomStepOut(args, state);
  }
};

const zoomStepIn: ZoomFn = (args: ZoomArgs, state: ZoomState): void => {
  const op = state.zoomOperations?.pop();
  if (!op) {
    return;
  }
  appendArray(args.graphData.nodes, op.removedNodes);
  appendArray(args.graphData.links, op.removedLinks);
};

function appendArray<T>(a: T[], appendix: T[]) {
  a.splice(a.length, 0, ...appendix);
}

const zoomStepOut: ZoomFn = (args: ZoomArgs, state: ZoomState): void => {
  if (args.steps >= args.graphData.nodes.length) {
    return;
  }
  let selection = selectNodePairForMerging(args);
  if (selection.toRemove.length === 0) {
    return; // nothing left to merge
  }
  mergeSelection(selection, args, state);
  // recurse if we didn't merge enough nodes yet
  args.steps -= selection.toRemove.length;
  if (args.steps > 0) {
    zoomStepOut(args, state);
  }
};

export interface MergeSelection {
  mergeTarget: HasID;
  toRemove: HasID[];
}

export interface Selector {
  (args: ZoomArgs): MergeSelection;
}

const NO_MERGE_TARGET_FOUND_ID = "---NONE---";

// selectNodePairForMerging selects a target node `mergeTargetNode` and
// `nodesToRemove` which all have direct links to `mergeTargetNode`
const selectNodePairForMerging: Selector = (args: ZoomArgs) => {
  const nodesByTargetWeight = args.graphData.nodes
    .filter((node) => hasLinksTowards(args.graphData.links, node))
    .map((node) => ({
      weight: calculateMergeTargetWeight(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => b.weight - a.weight);
  if (nodesByTargetWeight.length === 0) {
    return { mergeTarget: { id: NO_MERGE_TARGET_FOUND_ID }, toRemove: [] };
  }
  let mergeTargetNode = nodesByTargetWeight[0].node;
  // find first order nodes, as long as the first order links still exist
  let firstOrderNodesByWeight = args.graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source)
    .map((node) => ({
      weight: calculateDeletionWeight(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => a.weight - b.weight)
    .map((o) => o.node);
  let nodesToRemove = firstOrderNodesByWeight.slice(0, args.steps);
  return { mergeTarget: mergeTargetNode, toRemove: nodesToRemove };
};

const deleteFromArray = (nodes: HasID[], nodesToRemove: HasID[]) => {
  let leftOverNodes = nodes.filter(
    (node) => !nodesToRemove.find((findNode) => node.id === findNode.id)
  );
  replaceArray(nodes, leftOverNodes);
};

// mergeSelection merges the nodes according to `selection` inside
// `args.graphData` (inplace!)
const mergeSelection = (
  selection: MergeSelection,
  args: ZoomArgs,
  state: ZoomState
) => {
  selection.mergeTarget.mergeCount = [
    ...selection.toRemove,
    selection.mergeTarget,
  ].reduce(
    (currentMergeCount, node) => currentMergeCount + (node.mergeCount ?? 1),
    0
  );
  // find links, that will stay unchanged to override current link list later
  let linksToKeep = args.graphData.links.filter(
    (link) =>
      !selection.toRemove.find(
        (removedNode) =>
          link.source.id === removedNode.id &&
          link.target.id === selection.mergeTarget.id
      )
  );
  state.zoomOperations.push({
    type: ZoomOperationType.Merge,
    removedNodes: selection.toRemove,
    removedLinks: args.graphData.links.filter((link) =>
      selection.toRemove.find(
        (removedNode) =>
          link.source.id === removedNode.id &&
          link.target.id === selection.mergeTarget.id
      )
    ),
  });
  rewrite2ndOrderLinks(selection.mergeTarget, selection.toRemove, linksToKeep, {
    deleted: "source",
    other: "target",
  });
  rewrite2ndOrderLinks(selection.mergeTarget, selection.toRemove, linksToKeep, {
    deleted: "target",
    other: "source",
  });
  deleteFromArray(args.graphData.nodes, selection.toRemove);
  // delete first order links
  replaceArray(args.graphData.links, linksToKeep);
};

// replaceArray replaces the content of `a` with `b` (in-place operation)
function replaceArray<T>(a: T[], b: T[]) {
  a.splice(0, a.length, ...b);
}

// rewrite2ndOrderLinks rewrites 2nd order links to skip the deleted nodes,
// `dir` specifies the link's direction
// Note: duplicates and self-referencing links are removed!
const rewrite2ndOrderLinks = (
  mergeTargetNode: HasID,
  nodesToRemove: HasID[],
  linksToKeep: LinkBetweenHasIDs[],
  dir: { deleted: "source" | "target"; other: "source" | "target" }
) => {
  let secondOrderSourceLinks = nodesToRemove.flatMap((firstOrderNode) => {
    return linksToKeep.filter(
      (link) => link[dir.deleted].id === firstOrderNode.id
    );
  });
  secondOrderSourceLinks.forEach((link) => {
    const index = linksToKeep.findIndex(
      (existingLink) =>
        existingLink[dir.deleted].id === mergeTargetNode.id &&
        existingLink[dir.other].id === link[dir.other].id
    );
    if (index !== -1) {
      averageLinkValue(link, linksToKeep[index]);
      linksToKeep.splice(index, 1);
    }
    link[dir.deleted] = mergeTargetNode;
    if (link[dir.deleted] === link[dir.other]) {
      linksToKeep.splice(
        linksToKeep.findIndex((selfLink) => link === selfLink),
        1
      );
    }
  });
};

const calculateMergeTargetWeight = (
  node: HasID,
  links: LinkBetweenHasIDs[]
) => {
  const mergeCountMultiplier = 5; // TODO(skep): should be depending on the merged nodes' weight, but they are gone now
  let weight = calculateNodeWeight(node, links);
  if (node.mergeCount) {
    weight -= node.mergeCount * mergeCountMultiplier;
  }
  return weight;
};

// calculateDeletionWeight calculates the weight used for picking nodes to
// merge into the mergeTarget
const calculateDeletionWeight = (node: HasID, links: LinkBetweenHasIDs[]) => {
  let weight = calculateNodeWeight(node, links);
  if (node.mergeCount) {
    weight += node.mergeCount;
  }
  return weight;
};

const defaultLinkValue = 1;
const weightIncrementPerLink = 1;

// calculateNodeWeight calculates node weight by first order link count,
// weighted by link.value
export const calculateNodeWeight = (
  node: HasID,
  links: LinkBetweenHasIDs[]
) => {
  // XXX(skep): maybe add weight for source links as well, but less than for
  // target links to node?
  return links.reduce((weight, link) => {
    if (link.target.id === node.id) {
      return weight + weightIncrementPerLink * (link.value ?? defaultLinkValue);
    } else {
      return weight;
    }
  }, 0 /*init value for count*/);
};

// hasLinksTowards returns true if there is at least one link with
// link.target.id equal to node.id
const hasLinksTowards = (links: LinkBetweenHasIDs[], node: HasID) => {
  return links.find((link) => link.target.id === node.id);
};

// averageLinkValue averages the target and source node's links value and
// stores the result in the target link
const averageLinkValue = (
  target: LinkBetweenHasIDs,
  source: LinkBetweenHasIDs
) => {
  let value =
    ((target.value ?? defaultLinkValue) + (source.value ?? defaultLinkValue)) /
    2;
  if (value !== defaultLinkValue) {
    target.value = value;
  }
};
