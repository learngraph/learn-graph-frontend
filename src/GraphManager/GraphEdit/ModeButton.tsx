import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "@mui/material/Button";

import { useUserDataContext } from "src/UserDataContext";
import i18n from "src/i18n";
import { Controller } from "./GraphEdit";
import { CircleContainer } from "./CreateButton";

export const EditModeButton = ({ ctrl }: { ctrl: Controller }) => {
  const { userID } = useUserDataContext();
  const iconProp = { fontSize: 40 };
  const onClick = () => {
    if (!userID) {
      alert(i18n.t("To edit the graph please login."));
      return;
    }
    ctrl.mode.setIsEditMode(!ctrl.mode.isEditMode);
  };
  return (
    <Button id="basic-button" onClick={onClick}>
      <CircleContainer>
        {ctrl.mode.isEditMode ? (
          <EditIcon style={iconProp} />
        ) : (
          <VisibilityIcon style={iconProp} />
        )}
      </CircleContainer>
    </Button>
  );
};
