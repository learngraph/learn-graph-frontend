// @jest-environment jsdom
import {
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
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
      source: "A",
      target: "B",
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

describe("nodeCanvasObject", () => {
  it("[SNAPSHOT test] should have reasonable font size and background dimensions", () => {
    const node = {
      id: "A",
      description: "B",
      x: 5,
      y: 6,
    };
    //const ctx = jest.fn<typeof CanvasRenderingContext2D>();
    const ctx = {
      fillStyle: "",
      fillRect: jest.fn(),
      fillText: jest.fn(),
      measureText: jest.fn(),
      textAlign: "",
      textBaseline: "",
      font: "",
    };
    ctx.measureText.mockReturnValue({ width: 100 });
    const scale = 1;
    // @ts-ignore
    nodeCanvasObject(node, ctx, scale, new Set());
    expect(ctx.font).toEqual("22px Sans-Serif");
    expect(ctx.textAlign).toEqual("center");
    expect(ctx.textBaseline).toEqual("middle");
    expect(ctx.fillStyle).toEqual("#000");
    // TODO(skep): test fillStyle for the first fillRect() call
    expect(ctx.fillRect.mock.calls.length).toBe(1);
    expect(ctx.fillRect.mock.calls[0]).toEqual([
      -47.2, -7.199999999999999, 104.4, 26.4,
    ]);
    expect(ctx.fillText.mock.calls.length).toBe(1);
    expect(ctx.fillText.mock.calls[0]).toEqual(["B", 5, 6]);
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
