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
  Delete,
  LinkRewrite,
  SetLinkValue,
}

export interface ZoomOperation {
  type: ZoomOperationType;
  // used for type = ZoomOperationType.Merge:
  removedNodes?: HasID[];
  removedLinks?: LinkBetweenHasIDs[];
  // used for type = ZoomOperationType.LinkRewrite:
  from?: LinkBetweenHasIDs;
  to?: LinkBetweenHasIDs;
  // used for type = ZoomOperationType.SetLinkValue:
  link?: LinkBetweenHasIDs;
}

export interface ZoomStep {
  operations: ZoomOperation[];
}

export interface ZoomArgs {
  // number of nodes to merge/un-merge when zooming In/Out
  steps: number;
  // zoom In or Out
  direction: ZoomDirection;
}

export interface ZoomState {
  // stack of zoom out steps, that is used for zooming in
  zoomSteps: ZoomStep[];
  // the graph data currently in use by force, that will be modified by a zoom
  // operation
  graphData: GraphDataMerged;
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
  const step = state.zoomSteps?.pop();
  if (!step) {
    return;
  }
  step.operations.reverse().forEach((op) => {
    undoZoomOperation(op, state);
  });
  args.steps -= 1;
  if (args.steps > 0) {
    return zoomStepIn(args, state);
  }
};

const defaultMergeCount = 1;

const undoZoomOperation = (op: ZoomOperation, state: ZoomState) => {
  if (op.type === ZoomOperationType.Delete) {
    appendArray(state.graphData.nodes, op.removedNodes!);
    appendArray(state.graphData.links, op.removedLinks!);
    op.removedLinks!.forEach((link) => {
      // TODO(skep): test case missing that makes !op.removedNodes!.find necessary
      if (
        !link.target.mergeCount ||
        !op.removedNodes!.find((node) => link.source.id === node.id)
      ) {
        return; // link target was not a merged node
      }
      link.target.mergeCount -= link.source.mergeCount ?? defaultMergeCount;
      if (link.target.mergeCount < 0) {
        // FIXME(skep): must not happen
        console.error("negative .mergeCount on", link.target, link, op);
        link.target.mergeCount = undefined;
      }
      if (link.target.mergeCount === 1) {
        link.target.mergeCount = undefined;
      }
    });
  } else if (op.type === ZoomOperationType.LinkRewrite) {
    const link = state.graphData.links.find(
      (link) =>
        link.source.id === op.to!.source.id &&
        link.target.id === op.to!.target.id
    );
    link!.source = op.from!.source;
    link!.target = op.from!.target;
  } else if (op.type === ZoomOperationType.SetLinkValue) {
    const link = state.graphData.links.find(
      (link) =>
        link.source.id === op.link!.source.id &&
        link.target.id === op.link!.target.id
    );
    link!.value = op.link!.value;
  }
};

function appendArray<T>(a: T[], appendix: T[]) {
  a.splice(a.length, 0, ...appendix);
}

const zoomStepOut: ZoomFn = (args: ZoomArgs, state: ZoomState): void => {
  if (args.steps >= state.graphData.nodes.length) {
    return;
  }
  let selection = selectNodePairForMerging(args, state);
  if (selection.toRemove.length === 0) {
    return; // nothing left to merge
  }
  mergeSelection(selection, state);
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
  (args: ZoomArgs, state: ZoomState): MergeSelection;
}

const NO_MERGE_TARGET_FOUND_ID = "---NONE---";

// selectNodePairForMerging selects a target node `mergeTargetNode` and
// `nodesToRemove` which all have direct links to `mergeTargetNode`
const selectNodePairForMerging: Selector = (
  args: ZoomArgs,
  state: ZoomState
) => {
  const nodesByTargetWeight = state.graphData.nodes
    .filter((node) => hasLinksTowards(state.graphData.links, node))
    .map((node) => ({
      weight: calculateMergeTargetWeight(node, state.graphData.links),
      node: node,
    }))
    .sort((a, b) => b.weight - a.weight);
  if (nodesByTargetWeight.length === 0) {
    return { mergeTarget: { id: NO_MERGE_TARGET_FOUND_ID }, toRemove: [] };
  }
  let mergeTargetNode = nodesByTargetWeight[0].node;
  // find first order nodes, as long as the first order links still exist
  let firstOrderNodesByWeight = state.graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source)
    .map((node) => ({
      weight: calculateDeletionWeight(node, state.graphData.links),
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
// `state.graphData` (inplace!)
const mergeSelection = (selection: MergeSelection, state: ZoomState) => {
  selection.mergeTarget.mergeCount = [
    ...selection.toRemove,
    selection.mergeTarget,
  ].reduce(
    (currentMergeCount, node) =>
      currentMergeCount + (node.mergeCount ?? defaultMergeCount),
    0
  );
  // find links, that will stay unchanged to override current link list later
  let linksToKeep = state.graphData.links.filter(
    (link) =>
      !selection.toRemove.find(
        (removedNode) =>
          link.source.id === removedNode.id &&
          link.target.id === selection.mergeTarget.id
      )
  );
  state.zoomSteps.push({
    operations: [
      {
        type: ZoomOperationType.Delete,
        removedNodes: selection.toRemove,
        removedLinks: state.graphData.links.filter((link) =>
          selection.toRemove.find(
            (removedNode) =>
              link.source.id === removedNode.id &&
              link.target.id === selection.mergeTarget.id
          )
        ),
      },
    ],
  });
  rewrite2ndOrderLinks(state, selection, linksToKeep, {
    deleted: "source",
    other: "target",
  });
  rewrite2ndOrderLinks(state, selection, linksToKeep, {
    deleted: "target",
    other: "source",
  });
  deleteFromArray(state.graphData.nodes, selection.toRemove);
  // delete first order links
  replaceArray(state.graphData.links, linksToKeep);
};

// replaceArray replaces the content of `a` with `b` (in-place operation)
function replaceArray<T>(a: T[], b: T[]) {
  a.splice(0, a.length, ...b);
}

// rewrite2ndOrderLinks rewrites 2nd order links to skip the deleted nodes,
// `dir` specifies the link's direction
// Note: duplicates and self-referencing links are removed!
const rewrite2ndOrderLinks = (
  state: ZoomState,
  selection: MergeSelection,
  linksToKeep: LinkBetweenHasIDs[],
  dir: { deleted: "source" | "target"; other: "source" | "target" }
) => {
  let secondOrderSourceLinks = selection.toRemove.flatMap((firstOrderNode) => {
    return linksToKeep.filter(
      (link) => link[dir.deleted].id === firstOrderNode.id
    );
  });
  secondOrderSourceLinks.forEach((link) => {
    const index = linksToKeep.findIndex(
      (existingLink) =>
        existingLink[dir.deleted].id === selection.mergeTarget.id &&
        existingLink[dir.other].id === link[dir.other].id
    );
    const lastOperations =
      state.zoomSteps[state.zoomSteps.length - 1].operations;
    if (index !== -1) {
      if (link.value !== defaultLinkValue) {
        lastOperations.push({
          type: ZoomOperationType.SetLinkValue,
          link: { ...link },
        });
      }
      averageLinkValue(link, linksToKeep[index]);
      lastOperations.push({
        type: ZoomOperationType.Delete,
        removedNodes: [],
        removedLinks: [{ ...linksToKeep[index] }],
      });
      linksToKeep.splice(index, 1);
    }
    if (selection.mergeTarget.id !== link[dir.other].id) {
      lastOperations.push({
        type: ZoomOperationType.LinkRewrite,
        from: { ...link },
        to: { ...link, [dir.deleted]: selection.mergeTarget },
      });
    } else {
      lastOperations.push({
        type: ZoomOperationType.Delete,
        removedNodes: [],
        removedLinks: [{ ...link }],
      });
    }
    link[dir.deleted] = selection.mergeTarget;
    if (link[dir.deleted].id === link[dir.other].id) {
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
