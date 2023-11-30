import { ForceGraphMethods } from "react-force-graph-2d";
import { ZoomFn, GraphDataMerged, ZoomDirection, ZoomState } from "./Zoom";
import { MutableRefObject } from "react";

interface UserZoomEvent {
  // zoom level
  k: number;
  x: number;
  y: number;
}

export type ForceGraph2DRef = MutableRefObject<ForceGraphMethods | undefined>;

// FIXME(skep): BUG: on load zoom is triggered 2 times, so that 1-zoom-in
// always  happens!

export const MIN_ZOOM_PERCENTAGE_DIFFERENCE = 0.05;

// Note: the returned onZoom function is triggered by user interaction as well
// as programmatic zooming/panning with zoom() and centerAt().
// -> will be important for search-node feature using centerAt!
export const makeOnZoomAndPanListener = (
  ref: ForceGraph2DRef,
  zoom: ZoomFn,
  graphData: GraphDataMerged
) => {
  let lastZoom = ref.current?.zoom();
  let zoomState: ZoomState = { zoomSteps: [], graphData };
  const onZoomAndPan = (transform: UserZoomEvent) => {
    const forcegraph = ref.current;
    if (!forcegraph) {
      return;
    }
    const currentZoom = transform.k;
    if (!lastZoom || lastZoom === currentZoom) {
      return;
    }
    const diffPercentage = Math.abs(lastZoom - currentZoom) / currentZoom;
    if (diffPercentage < MIN_ZOOM_PERCENTAGE_DIFFERENCE) {
      return;
    }
    if (lastZoom < currentZoom) {
      zoom({ direction: ZoomDirection.In, steps: 1 }, zoomState);
    } else {
      zoom({ direction: ZoomDirection.Out, steps: 1 }, zoomState);
    }
    forcegraph.d3ReheatSimulation();
    lastZoom = currentZoom;
  };
  return onZoomAndPan;
};
