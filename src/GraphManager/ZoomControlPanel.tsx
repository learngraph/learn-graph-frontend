import { Box, Slider, IconButton } from "@mui/material";
import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Controller } from "./GraphEdit";

export interface ZoomPanelControl {
  zoomLevel: number;
  onZoomChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

export interface ZoomControlPanelProps {
  zoomControl: ZoomPanelControl;
}

export const makeZoomControl = (ctrl: Controller) => {
  const zoom: ZoomPanelControl = {
    zoomLevel: ctrl.zoom.zoomLevel,
    onZoomChange: (_:any, newValue: number | number[]) => {
      // @ts-ignore: it is always a number
      ctrl.zoom.setZoomLevel(newValue);
    },
    onZoomIn: () => {},
    onZoomOut: () => {},
  };
  return zoom;
};

export const ZoomControlPanel = ({ zoomControl }: ZoomControlPanelProps) => {
  const { zoomLevel, onZoomChange, onZoomIn, onZoomOut } = zoomControl;
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
      <IconButton onClick={onZoomIn} size="large">
        <ZoomIn />
      </IconButton>
      <Slider
        value={zoomLevel}
        onChange={onZoomChange}
        min={1}
        max={5}
        step={0.1}
        orientation="vertical"
        style={{
          //width: "40px" 
          height: '100px', // Adjust the height as needed
          marginTop: '15px', // Add margin to separate from buttons
          marginBottom: '15px',
        }}
        valueLabelDisplay="auto"
      />
      <IconButton onClick={onZoomOut} size="large">
        <ZoomOut />
      </IconButton>
    </Box>
  );
};
