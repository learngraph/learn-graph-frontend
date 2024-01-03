import React, { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import TranslateIcon from "@mui/icons-material/Translate";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

import i18n from "src/i18n";

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
    displayText: "中文",
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
      <Button
        variant="outlined"
        startIcon={<TranslateIcon />}
        onClick={handleClick}
        aria-label="switch language"
      >
        {i18n.t("switch-language-button")}
      </Button>
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
