import { Box, Slider, IconButton } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Controller } from "./GraphEdit";
import { zoomStep, ZoomDirection } from "./Zoom";

export interface ZoomPanelControl {
  zoomLevel: number;
  onZoomChange: (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export interface ZoomControlPanelProps {
  zoomControl: ZoomPanelControl;
}

function debounce(func: () => void, delay: number) {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: []) {
    // @ts-ignore
    const context = this;
    // @ts-ignore
    clearTimeout(timer);
    // @ts-ignore
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

export const makeZoomControl = (ctrl: Controller) => {
  let state = {
    zoomSteps: ctrl.zoom.zoomState.zoomSteps,
    graphData: ctrl.graph.current,
  };
  const performZoomIn = () => {
    const n = ctrl.zoom.zoomStepStack.pop();
    ctrl.zoom.setZoomStepStack(ctrl.zoom.zoomStepStack);
    if (!n) {
      return;
    }
    for (let i = 0; i < n; i++) {
      zoomStep({ direction: ZoomDirection.In, steps: 1 }, state);
    }
    ctrl.zoom.setZoomState(state);
    ctrl.forceGraphRef.current?.d3ReheatSimulation();
  };
  const onZoomIn = () => {
    if (ctrl.zoom.zoomLevel >= ZOOM_LEVEL_MAX) {
      return;
    }
    ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel + ZOOM_LEVEL_STEP);
    performZoomIn();
  };
  const performZoomOut = () => {
    const n = ctrl.graph.current.nodes.length / 2;
    ctrl.zoom.zoomStepStack.push(n);
    ctrl.zoom.setZoomStepStack(ctrl.zoom.zoomStepStack);
    for (let i = 0; i < n; i++) {
      zoomStep({ direction: ZoomDirection.Out, steps: 1 }, state);
    }
    ctrl.zoom.setZoomState(state);
    ctrl.forceGraphRef.current?.d3ReheatSimulation();
  };
  const onZoomOut = () => {
    if (ctrl.zoom.zoomLevel <= ZOOM_LEVEL_MIN) {
      return;
    }
    ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel - ZOOM_LEVEL_STEP);
    performZoomOut();
  };
  const onZoomChange = (_: Event, tmpNewValue: number | number[]) => {
    // @ts-ignore: `newValue` is always a number, never number[]
    const newValue: number = tmpNewValue;
    let diff = Math.abs(ctrl.zoom.zoomLevel - newValue);
    if (ctrl.zoom.zoomLevel < newValue) {
      if (ctrl.zoom.zoomLevel + diff > ZOOM_LEVEL_MAX) {
        diff -= ctrl.zoom.zoomLevel + diff - ZOOM_LEVEL_MAX;
      }
      ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel + diff);
      for (let i = 0; i < diff; i++) {
        performZoomIn();
      }
    } else {
      if (ctrl.zoom.zoomLevel - diff < ZOOM_LEVEL_MIN) {
        diff -= ctrl.zoom.zoomLevel - diff + ZOOM_LEVEL_MIN;
      }
      ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel - diff);
      for (let i = 0; i < diff; i++) {
        performZoomOut();
      }
    }
  };
  const zoomCtrl: ZoomPanelControl = {
    zoomLevel: ctrl.zoom.zoomLevel,
    onZoomChange,
    onZoomIn,
    onZoomOut,
  };
  return zoomCtrl;
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
        // @ts-ignore: it does work
        onChange={debounce(zoomControl.onZoomChange, 100)}
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
