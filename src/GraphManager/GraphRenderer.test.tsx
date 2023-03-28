/**
 * @jest-environment jsdom
 */
// import { render, screen } from "@testing-library/react";
import {
  // GraphRenderer,
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
  makeOnZoomAndPanListener,
  ForceGraph2DRef,
} from "./GraphRenderer";
import { ZoomDirection } from "./Zoom";

//import { useQuery } from "@apollo/client";
import "@testing-library/jest-dom";
// import crypto1 from "../graphdata/crypto-1";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

describe("GraphRenderer", () => {
  // TODO: fix and re-add test
  // disabled because we need to change the way mock data is supplied to the component
  // => switch to context
  // test.skip("loads and displays Graph", async () => {
  //   // ARRANGE
  //   const dataset = {
  //     data: crypto1,
  //     dataSetName: "test",
  //   };
  //   render(<GraphRenderer openVoteDialog={() => {}} />);
  // ACT
  //await userEvent.click(screen.getByText('Load Greeting'))
  //await screen.findByRole('heading')
  // ASSERT
  // FIXME: does only work, when jest.fn() above works
  //expect(useQuery).toHaveBeenCalledTimes(1);
  //   expect(
  //     screen.getByText("test-graph", { exact: false }).textContent
  //   ).toContain("Number Theory");
  // });
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
  it("should call nothing on key 'a'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(undefined);
    let event = { key: "a" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(0);
  });
});

describe("makeOnZoomListener", () => {
  it("should zoom in if we changed to a lower zoom number", () => {
    const fgZoom = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(2);
    const forcegraph: ForceGraph2DRef = {
      // @ts-ignore: don't want to implement all methods
      current: {
        zoom: fgZoom,
        d3ReheatSimulation: jest.fn(),
      },
    };
    const zoom = jest.fn();
    let graphData = { nodes: [], links: [] };
    const onZoomAndPan = makeOnZoomAndPanListener(forcegraph, zoom, graphData);
    onZoomAndPan({ k: 1, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    onZoomAndPan({ k: 2, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(1);
    expect(zoom.mock.calls[0]).toEqual([
      {
        direction: ZoomDirection.In,
        steps: 1,
      },
      {
        graphData,
        zoomSteps: [],
      },
    ]);
  });
  it("should zoom Out if we changed to a higher zoom number", () => {
    const fgZoom = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(0.5);
    const forcegraph: ForceGraph2DRef = {
      // @ts-ignore: don't want to implement all methods
      current: {
        zoom: fgZoom,
        d3ReheatSimulation: jest.fn(),
      },
    };
    const zoom = jest.fn();
    let graphData = { nodes: [], links: [] };
    const onZoomAndPan = makeOnZoomAndPanListener(forcegraph, zoom, graphData);
    onZoomAndPan({ k: 1, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    onZoomAndPan({ k: 0.5, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(1);
    expect(zoom.mock.calls[0]).toEqual([
      {
        direction: ZoomDirection.Out,
        steps: 1,
      },
      {
        graphData,
        zoomSteps: [],
      },
    ]);
  });
  it("should do nothing when no ref.current is empty", () => {
    const forcegraph: ForceGraph2DRef = { current: undefined };
    const zoom = jest.fn();
    let graphData = { nodes: [], links: [] };
    const onZoomAndPan = makeOnZoomAndPanListener(forcegraph, zoom, graphData);
    onZoomAndPan({ k: 1, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    onZoomAndPan({ k: 0.5, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
  });
  it("should do nothing, when panning", () => {
    const fgZoom = jest.fn().mockReturnValue(1);
    const forcegraph: ForceGraph2DRef = {
      // @ts-ignore: don't want to implement all methods
      current: {
        zoom: fgZoom,
        d3ReheatSimulation: jest.fn(),
      },
    };
    const zoom = jest.fn();
    let graphData = { nodes: [], links: [] };
    const onZoomAndPan = makeOnZoomAndPanListener(forcegraph, zoom, graphData);
    onZoomAndPan({ k: 1, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    onZoomAndPan({ k: 1, x: 1, y: 1 });
    expect(zoom.mock.calls.length).toEqual(0);
  });
});
