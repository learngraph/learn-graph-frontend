// object with an `id` property
export interface HasID {
  id: string;
  //mergeWeight?: number; // FIXME: unused for now, need to think more
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
  (args: ZoomArgs): void;
}

export enum ZoomDirection {
  In,
  Out,
}

export interface ZoomArgs {
  // number of nodes to merge/un-merge when zooming In/Out
  steps: number;
  // zoom In or Out
  direction: ZoomDirection;
  // the graph data currently in use by force, that will be modified by a zoom
  // operation
  graphData: GraphDataMerged;
}

// zoomStep performs `steps` zoom steps, where zooming in by N steps merges N
// nodes into other nodes, reducing the total node count by N.
export const zoomStep: ZoomFn = (args: ZoomArgs): void => {
  if (args.steps >= args.graphData.nodes.length) {
    return;
  }
  let selection = selectHighestAndLowestLinkWeight(args);
  if (selection.toRemove.length === 0) {
    return; // nothing left to merge
  }
  mergeSelection(selection, args);
  // recurse if we didn't merge enough nodes yet
  args.steps -= selection.toRemove.length;
  if (args.steps > 0) {
    zoomStep(args);
  }
};

export interface MergeSelection {
  mergeTarget: HasID;
  toRemove: HasID[];
}

export interface Selector {
  (args: ZoomArgs): MergeSelection;
}

// XXX(skep): maybe remove again until HERE
export interface SelectorMulti {
  (args: ZoomArgs): MergeSelection[];
}
export const zoomGeoSpacial: ZoomFn = (args: ZoomArgs): void => {
  let selections = selectClustersToMerge(args);
  if (selections.length === 0) {
    return; // nothing left to merge
  }
  selections.forEach((selection) => mergeSelection(selection, args));
};
const selectClustersToMerge: SelectorMulti = (_: ZoomArgs) => {
  return [{ mergeTarget: { id: "A" }, toRemove: [] }];
};
// XXX(skep): HERE

// selectHighestAndLowestLinkWeight selects a target node `mergeTargetNode` and
// `nodesToRemove` which all must have direct links to `mergeTargetNode`
export const selectHighestAndLowestLinkWeight: Selector = (args: ZoomArgs) => {
  const nodesByLinkCount = args.graphData.nodes
    .map((node) => ({
      weight: calculateNodeWeight(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => b.weight - a.weight);
  let mergeTargetNode = nodesByLinkCount[0].node;
  // find first order nodes, as long as the first order links still exist
  let firstOrderNodesByWeight = args.graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source)
    .map((node) => ({
      weight: calculateWeightWithMergeCount(node, args),
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
const mergeSelection = (selection: MergeSelection, args: ZoomArgs) => {
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

// calculateWeightWithMergeCount calculates the weight used for picking nodes to
// merge into the mergeTarget
const calculateWeightWithMergeCount = (node: HasID, args: ZoomArgs) => {
  let weight = calculateNodeWeight(node, args.graphData.links);
  if (node.mergeCount) {
    weight += node.mergeCount;
  }
  return weight;
};

// calculateNodeWeight calculates node weight by first order link count,
// weighted by link.value
export const calculateNodeWeight = (
  node: HasID,
  links: LinkBetweenHasIDs[]
) => {
  const defaultWeight = 1;
  const weightIncrementPerLink = 1;
  return links.reduce((weight, link) => {
    if (link.target.id === node.id) {
      return weight + weightIncrementPerLink * (link.value ?? defaultWeight);
    } else {
      return weight;
    }
  }, 0 /*init value for count*/);
};
