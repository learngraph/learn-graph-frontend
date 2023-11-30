/**
 * @jest-environment jsdom
 */
import {
  makeOnZoomAndPanListener,
  ForceGraph2DRef,
  MIN_ZOOM_PERCENTAGE_DIFFERENCE,
} from "./ZoomForceGraphIntegration";
import { ZoomDirection } from "./Zoom";

import "@testing-library/jest-dom";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
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
  it("should do nothing when zoom diff is small", () => {
    const fgZoom = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(0.95);
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
    const initialZoom = 1;
    onZoomAndPan({ k: initialZoom, x: 0, y: 0 });
    const step1Zoom =
      initialZoom - (initialZoom * MIN_ZOOM_PERCENTAGE_DIFFERENCE) / 2;
    expect(zoom.mock.calls.length).toEqual(0);
    onZoomAndPan({ k: step1Zoom, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
  });
  it("should zoom after multiple small zoom diffs (summing up the difference)", () => {
    const fgZoom = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(0.95);
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
    const initialZoom = 1;
    onZoomAndPan({ k: initialZoom, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    // use half of the percentage for the first step, this must not trigger a zoom
    const step1Zoom =
      initialZoom - (initialZoom * MIN_ZOOM_PERCENTAGE_DIFFERENCE) / 2;
    onZoomAndPan({ k: step1Zoom, x: 0, y: 0 });
    expect(zoom.mock.calls.length).toEqual(0);
    // use the whole MIN_ZOOM_PERCENTAGE_DIFFERENCE for the second step to trigger a zoom
    const step2Zoom =
      initialZoom - initialZoom * MIN_ZOOM_PERCENTAGE_DIFFERENCE;
    onZoomAndPan({ k: step2Zoom, x: 0, y: 0 });
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
});
