import ForceGraph2D, { LinkObject, NodeObject } from "react-force-graph-2d";
import { DataSetType, LinkType, NodeType } from "./types";

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

// node render & interaction
export const nodeCanvasObject = (
  nodeForceGraph: NodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  // @ts-ignore: not sure what to do about this, see TODO below
  const node: NodeType & NodeObject = nodeForceGraph;
  const label = node.description ?? "";
  const pos = { x: node.x, y: node.y };
  drawTextWithBackground(
    { text: label, fontSize: config.fontSize / globalScale },
    ctx,
    pos
  );
};

const onNodeClick = (params: NodeObject): void => {
  console.log("clicked", params);
};

// link render & interaction
export const linkCanvasObject = (
  link: LinkObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {};

export const onLinkClickFn = (props: GraphRendererProps) => {
  return (params: LinkObject) => {
    console.log("onLinkClick", params);
    // @ts-ignore: TODO(skep): fundamental type issue here, we have a
    // NodeType != ForceGraph2D.NodeObject, and a LinkType !=
    // ForceGraph2D.LinkObject , but we type-cast our types to the force
    // graph types. Here we access our copied objects, but the type is
    // obviously the ForceGraph2D type.
    let link: LinkType & LinkObject = params;
    props.openVoteDialog({
      linkID: link.id,
      // @ts-ignore: see above
      sourceNode: link.source,
      // @ts-ignore: see above
      targetNode: link.target,
      weight: link.value,
    });
  };
};

const onLinkHover = (params: LinkObject | null): void => {
  console.log("linkHov", params);
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
  return (
    <ForceGraph2D
      // Note: all data must be copied, since force graph changes Link "source"
      // and "target" fields to directly contain the referred node objects
      graphData={JSON.parse(JSON.stringify(props.selectedGraphDataset.data))}
      nodeAutoColorBy={"group"}
      onNodeClick={onNodeClick}
      onLinkHover={onLinkHover}
      onLinkClick={onLinkClick}
      nodeCanvasObject={nodeCanvasObject}
      linkDirectionalArrowLength={config.linkDirectionalArrowLength}
      linkDirectionalArrowRelPos={config.linkDirectionalArrowRelPos}
      linkCanvasObjectMode={config.linkCanvasObjectMode}
      linkCanvasObject={linkCanvasObject}
    />
  );
};
