// object with an `id` property
export interface HasID {
  id: string;
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
  // select node to merge:
  const nodesByLinkCount = args.graphData.nodes
    .map((node) => ({
      weight: calculateNodeWeight(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => b.weight - a.weight);
  let mergeTargetNode = nodesByLinkCount[0].node;
  // modify graph:
  // find first order nodes, as long as the first order links still exist
  let firstOrderNodesByWeight = args.graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source)
    .map((node) => ({
      weight: calculateNodeWeight(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => a.weight - b.weight)
    .map((o) => o.node);
  if (firstOrderNodesByWeight.length === 0) {
    return; // nothing left to merge
  }
  let nodesToRemove = firstOrderNodesByWeight.slice(0, args.steps);
  // find links, that will stay unchanged to override current link list later
  let linksToKeep = args.graphData.links.filter(
    (link) =>
      !nodesToRemove.find(
        (removedNode) =>
          link.source.id === removedNode.id &&
          link.target.id === mergeTargetNode.id
      )
  );
  // rewrite links from deleted nodes to 2nd order nodes, removing duplicates
  rewrite2ndOrderLinks(nodesToRemove, linksToKeep, mergeTargetNode, {
    deleted: "source",
    other: "target",
  });
  // rewrite links from 2nd order nodes to mergeTargetNode, removing duplicates
  rewrite2ndOrderLinks(nodesToRemove, linksToKeep, mergeTargetNode, {
    deleted: "target",
    other: "source",
  });
  // delete all nodesToRemove
  deleteFromArray(args.graphData.nodes, nodesToRemove);
  // delete first order links
  replaceArray(args.graphData.links, linksToKeep);
  // recurse if we didn't merge enough nodes yet
  args.steps -= nodesToRemove.length;
  if (args.steps > 0) {
    zoomStep(args);
  }
};
function deleteFromArray(nodes: HasID[], nodesToRemove: HasID[]) {
  let leftOverNodes = nodes.filter(
    (node) => !nodesToRemove.find((findNode) => node.id === findNode.id)
  );
  replaceArray(nodes, leftOverNodes);
}
// replace the content of `ar` with `newar` (in-place operation)
function replaceArray<T>(a: T[], newa: T[]) {
  a.splice(0, a.length, ...newa);
}
// rewrite2ndOrderLinks rewrites 2nd order links to skip the deleted nodes,
// `dir` specifies the link's direction
const rewrite2ndOrderLinks = (
  nodesToRemove: HasID[],
  linksToKeep: LinkBetweenHasIDs[],
  mergeTargetNode: HasID,
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
// calculates node weight by first order link count, weighted by link.value

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
