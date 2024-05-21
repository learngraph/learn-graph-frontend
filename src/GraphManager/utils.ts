import { Dispatch, RefObject, SetStateAction } from "react";
import SpriteText from "three-spritetext";
import { Controller, GraphState } from "./GraphEdit/GraphEdit";
import {
  BackendGraphData,
  ForceGraphGraphData,
  ForceGraphLinkObject,
  ForceGraphLinkObjectInitial,
  ForceGraphNodeObject,
} from "./types";

// global configuration
export const G_CONFIG = {
  linkCanvasObjectMode: "replace",
  linkCurvature: 5,
  fontSize: 22,
  font: "Sans-Serif",
};

export const GLOBALSCALE_SIZE_SCALING_BOUNDARY = 2;

// TODO(skep): should use react theme for color choice here
//const backgroundColorWhite = "rgba(255, 255, 255, 0.8)";
//const backgroundColorGrey = "rgba(190, 190, 190, 0.8)";
const backgroundColorLightBlue = "rgba(0, 173, 255, 255)";
const backgroundColorOrange = "hsl(30,100%,50%)";
const backgroundColorYellow = "hsl(40,100%,30%)";
const colorInterimLink = "rgb(238,75,43)";
const colorLink = "rgba(25,118,210,255)";

export type HighlightNodeSet = Set<ForceGraphNodeObject>;

export interface SpecialNodes {
  hoveredNode?: ForceGraphNodeObject | undefined | null;
  oneLinkAwayFromHoveredNode?: ForceGraphNodeObject[] | undefined | null;
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

const calculateBackgroundColor = (mergedNodes: number, totalNodes: number) => {
  // TODO(skep): should use react theme for color choice here
  const hue = (
    205 +
    (1 - Math.exp(-mergedNodes / totalNodes)) * 3 * 20
  ).toString();
  return `hsl(${hue},100%,50%)`;
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
  const label = node.description ?? "";
  let backgroundColor = backgroundColorLightBlue;
  const mergedNodes: number = node.mergeCount ?? 0;
  if (mergedNodes > 1) {
    backgroundColor = calculateBackgroundColor(mergedNodes, totalNodes);
  }
  if (highlightNodes.has(node)) {
    backgroundColor = `hsl(1,100%,50%)`;
  }
  if (specialNodes.hoveredNode?.id === node.id) {
    backgroundColor = backgroundColorOrange;
  }
  if (
    specialNodes.oneLinkAwayFromHoveredNode?.find((hov) => hov.id === node.id)
  ) {
    backgroundColor = backgroundColorYellow;
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

interface NodeVisualizer {
  (node: ForceGraphNodeObject, totalNodes: number): SpriteText;
}
export const nodeCanvas3dObject: NodeVisualizer = (
  node: ForceGraphNodeObject,
  totalNodes: number,
) => {
  const label = node.description ?? "";
  let backgroundColor = backgroundColorLightBlue;
  const mergedNodes = node.mergeCount ?? 0;
  if (mergedNodes > 1) {
    backgroundColor = calculateBackgroundColor(mergedNodes, totalNodes);
  }
  const sprite = new SpriteText(label);
  sprite.color = backgroundColor;
  sprite.textHeight = 8;
  return sprite;
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
) => {
  const state: GraphState = {
    current: graph,
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
      for (const key in newNode) {
        node[key] = newNode[key];
      }
      setGraph(graph);
    },
    updateLink: (link: ForceGraphLinkObject, newLink: ForceGraphLinkObject) => {
      const linkInGraph = graph.links.find((l) => l.id === link.id);
      if (!linkInGraph) {
        return;
      }
      for (const key in newLink) {
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
  fgGraph.nodes.forEach((node: ForceGraphNodeObject) => {
    // insert initial positions from the backend
    node.x = node.position?.x;
    node.y = node.position?.y;
    node.z = node.position?.z;
    // forcegraph-js creates a position object, and ours would interfere
    delete node.position;
  });
  return fgGraph;
};

// unused
//const graphHasSameNodeIDs = (
//  g1: ForceGraphGraphData,
//  g2: ForceGraphGraphData,
//) => {
//  const everyNodeExists = g1.nodes
//    .map((n1) => g2.nodes.find((n2) => n1.id === n2.id))
//    .every((node) => !!node);
//  return everyNodeExists;
//};

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
  ctx.fillStyle = color;
  let scale = conf.globalScale;
  if (scale <= GLOBALSCALE_SIZE_SCALING_BOUNDARY) {
    scale = GLOBALSCALE_SIZE_SCALING_BOUNDARY;
  }
  ctx.lineWidth = (3 * (link.value / 2) * (conf.extraThickness ?? 1)) / scale;
  ctx.beginPath();
  ctx.moveTo(link.source.x!, link.source.y!);
  const [dx, dy] = [
    link.target.x! - link.source.x!,
    link.target.y! - link.source.y!,
  ];
  const perp = [-dy, dx];
  const length = Math.sqrt(perp[0] ** 2 + perp[1] ** 2);
  const norm = [perp[0] / length, perp[1] / length];
  const mid = [link.source.x! + dx / 2, link.source.y! + dy / 2];
  const bp = [
    mid[0] + norm[0] * G_CONFIG.linkCurvature,
    mid[1] + norm[1] * G_CONFIG.linkCurvature,
  ];
  ctx.bezierCurveTo(bp[0], bp[1], bp[0], bp[1], link.target.x!, link.target.y!);
  ctx.stroke();

  const t = 0.75; // 75% along the curve
  const ax =
    (1 - t) ** 3 * link.source.x! +
    3 * (1 - t) ** 2 * t * bp[0] +
    3 * (1 - t) * t ** 2 * bp[0] +
    t ** 3 * link.target.x!;
  const ay =
    (1 - t) ** 3 * link.source.y! +
    3 * (1 - t) ** 2 * t * bp[1] +
    3 * (1 - t) * t ** 2 * bp[1] +
    t ** 3 * link.target.y!;

  // Now, draw the arrowhead at this point
  const arrowSize = (4 / scale) * link.value; // adjust as needed
  ctx.save();
  ctx.beginPath();
  ctx.translate(ax, ay);
  ctx.rotate(Math.atan2(ay - bp[1], ax - bp[0]));
  ctx.moveTo(-arrowSize, arrowSize / 2);
  ctx.lineTo(0, 0);
  ctx.lineTo(-arrowSize, -arrowSize / 2);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

export const linkSourceOrTargetIDEquals = (
  link: ForceGraphLinkObject,
  id?: string,
) => {
  if (!id) {
    return false;
  }
  if (link.target.id == id || link.source.id == id) {
    return true;
  }
  return false;
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
  let color = colorLink;
  if (linkSourceOrTargetIDEquals(link, ctrl.specialNodes.hoveredNode?.id)) {
    color = backgroundColorOrange;
  }
  drawLinkLine({ ctrl, link, ctx, globalScale, color });
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
  const [x, y] = [position.x ?? 0, position.y ?? 0];
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
  const [x, y] = [position.x ?? 0, position.y ?? 0];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(text.text, x, y);
};

export const makeOnNodeHover = (ctrl: Controller) => {
  const onNodeHover = (
    node: ForceGraphNodeObject | null,
    _ /*prevNode*/ : ForceGraphNodeObject | null,
  ) => {
    // XXX(skep): not working as expected!
    ctrl.forceGraphRef.current?.d3ReheatSimulation();
    ctrl.specialNodes.hoveredNode = node;
    if (!node) {
      //ctrl.forceGraphRef.current?.pauseAnimation();
      ctrl.specialNodes.oneLinkAwayFromHoveredNode = [];
      return;
    }
    //ctrl.forceGraphRef.current?.resumeAnimation();
    const secondary: ForceGraphNodeObject[] = [];
    ctrl.graph.current.links.forEach((link) => {
      if (link.source.id === node.id) {
        secondary.push(link.target);
      }
      if (link.target.id === node.id) {
        secondary.push(link.source);
      }
    });
    ctrl.specialNodes.oneLinkAwayFromHoveredNode = secondary;
  };
  return onNodeHover;
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
//
