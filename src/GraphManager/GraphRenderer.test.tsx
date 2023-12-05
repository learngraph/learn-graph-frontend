// @jest-environment jsdom
import {
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
  makeSetUnlessUndefined,
  SpecialNodes,
  nodePointerAreaPaint,
  onNodeDrag,
  NodeDragState,
  DRAG_snapOutDistanceSquared,
  DRAG_snapInDistanceSquared,
  onNodeDragEnd,
} from "./GraphRenderer";
import "@testing-library/jest-dom";
import { Backend, GraphState } from "./GraphEdit";
import { ForceGraphLinkObject } from "./types";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

describe("onLinkClickFn", () => {
  it("should call openVoteDialog with link info", () => {
    const props = {
      openVoteDialog: jest.fn(),
      selectedGraphDataset: { dataSetName: "", data: { nodes: [], links: [] } },
    };
    const onLinkClick = onLinkClickFn(props.openVoteDialog);
    const link = {
      source: { id: "A", description: "okA" },
      target: { id: "B", description: "okB" },
      value: 1337,
      id: "C",
    };
    onLinkClick(link);
    expect(props.openVoteDialog.mock.calls.length).toEqual(1);
    expect(props.openVoteDialog.mock.calls[0][0]).toEqual({
      linkID: link.id,
      sourceNode: link.source,
      targetNode: link.target,
      weight: link.value,
    });
  });
});

const makeCanvasRenderingContext2D = () => {
  let fillRectCalls: any = [];
  // @ts-ignore
  let ctx: CanvasRenderingContext2D = {
    fillStyle: "",
    fillRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn().mockReturnValue({ width: 100 }),
    textAlign: "center",
    textBaseline: "alphabetic",
    font: "",
  };
  const fillRect = jest.fn((args) => {
    fillRectCalls.push({ args: args, fillStyle: ctx.fillStyle });
  });
  ctx.fillRect = fillRect;
  return { ctx, fillRectCalls: fillRectCalls };
};
describe("nodeCanvasObject", () => {
  const node = {
    id: "A",
    description: "B",
    x: 5,
    y: 6,
  };
  it("[SNAPSHOT test] should have reasonable font size and background dimensions", () => {
    const { ctx, fillRectCalls } = makeCanvasRenderingContext2D();
    const scale = 1;
    const special: SpecialNodes = { hoveredNode: null };
    nodeCanvasObject(node, ctx, scale, new Set(), special);
    expect(ctx.font).toEqual("22px Sans-Serif");
    expect(ctx.textAlign).toEqual("center");
    expect(ctx.textBaseline).toEqual("middle");
    expect(ctx.fillStyle).toEqual("#000");
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(
      -47.2,
      -7.199999999999999,
      104.4,
      26.4,
    );
    expect(fillRectCalls[0].fillStyle).toEqual("rgba(190, 190, 190, 0.8)");
    expect(ctx.fillText).toHaveBeenCalledTimes(1);
    expect(ctx.fillText).toHaveBeenCalledWith("B", 5, 6);
  });
  it("should highlight SpecialNodes: hoveredNode", () => {
    const { ctx, fillRectCalls } = makeCanvasRenderingContext2D();
    const scale = 1;
    const special: SpecialNodes = { hoveredNode: node };
    nodeCanvasObject(node, ctx, scale, new Set(), special);
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(fillRectCalls[0].fillStyle).toEqual(`hsl(30,100%,50%)`);
  });
});

describe("nodePointerAreaPaint", () => {
  it("should create exactly the same sized object as nodeCanvasObject", () => {
    const { ctx } = makeCanvasRenderingContext2D();
    const scale = 1;
    const node = { id: "1", description: "one", x: 5, y: 6 };
    nodePointerAreaPaint(node, `color123`, ctx, scale);
    expect(ctx.fillRect).toHaveBeenCalledTimes(1);
    expect(ctx.fillRect).toHaveBeenCalledWith(
      -47.2,
      -7.199999999999999,
      104.4,
      26.4,
    );
  });
});

describe("makeKeydownListener", () => {
  it("should call nothing on key 'a'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(undefined);
    let event = { key: "a" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(0);
  });
});

describe("setUnlessUndefined", () => {
  it("should set the graph, only if it's non-null/undefined", () => {
    let setter = jest.fn();
    // @ts-ignore
    makeSetUnlessUndefined({}, setter)();
    expect(setter.mock.calls.length).toBe(0);
    makeSetUnlessUndefined({ graph: { nodes: [], links: [] } }, setter)();
    expect(setter.mock.calls.length).toBe(1);
    expect(setter.mock.calls[0][0]).toEqual({ nodes: [], links: [] });
  });
});

const makeGraphState = () => {
  const g: GraphState = {
    current: { nodes: [], links: [] },
    setGraph: jest.fn(),
    addLink: jest.fn(),
    removeLink: jest.fn(),
    addNode: jest.fn(),
  };
  return g;
};
describe("onNodeDrag", () => {
  const makeNodes = () => {
    const node_1 = { id: "1", x: 0, y: 0, description: "1" };
    const node_2_far = {
      id: "2",
      x: Math.sqrt(DRAG_snapInDistanceSquared) + 1,
      y: 0,
      description: "2",
    };
    const node_3_close = {
      id: "3",
      x: Math.sqrt(DRAG_snapInDistanceSquared) - 1,
      y: 0,
      description: "3",
    };
    return { node_1, node_2_far, node_3_close };
  };
  it("should add currently dragged node to NodeDragState, and do nothing else if no other node in range", () => {
    const { node_1, node_2_far } = makeNodes();
    const graph = makeGraphState();
    graph.current.nodes = [node_1, node_2_far];
    const drag: NodeDragState = {};
    onNodeDrag({ graph, nodeDrag: drag }, node_1, { x: 0, y: 0 });
    expect(drag).toEqual({ dragSourceNode: node_1 });
  });
  it("should add interimLink for in-range node and remove for out-of-range node", () => {
    const graph = makeGraphState();
    const { node_1, node_3_close } = makeNodes();
    graph.current.nodes = [node_1, node_3_close];
    const drag: NodeDragState = { dragSourceNode: node_1 };
    onNodeDrag({ graph, nodeDrag: drag }, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: "interim_1",
      source: node_1,
      target: node_3_close,
      value: 10,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(drag).toEqual(expDrag);
    expect(graph.addLink).toHaveBeenCalledTimes(1);
    expect(graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    graph.current.nodes[1].x = Math.sqrt(DRAG_snapOutDistanceSquared) + 1;
    onNodeDrag({ graph, nodeDrag: drag }, node_1, { x: 0, y: 0 });
    expect(graph.removeLink).toHaveBeenCalledTimes(1);
    expect(graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(drag).toEqual({ dragSourceNode: node_1 });
  });
  it("should switch interim link if getting close to another node", () => {
    const graph = makeGraphState();
    const { node_1, node_2_far, node_3_close } = makeNodes();
    graph.current.nodes = [node_1, node_3_close, node_2_far];
    const drag: NodeDragState = { dragSourceNode: node_1 };
    onNodeDrag({ graph, nodeDrag: drag }, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: "interim_1",
      source: node_1,
      target: node_3_close,
      value: 10,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(drag).toEqual(expDrag);
    expect(graph.addLink).toHaveBeenCalledTimes(1);
    expect(graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    node_2_far.x = node_3_close.x - 1;
    onNodeDrag({ graph, nodeDrag: drag }, node_1, { x: 0, y: 0 });
    const interimLink2: ForceGraphLinkObject = {
      id: "interim_1",
      source: node_1,
      target: node_2_far,
      value: 10,
    };
    const expDrag2: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink2,
    };
    expect(drag).toEqual(expDrag2);
    expect(graph.removeLink).toHaveBeenCalledTimes(1);
    expect(graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(graph.addLink).toHaveBeenCalledTimes(2);
    expect(graph.addLink).toHaveBeenNthCalledWith(2, interimLink2);
  });
});

describe("onNodeDragEnd", () => {
  const makeBackend = () => {
    const b: Backend = {
      createNode: jest.fn(),
      createLink: jest.fn(),
    };
    return b;
  };
  it("shoud do nothing if no interimLink exists", () => {
    const graph = makeGraphState();
    const nodeDrag: NodeDragState = {};
    const backend = makeBackend();
    onNodeDragEnd(
      { backend, graph, nodeDrag },
      { id: "idk", description: "ok" },
      { x: 0, y: 0 },
    );
  });
  it("shoud clear NodeDragState", () => {
    //onNodeDragEnd()
  });
});
