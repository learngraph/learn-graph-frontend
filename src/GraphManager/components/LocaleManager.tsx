import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
//import ListItemText from "@mui/material/ListItemText";
//import ListItemIcon from "@mui/material/ListItemIcon";
//import Typography from "@mui/material/Typography";

import { useUserDataContext } from "src/UserDataContext";

export default function LocaleManager() {
  const { language, setLanguage } = useUserDataContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItem: string) => {
    setAnchorEl(null);
    if (!menuItem) {
      return;
    }
    if (menuItem !== language) {
      setLanguage(menuItem);
    }
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
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("en")}>en</MenuItem>
        <MenuItem onClick={() => handleClose("de")}>de</MenuItem>
        <MenuItem onClick={() => handleClose("zh")}>zh</MenuItem>
      </Menu>
    </>
  );
}
