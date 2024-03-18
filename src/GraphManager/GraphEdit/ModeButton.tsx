import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

import { Controller } from "./GraphEdit";
import { CircleContainer, buttonIconStyle } from "./CreateButton";

export const EditModeButton = ({ ctrl }: { ctrl: Controller }) => {
  const onClick = () => {
    ctrl.mode.setAllowGraphInteractions(!ctrl.mode.allowGraphInteractions);
  };
  return (
    <Button id="basic-button" onClick={onClick}>
      <CircleContainer>
        {ctrl.mode.allowGraphInteractions ? (
          <EditIcon style={buttonIconStyle} />
        ) : (
          <VisibilityIcon style={buttonIconStyle} />
        )}
      </CircleContainer>
    </Button>
  );
};
