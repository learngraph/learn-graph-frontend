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
import { useTranslation } from "react-i18next";
import { useUserDataContext } from "@src/Context/UserDataContext";
import i18n from "@src/shared/i18n";
import { AlertFnRef, AlertPopupBar } from "@src/shared/Alert";

// Icon style for all button icons on the RHS of the screen.
export const buttonIconStyle = { fontSize: 40 };

// Base component for all buttons on the RHS of the screen.
export const CircleContainer = styled("div")(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
  borderRadius: "50%",
  padding: "8px", // Adjust padding as needed
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[800]
        : theme.palette.grey[200],
  },
}));

interface CreateButtonProps {
  ctrl: Controller;
}

export const CreateButton = ({ ctrl }: CreateButtonProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { userID } = useUserDataContext();
  const displayAlertRef: AlertFnRef = {};
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const displayAlert = displayAlertRef.current ?? alert;
    if (!userID) {
      displayAlert(i18n.t("To edit the graph please login."));
      return;
    }
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
        return openCreateLinkPopUp(ctrl, undefined);
    }
  };
  const { t } = useTranslation();

  return (
    <>
      <AlertPopupBar displayAlertRef={displayAlertRef} />
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <CircleContainer>
          <AddIcon style={buttonIconStyle} />
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
        <Tooltip placement="left-end" title={t("Ctrl + Click anywhere")}>
          <MenuItem onClick={() => handleClose("newNode")}>
            {t("New Node")}
          </MenuItem>
        </Tooltip>
        <Tooltip
          placement="left-end"
          title={t("Drag nodes close to each other")}
        >
          <MenuItem onClick={() => handleClose("newLink")}>
            {t("New Link")}
          </MenuItem>
        </Tooltip>
      </Menu>
    </>
  );
};
