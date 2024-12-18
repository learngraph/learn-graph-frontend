import ForceGraph2D from "react-force-graph-2d";
import ForceGraph3D from "react-force-graph-3d";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";

import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphLinkObject,
  LocalForceGraphMethods,
} from "./types";
import { ZoomState } from "./Zoom";
import { useGraphData } from "./RPCHooks";
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
import { NoTouchButton } from "./GraphEdit/NoTouchButton";
import { UserSettings } from "./GraphEdit/UserSettings";
import { useCreateNode } from "./RPCHooks/useCreateNode";
import { useCreateEdge } from "./RPCHooks/useCreateEdge";
import { useSubmitVote } from "./RPCHooks/useSubmitVote";
import { useUpdateNode } from "./RPCHooks/useUpdateNode";
import { useDeleteNode } from "./RPCHooks/useDeleteNode";
import { useDeleteEdge } from "./RPCHooks/useDeleteEdge";
import { useUserDataContext } from "@src/Context/UserDataContext";
import {
  //ZoomControlPanel,
  makeZoomControl,
  makeOnZoomAndPanListener,
} from "./ZoomControlPanel";
import { ControllerRef } from "./GraphManager";
import { SearchResultPopUp } from "./SearchResultPopUp";
import {
  G_CONFIG,
  Rectangle,
  linkCanvasObject,
  linkPointerAreaPaint,
  makeGraphState,
  makeInitialGraphData,
  makeKeydownListener,
  nodeCanvas3dObject,
  nodeCanvasObject,
  nodePointerAreaPaint,
  setGraphSize,
  makeOnNodeHover,
  onGraphUpdate,
} from "./utils";
import { DeletePlaygroundGraphButton } from "./GraphEdit/DeletePlaygroundGraphButton";

interface GraphRendererProps {
  controllerRef: ControllerRef;
  isPlayground: boolean;
}

// node render & interaction

const makeNodeCanvasObject = (ctrl: Controller) => {
  return (
    node: ForceGraphNodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    return nodeCanvasObject(
      node,
      ctx,
      globalScale,
      ctrl,
      ctrl.graph.current.nodes.length,
    );
  };
};

const makeNodeThreeObject = (ctrl: Controller) => {
  return (node: ForceGraphNodeObject) => {
    return nodeCanvas3dObject(node, ctrl.graph.current.nodes.length);
  };
};

const makeNodePointerAreaPaint = (ctrl: Controller) => {
  return (
    node: ForceGraphNodeObject,
    color: string,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    nodePointerAreaPaint(
      node,
      color,
      ctx,
      globalScale,
      ctrl.mode.allowGraphInteractions,
    );
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

const PLAYGROUND_LOCAL_STORAGE_KEY = "playgroundGraph";
let playgroundNodeIDCounter = 0;
let playgroundEdgeIDCounter = 0;
const nextPlaygroundNodeID = () => {
  playgroundNodeIDCounter += 1;
  return playgroundNodeIDCounter.toString();
};
const nextPlaygroundEdgeID = () => {
  playgroundEdgeIDCounter += 1;
  return playgroundEdgeIDCounter.toString();
};

export const GraphRenderer = (props: GraphRendererProps) => {
  const [graph, setGraph] = useState<ForceGraphGraphData>(
    makeInitialGraphData(),
  );
  const { language, theme } = useUserDataContext();
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
  let backend: Backend;
  if (!props.isPlayground) {
    const { createNode } = useCreateNode();
    const { createEdge } = useCreateEdge();
    const { submitVote } = useSubmitVote();
    const { updateNode } = useUpdateNode();
    const { deleteNode } = useDeleteNode();
    const { deleteEdge } = useDeleteEdge();
    backend = {
      createNode,
      updateNode,
      createLink: createEdge,
      submitVote,
      deleteNode,
      deleteLink: deleteEdge,
    };
  } else {
    backend = {
      createNode: () => {
        return Promise.resolve({
          data: { createNode: { ID: nextPlaygroundNodeID() } },
        });
      },
      updateNode: () => {
        return Promise.resolve({});
      },
      createLink: () => {
        return Promise.resolve({
          data: { createEdge: { ID: nextPlaygroundEdgeID() } },
        });
      },
      submitVote: () => {
        return Promise.resolve({});
      },
      deleteNode: () => {
        return Promise.resolve({});
      },
      deleteLink: () => {
        return Promise.resolve({});
      },
    };
  }
  const [cooldownTicks, setCooldownTicks] = useState(
    FG_ENGINE_COOLDOWN_TICKS_DEFAULT,
  );
  const [isResultShown, setIsResultShown] = useState<boolean>(false);
  const [highlightNodes, setHighlightNodes] = useState<
    Set<ForceGraphNodeObject>
  >(new Set());

  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const [allowGraphInteractions, setAllowGraphInteractions] = useState(true);
  const [use3D, setUse3D] = useState<boolean>(false);
  const controller: Controller = {
    backend,
    popUp: {
      state: editPopUpState,
      setState: setEditPopUpState,
    },
    graph: makeGraphState(graph, setGraph),
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
    mode: {
      isEditingEnabled,
      setIsEditingEnabled,
      allowGraphInteractions,
      setAllowGraphInteractions,
      use3D,
      setUse3D,
    },
  };
  if (!props.isPlayground) {
    // load the real graph
    const { data: graphDataFromBackend, queryResponse: graphDataInfo } =
      useGraphData();
    useEffect(() => {
      if (graphDataInfo.error) {
        console.error(`graphDataInfo.error: ${graphDataInfo.error}`);
      }
    }, [graphDataInfo]);
    useEffect(() => {
      onGraphUpdate(controller, graphDataFromBackend, setGraph);
    }, [graphDataFromBackend]);
  }
  // FIXME(skep): if you add a link, and reload, the last link is not saved,
  // unless another node is added afterwards, or an INTERIM-link is created in
  // the meantime
  if (props.isPlayground) {
    // load local storage graph
    useEffect(() => {
      const savedGraph = localStorage.getItem(PLAYGROUND_LOCAL_STORAGE_KEY);
      if (savedGraph) {
        const localGraph = JSON.parse(savedGraph);
        const findMax = (max: number, current: number) =>
          current > max ? current : max;
        playgroundNodeIDCounter = localGraph.nodes
          .map((node: { id: string }) => parseInt(node.id, 10))
          .reduce(findMax, 0);
        playgroundEdgeIDCounter = localGraph.links
          .map((link: { id: string }) => parseInt(link.id, 10))
          .reduce(findMax, 0);
        setGraph(localGraph);
      } else {
        setGraph({ nodes: [], links: [] });
      }
    }, []);
    // save the graph to local storage onChange
    useEffect(() => {
      if (
        (controller.graph.current.nodes.length == 3 &&
          controller.graph.current.nodes.find(
            (node) => node.description === "loading",
          )) ||
        /*missing link means graph is not loaded yet*/
        controller.graph.current.links.find((link) => !link.source?.id)
      ) {
        return;
      }
      const { nodes, links } = controller.graph.current;
      localStorage.setItem(
        PLAYGROUND_LOCAL_STORAGE_KEY,
        JSON.stringify({
          nodes: nodes,
          // to save links we need the node id's not the objects!
          links: links
            .filter((link) => !link.id.includes("INTERIM"))
            .map((link) => ({
              id: link.id,
              source: link.source.id,
              target: link.target.id,
              value: link.value,
            })),
        }),
      );
    }, [controller.graph.current]);
  }
  const zoomControl = makeZoomControl(controller);
  controller.zoom.setUserZoomLevel = zoomControl.onZoomChange;
  props.controllerRef.current = controller;
  const onBackgroundClick = makeOnBackgroundClick(controller);
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
  const disableForcesFor2DGraphOnly = () => {
    if (controller.mode.use3D) {
      return;
    }
    controller.forceGraphRef.current?.d3Force(
      "link",
      Object.assign(() => {}, { id: () => {} }),
    );
    controller.forceGraphRef.current?.d3Force(
      "charge",
      Object.assign(() => {}, { id: () => {} }),
    );
    controller.forceGraphRef.current?.d3Force(
      "center",
      Object.assign(() => {}, { id: () => {} }),
    );
  };
  useEffect(disableForcesFor2DGraphOnly, [controller.forceGraphRef.current]);

  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouchPoints =
        "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0;
      const hasTouchEvent = "ontouchstart" in window;
      const matchMedia = window.matchMedia("(pointer: coarse)").matches;
      //setIsTouchDevice(hasTouchPoints || hasTouchEvent || matchMedia);
      const isTouchDevice = hasTouchPoints || hasTouchEvent || matchMedia;
      if (isTouchDevice) {
        controller.mode.setAllowGraphInteractions(false);
      }
    };

    checkTouchDevice();
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
          {controller.mode.use3D ? (
            <ForceGraph3D
              backgroundColor={theme === "dark" ? "black" : "white"}
              height={availableSpace.height}
              width={availableSpace.width}
              // @ts-ignore: either 2d or 3d forcegraph - should be ok
              ref={controller.forceGraphRef}
              graphData={graph}
              cooldownTicks={cooldownTicks}
              nodeThreeObject={makeNodeThreeObject(controller)}
              nodePointerAreaPaint={() => {}}
              linkPointerAreaPaint={() => {}}
              // XXX: linkCanvasObjectMode should just be a string, but due to a bug in
              // force-graph it must be passed as function, otherwise linkCanvasObject
              // is never called. -> remove after force-graph module update
              // @ts-ignore
              linkCanvasObjectMode={() => G_CONFIG.linkCanvasObjectMode}
              linkCanvasObject={makeLinkCanvasObject(controller)}
              linkDirectionalArrowLength={0}
              controlType="fly"
            />
          ) : (
            <ForceGraph2D
              backgroundColor={theme === "dark" ? "black" : "white"}
              height={availableSpace.height}
              width={availableSpace.width}
              ref={controller.forceGraphRef}
              graphData={graph}
              cooldownTicks={cooldownTicks}
              nodeCanvasObject={makeNodeCanvasObject(controller)}
              nodePointerAreaPaint={makeNodePointerAreaPaint(controller)}
              onNodeClick={makeOnNodeClick(controller)}
              onNodeHover={makeOnNodeHover(controller)}
              onNodeDrag={makeOnNodeDrag(controller)}
              onNodeDragEnd={makeOnNodeDragEnd(controller)}
              onLinkHover={onLinkHover}
              onLinkClick={makeOnLinkClick(controller)}
              linkDirectionalArrowLength={0}
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
          )}
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
        {props.isPlayground && (
          <DeletePlaygroundGraphButton ctrl={controller} />
        )}
        {/* TODO(skep): test this as UserInterfaceButtons */}
        <NoTouchButton ctrl={controller} />
        <UserSettings ctrl={controller} />
        <EditModeButton ctrl={controller} isPlayground={props.isPlayground} />
        {controller.mode.isEditingEnabled && <CreateButton ctrl={controller} />}
      </Box>
      {/*<ZoomControlPanel zoomControl={zoomControl} /> XXX(skep): disabled due to performance issue*/}
    </>
  );
};
