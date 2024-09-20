import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

import { Controller } from "./GraphEdit";
import { CircleContainer, buttonIconStyle } from "./CreateButton";
import { AlertFnRef, AlertPopupBar } from "@src/shared/Alert";
import { useUserDataContext } from "@src/Context/UserDataContext";
import i18n from "@src/shared/i18n";

export const EditModeButton = ({ ctrl }: { ctrl: Controller }) => {
  const displayAlertRef: AlertFnRef = {};
  const { userID } = useUserDataContext();
  const onClick = () => {
    const displayAlert = displayAlertRef.current ?? alert;
    if (!userID) {
      displayAlert(i18n.t("To edit the graph please login."));
      return;
    }
    ctrl.mode.setIsEditingEnabled(!ctrl.mode.isEditingEnabled);
  };
  return (
    <>
      <AlertPopupBar displayAlertRef={displayAlertRef} />
      <Button id="basic-button" onClick={onClick}>
        <CircleContainer>
          {ctrl.mode.isEditingEnabled ? (
            <EditIcon style={buttonIconStyle} />
          ) : (
            <VisibilityIcon style={buttonIconStyle} />
          )}
        </CircleContainer>
      </Button>
    </>
  );
};
