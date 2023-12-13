// @jest-environment jsdom
import {
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
  makeSetUnlessUndefined,
  SpecialNodes,
  nodePointerAreaPaint,
  makeGraphState,
} from "./GraphRenderer";
import "@testing-library/jest-dom";

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
