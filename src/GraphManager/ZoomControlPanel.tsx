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

export const makeZoomControl = (ctrl: Controller) => {
  let state = {
    zoomSteps: ctrl.zoom.zoomState.zoomSteps,
    graphData: ctrl.graph.current,
  };
  const zoomCtrl: ZoomPanelControl = {
    zoomLevel: ctrl.zoom.zoomLevel,
    onZoomChange: (_: any, newValue: number | number[]) => {
      // @ts-ignore: it is always a number
      ctrl.zoom.setZoomLevel(newValue);
    },
    onZoomIn: () => {
      const n = ctrl.zoom.zoomStepStack.pop();
      ctrl.zoom.setZoomStepStack(ctrl.zoom.zoomStepStack);
      if (!n) {
        return;
      }
      for (let i = 0; i < n; i++) {
        zoomStep({ direction: ZoomDirection.In, steps: 1 }, state);
      }
      ctrl.zoom.setZoomState(state);
      ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel + 1);
      ctrl.forceGraphRef.current?.d3ReheatSimulation();
    },
    onZoomOut: () => {
      const n = ctrl.graph.current.nodes.length / 2;
      ctrl.zoom.zoomStepStack.push(n);
      ctrl.zoom.setZoomStepStack(ctrl.zoom.zoomStepStack);
      for (let i = 0; i < n; i++) {
        zoomStep({ direction: ZoomDirection.Out, steps: 1 }, state);
      }
      ctrl.zoom.setZoomState(state);
      ctrl.zoom.setZoomLevel(ctrl.zoom.zoomLevel - 1);
      ctrl.forceGraphRef.current?.d3ReheatSimulation();
    },
  };
  return zoomCtrl;
};

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
        onChange={zoomControl.onZoomChange}
        min={1}
        max={5}
        step={0.1}
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
