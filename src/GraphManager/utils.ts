import { Dispatch, MutableRefObject, RefObject, SetStateAction } from "react";
import { Controller, GraphState } from "./GraphEdit/GraphEdit";
import {
  BackendGraphData,
  ForceGraphGraphData,
  ForceGraphLinkObject,
  ForceGraphLinkObjectInitial,
  ForceGraphNodeObject,
} from "./types";
import { ZOOM_LEVEL_MAX, ZOOM_LEVEL_STEP } from "./ZoomControlPanel";

// global configuration
export const G_CONFIG = {
  linkDirectionalArrowLength: 7,
  linkDirectionalArrowRelPos: 0.75,
  linkCanvasObjectMode: "after",
  fontSize: 22,
  font: "Sans-Serif",
};

export const GLOBALSCALE_SIZE_SCALING_BOUNDARY = 2;
export const MAX_NODES_WITHOUT_INITIAL_ZOOM = 30;

// TODO(j): should use react theme for color choice here
//const backgroundColorWhite = "rgba(255, 255, 255, 0.8)";
//const backgroundColorGrey = "rgba(190, 190, 190, 0.8)";
const backgroundColorLightBlue = "rgba(0, 173, 255, 255)";
const backgroundColorOrange = "hsl(30,100%,50%)";
const colorInterimLink = "rgb(238,75,43)";
const colorLink = "rgba(25,118,210,255)";

export type HighlightNodeSet = Set<ForceGraphNodeObject>;

export interface SpecialNodes {
  hoveredNode?: ForceGraphNodeObject | undefined | null;
}

interface GraphConverter {
  (arg: { graph?: BackendGraphData }): ForceGraphGraphData | null;
}

export interface Rectangle {
  height: number;
  width: number;
}
export interface GraphSizeConfig {
  wrapperRef: RefObject<HTMLDivElement>;
  setAvailableSpace: Dispatch<SetStateAction<Rectangle>>;
}

interface DrawLinkConfig {
  ctrl: Controller;
  link: ForceGraphLinkObject;
  ctx: CanvasRenderingContext2D;
  globalScale: number;
  color: string;
  extraThickness?: number;
}

export interface Position {
  x: number;
  y: number;
}

interface TextRender {
  text: string;
  fontSize: number;
  backgroundColor: string;
}
interface TextRenderConfig {
  globalScale: number;
  mergedNodes: number;
}

// dev global input listener
let globale = {
  fontSize: 0,
  globalScale: 0,
  configFontSize: 0,
};
export const makeKeydownListener = (_ctrl: Controller) => {
  return (event: Partial<KeyboardEvent>) => {
    switch (event.key) {
      case "s":
        // TODO(skep): should add dev-config to enable testing hooks
        console.log(globale);
        return;
      default:
        return;
    }
  };
};

export const nodeCanvasObject = (
  node: ForceGraphNodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  ctrl: Controller,
  totalNodes: number,
) => {
  const {
    search: { highlightNodes },
    specialNodes,
  } = ctrl;
  let label = node.description ?? "";
  let backgroundColor = backgroundColorLightBlue;
  const mergedNodes: number = node.mergeCount ?? 0;
  if (mergedNodes > 1) {
    // TODO(skep): should use react theme for color choice here
    let hue = (
      205 +
      (1 - Math.exp(-mergedNodes / totalNodes)) * 3 * 20
    ).toString();
    backgroundColor = `hsl(${hue},100%,50%)`;
  }
  if (highlightNodes.has(node)) {
    backgroundColor = `hsl(1,100%,50%)`;
  }
  if (specialNodes.hoveredNode?.id === node.id) {
    backgroundColor = backgroundColorOrange;
  }
  if (
    node.id === ctrl.nodeDrag.state.interimLink?.source.id ||
    node.id === ctrl.nodeDrag.state.interimLink?.target.id
  ) {
    backgroundColor = colorInterimLink;
  }
  let fontSize = G_CONFIG.fontSize;
  if (globalScale < GLOBALSCALE_SIZE_SCALING_BOUNDARY) {
    fontSize /= GLOBALSCALE_SIZE_SCALING_BOUNDARY;
  } else {
    fontSize /= globalScale;
  }
  globale = {
    fontSize,
    globalScale,
    configFontSize: G_CONFIG.fontSize,
  };
  const text = {
    text: label,
    fontSize,
    backgroundColor,
  };
  const pos = { x: node.x, y: node.y };
  drawTextWithBackground(text, ctx, pos, { mergedNodes, globalScale });
};

const drawTextWithBackground = (
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>,
  config: TextRenderConfig,
) => {
  if (config.mergedNodes > 0 && !!position.x && !!position.y) {
    // visually we differentiate beween 1, 2 and "many" (i.e. >= 3)
    const offset = 4 / config.globalScale;
    if (config.mergedNodes >= 3) {
      const newpos = { x: position.x + 2 * offset, y: position.y + 2 * offset };
      drawTextBackgroundOval(text, ctx, newpos, config);
    }
    if (config.mergedNodes >= 2) {
      const newpos = { x: position.x + offset, y: position.y + offset };
      drawTextBackgroundOval(text, ctx, newpos, config);
    }
  }
  drawTextBackgroundOval(text, ctx, position, config);
  drawText(text, ctx, position);
};

export const makeGraphState = (
  graph: ForceGraphGraphData,
  setGraph: Dispatch<SetStateAction<ForceGraphGraphData>>,
  performInitialZoom: MutableRefObject<boolean>,
) => {
  const state: GraphState = {
    current: graph,
    performInitialZoom,
    setGraph,
    addLink: (link: ForceGraphLinkObject | ForceGraphLinkObjectInitial) => {
      // @ts-ignore: FIXME(skep): should probably remove
      // ForceGraphLinkObjectInitial again, it's too much of a nuicance to use
      // this polymorphic object everywhere, just because on startup it has a
      // different structure
      setGraph({ nodes: graph.nodes, links: [...graph.links, link] });
    },
    removeLink: (toRemove: ForceGraphLinkObject) => {
      const idx = graph.links.findIndex((link) => link.id === toRemove.id);
      if (idx === -1) {
        return;
      }
      graph.links.splice(idx, 1);
      setGraph(graph);
    },
    addNode: (node: ForceGraphNodeObject) => {
      setGraph({ nodes: [...graph.nodes, node], links: graph.links });
    },
    removeNode: (toRemove: ForceGraphNodeObject) => {
      const idx = graph.nodes.findIndex((node) => node.id === toRemove.id);
      if (idx === -1) {
        return;
      }
      graph.nodes.splice(idx, 1);
      setGraph(graph);
    },
    updateNode: (node: ForceGraphNodeObject, newNode: ForceGraphNodeObject) => {
      for (let key in newNode) {
        node[key] = newNode[key];
      }
      setGraph(graph);
    },
    updateLink: (link: ForceGraphLinkObject, newLink: ForceGraphLinkObject) => {
      const linkInGraph = graph.links.find((l) => l.id === link.id);
      if (!linkInGraph) {
        return;
      }
      for (let key in newLink) {
        link[key] = newLink[key];
      }
      setGraph(graph);
    },
  };
  return state;
};

export const convertBackendGraphToForceGraph: GraphConverter = (data) => {
  if (!data || !data.graph) {
    return null;
  }
  const fgGraph = JSON.parse(JSON.stringify(data.graph));
  ["links", "nodes"].forEach((prop) => {
    if (!fgGraph[prop]) {
      fgGraph[prop] = [];
    }
  });
  return fgGraph;
};

const graphHasSameNodeIDs = (
  g1: ForceGraphGraphData,
  g2: ForceGraphGraphData,
) => {
  const everyNodeExists = g1.nodes
    .map((n1) => g2.nodes.find((n2) => n1.id === n2.id))
    .every((node) => !!node);
  return everyNodeExists;
};

export const initialZoomForLargeGraph = (ctrl: Controller) => {
  if (
    graphHasSameNodeIDs(ctrl.graph.current, makeInitialGraphData()) ||
    !ctrl.graph.performInitialZoom.current
  ) {
    return;
  }
  ctrl.graph.performInitialZoom.current = false;
  const nNodes = ctrl.graph.current.nodes.length;
  if (nNodes < MAX_NODES_WITHOUT_INITIAL_ZOOM) {
    return;
  }
  const steps = Math.floor(
    Math.log2(nNodes / MAX_NODES_WITHOUT_INITIAL_ZOOM) + 1,
  );
  ctrl.zoom.zoomLevel = ZOOM_LEVEL_MAX;
  ctrl.zoom.setUserZoomLevel(ZOOM_LEVEL_MAX - steps * ZOOM_LEVEL_STEP);
};

export const makeInitialGraphData = () => {
  const n_graph: ForceGraphNodeObject = { id: "1", description: "graph" };
  const n_is: ForceGraphNodeObject = { id: "2", description: "is" };
  const n_loading: ForceGraphNodeObject = { id: "3", description: "loading" };
  return {
    nodes: [n_graph, n_is, n_loading],
    links: [
      { id: "1", source: n_graph, target: n_is, value: 5 },
      { id: "2", source: n_is, target: n_loading, value: 5 },
    ],
  };
};

export const setGraphSize = (conf: GraphSizeConfig) => {
  const containerElement = conf.wrapperRef.current;
  if (!containerElement) {
    return;
  }
  const rect = containerElement.getBoundingClientRect();
  conf.setAvailableSpace(rect);
};

export const nodePointerAreaPaint = (
  node: ForceGraphNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  isEditMode: boolean,
) => {
  if (!isEditMode) {
    return;
  }
  drawTextBackgroundOval(
    {
      text: node.description ?? "",
      fontSize: G_CONFIG.fontSize / globalScale,
      backgroundColor: color,
    },
    ctx,
    { x: node.x, y: node.y },
    { mergedNodes: node.mergeCount, globalScale },
  );
};

export const linkPointerAreaPaint = (
  ctrl: Controller,
  link: ForceGraphLinkObject,
  invisibleTouchPaint: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  if (!ctrl.mode.allowGraphInteractions) {
    return;
  }
  drawLinkLine({ ctrl, link, ctx, globalScale, color: invisibleTouchPaint });
};

export const drawLinkLine = (conf: DrawLinkConfig) => {
  const { ctx, color, link } = conf;
  ctx.strokeStyle = color;
  let scale = conf.globalScale;
  if (scale <= GLOBALSCALE_SIZE_SCALING_BOUNDARY) {
    scale = GLOBALSCALE_SIZE_SCALING_BOUNDARY;
  }
  ctx.lineWidth = (3 * (link.value / 2) * (conf.extraThickness ?? 1)) / scale;
  ctx.beginPath();
  ctx.moveTo(link.source.x!, link.source.y!);
  ctx.lineTo(link.target.x!, link.target.y!);
  ctx.stroke();
};

export const linkCanvasObject = (
  ctrl: Controller,
  link: ForceGraphLinkObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  if (link === ctrl.nodeDrag.state.interimLink) {
    drawLinkLine({
      ctrl,
      link,
      ctx,
      globalScale,
      color: colorInterimLink,
      extraThickness: 3,
    });
    return;
  }
  drawLinkLine({ ctrl, link, ctx, globalScale, color: colorLink });
};

// utility functions

const drawTextBackgroundOval = (
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>,
  renderConfig: TextRenderConfig,
) => {
  ctx.font = `${text.fontSize}px ${G_CONFIG.font}`;
  const textWidth = ctx.measureText(text.text).width;
  const padding = 0.2;
  const bckgDimensions = [textWidth, text.fontSize].map(
    (n) => n + text.fontSize * padding,
  );
  let [x, y] = [position.x ?? 0, position.y ?? 0];
  ctx.fillStyle = text.backgroundColor;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1 / renderConfig.globalScale;
  drawOval(ctx, x, y, bckgDimensions[0] / 1.8, bckgDimensions[1] / 1.2);
  ctx.fill();
  ctx.stroke();
};
const drawOval = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radiusX: number,
  radiusY: number,
) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, radiusY / radiusX);
  ctx.beginPath();
  ctx.arc(0, 0, radiusX, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.restore();
};

const drawText = (
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>,
) => {
  ctx.font = `${text.fontSize}px ${G_CONFIG.font}`;
  let [x, y] = [position.x ?? 0, position.y ?? 0];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(text.text, x, y);
};

//// could be usefull later?
//const linkDescriptionPosition = (link: ForceGraphLinkObject) => {
//  return Object.assign(
//    // @ts-ignore
//    ...["x", "y"].map((c) => ({
//      [c]:
//        // @ts-ignore
//        link.source[c] +
//        // @ts-ignore
//        (link.target[c] - link.source[c]) *
//          (config.linkDirectionalArrowRelPos - 0.1),
//    })),
//  );
//};
