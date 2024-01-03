import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";

import Menu from "@mui/material/Menu";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

import { useUserDataContext } from "src/UserDataContext";

export default function LocaleManager() {
  const { language, setLanguage } = useUserDataContext();
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
    setLanguage(menuItem);
  };

  return (
    <>
      <IconButton onClick={handleClick} aria-label="switch language">
        <TranslateIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClick}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("a")}>Profile</MenuItem>
        <MenuItem onClick={() => handleClose("s")}>My account</MenuItem>
        <MenuItem onClick={() => handleClose("d")}>Logout</MenuItem>
      </Menu>
    </>
  );
}
