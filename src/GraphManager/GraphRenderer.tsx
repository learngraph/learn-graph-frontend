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

const nodeCanvasObject = (
  node: NodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  // @ts-ignore: not sure what to do about this, see TODO below
  const label = node.description ?? "";
  const fontSize = 22 / globalScale;
  ctx.font = `${fontSize}px Sans-Serif`;
  const textWidth = ctx.measureText(String(node.id)).width;
  const padding = 0.2;
  const bckgDimensions = [textWidth, fontSize].map(
    (n) => n + fontSize * padding
  );

  let [x, y] = [node.x ?? 0, node.y ?? 0];
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
  ctx.fillText(String(label), x, y);
};

export const onLinkClickFn = (props: GraphRendererProps) => {
  return (params: LinkObject) => {
    console.log("onLinkClick", params);
    // @ts-ignore: TODO(skep): fundamental type issue here, we have a
    // NodeType != ForceGraph2D.NodeObject, and a LinkType !=
    // ForceGraph2D.LinkObject , but we type-cast our types to the force
    // graph types. Here we access our copied objects, but the type is
    // obviously the ForceGraph2D type.
    let link: LinkType = params;
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

const config = {
  linkDirectionalArrowLength: 7,
  linkDirectionalArrowRelPos: 0.75,
};

const onNodeClick = (params: NodeObject): void => {
  console.log("clicked", params);
};

const onLinkHover = (params: LinkObject | null): void => {
  console.log("linkHov", params);
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
      linkCanvasObjectMode={() => "after"}
    />
  );
};
