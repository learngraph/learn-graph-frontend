import React from "react";
import TextField from "@mui/material/TextField";

import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { NodeType } from "../../../../types";

type EditNodeMenuProps = {
  node: NodeType | undefined;
  saveChanges: Function;
  currentText: string;
  updateText: Function;
  finishEditing: Function | undefined;
};

// todo context?

export const EditNodeMenu = ({
  node,
  saveChanges,
  currentText,
  updateText,
  finishEditing,
}: EditNodeMenuProps): JSX.Element => {
  const isValueChanged = currentText !== node?.id;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    updateText(event.target.value);
  };

  const handleCancelButtonClick = (): void => {
    updateText(node?.id);
    finishEditing?.();
  };

  const handleConfirmButtonClick = (): void => {
    saveChanges({ node: { id: currentText, group: 1 } });
    finishEditing?.();
  };

  return (
    <>
      <TextField
        id="node ID"
        label="Node Name"
        variant="outlined"
        value={currentText}
        onChange={handleChange}
      />
      <IconButton
        aria-label="confirm changing name"
        color="primary"
        onClick={handleConfirmButtonClick}
        disabled={!isValueChanged}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        aria-label="cancel changing name"
        color="primary"
        onClick={handleCancelButtonClick}
        disabled={!isValueChanged}
      >
        <CancelIcon />
      </IconButton>
    </>
  );
};
