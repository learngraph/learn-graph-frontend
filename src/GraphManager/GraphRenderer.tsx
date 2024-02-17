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
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphLinkObject,
  BackendGraphData,
  LocalForceGraphMethods,
} from "./types";
import { ZoomState } from "./Zoom";
import { useGraphData } from "./hooks";
import {
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
import { useUserDataContext } from "@src/UserDataContext";
import {
  ZoomControlPanel,
  makeZoomControl,
  makeOnZoomAndPanListener,
  debounce,
} from "./ZoomControlPanel";
import { ControllerRef } from "./GraphManager";
import { SearchResultPopUp } from "./SearchResultPopUp";
import {
  G_CONFIG,
  Rectangle,
  convertBackendGraphToForceGraph,
  initialZoomForLargeGraph,
  linkCanvasObject,
  linkPointerAreaPaint,
  makeGraphState,
  makeInitialGraphData,
  makeKeydownListener,
  nodeCanvasObject,
  nodePointerAreaPaint,
  setGraphSize,
} from "./utils";

interface GraphRendererProps {
  controllerRef: ControllerRef;
}

// node render & interaction

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

const makeLinkPointerAreaPaint = (ctrl: Controller) => {
  return (
    link: ForceGraphLinkObject,
    invisibleTouchPaint: string,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => linkPointerAreaPaint(ctrl, link, invisibleTouchPaint, ctx, globalScale);
};

const onLinkHover = (_: ForceGraphLinkObject | null): void => {
  //console.log("linkHov", params);
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
  }, [graph]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [availableSpace, setAvailableSpace] = useState<Rectangle>({
    height: 400,
    width: 600,
  });
  const graphSizeConfig = { wrapperRef, setAvailableSpace };
  useLayoutEffect(() => {
    setGraphSize(graphSizeConfig);
  }, [controller.search.highlightNodes]);
  useEffect(() => {
    const handleResize = () => {
      setGraphSize(graphSizeConfig);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
            linkDirectionalArrowLength={G_CONFIG.linkDirectionalArrowLength}
            linkDirectionalArrowRelPos={G_CONFIG.linkDirectionalArrowRelPos}
            // XXX: linkCanvasObjectMode should just be a string, but due to a bug in
            // force-graph it must be passed as function, otherwise linkCanvasObject
            // is never called. -> remove after force-graph module update
            // @ts-ignore
            linkCanvasObjectMode={() => G_CONFIG.linkCanvasObjectMode}
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
