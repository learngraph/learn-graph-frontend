import { useState, ReactNode } from "react";
import { LinkType, NodeType } from "../../../../types";
import {
  Select,
  SelectChangeEvent,
  IconButton,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

type EditLinkMenuProps = {
  link: LinkType | undefined;
  toggleIsEditable: Function | undefined;
  onUpdateLink: Function;
  nodes: NodeType[] | undefined;
};

const gUnknown = "unknown";

export const EditLinkMenu = ({
  link,
  toggleIsEditable,
  onUpdateLink,
  nodes,
}: EditLinkMenuProps): JSX.Element => {
  const { source: sourceID, target: targetID, value, note } = link ?? {};
  const [currentSourceID, setCurrentSourceID] = useState(sourceID ?? "");
  const [currentTargetID, setCurrentTargetID] = useState(targetID ?? "");
  const [currentValue, setCurrentValue] = useState(value ?? "");
  const [currentNote, setCurrentNote] = useState(note ?? "");

  let isAnyValueChanged =
    currentSourceID !== sourceID ||
    currentTargetID !== targetID ||
    currentValue !== value;
  if (note) {
    // note is an optional property and can be undefined, which compares false
    // for exact inequality "!==", but here empty string is needed as "value"
    // below
    isAnyValueChanged ||= currentNote !== note;
  }

  const areRequiredValuesSet =
    currentSourceID && currentTargetID && currentValue;

  const canSave = isAnyValueChanged && areRequiredValuesSet;

  const handleConfirmButtonClick = (): void => {
    if (isAnyValueChanged) {
      onUpdateLink({
        oldLink: link,
        updatedLink: {
          // TODO: we must pass the link ID as well!
          source: currentSourceID,
          target: currentTargetID,
          value: currentValue,
          note: currentNote,
        },
      });
    }
    toggleIsEditable?.(false);
  };
  const handleCancelButtonClick = (): void => {
    setCurrentSourceID(sourceID ?? gUnknown);
    setCurrentTargetID(targetID ?? gUnknown);
    setCurrentValue(value ?? gUnknown);
    setCurrentNote(note ?? gUnknown);
    toggleIsEditable?.(false);
  };

  const handleSelectSourceNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode,
  ): void => {
    const nodeName = event.target.value as string;
    setCurrentSourceID(nodeName);
  };

  const handleSelectTargetNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode,
  ): void => {
    const nodeName = event.target.value as string;
    setCurrentTargetID(nodeName);
  };

  const renderOptions = nodes?.map(({ id, description }) => {
    return (
      <MenuItem key={id} value={id}>
        {description}
      </MenuItem>
    );
  });

  return (
    <Box>
      <Select
        labelId="select-source-node-label"
        id="select-source-node"
        value={currentSourceID ?? gUnknown}
        onChange={handleSelectSourceNode}
      >
        {renderOptions}
      </Select>

      <Select
        labelId="select-target-node-label"
        id="select-target-node"
        value={currentTargetID ?? gUnknown}
        onChange={handleSelectTargetNode}
      >
        {renderOptions}
      </Select>

      <TextField
        id="link value"
        label="value"
        variant="outlined"
        type="number"
        onChange={(event): void => {
          setCurrentValue(parseFloat(event?.target?.value));
        }}
        value={currentValue}
      />

      <TextField
        id="link note"
        label="note"
        variant="outlined"
        onChange={(event): void => {
          setCurrentNote(event?.target?.value);
        }}
        value={currentNote}
      />

      <IconButton
        aria-label="confirm editing link"
        color="primary"
        onClick={handleConfirmButtonClick}
        disabled={!canSave}
      >
        <CheckIcon />
      </IconButton>
      <IconButton
        aria-label="cancel editing link"
        color="primary"
        onClick={handleCancelButtonClick}
      >
        <CancelIcon />
      </IconButton>
    </Box>
  );
};
