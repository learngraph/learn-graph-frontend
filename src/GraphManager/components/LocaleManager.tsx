import React, { ReactNode, useState } from "react";
import IconButton from "@mui/material/IconButton";
import TranslateIcon from "@mui/icons-material/Translate";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
//import Typography from "@mui/material/Typography";

import { useUserDataContext } from "src/UserDataContext";

interface LanguageDictEntry {
  displayText: string;
  displayIcon: ReactNode;
  localeString: string;
}
const languageDict: { [language: string]: LanguageDictEntry } = {
  en: {
    displayText: "English",
    displayIcon: "🇬🇧",
    localeString: "enUS",
  },
  de: {
    displayText: "Deutsch",
    displayIcon: "🇩🇪",
    localeString: "deDE",
  },
  zh: {
    displayText: "中國人",
    displayIcon: "🇹🇼",
    localeString: "zhTW",
  },
};

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
          "aria-labelledby": "switch language",
        }}
      >
        {Object.entries(languageDict).map(
          ([languageString, languageProperties]) => {
            return (
              <MenuItem onClick={() => handleClose(languageString)}>
                <ListItemText>{`${languageProperties.displayIcon} ${languageProperties.displayText}`}</ListItemText>
              </MenuItem>
            );
          },
        )}
      </Menu>
    </>
  );
}
