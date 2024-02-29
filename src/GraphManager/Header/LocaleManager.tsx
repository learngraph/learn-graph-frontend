import React, { ReactNode, useState } from "react";
import Button from "@mui/material/Button";
import TranslateIcon from "@mui/icons-material/Translate";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import i18n from "@src/i18n";

import { useUserDataContext } from "@src/Context/UserDataContext";

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Button
        variant="contained"
        startIcon={<TranslateIcon />}
        onClick={handleClick}
        aria-label="switch language"
        sx={{
          maxWidth: isSmallScreen ? "100%" : "auto", // Set maximum width for small screens
          whiteSpace: "normal", // Allow text to wrap
          textOverflow: "ellipsis", // Add ellipsis if text overflows
          overflow: "hidden", // Hide overflowed content
        }}
      >
        {isSmallScreen
          ? i18n.t("switch-language-button-short")
          : i18n.t("switch-language-button")}
      </Button>
      <Menu
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
              <MenuItem
                onClick={() => handleClose(languageString)}
                key={languageString}
              >
                <ListItemText>{`${languageProperties.displayIcon} ${languageProperties.displayText}`}</ListItemText>
              </MenuItem>
            );
          },
        )}
      </Menu>
    </>
  );
}
