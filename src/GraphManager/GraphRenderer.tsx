import ForceGraph2D from "react-force-graph-2d";
import {
  MutableRefObject,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Box } from "@mui/material";

import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphLinkObject,
  ForceGraphRef,
  ForceGraphLinkObjectInitial,
  BackendGraphData,
} from "./types";
import { HasID, ZoomState } from "./Zoom";
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
} from "./GraphEdit";
import { GraphEditPopUp, GraphEditPopUpState } from "./GraphEditPopUp";
import { useCreateNode } from "./hooks/useCreateNode";
import { useCreateEdge } from "./hooks/useCreateEdge";
import { CreateButton } from "./GraphEditCreateButton";
import { useUserDataContext } from "src/UserDataContext";
import { useSubmitVote } from "./hooks/useSubmitVote";
import { useUpdateNode } from "./hooks/useUpdateNode";
import { useDeleteNode } from "./hooks/useDeleteNode";
import { useDeleteEdge } from "./hooks/useDeleteEdge";
import { ZoomControlPanel, makeZoomControl } from "./ZoomControlPanel";
//import { zoomStep } from "./Zoom";
//import { makeOnZoomAndPanListener } from "./ZoomForceGraphIntegration";

interface GraphRendererProps {
  graphDataRef: MutableRefObject<ForceGraphGraphData | null>;
  forceGraphRef: ForceGraphRef;
  highlightNodes: Set<HasID>;
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

// utility functions
const drawTextBackgroundOval = (
  text: TextRender,
  ctx: CanvasRenderingContext2D,
  position: Partial<Position>,
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
  ctx.lineWidth = 0.5; // Adjust the width of the ring
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
) => {
  drawTextBackgroundOval(text, ctx, position);
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
const backgroundColorOrange = `hsl(30,100%,50%)`;
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
    return nodeCanvasObject(nodeForceGraph, ctx, globalScale, ctrl);
  };
};

export const nodeCanvasObject = (
  node: ForceGraphNodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  ctrl: Controller,
) => {
  const { highlightNodes, specialNodes } = ctrl;
  let label = node.description ?? "";
  let backgroundColor = backgroundColorLightBlue;
  const mergedNodes = node.mergeCount ?? 0;
  if (mergedNodes > 1) {
    // TODO(skep): use relative scaling to total number of nodes
    // TODO(j): should use react theme for color choice here
    let hue = ((1 - mergedNodes * 0.1) * 120).toString(10);
    backgroundColor = `hsl(${hue},100%,50%)`;
    label += ` [${mergedNodes}]`;
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
  drawTextWithBackground(
    { text: label, fontSize: config.fontSize / globalScale, backgroundColor },
    ctx,
    { x: node.x, y: node.y },
  );
};

export const nodePointerAreaPaint = (
  node: ForceGraphNodeObject,
  color: string,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  drawTextBackgroundOval(
    {
      text: node.description ?? "",
      fontSize: config.fontSize / globalScale,
      backgroundColor: color,
    },
    ctx,
    { x: node.x, y: node.y },
  );
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
  ctx.lineWidth = (link.value / 2) * (conf.extraThickness ?? 1);
  ctx.beginPath();
  ctx.moveTo(link.source.x!, link.source.y!);
  ctx.lineTo(link.target.x!, link.target.y!);
  ctx.stroke();
};

const onLinkHover = (_: ForceGraphLinkObject | null): void => {
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

const makeInitialGraphData = () => {
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
      node.description = newNode.description;
      setGraph(graph);
    },
    updateLink: (link: ForceGraphLinkObject, newLink: ForceGraphLinkObject) => {
      const linkInGraph = graph.links.find((l) => l.id === link.id);
      if (!linkInGraph) {
        return;
      }
      //Object.keys(linkInGraph).forEach((key) => {linkInGraph[key] = newLink[key];})
      linkInGraph.id = newLink.id;
      linkInGraph.note = newLink.note;
      linkInGraph.source = newLink.source;
      linkInGraph.target = newLink.target;
      linkInGraph.value = newLink.value;
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

export const GraphRenderer = (props: GraphRendererProps) => {
  const [graph, setGraph] = useState<ForceGraphGraphData>(
    makeInitialGraphData(),
  );
  props.graphDataRef.current = graph;
  const { language } = useUserDataContext();
  const { data, queryResponse } = useGraphData();
  useEffect(() => {
    const graph = convertBackendGraphToForceGraph(data);
    if (!graph) {
      return;
    }
    setGraph(graph);
  }, [queryResponse.loading, data]);
  useEffect(() => {
    const keyDownListener = makeKeydownListener(props.forceGraphRef);
    document.addEventListener("keydown", keyDownListener);
    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });
  useEffect(() => {
    const rightClickAction = (event: any) => event.preventDefault();
    document.addEventListener("contextmenu", rightClickAction);
    return () => {
      document.removeEventListener("contextmenu", rightClickAction);
    };
  });
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
  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);
  const { createNode } = useCreateNode();
  const { createEdge } = useCreateEdge();
  const { submitVote } = useSubmitVote();
  const { updateNode } = useUpdateNode();
  const { deleteNode } = useDeleteNode();
  const { deleteEdge } = useDeleteEdge();
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
  const controller: Controller = {
    backend: {
      createNode,
      updateNode,
      createLink: createEdge,
      submitVote,
      deleteNode,
      deleteLink: deleteEdge,
    },
    popUp: {
      state: editPopUpState,
      setState: setEditPopUpState,
    },
    graph: makeGraphState(graph, setGraph),
    forceGraphRef: props.forceGraphRef,
    nodeDrag: {
      state: nodeDrag,
      setState: setNodeDrag,
    },
    language,
    highlightNodes: props.highlightNodes,
    specialNodes: {},
    keys: { shiftHeld },
    zoom: {
      zoomLevel,
      setZoomLevel,
      zoomStepStack,
      setZoomStepStack,
      zoomState,
      setZoomState,
    },
  };
  const onBackgroundClick = makeOnBackgroundClick(controller);
  const onNodeHover = (
    node: ForceGraphNodeObject | null,
    _ /*prevNode*/ : ForceGraphNodeObject | null,
  ) => {
    controller.specialNodes.hoveredNode = node;
  };
  // FIXME(umb): It looks like it should remove the empty space below the
  // canvas. Unfortuantely this code does nothing when the window is resized.
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [availableSpace, setAvailableSpace] = useState({
    height: 400,
    width: 600,
  });
  useLayoutEffect(() => {
    const containerElement = wrapperRef.current;
    if (containerElement) {
      const rect = containerElement.getBoundingClientRect();
      setAvailableSpace({
        width: rect.width,
        height: rect.height,
      });
    }
  }, []);
  return (
    <Box
      id="canvasWrapper"
      ref={wrapperRef}
      sx={{ height: "100%", width: "100%" }}
    >
      <ForceGraph2D
        height={availableSpace.height}
        width={availableSpace.width}
        ref={props.forceGraphRef}
        graphData={graph}
        nodeCanvasObject={makeNodeCanvasObject(controller)}
        nodePointerAreaPaint={nodePointerAreaPaint}
        onNodeClick={makeOnNodeClick(controller)}
        onNodeHover={onNodeHover}
        onNodeDrag={makeOnNodeDrag(controller)}
        onNodeDragEnd={makeOnNodeDragEnd(controller)}
        // links:
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
        //onZoom={makeOnZoomAndPanListener(props.forceGraphRef, zoomStep, graph)}
        onBackgroundClick={onBackgroundClick}
      />
      <GraphEditPopUp ctrl={controller} />
      <CreateButton ctrl={controller} />
      <ZoomControlPanel zoomControl={makeZoomControl(controller)} />
    </Box>
  );
};
