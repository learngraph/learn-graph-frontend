import ForceGraph2D from "react-force-graph-2d";
import {
  MutableRefObject,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  Dispatch,
  SetStateAction,
  RefObject,
} from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphLinkObject,
  ForceGraphLinkObjectInitial,
  BackendGraphData,
  LocalForceGraphMethods,
} from "./types";
import { ZoomState } from "./Zoom";
import { useGraphData } from "./hooks";
import {
  GraphState,
  makeOnBackgroundClick,
  Controller,
  NodeDragState,
  makeOnNodeDrag,
  makeOnNodeDragEnd,
  makeOnLinkClick,
  makeOnNodeClick,
  Backend,
  FG_ENGINE_COOLDOWN_TICKS_DEFAULT,
} from "./GraphEdit/GraphEdit";
import { GraphEditPopUp, GraphEditPopUpState } from "./GraphEdit/PopUp";
import { CreateButton } from "./GraphEdit/CreateButton";
import { EditModeButton } from "./GraphEdit/ModeButton";
import { useCreateNode } from "./hooks/useCreateNode";
import { useCreateEdge } from "./hooks/useCreateEdge";
import { useSubmitVote } from "./hooks/useSubmitVote";
import { useUpdateNode } from "./hooks/useUpdateNode";
import { useDeleteNode } from "./hooks/useDeleteNode";
import { useDeleteEdge } from "./hooks/useDeleteEdge";
import { useUserDataContext } from "src/UserDataContext";
import {
  ZoomControlPanel,
  makeZoomControl,
  makeOnZoomAndPanListener,
  ZOOM_LEVEL_MAX,
  ZOOM_LEVEL_STEP,
  debounce,
} from "./ZoomControlPanel";
import { ControllerRef } from "./GraphManager";
import { SearchResultPopUp } from "./SearchResultPopUp";

const GLOBALSCALE_SIZE_SCALING_BOUNDARY = 2;

export type HighlightNodeSet = Set<ForceGraphNodeObject>;

interface GraphRendererProps {
  controllerRef: ControllerRef;
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

// utility functions
const drawTextBackgroundOval = (
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>,
  renderConfig: TextRenderConfig,
) => {
  ctx.font = `${text.fontSize}px ${config.font}`;
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
  ctx.font = `${text.fontSize}px ${config.font}`;
  let [x, y] = [position.x ?? 0, position.y ?? 0];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000";
  ctx.fillText(text.text, x, y);
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

// node render & interaction

// TODO(j): should use react theme for color choice here
//const backgroundColorWhite = "rgba(255, 255, 255, 0.8)";
//const backgroundColorGrey = "rgba(190, 190, 190, 0.8)";
const backgroundColorLightBlue = "rgba(0, 173, 255, 255)";
const backgroundColorOrange = "hsl(30,100%,50%)";
const colorInterimLink = "rgb(238,75,43)";
const colorLink = "rgba(25,118,210,255)";

export interface SpecialNodes {
  hoveredNode?: ForceGraphNodeObject | undefined | null;
}

const makeNodeCanvasObject = (ctrl: Controller) => {
  return (
    nodeForceGraph: ForceGraphNodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    return nodeCanvasObject(
      nodeForceGraph,
      ctx,
      globalScale,
      ctrl,
      ctrl.graph.current.nodes.length,
    );
  };
};

let globale = {
  fontSize: 0,
  globalScale: 0,
  configFontSize: 0,
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
  let fontSize = config.fontSize;
  if (globalScale < GLOBALSCALE_SIZE_SCALING_BOUNDARY) {
    fontSize /= GLOBALSCALE_SIZE_SCALING_BOUNDARY;
  } else {
    fontSize /= globalScale;
  }
  globale = {
    fontSize,
    globalScale,
    configFontSize: config.fontSize,
  };
  const text = {
    text: label,
    fontSize,
    backgroundColor,
  };
  const pos = { x: node.x, y: node.y };
  drawTextWithBackground(text, ctx, pos, { mergedNodes, globalScale });
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
      fontSize: config.fontSize / globalScale,
      backgroundColor: color,
    },
    ctx,
    { x: node.x, y: node.y },
    { mergedNodes: node.mergeCount, globalScale },
  );
};

const makeNodePointerAreaPaint = (ctrl: Controller) => {
  return (
    node: ForceGraphNodeObject,
    color: string,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    nodePointerAreaPaint(node, color, ctx, globalScale, ctrl.mode.isEditMode);
  };
};

// link render & interaction

const makeLinkCanvasObject = (ctrl: Controller) => {
  return (
    link: ForceGraphLinkObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    return linkCanvasObject(ctrl, link, ctx, globalScale);
  };
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
const makeLinkPointerAreaPaint = (ctrl: Controller) => {
  return (
    link: ForceGraphLinkObject,
    invisibleTouchPaint: string,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => linkPointerAreaPaint(ctrl, link, invisibleTouchPaint, ctx, globalScale);
};
export const linkPointerAreaPaint = (
  ctrl: Controller,
  link: ForceGraphLinkObject,
  invisibleTouchPaint: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  if (!ctrl.mode.isEditMode) {
    return;
  }
  drawLinkLine({ ctrl, link, ctx, globalScale, color: invisibleTouchPaint });
};

interface DrawLinkConfig {
  ctrl: Controller;
  link: ForceGraphLinkObject;
  ctx: CanvasRenderingContext2D;
  globalScale: number;
  color: string;
  extraThickness?: number;
}
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

const onLinkHover = (_: ForceGraphLinkObject | null): void => {
  //console.log("linkHov", params);
};

// global input listeners
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

// global configuration
const config = {
  linkDirectionalArrowLength: 7,
  linkDirectionalArrowRelPos: 0.75,
  linkCanvasObjectMode: "after",
  fontSize: 22,
  font: "Sans-Serif",
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

interface GraphConverter {
  (arg: { graph?: BackendGraphData }): ForceGraphGraphData | null;
}
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

const convertAndSetGraph = (
  setGraph: Dispatch<SetStateAction<ForceGraphGraphData>>,
  data: { graph: BackendGraphData },
  performInitialZoom: MutableRefObject<boolean>,
) => {
  const graph = convertBackendGraphToForceGraph(data);
  if (!graph) {
    return;
  }
  performInitialZoom.current = true;
  setGraph(graph);
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
export const MAX_NODES_WITHOUT_INITIAL_ZOOM = 30;
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

export interface Rectangle {
  height: number;
  width: number;
}
export interface GraphSizeConfig {
  wrapperRef: RefObject<HTMLDivElement>;
  setAvailableSpace: Dispatch<SetStateAction<Rectangle>>;
}
export const setGraphSize = (conf: GraphSizeConfig) => {
  const containerElement = conf.wrapperRef.current;
  if (!containerElement) {
    return;
  }
  const rect = containerElement.getBoundingClientRect();
  conf.setAvailableSpace(rect);
};

const SmallAlignBottomLargeAlignLeft = ({
  bottomLeft,
  topRight,
}: {
  bottomLeft: any;
  topRight: any;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      id="SmallAlignBottomLargeAlignLeft"
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: ["column", "row"],
      }}
    >
      {isSmallScreen ? (
        <>
          {topRight}
          {/*bottom element should at most cover 50% of the screen*/}
          <Box id="bottomLeftWrapper" sx={{ maxHeight: "50%" }}>
            {bottomLeft}
          </Box>
        </>
      ) : (
        <>
          {bottomLeft}
          {topRight}
        </>
      )}
    </Box>
  );
};

export const GraphRenderer = (props: GraphRendererProps) => {
  const [graph, setGraph] = useState<ForceGraphGraphData>(
    makeInitialGraphData(),
  );
  const performInitialZoom = useRef(false);
  const { language } = useUserDataContext();
  const { data: graphDataFromBackend } = useGraphData();
  const [shiftHeld, setShiftHeld] = useState(false);
  const downHandler = ({ key }: any) => {
    if (key === "Shift") {
      setShiftHeld(true);
    }
  };
  const upHandler = ({ key }: any) => {
    if (key === "Shift") {
      setShiftHeld(false);
    }
  };
  const initPopUp: GraphEditPopUpState = {
    isOpen: false,
  };
  const [editPopUpState, setEditPopUpState] = useState(initPopUp);
  const [nodeDrag, setNodeDrag] = useState<NodeDragState>({});
  const [zoomLevel, setZoomLevel] = useState(5);
  const typeAssertion: number[] = [];
  const [zoomStepStack, setZoomStepStack] = useState(typeAssertion);
  const zoomInitState: ZoomState = {
    zoomSteps: [],
    graphData: { nodes: [], links: [] },
  };
  const [zoomState, setZoomState] = useState(zoomInitState);
  const { createNode } = useCreateNode();
  const { createEdge } = useCreateEdge();
  const { submitVote } = useSubmitVote();
  const { updateNode } = useUpdateNode();
  const { deleteNode } = useDeleteNode();
  const { deleteEdge } = useDeleteEdge();
  const backend: Backend = {
    createNode,
    updateNode,
    createLink: createEdge,
    submitVote,
    deleteNode,
    deleteLink: deleteEdge,
  };
  const [cooldownTicks, setCooldownTicks] = useState(
    FG_ENGINE_COOLDOWN_TICKS_DEFAULT,
  );
  const [isResultShown, setIsResultShown] = useState<boolean>(false);
  const [highlightNodes, setHighlightNodes] = useState(
    new Set<ForceGraphNodeObject>(),
  );

  const [isEditMode, setIsEditMode] = useState(false);
  const controller: Controller = {
    backend,
    popUp: {
      state: editPopUpState,
      setState: setEditPopUpState,
    },
    graph: makeGraphState(graph, setGraph, performInitialZoom),
    forceGraphRef: useRef<LocalForceGraphMethods>(),
    setCooldownTicks,
    nodeDrag: {
      state: nodeDrag,
      setState: setNodeDrag,
    },
    language,
    search: {
      isResultShown,
      setIsResultShown,
      highlightNodes,
      setHighlightNodes,
    },
    specialNodes: {},
    keys: { shiftHeld },
    zoom: {
      setUserZoomLevel: () => {},
      zoomLevel,
      setZoomLevel,
      zoomStepStack,
      setZoomStepStack,
      zoomState,
      setZoomState,
    },
    mode: { isEditMode, setIsEditMode },
  };
  const zoomControl = makeZoomControl(controller);
  controller.zoom.setUserZoomLevel = zoomControl.onZoomChange;
  props.controllerRef.current = controller;
  const onBackgroundClick = makeOnBackgroundClick(controller);
  const onNodeHover = (
    node: ForceGraphNodeObject | null,
    _ /*prevNode*/ : ForceGraphNodeObject | null,
  ) => {
    controller.specialNodes.hoveredNode = node;
  };
  useEffect(() => {
    convertAndSetGraph(
      setGraph,
      graphDataFromBackend,
      controller.graph.performInitialZoom,
    );
    // Note: performInitialZoom must not trigger call of graph data setter
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphDataFromBackend]);
  // XXX(skep): should we disable right click? it's kind of annoying for the
  // canvas, but outside we might want to allow it..
  //useEffect(() => {
  //  const rightClickAction = (event: any) => event.preventDefault();
  //  document.addEventListener("contextmenu", rightClickAction);
  //  return () => {
  //    document.removeEventListener("contextmenu", rightClickAction);
  //  };
  //});
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  useEffect(() => {
    const keyDownListener = makeKeydownListener(controller);
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });
  useEffect(() => {
    debounce(initialZoomForLargeGraph, 100)(controller); // XXX(skep): why is delay needed?
    // Note: We must not-auto zoom on every controller change, but only on
    // initial backend response, i.e. when loading initial graph data is done.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [availableSpace, setAvailableSpace] = useState<Rectangle>({
    height: 400,
    width: 600,
  });
  const graphSizeConfig = { wrapperRef, setAvailableSpace };
  useLayoutEffect(() => {
    setGraphSize(graphSizeConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller.search.highlightNodes]);
  useEffect(() => {
    const handleResize = () => {
      setGraphSize(graphSizeConfig);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SmallAlignBottomLargeAlignLeft
        topRight=<Box
          id="canvasWrapper"
          ref={wrapperRef}
          sx={{
            flex: "3",
            overflow: "hidden",
          }}
        >
          <ForceGraph2D
            height={availableSpace.height}
            width={availableSpace.width}
            ref={controller.forceGraphRef}
            graphData={graph}
            cooldownTicks={cooldownTicks}
            nodeCanvasObject={makeNodeCanvasObject(controller)}
            nodePointerAreaPaint={makeNodePointerAreaPaint(controller)}
            onNodeClick={makeOnNodeClick(controller)}
            onNodeHover={onNodeHover}
            onNodeDrag={makeOnNodeDrag(controller)}
            onNodeDragEnd={makeOnNodeDragEnd(controller)}
            onLinkHover={onLinkHover}
            onLinkClick={makeOnLinkClick(controller)}
            linkDirectionalArrowLength={config.linkDirectionalArrowLength}
            linkDirectionalArrowRelPos={config.linkDirectionalArrowRelPos}
            // XXX: linkCanvasObjectMode should just be a string, but due to a bug in
            // force-graph it must be passed as function, otherwise linkCanvasObject
            // is never called. -> remove after force-graph module update
            // @ts-ignore
            linkCanvasObjectMode={() => config.linkCanvasObjectMode}
            linkCanvasObject={makeLinkCanvasObject(controller)}
            linkPointerAreaPaint={makeLinkPointerAreaPaint(controller)}
            onZoom={makeOnZoomAndPanListener(controller)}
            onBackgroundClick={onBackgroundClick}
          />
        </Box>
        bottomLeft=<SearchResultPopUp
          ctrl={controller}
          availableSpace={availableSpace}
        />
      />
      <GraphEditPopUp ctrl={controller} />
      <Box
        style={{
          position: "fixed",
          bottom: "0px",
          right: "0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <EditModeButton ctrl={controller} />
        <CreateButton ctrl={controller} />
      </Box>
      <ZoomControlPanel zoomControl={zoomControl} />
    </>
  );
};
