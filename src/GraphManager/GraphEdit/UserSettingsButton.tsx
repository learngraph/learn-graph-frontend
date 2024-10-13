import Button from "@mui/material/Button";
import SettingsIcon from "@mui/icons-material/Settings";
import { CircleContainer, buttonIconStyle } from "./CreateButton";
import { Controller } from "./GraphEdit";
import { Tooltip } from "@mui/material";

export const UserSettingsButton = ({
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
