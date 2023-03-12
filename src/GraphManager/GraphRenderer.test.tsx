/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import {
  GraphRenderer,
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
  zoom,
  ZoomDirection,
} from "./GraphRenderer";

//import { useQuery } from "@apollo/client";
import "@testing-library/jest-dom";
import crypto1 from "../graphdata/crypto-1";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

describe("GraphRenderer", () => {
  test("loads and displays Graph", async () => {
    // ARRANGE
    const dataset = {
      data: crypto1,
      dataSetName: "test",
    };
    render(
      <GraphRenderer selectedGraphDataset={dataset} openVoteDialog={() => {}} />
    );

    // ACT
    //await userEvent.click(screen.getByText('Load Greeting'))
    //await screen.findByRole('heading')

    // ASSERT
    // FIXME: does only work, when jest.fn() above works
    //expect(useQuery).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("test-graph", { exact: false }).textContent
    ).toContain("Number Theory");
  });
});

describe("onLinkClickFn", () => {
  it("should call openVoteDialog with link info", () => {
    const props = {
      openVoteDialog: jest.fn(),
      selectedGraphDataset: { dataSetName: "", data: { nodes: [], links: [] } },
    };
    const onLinkClick = onLinkClickFn(props);
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
    nodeCanvasObject(node, ctx, scale);
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
  const graphData = { nodes: [], links: [] };
  it("should call zoom in on key 'p'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "p" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(1);
    expect(zoom.mock.calls[0][0]).toEqual({
      direction: ZoomDirection.In,
      graphData,
    });
  });
  it("should call zoom out on key 'm'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "m" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(1);
    expect(zoom.mock.calls[0][0]).toEqual({
      direction: ZoomDirection.Out,
      graphData,
    });
  });
  it("should call nothing on key 'a'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "a" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(0);
  });
});

describe("zoom", () => {
  describe("merge central nodes, when zooming in", () => {
    it("should merge 'A -> B <- C' to 'B'", () => {
      let nodeList = [
        { id: "A", description: "" },
        { id: "B", description: "" },
        { id: "C", description: "" },
      ];
      let node = {
        A: nodeList[0],
        B: nodeList[1],
        C: nodeList[2],
      };
      let graphData = {
        nodes: nodeList,
        links: [
          { source: node.A, target: node.B, value: 1, id: "1" },
          { source: node.C, target: node.B, value: 2, id: "2" },
        ],
      };
      zoom({
        direction: ZoomDirection.In,
        graphData, // XXX: fix types.. not sure what is best way, due to in-place type changes by ForceGraph2D
      });
      expect(graphData).toEqual({ nodes: [node.B], links: [] });
    });
  });
});
