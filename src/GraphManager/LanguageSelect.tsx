import { ListItemText, Menu, MenuItem } from "@mui/material";
import { languageDict } from "@src/shared/languageDict";

import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import i18n from "@src/shared/i18n";

interface LanguageSelectProps {
  onLanguageSelect: (arg0: string) => void;
  selectedLanguage: string;
  buttonProps: ButtonProps;
  buttonText: string;
}

export const LanguageSelect = ({
  buttonProps,
  buttonText,
  selectedLanguage,
  onLanguageSelect,
}: LanguageSelectProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleItemSelect = (languageString: string) => {
    setAnchorEl(null);
    if (!languageString) {
      return;
    }
    if (languageString !== selectedLanguage) {
      onLanguageSelect(languageString);
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={handleButtonClick}
        aria-label="switch language"
      >
        {buttonText}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "switch language",
        }}
      >
        {Object.entries(languageDict).map(
          ([languageString, languageProperties]) => {
            return (
              <MenuItem
                onClick={() => handleItemSelect(languageString)}
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
};
