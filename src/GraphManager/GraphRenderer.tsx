import { TranslatedGraphData, useGraphDataContext } from "src/GraphDataContext";
import { getTranslation } from "./utilities/getTranslation";
import ForceGraph2D, {
  //GraphData as GraphDataForceGraph,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { GraphData, LinkType, NodeType /*, GraphData*/ } from "./types";

// TODO(skep): fundamental type issue here, we have a NodeType !=
// ForceGraph2D.NodeObject, and a LinkType != ForceGraph2D.LinkObject , but we
// type-cast our types to the force graph types. Here we access our copied
// objects, but the type is obviously the ForceGraph2D type.
export type Link = LinkType & LinkObject;
export type Node = NodeType & NodeObject;

// LinkBetweenObjects should resolve type conflicts, since we assume that
// ForceGraph2D always returns links between objects, even if we input links
// with string-typed node ID's in the `source` and `target` fields.
interface LinkBetweenObjects {
  source: Node;
  target: Node;
}

export interface VoteDialogParams {
  linkID: string;
  sourceNode: NodeType;
  targetNode: NodeType;
  weight: number;
}
export interface VoteDialogFn {
  (params: VoteDialogParams): void;
}

interface GraphRendererProps {
  openVoteDialog: VoteDialogFn;
}

interface Position {
  x: number;
  y: number;
}

interface TextRender {
  text: string;
  fontSize: number;
}

// utility functions
function drawTextWithBackground(
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>
) {
  ctx.font = `${text.fontSize}px ${config.font}`;
  const textWidth = ctx.measureText(text.text).width;
  const padding = 0.2;
  const bckgDimensions = [textWidth, text.fontSize].map(
    (n) => n + text.fontSize * padding
  );
  let [x, y] = [position.x ?? 0, position.y ?? 0];
  ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
  ctx.fillRect(
    x - bckgDimensions[0] / 2,
    y - bckgDimensions[1] / 2,
    bckgDimensions[0],
    bckgDimensions[1]
  );
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(text.text, x, y);
}

function linkDescriptionPosition(link: Link) {
  return Object.assign(
    // @ts-ignore
    ...["x", "y"].map((c) => ({
      [c]:
        // @ts-ignore
        link.source[c] +
        // @ts-ignore
        (link.target[c] - link.source[c]) *
          (config.linkDirectionalArrowRelPos - 0.1),
    }))
  );
}

// node render & interaction
export const nodeCanvasObject = (
  nodeForceGraph: NodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  // @ts-ignore: not sure what to do about this, see TODO for Node type
  const node: Node = nodeForceGraph;
  const label = node.description ?? "";
  drawTextWithBackground(
    { text: label, fontSize: config.fontSize / globalScale },
    ctx,
    { x: node.x, y: node.y }
  );
};

const onNodeClick = (params: NodeObject): void => {
  console.log("clicked", params);
};

// link render & interaction
export const linkCanvasObject = (
  linkForceGraph: LinkObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  // @ts-ignore
  const link: Link = linkForceGraph;

  // ignore unbound links
  if (typeof link.source !== "object" || typeof link.target !== "object")
    return;

  const pos = linkDescriptionPosition(link);

  drawTextWithBackground(
    { text: String(link.value), fontSize: config.fontSize / globalScale },
    ctx,
    pos
  );
};

export const onLinkClickFn = (props: GraphRendererProps) => {
  return (params: LinkObject) => {
    // @ts-ignore: not sure what to do about this, see TODO for Link type
    let link: LinkBetweenObjects & LinkType = params;
    props.openVoteDialog({
      linkID: link.id,
      sourceNode: link.source,
      targetNode: link.target,
      weight: link.value,
    });
  };
};

const onLinkHover = (_: LinkObject | null): void => {
  //console.log("linkHov", params);
};

// global input listeners

// TODO(skep): extract zoom functions to separate file
export interface HasID {
  id: string;
}
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

interface ZoomFn {
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

export const makeKeydownListener = (
  zoom: ZoomFn,
  graphData: GraphDataMerged
) => {
  return (event: Partial<KeyboardEvent>) => {
    switch (event.key) {
      // TODO(skep): should probably be something with the mouse wheel, but
      // that event is somehow hidden by force-graph - @j you know how to do
      // this?
      case "p":
        zoom({ direction: ZoomDirection.In, steps: 1, graphData });
        return;
      case "m":
        zoom({ direction: ZoomDirection.Out, steps: 1, graphData });
        return;
      default:
        return;
    }
  };
};

// global configuration
const config = {
  linkDirectionalArrowLength: 7,
  linkDirectionalArrowRelPos: 0.75,
  linkCanvasObjectMode: "after",
  fontSize: 22,
  font: "Sans-Serif",
};

const transformToRenderedType = (graph: TranslatedGraphData): GraphData => {
  // TODO: use language context
  const language = "en";
  const transformedNodes = graph.nodes.map(({ id, description, group }) => {
    return {
      id,
      description: getTranslation({ translatedField: description, language }),
      group,
    };
  });
  return {
    links: graph.links,
    nodes: transformedNodes,
  };
};

export const GraphRenderer = (props: GraphRendererProps) => {
  const { graph } = useGraphDataContext();

  const graphDataForRender = transformToRenderedType(graph);
  const onLinkClick = onLinkClickFn(props);
  // TODO(j): is this the react way of listening for input?
  document.addEventListener(
    "keydown",
    // @ts-ignore (┙>∧<)┙へ┻┻
    makeKeydownListener(zoomStep, graphDataForRender)
  );
  return (
    <ForceGraph2D
      // Note: all data must be copied, since force graph changes Link "source"
      // and "target" fields to directly contain the referred node objects
      graphData={JSON.parse(JSON.stringify(graphDataForRender))}
      // nodes:
      nodeAutoColorBy={"group"}
      onNodeClick={onNodeClick}
      nodeCanvasObject={nodeCanvasObject}
      // links:
      onLinkHover={onLinkHover}
      onLinkClick={onLinkClick}
      linkDirectionalArrowLength={config.linkDirectionalArrowLength}
      linkDirectionalArrowRelPos={config.linkDirectionalArrowRelPos}
      // XXX: linkCanvasObjectMode should just be a string, but due to a bug in
      // force-graph it must be passed as function, otherwise linkCanvasObject
      // is never called. -> remove after force-graph module update
      // @ts-ignore
      linkCanvasObjectMode={() => config.linkCanvasObjectMode}
      linkCanvasObject={linkCanvasObject}
    />
  );
};
