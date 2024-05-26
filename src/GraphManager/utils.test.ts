// @jest-environment jsdom
import {
  SpecialNodes,
  GraphSizeConfig,
  nodeCanvasObject,
  makeGraphState,
  convertBackendGraphToForceGraph,
  onGraphUpdate,
  setGraphSize,
  nodePointerAreaPaint,
  linkPointerAreaPaint,
  makeOnNodeHover,
} from "./utils";
import "@testing-library/jest-dom";
import { makeMockController } from "./GraphEdit/GraphEdit.testingutil";

const makeCanvasRenderingContext2D = () => {
  const fillRectCalls: any = [];
  const arcCalls: any = [];
  // @ts-ignore
  const ctx: CanvasRenderingContext2D = {
    fillStyle: "",
    fillRect: jest.fn(),
    fillText: jest.fn(),
    measureText: jest.fn().mockReturnValue({ width: 100 }),
    textAlign: "center",
    textBaseline: "alphabetic",
    font: "",
    save: jest.fn(),
    restore: jest.fn(),
    translate: jest.fn(),
    scale: jest.fn(),
    beginPath: jest.fn(),
    closePath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    stroke: jest.fn(),
    bezierCurveTo: jest.fn(),
    rotate: jest.fn(),
    moveTo: jest.fn(),
    lineTo: jest.fn(),
  };
  ctx.fillRect = jest.fn((args) => {
    fillRectCalls.push({ args, fillStyle: ctx.fillStyle });
  });
  ctx.arc = jest.fn((args) => {
    arcCalls.push({ args, fillStyle: ctx.fillStyle });
  });
  return { ctx, fillRectCalls, arcCalls };
};
describe("nodeCanvasObject", () => {
  const node = {
    id: "A",
    description: "B",
    x: 5,
    y: 6,
  };
  it("should highlight SpecialNodes: hoveredNode", () => {
    const { ctx, arcCalls } = makeCanvasRenderingContext2D();
    const scale = 1;
    const special: SpecialNodes = { hoveredNode: node };
    const ctrl = makeMockController();
    ctrl.specialNodes = special;
    // @ts-ignore
    nodeCanvasObject(node, ctx, scale, ctrl);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(arcCalls[0].fillStyle).toEqual(`hsl(30,100%,50%)`);
  });
  it("should highlight SpecialNodes: 1-link away from hoveredNode: source", () => {
    const { ctx, arcCalls } = makeCanvasRenderingContext2D();
    const scale = 1;
    const special: SpecialNodes = {
      oneLinkAwayFromHoveredNode: { source: [node], target: [] },
    };
    const ctrl = makeMockController();
    ctrl.specialNodes = special;
    // @ts-ignore
    nodeCanvasObject(node, ctx, scale, ctrl);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(arcCalls[0].fillStyle).toEqual(`hsl(40,100%,30%)`);
  });
  it("should highlight SpecialNodes: 1-link away from hoveredNode: target", () => {
    const { ctx, arcCalls } = makeCanvasRenderingContext2D();
    const scale = 1;
    const special: SpecialNodes = {
      oneLinkAwayFromHoveredNode: { source: [], target: [node] },
    };
    const ctrl = makeMockController();
    ctrl.specialNodes = special;
    // @ts-ignore
    nodeCanvasObject(node, ctx, scale, ctrl);
    expect(ctx.arc).toHaveBeenCalledTimes(1);
    expect(arcCalls[0].fillStyle).toEqual(`hsl(100,100%,10%)`);
  });
});

describe("makeGraphState", () => {
  describe("removeLink", () => {
    it("should remove that link", () => {
      const [node1, node2] = [
        { id: "1", description: "1" },
        { id: "2", description: "2" },
      ];
      const link = { id: "1", source: node1, target: node2, value: 10 };
      const state = makeGraphState(
        { nodes: [node1, node2], links: [link] },
        jest.fn(),
      );
      state.removeLink(link);
      expect(state.setGraph).toHaveBeenCalledTimes(1);
      expect(state.setGraph).toHaveBeenNthCalledWith(1, {
        nodes: [node1, node2],
        links: [],
      });
    });
    it("should preserve other links", () => {
      const [node1, node2, node3] = [
        { id: "1", description: "1" },
        { id: "2", description: "2" },
        { id: "3", description: "3" },
      ];
      const link12 = { id: "1", source: node1, target: node2, value: 10 };
      const link13 = { id: "2", source: node1, target: node3, value: 10 };
      const link32 = { id: "3", source: node3, target: node2, value: 10 };
      const state = makeGraphState(
        { nodes: [node1, node2, node3], links: [link12, link13, link32] },
        jest.fn(),
      );
      state.removeLink(link13);
      expect(state.setGraph).toHaveBeenCalledTimes(1);
      expect(state.setGraph).toHaveBeenNthCalledWith(1, {
        nodes: [node1, node2, node3],
        links: [link12, link32],
      });
    });
    it("should do nothing, when link is not found", () => {
      const [node1, node2, node3] = [
        { id: "1", description: "1" },
        { id: "2", description: "2" },
        { id: "3", description: "3" },
      ];
      const link12 = { id: "1", source: node1, target: node2, value: 10 };
      const link13 = { id: "2", source: node1, target: node3, value: 10 };
      const link32 = { id: "3", source: node3, target: node2, value: 10 };
      const state = makeGraphState(
        { nodes: [node1, node2, node3], links: [link12, link13, link32] },
        jest.fn(),
      );
      state.removeLink({ id: "4", source: node3, target: node1, value: 10 });
      expect(state.setGraph).toHaveBeenCalledTimes(0);
    });
  });
  describe("updateLink", () => {
    it("should update the link", () => {
      const [node1, node2, node3] = [
        { id: "1", description: "1" },
        { id: "2", description: "2" },
        { id: "3", description: "3" },
      ];
      const link = { id: "1", source: node1, target: node2, value: 10 };
      const newLink = { id: "1", source: node1, target: node2, value: 5 };
      const state = makeGraphState(
        { nodes: [node1, node2, node3], links: [link] },
        jest.fn(),
      );
      state.updateLink(link, newLink);
      expect(state.setGraph).toHaveBeenCalledTimes(1);
      expect(state.setGraph).toHaveBeenNthCalledWith(1, {
        nodes: [node1, node2, node3],
        links: [newLink],
      });
    });
  });
  describe("updateNode", () => {
    it("should update the node with all of the newNode's properties", () => {
      const node1 = { id: "1", description: "1" };
      const state = makeGraphState({ nodes: [node1], links: [] }, jest.fn());
      state.updateNode(node1, { id: "1", description: "AA", resources: "BB" });
      expect(state.setGraph).toHaveBeenCalledTimes(1);
      expect(state.setGraph).toHaveBeenNthCalledWith(1, {
        nodes: [{ id: "1", description: "AA", resources: "BB" }],
        links: [],
      });
    });
  });
});

describe("convertBackendGraphToForceGraph", () => {
  it("should return null if anything is undefined", () => {
    // @ts-ignore: it can happen
    expect(convertBackendGraphToForceGraph(undefined)).toBe(null);
    // @ts-ignore: it can happen
    expect(convertBackendGraphToForceGraph({})).toBe(null);
  });
  it("should coalece null fields with empty arrays for nodes/links", () => {
    expect(
      // @ts-ignore: it can happen
      convertBackendGraphToForceGraph({ graph: { nodes: null, links: null } }),
    ).toEqual({ nodes: [], links: [] });
    expect(
      convertBackendGraphToForceGraph({
        // @ts-ignore: it can happen
        graph: { nodes: undefined, links: undefined },
      }),
    ).toEqual({ nodes: [], links: [] });
  });
});

describe("setGraphSize", () => {
  let conf: GraphSizeConfig;
  beforeEach(() => {
    conf = {
      // @ts-ignore
      wrapperRef: { current: { getBoundingClientRect: jest.fn() } },
      setAvailableSpace: jest.fn(),
    };
  });
  it("should do nothing when wrapperRef is undefined", () => {
    // @ts-ignore
    conf.wrapperRef.current = null;
    setGraphSize(conf);
    expect(conf.setAvailableSpace).not.toHaveBeenCalled();
  });
  it("should set space to getBoundingClientRect", () => {
    const rectangle = { width: 1, height: 2 };
    // @ts-ignore
    conf.wrapperRef.current?.getBoundingClientRect.mockReturnValue(rectangle);
    setGraphSize(conf);
    expect(conf.setAvailableSpace).toHaveBeenCalledTimes(1);
    expect(conf.setAvailableSpace).toHaveBeenNthCalledWith(1, rectangle);
  });
});

describe("nodePointerAreaPaint", () => {
  it("should draw colour in edit mode", () => {
    const { ctx } = makeCanvasRenderingContext2D();
    nodePointerAreaPaint(
      { id: "1", description: "1", x: 1, y: 1 },
      "",
      // @ts-ignore
      ctx,
      1,
      true,
    );
    expect(ctx.fill).toHaveBeenCalledTimes(1);
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
  });
  it("should not draw colour in view mode", () => {
    const { ctx } = makeCanvasRenderingContext2D();
    nodePointerAreaPaint(
      { id: "1", description: "1", x: 1, y: 1 },
      "",
      // @ts-ignore
      ctx,
      1,
      false,
    );
    expect(ctx.fill).not.toHaveBeenCalled();
    expect(ctx.stroke).not.toHaveBeenCalled();
  });
});

describe("linkPointerAreaPaint", () => {
  it("should draw in edit mode", () => {
    const { ctx } = makeCanvasRenderingContext2D();
    const ctrl = makeMockController();
    ctrl.mode.allowGraphInteractions = true;
    linkPointerAreaPaint(
      // @ts-ignore
      ctrl,
      { id: "1", source: { x: 1, y: 1 }, target: { x: 2, y: 2 } },
      "",
      ctx,
      1,
    );
    expect(ctx.stroke).toHaveBeenCalledTimes(1);
    expect(ctx.bezierCurveTo).toHaveBeenCalledTimes(1);
    expect(ctx.fill).toHaveBeenCalledTimes(1);
  });
  it("should not draw when not in edit mode", () => {
    const { ctx } = makeCanvasRenderingContext2D();
    const ctrl = makeMockController();
    ctrl.mode.isEditingEnabled = false;
    linkPointerAreaPaint(
      // @ts-ignore
      ctrl,
      { id: "1", source: { x: 1, y: 1 }, target: { x: 2, y: 2 } },
      "",
      ctx,
      1,
    );
    expect(ctx.stroke).not.toHaveBeenCalled();
  });
});

describe("makeOnNodeHover", () => {
  it("should add hovered node", () => {
    const ctrl = makeMockController();
    const node = { id: "1" };
    // @ts-ignore
    const onNodeHover = makeOnNodeHover(ctrl);
    // @ts-ignore
    onNodeHover(node, null);
    expect(ctrl.specialNodes.hoveredNode).toEqual(node);
  });
  it("should add secondary nodes to the hovered nodes to ctrl.specialNodes", () => {
    const ctrl = makeMockController();
    const nodes = [{ id: "1" }, { id: "2" }, { id: "3" }];
    const links = [
      { source: nodes[0], target: nodes[1] },
      { source: nodes[2], target: nodes[0] },
    ];
    // @ts-ignore
    ctrl.graph.current.nodes = nodes;
    // @ts-ignore
    ctrl.graph.current.links = links;
    // @ts-ignore
    const onNodeHover = makeOnNodeHover(ctrl);
    // @ts-ignore
    onNodeHover(nodes[0], null);
    expect(ctrl.specialNodes.oneLinkAwayFromHoveredNode).toEqual({
      source: [nodes[1]],
      target: [nodes[2]],
    });
    // should clear all nodes when hovering ends
    onNodeHover(null, null);
    expect(ctrl.specialNodes.oneLinkAwayFromHoveredNode).toEqual({
      source: [],
      target: [],
    });
  });
});


describe("onGraphUpdate", () => {
  it("should update the graph data", () => {
    const ctrl = makeMockController();
    const graphData = { nodes: [], links: [] };
    const setGraph = jest.fn();
    // @ts-ignore
    onGraphUpdate( ctrl, { graph: graphData }, setGraph);
    expect(ctrl.graph.current).toEqual(graphData);
    expect(setGraph).toHaveBeenCalledWith(makeGraphState(graphData, jest.fn()));
  });
});
