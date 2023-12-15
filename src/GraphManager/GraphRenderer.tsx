import ForceGraph2D from "react-force-graph-2d";
import {
  LinkType,
  NodeType,
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphLinkObject,
  ForceGraphRef,
} from "./types";
import { zoomStep, HasID } from "./Zoom";
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
import { VoteDialogFn } from "./components/VoteDialog";
import { useGraphData } from "./hooks";
import { makeOnZoomAndPanListener } from "./ZoomForceGraphIntegration";
import {
  GraphState,
  makeOnBackgroundClick,
  Controller,
  NodeDragState,
  makeOnNodeDrag,
  makeOnNodeDragEnd,
} from "./GraphEdit";
import { GraphEditPopUp, GraphEditPopUpState } from "./GraphEditPopUp";
import { useCreateNode } from "./hooks/useCreateNode";
import { useCreateEdge } from "./hooks/useCreateEdge";
import { CreateButton } from "./GraphEditCreateButton";

// TODO(skep): fundamental type issue here, we have 2-3 types in one:
//  1. `NodeType`: our node type, with added properties, that we use in
//     callbacks from ForceGraph2D
//  2. `NodeObject`: ForceGraph2D's node type
//  3. `HasID`: our Zoom functionality adds properties to the nodes to remember
//     the zoom state of nodes (e.g. node merges)
// Similarly we have a defined a LinkType != ForceGraph2D.LinkObject.
export type Link = LinkType & LinkObject;
export type Node = NodeType & NodeObject & HasID;

export interface LinkBetweenNode {
  id: string;
  source: Node;
  target: Node;
  value: number;
}

// TODO: remove these renames
type LinkObject = ForceGraphLinkObject;
type NodeObject = ForceGraphNodeObject;

interface GraphRendererProps {
  graphDataRef: MutableRefObject<ForceGraphGraphData | null>;
  forceGraphRef: ForceGraphRef;
  openVoteDialog: VoteDialogFn;
  highlightNodes: Set<Node>;
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
const drawTextBackgroundBox = (
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
  ctx.fillRect(
    x - bckgDimensions[0] / 2,
    y - bckgDimensions[1] / 2,
    bckgDimensions[0],
    bckgDimensions[1],
  );
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
  drawTextBackgroundBox(text, ctx, position);
  drawText(text, ctx, position);
};

const linkDescriptionPosition = (link: ForceGraphLinkObject) => {
  return Object.assign(
    // @ts-ignore
    ...["x", "y"].map((c) => ({
      [c]:
        // @ts-ignore
        link.source[c] +
        // @ts-ignore
        (link.target[c] - link.source[c]) *
          (config.linkDirectionalArrowRelPos - 0.1),
    })),
  );
};

// node render & interaction

// TODO(j): should use react theme for color choice here
const backgroundColorWhite = "rgba(255, 255, 255, 0.8)";
const backgroundColorGrey = "rgba(190, 190, 190, 0.8)";
const backgroundColorOrange = `hsl(30,100%,50%)`;

export interface SpecialNodes {
  hoveredNode?: ForceGraphNodeObject | undefined | null;
}

const makeNodeCanvasObject = (
  highlightNodes: Set<Node>,
  specialNodes: SpecialNodes,
) => {
  return (
    nodeForceGraph: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    return nodeCanvasObject(
      nodeForceGraph,
      ctx,
      globalScale,
      highlightNodes,
      specialNodes,
    );
  };
};

export const nodeCanvasObject = (
  node: ForceGraphNodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  highlightNodes: Set<Node>,
  specialNodes: SpecialNodes,
) => {
  let label = node.description ?? "";
  let backgroundColor = backgroundColorGrey;
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
  drawTextBackgroundBox(
    {
      text: node.description ?? "",
      fontSize: config.fontSize / globalScale,
      backgroundColor: color,
    },
    ctx,
    { x: node.x, y: node.y },
  );
};

const onNodeClick = (params: NodeObject): void => {
  console.log("clicked", params);
};

const makeLinkCanvasObject = (drag: NodeDragState) => {
  return (
    link: ForceGraphLinkObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number,
  ) => {
    return linkCanvasObject(drag, link, ctx, globalScale);
  };
};
// link render & interaction
export const linkCanvasObject = (
  drag: NodeDragState,
  link: ForceGraphLinkObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
) => {
  if (typeof link.source !== "object" || typeof link.target !== "object") {
    return;
  }
  const pos = linkDescriptionPosition(link);
  if (link === drag.interimLink) {
    // XXX(skep): remove again, should be visually appealing instead of text
    drawTextWithBackground(
      {
        text: String("TEMPORARY"),
        fontSize: config.fontSize / globalScale,
        backgroundColor: backgroundColorGrey,
      },
      ctx,
      pos,
    );
    return;
  }
  drawTextWithBackground(
    {
      text: String(link.value),
      fontSize: config.fontSize / globalScale,
      backgroundColor: backgroundColorWhite,
    },
    ctx,
    pos,
  );
};

export const onLinkClickFn = (openVoteDialog: VoteDialogFn) => {
  return (link: ForceGraphLinkObject) => {
    if (typeof link.source !== "object") {
      return;
    }
    if (typeof link.target !== "object") {
      return;
    }
    openVoteDialog({ link });
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

const makeInitialGraphData = () => {
  const n_graph: ForceGraphNodeObject = { id: "1", description: "graph" };
  const n_is: ForceGraphNodeObject = { id: "2", description: "is" };
  const n_loading: ForceGraphNodeObject = { id: "2", description: "loading" };
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
    removeLink: (toRemove: ForceGraphLinkObject) => {
      console.log(
        `[rm] link from ${toRemove.source.description} to ${toRemove.target.description}`,
      );
      graph.links.splice(
        graph.links.findIndex((link) => link.id === toRemove.id),
        1,
      );
      setGraph({ nodes: graph.nodes, links: graph.links });
    },
    addLink: (link: ForceGraphLinkObject) => {
      setGraph({ nodes: graph.nodes, links: [...graph.links, link] });
    },
    addNode: (node: ForceGraphNodeObject) => {
      setGraph({ nodes: [...graph.nodes, node], links: graph.links });
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
  //state.updateLink = (link: ForceGraphLinkObject, newLink: ForceGraphLinkObject) => {
  //  state.removeLink(link);
  //  state.addLink(newLink);
  //};
  return state;
};

export const GraphRenderer = (props: GraphRendererProps) => {
  const [graph, setGraph] = useState<ForceGraphGraphData>(
    makeInitialGraphData(),
  );
  props.graphDataRef.current = graph;
  const { data, queryResponse } = useGraphData();
  useEffect(() => {
    if (!data || !data.graph) {
      return;
    }
    // @ts-ignore
    setGraph(JSON.parse(JSON.stringify(data.graph)));
  }, [queryResponse.loading, data]);
  const onLinkClick = onLinkClickFn(props.openVoteDialog);
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
  const { createNode } = useCreateNode();
  const { createEdge } = useCreateEdge();
  const initPopUp: GraphEditPopUpState = {
    isOpen: false,
  };
  const [editPopUpState, setEditPopUpState] = useState(initPopUp);
  const [nodeDrag, setNodeDrag] = useState<NodeDragState>({});
  const controller: Controller = {
    backend: {
      createNode,
      createLink: createEdge,
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
  };
  const onBackgroundClick = makeOnBackgroundClick(controller);
  const specialNodes: SpecialNodes = {}; // TODO(skep): move this into the Controller
  const onNodeHover = (
    node: ForceGraphNodeObject | null,
    _ /*prevNode*/ : ForceGraphNodeObject | null,
  ) => {
    specialNodes.hoveredNode = node;
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
        nodeCanvasObject={makeNodeCanvasObject(
          props.highlightNodes,
          specialNodes,
        )}
        nodePointerAreaPaint={nodePointerAreaPaint}
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        onNodeDrag={makeOnNodeDrag(controller)}
        onNodeDragEnd={makeOnNodeDragEnd(controller)}
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
        linkCanvasObject={makeLinkCanvasObject(controller.nodeDrag.state)}
        // @ts-ignore: FIXME(skep): problem with graph-data type, to be debugged
        onZoom={makeOnZoomAndPanListener(props.forceGraphRef, zoomStep, graph)}
        onBackgroundClick={onBackgroundClick}
      />
      <GraphEditPopUp ctrl={controller} popUp={controller.popUp} />
      <CreateButton ctrl={controller} />
    </Box>
  );
};
