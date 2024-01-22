// @jest-environment jsdom
import {
  nodeCanvasObject,
  makeKeydownListener,
  SpecialNodes,
  makeGraphState,
  convertBackendGraphToForceGraph,
  initialZoomForLargeGraph,
  MAX_NODES_WITHOUT_INITIAL_ZOOM,
  makeInitialGraphData,
} from "./GraphRenderer";
import "@testing-library/jest-dom";
import { makeMockController } from "./GraphEdit.testingutil";
import { ForceGraphNodeObject } from "./types";
import { ZOOM_LEVEL_MAX, ZOOM_LEVEL_STEP } from "./ZoomControlPanel";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

const makeCanvasRenderingContext2D = () => {
  let fillRectCalls: any = [];
  let arcCalls: any = [];
  // @ts-ignore
  let ctx: CanvasRenderingContext2D = {
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
});

describe("makeKeydownListener", () => {
  it("should call nothing on key 'a'", () => {
    let zoom = jest.fn();
    const ctrl = makeMockController();
    // @ts-ignore
    let keydown = makeKeydownListener(ctrl);
    let event = { key: "a" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(0);
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
        { current: false },
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
        { current: false },
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
        { current: false },
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
        { current: false },
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
      const state = makeGraphState({ nodes: [node1], links: [] }, jest.fn(), {
        current: false,
      });
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

describe("initialZoomForLargeGraph", () => {
  const makeNodes = (n: number) => {
    let nodes: ForceGraphNodeObject[] = [];
    for (let i = 0; i <= n; i++) {
      nodes.push({ id: i.toString(), description: i.toString() });
    }
    return nodes;
  };
  it("should do nothing for graph with < MAX_NODES_WITHOUT_INITIAL_ZOOM", () => {
    const ctrl = makeMockController(); // empty graph
    // @ts-ignore
    initialZoomForLargeGraph(ctrl);
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
  it("should do nothing when no graph data was received yet", () => {
    const ctrl = makeMockController();
    ctrl.graph.current = {
      nodes: makeNodes(MAX_NODES_WITHOUT_INITIAL_ZOOM + 1),
      links: [],
    };
    ctrl.graph.performInitialZoom.current = false;
    // @ts-ignore
    initialZoomForLargeGraph(ctrl);
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
  it("should do nothing when the graph equals the initial 'is-loading-graph'", () => {
    const ctrl = makeMockController();
    ctrl.graph.current = makeInitialGraphData();
    // @ts-ignore
    initialZoomForLargeGraph(ctrl);
    expect(ctrl.zoom.setUserZoomLevel).not.toHaveBeenCalled();
  });
  it.each([
    [
      ZOOM_LEVEL_MAX - 1 * ZOOM_LEVEL_STEP,
      1 * MAX_NODES_WITHOUT_INITIAL_ZOOM + 1,
    ],
    [
      ZOOM_LEVEL_MAX - 2 * ZOOM_LEVEL_STEP,
      2 * MAX_NODES_WITHOUT_INITIAL_ZOOM + 1,
    ],
    [
      ZOOM_LEVEL_MAX - 2 * ZOOM_LEVEL_STEP,
      3 * MAX_NODES_WITHOUT_INITIAL_ZOOM + 1,
    ],
  ])(
    "should zoom out to level %p when given %p nodes",
    (zoomLevel: number, n_nodes: number) => {
      const ctrl = makeMockController();
      ctrl.graph.current = {
        nodes: makeNodes(n_nodes),
        links: [],
      };
      // @ts-ignore
      initialZoomForLargeGraph(ctrl);
      expect(ctrl.zoom.setUserZoomLevel).toHaveBeenCalledTimes(1);
      expect(ctrl.zoom.setUserZoomLevel).toHaveBeenNthCalledWith(1, zoomLevel);
    },
  );
});
