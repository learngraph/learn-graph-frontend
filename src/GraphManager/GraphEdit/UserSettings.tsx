// TODO(skep): translate this file
import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
//import AppBar from "@mui/material/AppBar";
import { useState } from "react";

import { CircleContainer, buttonIconStyle } from "./CreateButton";
import { Controller } from "./GraphEdit";
import { FormControlLabel, FormGroup } from "@mui/material";

export const UserSettings = ({ ctrl }: { ctrl: Controller }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleDrawer = () => {
    setIsOpen((current: boolean) => !current);
  };
  return (
    <>
      <UserSettingsButton ctrl={ctrl} onClick={toggleDrawer} />
      <Drawer open={isOpen} onClose={toggleDrawer} anchor="right">
        {/*<AppBar> hello </AppBar>*/}
        <Typography>User Settings</Typography>
        <FormGroup>
          <FormControlLabel
            label="Use 3D Display?!"
            control={<Checkbox checked={ctrl.mode.use3D} />}
            onClick={() => {
              ctrl.mode.setUse3D((current: boolean) => !current);
            }}
          />
        </FormGroup>
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
  return (
    <Button id="basic-button" onClick={onClick}>
      <CircleContainer>
        <SettingsIcon style={buttonIconStyle} />
      </CircleContainer>
    </Button>
  );
};
