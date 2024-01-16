import { Box, Slider, IconButton } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Controller } from "./GraphEdit";
import { zoomStep, ZoomDirection } from "./Zoom";

export interface ZoomPanelControl {
  zoomLevel: number;
  onZoomChange: (newValue: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export interface ZoomControlPanelProps {
  zoomControl: ZoomPanelControl;
}

interface AnyFunction {
  (...args: any[]): any;
}
export function debounce<Func extends AnyFunction>(func: Func, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<Func>, ...args: Parameters<Func>) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
export function deduplicateCallsWithSameParameters<T extends any[]>(
  callback: AnyFunction,
): AnyFunction {
  let lastArgs: any[] | null = null;
  return (...args: T) => {
    if (
      !lastArgs ||
      !args.every((value, index) => value === lastArgs![index])
    ) {
      callback(...args);
      lastArgs = [...args];
    }
  };
}

export const makeZoomControl = (ctrl: Controller) => {
  let state = {
    zoomSteps: ctrl.zoom.zoomState.zoomSteps,
    graphData: ctrl.graph.current,
  };
  const setZoomState = () => {
    ctrl.zoom.setZoomStepStack(ctrl.zoom.zoomStepStack);
    ctrl.zoom.setZoomState(state);
    uglyHack(ctrl);
    ctrl.forceGraphRef.current?.d3ReheatSimulation();
  };
  const performZoomIn = () => {
    const n = ctrl.zoom.zoomStepStack.pop();
    if (!n) {
      return;
    }
    for (let i = 0; i <= n; i++) {
      zoomStep({ direction: ZoomDirection.In, steps: 1 }, state);
    }
  };
  const onZoomIn = () => {
    if (ctrl.zoom.zoomLevel >= ZOOM_LEVEL_MAX) {
      return;
    }
    ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel + ZOOM_LEVEL_STEP);
    performZoomIn();
    setZoomState();
  };
  const performZoomOut = () => {
    const n = Math.abs(ctrl.graph.current.nodes.length / 2);
    ctrl.zoom.zoomStepStack.push(n);
    for (let i = 0; i <= n; i++) {
      zoomStep({ direction: ZoomDirection.Out, steps: 1 }, state);
    }
  };
  const onZoomOut = () => {
    if (ctrl.zoom.zoomLevel <= ZOOM_LEVEL_MIN) {
      return;
    }
    ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel - ZOOM_LEVEL_STEP);
    performZoomOut();
    setZoomState();
  };
  // Note: We must remember the last zoom level outside of react state, since
  // react state performs asynchronous calls, and the slider changes it's value
  // very rapidly.
  let lastZoomLevel: number | null = null;
  const onZoomChange = (newValue: number) => {
    if (!lastZoomLevel) {
      lastZoomLevel = ctrl.zoom.zoomLevel;
    }
    newValue = capInclusive(newValue, {
      upper: ZOOM_LEVEL_MAX,
      lower: ZOOM_LEVEL_MIN,
    });
    let performZoom: () => void;
    if (lastZoomLevel < newValue) {
      performZoom = performZoomIn;
    } else {
      performZoom = performZoomOut;
    }
    for (let i = 0; i < Math.abs(lastZoomLevel - newValue); i++) {
      performZoom();
    }
    lastZoomLevel = newValue;
    ctrl.zoom.setZoomLevel(newValue);
    setZoomState();
  };
  const zoomCtrl: ZoomPanelControl = {
    zoomLevel: ctrl.zoom.zoomLevel,
    onZoomChange: deduplicateCallsWithSameParameters(onZoomChange),
    onZoomIn,
    onZoomOut,
  };
  return zoomCtrl;
};

interface Bound {
  upper: number;
  lower: number;
}
// capInclusive caps the number n inside the bounaries bound
const capInclusive = (n: number, bound: Bound) => {
  if (n > bound.upper) {
    n = bound.upper;
  } else if (n < bound.lower) {
    n = bound.lower;
  }
  return n;
};

export const ZOOM_LEVEL_MIN = 1;
export const ZOOM_LEVEL_MAX = 5;
export const ZOOM_LEVEL_STEP = 1;

export const ZoomControlPanel = ({ zoomControl }: ZoomControlPanelProps) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        right: "16px",
        transform: "translateY(-50%)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <IconButton onClick={zoomControl.onZoomIn} size="large">
        <ZoomIn />
      </IconButton>
      <Slider
        value={zoomControl.zoomLevel}
        onChange={(_: Event, _tmpLevel: number | number[]) => {
          // XXX(skep): temporarily disabled, since usage leads to display bug
          //// @ts-ignore: it's a number - always.
          //let level: number = tmpLevel;
          //return zoomControl.onZoomChange(level);
        }}
        min={ZOOM_LEVEL_MIN}
        max={ZOOM_LEVEL_MAX}
        step={ZOOM_LEVEL_STEP}
        orientation="vertical"
        style={{
          //width: "40px"
          height: "100px", // Adjust the height as needed
          marginTop: "15px", // Add margin to separate from buttons
          marginBottom: "15px",
        }}
        valueLabelDisplay="auto"
      />
      <IconButton onClick={zoomControl.onZoomOut} size="large">
        <ZoomOut />
      </IconButton>
    </Box>
  );
};

// XXX(skep): ugly hack for unknown forcegrpah issue, to reproduce:
//  1. zoom out
//  2. change the graph (add node, add link, or even just create a temporary
//     link by dragging, and then delete it by not submitting it)
//  3. zoom in
// The result is a completely messed up graph display.
// For some unknown reason (?!) adding and removing a link fixes the graph display.
// Thus call it after every zoom operation.
const uglyHack = (ctrl: Controller) => {
  if (ctrl.graph.current.links.length === 0) {
    return;
  }
  const link = ctrl.graph.current.links[0];
  ctrl.graph.removeLink(link);
  ctrl.graph.addLink(link);
  //console.log(`adding link ${link.source.description}->${link.target.description}`);
};

export interface UserZoomEvent {
  // zoom level
  k: number;
  x: number;
  y: number;
}
export const MIN_ZOOM_PERCENTAGE_DIFFERENCE = 0.05;

export const makeOnZoomAndPanListener = (ctrl: Controller) => {
  return debounce(makeOnZoomAndPanListenerNoDebounce(ctrl), 100);
};

export const makeOnZoomAndPanListenerNoDebounce = (ctrl: Controller) => {
  let lastZoom = ctrl.forceGraphRef.current?.zoom();
  const zoomFn = (transform: UserZoomEvent) => {
    if (!ctrl.keys.shiftHeld) {
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
      ctrl.zoom.setUserZoomLevel(ctrl.zoom.zoomLevel + ZOOM_LEVEL_STEP);
    } else {
      ctrl.zoom.setUserZoomLevel(ctrl.zoom.zoomLevel - ZOOM_LEVEL_STEP);
    }
  };
  return zoomFn;
};
