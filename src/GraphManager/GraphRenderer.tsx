import { TranslatedGraphData, useGraphDataContext } from "src/GraphDataContext";
import { getTranslation } from "./utilities/getTranslation";
import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { GraphData, LinkType, NodeType } from "./types";
import {
  ZoomFn,
  GraphDataMerged,
  ZoomDirection,
  zoomStep,
  HasID,
  ZoomState,
} from "./Zoom";
import { MutableRefObject, useRef } from "react";

// TODO(skep): fundamental type issue here, we have 2-3 types in one:
//  1. `NodeType`: our node type, with added properties, that we use in
//     callbacks from ForceGraph2D
//  2. `NodeObject`: ForceGraph2D's node type
//  3. `HasID`: our Zoom functionality adds properties to the nodes to remember
//     the zoom state of nodes (e.g. node merges)
// Similarly we have a defined a LinkType != ForceGraph2D.LinkObject.
export type Link = LinkType & LinkObject;
export type Node = NodeType & NodeObject & HasID;
interface LinkBetweenObjects {
  source: Node;
  target: Node;
}

// TODO: move to VoteDialog.tsx
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
  backgroundColor: string;
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
  ctx.fillStyle = text.backgroundColor;
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

// TODO(j): should use react theme for color choice here
const backgroundColorWhite = "rgba(255, 255, 255, 0.8)";

export const nodeCanvasObject = (
  nodeForceGraph: NodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number
) => {
  // @ts-ignore: see `Node` type
  const node: Node = nodeForceGraph;
  let label = node.description ?? "";
  let backgroundColor = backgroundColorWhite;
  const mergedNodes = node.mergeCount ?? 0;
  if (mergedNodes > 1) {
    // TODO(skep): use relative scaling to total number of nodes
    // TODO(j): should use react theme for color choice here
    let hue = ((1 - mergedNodes * 0.1) * 120).toString(10);
    backgroundColor = `hsl(${hue},100%,50%)`;
    label += ` [${mergedNodes}]`;
  }
  drawTextWithBackground(
    { text: label, fontSize: config.fontSize / globalScale, backgroundColor },
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
    {
      text: String(link.value),
      fontSize: config.fontSize / globalScale,
      backgroundColor: backgroundColorWhite,
    },
    ctx,
    pos
  );
};

export const onLinkClickFn = (props: GraphRendererProps) => {
  return (params: LinkObject) => {
    // @ts-ignore: see LinkBetweenObjects and Link type
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
export const makeKeydownListener = (fgRef: any) => {
  return (event: Partial<KeyboardEvent>) => {
    switch (event.key) {
      case "s":
        if (!fgRef.current) {
          return;
        }
        console.log(`zoom: ${fgRef.current.zoom()}`);
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

// TODO: extract to another file
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

interface UserZoomEvent {
  // zoom level
  k: number;
  x: number;
  y: number;
}

export type ForceGraph2DRef = MutableRefObject<ForceGraphMethods | undefined>;

// FIXME(skep): BUG: on load zoom is triggered 2 times, so that 1-zoom-in
// always  happens!

// Note: the returned onZoom function is triggered by user interaction as well
// as programmatic zooming/panning with zoom() and centerAt().
// -> will be important for search-node feature using centerAt!
export const makeOnZoomAndPanListener = (
  ref: ForceGraph2DRef,
  zoom: ZoomFn,
  graphData: GraphDataMerged
) => {
  let lastZoom = ref.current?.zoom();
  let zoomState: ZoomState = { zoomSteps: [], graphData };
  const onZoomAndPan = (transform: UserZoomEvent) => {
    const forcegraph = ref.current;
    if (!forcegraph) {
      return;
    }
    const currentZoom = transform.k;
    if (!lastZoom || lastZoom === currentZoom) {
      return;
    }
    if (lastZoom < currentZoom) {
      zoom({ direction: ZoomDirection.In, steps: 1 }, zoomState);
    } else {
      zoom({ direction: ZoomDirection.Out, steps: 1 }, zoomState);
    }
    forcegraph.d3ReheatSimulation();
    lastZoom = currentZoom;
  };
  return onZoomAndPan;
};

export const GraphRenderer = (props: GraphRendererProps) => {
  const { graph } = useGraphDataContext();

  const graphDataForRender = JSON.parse(
    JSON.stringify(transformToRenderedType(graph))
  );
  const onLinkClick = onLinkClickFn(props);
  const forcegraphRef = useRef<ForceGraphMethods>();
  // TODO: make it react-isch? not sure where to put it
  document.addEventListener("keydown", makeKeydownListener(forcegraphRef));
  return (
    <ForceGraph2D
      ref={forcegraphRef}
      // Note: all data must be copied, since force graph changes Link "source"
      // and "target" fields to directly contain the referred node objects
      // nodes:
      graphData={graphDataForRender}
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
      onZoom={makeOnZoomAndPanListener(
        forcegraphRef,
        zoomStep,
        graphDataForRender
      )}
    />
  );
};
