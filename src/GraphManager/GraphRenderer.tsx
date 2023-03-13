import ForceGraph2D, {
  //GraphData as GraphDataForceGraph,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { DataSetType, LinkType, NodeType /*, GraphData*/ } from "./types";

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

interface GraphDataMerged {
  nodes: Node[];
  links: LinkBetweenObjects[];
}
// alternative to the newly defined GraphDataMerged interface:
//export type GraphDataMerged = GraphData & GraphDataForceGraph;

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
  selectedGraphDataset: DataSetType;
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
interface ZoomFn {
  (args: ZoomArgs): void;
}

export enum ZoomDirection {
  In,
  Out,
}

interface ZoomArgs {
  direction: ZoomDirection;
  graphData: GraphDataMerged;
}

export const countLinksToNode = (node: Node, links: LinkBetweenObjects[]) => {
  return links.reduce((count, link) => {
    if (link.target.id === node.id) {
      return count + 1;
    } else {
      return count;
    }
  }, 0 /*init value for count*/);
};

const deleteNodesThatLinkToNodeID = (
  id: string,
  graphData: GraphDataMerged
) => {
  let sourceNodes = graphData.links
    .filter((link) => link.target.id === id)
    .map((link) => link.source);
  let leftOverNodes = graphData.nodes.filter(
    (node) => !sourceNodes.find((findNode) => node.id === findNode.id)
  );
  graphData.nodes.splice(0, graphData.nodes.length, ...leftOverNodes);
};

export const rewrite2ndOrderLinksTo = (
  mergeTargetNode: Node,
  graphData: GraphDataMerged
) => {
  let firstOrderNodes = graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source);
  let secondOrderNodesAndLinks = firstOrderNodes.flatMap((firstOrderNode) => {
    return graphData.links.filter(
      (link) => link.target.id === firstOrderNode.id
    );
  });
  secondOrderNodesAndLinks.forEach((link) => {
    link.target = mergeTargetNode;
  });
};

export const zoom = (args: ZoomArgs): void => {
  // select node to merge:
  const nodesByLinkCount = args.graphData.nodes
    .map((node) => ({
      count: countLinksToNode(node, args.graphData.links),
      node: node,
    }))
    .sort((a, b) => b.count - a.count);
  let mergeTargetNode = nodesByLinkCount[0].node;
  // modify graph:
  deleteNodesThatLinkToNodeID(mergeTargetNode.id, args.graphData);
  // find links, that don't link to mergeTargetNode, to replace them later
  let linksToKeep = args.graphData.links.filter(
    (link) => link.target.id !== mergeTargetNode.id
  );
  // find first order nodes, as long as the first order links still exist
  let firstOrderNodes = args.graphData.links
    .filter((link) => link.target.id === mergeTargetNode.id)
    .map((link) => link.source);
  // delete first order links
  args.graphData.links.splice(0, args.graphData.links.length, ...linksToKeep);
  // rewrite 2nd order links to mergeTargetNode
  let secondOrderNodesAndLinks = firstOrderNodes.flatMap((firstOrderNode) => {
    return args.graphData.links.filter(
      (link) => link.target.id === firstOrderNode.id
    );
  });
  secondOrderNodesAndLinks.forEach((link) => {
    link.target = mergeTargetNode;
  });
};

export const makeKeydownListener = (
  zoom: ZoomFn,
  graphData: GraphDataMerged
) => {
  return (event: Partial<KeyboardEvent>) => {
    switch (event.key) {
      // TODO(skep): should probably be something with the mouse wheel, but
      // that event is somehow hidden by force-graph
      case "p":
        zoom({ direction: ZoomDirection.In, graphData });
        return;
      case "m":
        zoom({ direction: ZoomDirection.Out, graphData });
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

export const GraphRenderer = (props: GraphRendererProps) => {
  const onLinkClick = onLinkClickFn(props);
  // TODO(j): is this the react way of listening for input?
  let graphData = JSON.parse(JSON.stringify(props.selectedGraphDataset.data));
  document.addEventListener("keydown", makeKeydownListener(zoom, graphData));
  return (
    <ForceGraph2D
      // Note: all data must be copied, since force graph changes Link "source"
      // and "target" fields to directly contain the referred node objects
      graphData={graphData}
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
