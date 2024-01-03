// @jest-environment jsdom
import {
  nodeCanvasObject,
  makeKeydownListener,
  SpecialNodes,
  makeGraphState,
  convertBackendGraphToForceGraph,
} from "./GraphRenderer";
import "@testing-library/jest-dom";
import { makeMockController } from "./GraphEdit.testingutil";

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
    let keydown = makeKeydownListener(undefined);
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
