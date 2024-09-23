import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import DoTouchIcon from "@mui/icons-material/PanTool";
import Button from "@mui/material/Button";

import { Controller } from "./GraphEdit";
import { CircleContainer, buttonIconStyle } from "./CreateButton";
//import i18n from "@src/shared/i18n";

export const NoTouchButton = ({ ctrl }: { ctrl: Controller }) => {
  const onClick = () => {
    ctrl.mode.setAllowGraphInteractions((current) => !current);
  };
  return (
    <>
      <Button id="basic-button" onClick={onClick}>
        <CircleContainer>
          {ctrl.mode.allowGraphInteractions ? (
            <DoTouchIcon style={buttonIconStyle} />
          ) : (
            <DoNotTouchIcon style={buttonIconStyle} />
          )}
        </CircleContainer>
      </Button>
    </>
  );
};
