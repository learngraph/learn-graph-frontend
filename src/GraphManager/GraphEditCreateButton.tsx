import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import styled from "@emotion/styled";
import {
  Controller,
  openCreateLinkPopUp,
  openCreateNodePopUpAtPagePosition,
} from "./GraphEdit";

// TODO(skep): use theme here for backgroundColor!
// Styled component for the shaded circle
const CircleContainer = styled("div")({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  borderRadius: "50%",
  padding: "8px", // Adjust padding as needed
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

interface CreateButtonProps {
  ctrl: Controller;
}

export const CreateButton = ({ ctrl }: CreateButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (menuItem: string) => {
    setAnchorEl(null);
    if (!menuItem) {
      return;
    }
    switch (menuItem) {
      case "newNode":
        return openCreateNodePopUpAtPagePosition(
          { x: window.innerWidth / 2, y: window.innerHeight / 2 },
          ctrl,
        );
      case "newLink":
        return openCreateLinkPopUp(ctrl);
    }
  };

  return (
    <div style={{ position: "fixed", bottom: "0px", right: "0px" }}>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <CircleContainer>
          <AddIcon style={{ fontSize: 40 }} />
        </CircleContainer>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <Tooltip placement="left-end" title="Ctrl + Click anywhere">
          <MenuItem onClick={() => handleClose("newNode")}>New Node</MenuItem>
        </Tooltip>
        <Tooltip placement="left-end" title="Drag nodes close to each other">
          <MenuItem onClick={() => handleClose("newLink")}>New Link</MenuItem>
        </Tooltip>
      </Menu>
    </div>
  );
};
