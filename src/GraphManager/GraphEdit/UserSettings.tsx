import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { useState } from "react";

import { CircleContainer, buttonIconStyle } from "./CreateButton";
import { Controller } from "./GraphEdit";
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useUserDataContext } from "@src/Context/UserDataContext";

export const UserSettings = ({ ctrl }: { ctrl: Controller }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((current: boolean) => !current);
  };
  const { theme, setTheme } = useUserDataContext();
  const toggleDarkTheme = () => {
    setTheme((cur) => {
      if (cur === "light") {
        return "dark";
      } else {
        return "light";
      }
    });
  };
  return (
    <>
      <UserSettingsButton ctrl={ctrl} onClick={toggleDrawer} />
      <Drawer open={isOpen} onClose={toggleDrawer} anchor="right">
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">
            {t("settings.headline-User-Settings")}
          </Typography>
          <FormGroup>
            {/* XXX(skep): maybe use diver like this? */}
            {/*<Divider>Visuals</Divider>*/}
            <Divider />
            <Typography variant="overline">
              {t("settings.headline-Visuals")}
            </Typography>
            <FormControlLabel
              label={t("settings.Dark Theme")}
              control={<Checkbox checked={theme === "dark"} />}
              onClick={toggleDarkTheme}
            />
          </FormGroup>
          <FormGroup>
            {/*<Divider>Experimental Settings</Divider>*/}
            <Divider />
            <Typography variant="overline">
              {t("settings.headline-Experimental Settings")}
            </Typography>
            <FormControlLabel
              label={t("settings.3D Display")}
              control={<Checkbox checked={ctrl.mode.use3D} />}
              onClick={() => {
                ctrl.mode.setUse3D((current: boolean) => !current);
              }}
            />
          </FormGroup>
        </Box>
      </Drawer>
    </>
  );
};

const UserSettingsButton = ({
  onClick,
}: {
  ctrl: Controller;
  onClick: () => void;
}) => {
  // TOOD(skep): translate tooltip
  return (
    <Tooltip placement="left-end" title="Settings">
      <Button id="basic-button" onClick={onClick}>
        <CircleContainer>
          <SettingsIcon style={buttonIconStyle} />
        </CircleContainer>
      </Button>
    </Tooltip>
  );
};
