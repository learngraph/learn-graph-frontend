import ForceGraph2D, {
  ForceGraphMethods,
  LinkObject,
  NodeObject,
} from "react-force-graph-2d";
import { LinkType, NodeType, GraphData } from "./types";
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
import { GraphState, Backend, makeOnBackgroundClick } from "./GraphEdit";
import { GraphEditPopUp, PopUpControls } from "./GraphEditPopUp";
import { useCreateNode } from "./hooks/useCreateNode";

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

export interface GraphDataForceGraph {
  nodes: Node[];
  links: LinkBetweenNode[];
}

interface GraphRendererProps {
  graphDataRef: MutableRefObject<GraphDataForceGraph | null>;
  openVoteDialog: VoteDialogFn;
  highlightNodes: Set<Node>;
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

const makeNodeCanvasObject = (highlightNodes: Set<Node>) => {
  return (
    nodeForceGraph: NodeObject,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => {
    return nodeCanvasObject(nodeForceGraph, ctx, globalScale, highlightNodes);
  };
};

export const nodeCanvasObject = (
  nodeForceGraph: NodeObject,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  highlightNodes: Set<Node>
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
  if (highlightNodes.has(node)) {
    backgroundColor = `hsl(1,100%,50%)`;
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

export const onLinkClickFn = (openVoteDialog: VoteDialogFn) => {
  return (params: LinkObject) => {
    // @ts-ignore: see LinkBetweenObjects and Link type
    let link: LinkBetweenNode & LinkType = params;
    openVoteDialog({
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

export type ForceGraphRef = MutableRefObject<ForceGraphMethods | undefined>;

export const makeSetUnlessUndefined = (
  data: { graph: GraphData },
  setGraph: Dispatch<SetStateAction<GraphDataForceGraph>>
) => {
  return () => {
    if (
      data === null ||
      data === undefined ||
      data.graph === null ||
      data.graph === undefined
    ) {
      return;
    }
    //const graphData: GraphDataForceGraph = transformToRenderedType( graph, language); // XXX: isn't this necessary?
    // @ts-ignore
    setGraph(JSON.parse(JSON.stringify(data.graph)));
  };
};

export const GraphRenderer = (props: GraphRendererProps) => {
  //const { language } = useUserDataContext();
  const [n_graph, n_is, n_loading] = [
    { id: "1", description: "graph" },
    { id: "2", description: "is" },
    { id: "2", description: "loading" },
  ];
  const [graph, setGraph] = useState<GraphDataForceGraph>({
    nodes: [n_graph, n_is, n_loading],
    links: [
      { id: "1", source: n_graph, target: n_is, value: 5 },
      { id: "2", source: n_is, target: n_loading, value: 5 },
    ],
  });
  const { data, queryResponse } = useGraphData();
  // linter-disable: react-hooks/exhaustive-deps
  useEffect(makeSetUnlessUndefined(data, setGraph), [
    queryResponse.loading,
    data,
  ]);
  //props.graphDataRef.current = graph;
  const onLinkClick = onLinkClickFn(props.openVoteDialog);
  const forceGraphRef: ForceGraphRef = useRef<ForceGraphMethods>();
  document.addEventListener("keydown", makeKeydownListener(forceGraphRef)); // TODO: make it react-isch? not sure where to put it
  let graphState: GraphState = {
    current: graph,
    setGraph,
    addLink: (link: LinkBetweenNode) => {
      setGraph({ nodes: graph.nodes, links: [...graph.links, link] });
    },
    addNode: (node: Node) => {
      setGraph({ nodes: [...graph.nodes, node], links: graph.links });
    },
  };
  const { createNode } = useCreateNode();
  const backend: Backend = {
    createNode,
  };
  const [editPopUpState, setEditPopUpState] = useState({
    isOpen: false,
    title: "",
    details: "",
  });
  const popUpCtrl: PopUpControls = {
    state: editPopUpState,
    setState: setEditPopUpState,
  };
  const onBackgroundClick = makeOnBackgroundClick(
    graphState,
    forceGraphRef,
    popUpCtrl,
    backend
  );
  // FIXME(umb): It looks like it should remove the empty space below the
  // canvas. Unfortuantely this code does nothing.
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
        ref={forceGraphRef}
        // Note: all data must be copied, since force graph changes Link "source"
        // and "target" fields to directly contain the referred node objects
        // nodes:
        graphData={graph}
        nodeAutoColorBy={"group"}
        onNodeClick={onNodeClick}
        nodeCanvasObject={makeNodeCanvasObject(props.highlightNodes)}
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
        onZoom={makeOnZoomAndPanListener(forceGraphRef, zoomStep, graph)}
        onBackgroundClick={onBackgroundClick}
      />
      <GraphEditPopUp ctrl={popUpCtrl} />
    </Box>
  );
};
