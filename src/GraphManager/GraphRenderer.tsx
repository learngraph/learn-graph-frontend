import ForceGraph2D, { LinkObject } from "react-force-graph-2d";
import { TranslatedGraphData, useGraphDataContext } from "src/GraphDataContext";
import { getTranslation } from "./utilities/getTranslation";
import { GraphData, LinkType, NodeType } from "./types";
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

export const GraphRenderer = ({ openVoteDialog }: GraphRendererProps) => {
  const { graph } = useGraphDataContext();

  const graphDataForRender = transformToRenderedType(graph);
  return (
    <ForceGraph2D
      // Note: all data must be copied, since force graph changes Link "source"
      // and "target" fields to directly contain the referred node objects
      graphData={JSON.parse(JSON.stringify(graphDataForRender))}
      nodeAutoColorBy={"group"}
      onNodeClick={(params) => {
        console.log("clicked", params);
      }}
      onLinkHover={(params) => {
        console.log("linkHov", params);
      }}
      onLinkClick={(params: LinkObject) => {
        console.log("onLinkClick", params);
        // @ts-ignore: TODO(skep): fundamental type issue here, we have a
        // NodeType != ForceGraph2D.NodeObject, and a LinkType !=
        // ForceGraph2D.LinkObject , but we type-cast our types to the force
        // graph types. Here we access our copied objects, but the type is
        // obviously the ForceGraph2D type.
        let link: LinkType = params;
        openVoteDialog({
          linkID: link.id,
          // @ts-ignore: see above
          sourceNode: link.source,
          // @ts-ignore: see above
          targetNode: link.target,
          weight: link.value,
        });
      }}
      nodeCanvasObject={(node, ctx, globalScale) => {
        // @ts-ignore: not sure what to do about this, see TODO above
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

        // node.bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      linkDirectionalArrowLength={10}
      linkDirectionalArrowRelPos={0.7}
      linkCanvasObjectMode={() => "after"}
    />
  );
};
