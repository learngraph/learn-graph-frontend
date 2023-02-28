import { useState, useRef, useEffect } from 'react'

import ForceGraph2D, { LinkObject } from "react-force-graph-2d";
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

const styles = {
  wrapper: {
    width: '100%',
    height: '100%'
  }
}

interface DimensionsState {
  height: number
  width: number
}

export const GraphRenderer = ({
  selectedGraphDataset,
  openVoteDialog,
}: GraphRendererProps) => {

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [dimensions, setDimensions] = useState<DimensionsState>({
    height: window.innerHeight,
    width: window.innerWidth
  })

  const calculateDimensions = () => {
    // console.log(dimensions)
    // console.log(wrapperRef)
    setDimensions({
      height: wrapperRef?.current?.offsetHeight ?? 0,
      width: wrapperRef?.current?.offsetWidth ?? 0,
    })
  }

  useEffect(() => {
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions)
    return () => window.removeEventListener('resize', calculateDimensions)
  }, [])


  return (
    <div style={styles.wrapper} ref={wrapperRef}>
      <ForceGraph2D
        width={dimensions.width}
        height={dimensions.height}
        // Note: all data must be copied, since force graph changes Link "source"
        // and "target" fields to directly contain the referred node objects
        graphData={JSON.parse(JSON.stringify(selectedGraphDataset.data))}
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
    </div>
  );
};
