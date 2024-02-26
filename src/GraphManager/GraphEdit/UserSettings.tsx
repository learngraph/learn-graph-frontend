// TODO(skep): translate this file
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
        <Box sx={{ padding: 2 }}>
          <Typography variant="h5">User Settings</Typography>
          <FormGroup>
            {/* XXX(skep): maybe use diver like this? */}
            {/*<Divider>Visuals</Divider>*/}
            <Divider />
            <Typography variant="overline">Visuals:</Typography>
            <FormControlLabel
              label="Dark Theme"
              control={
                <Checkbox
                  checked={false}
                  disabled={true} /*TODO(skep): implement!*/
                />
              }
              onClick={() => {}}
            />
          </FormGroup>
          <FormGroup>
            {/*<Divider>Experimental Settings</Divider>*/}
            <Divider />
            <Typography variant="overline">Experimental Settings:</Typography>
            <FormControlLabel
              label="3D Display"
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
  return (
    <Button id="basic-button" onClick={onClick}>
      <CircleContainer>
        <SettingsIcon style={buttonIconStyle} />
      </CircleContainer>
    </Button>
  );
};
