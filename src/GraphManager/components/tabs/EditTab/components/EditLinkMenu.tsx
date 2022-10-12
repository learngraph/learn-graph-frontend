import { useState, ReactNode } from "react";
import { LinkType, NodeType } from "../../../../types";
import {
  Select,
  SelectChangeEvent,
  IconButton,
  TextField,
  MenuItem,
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
  const { source, target, value, note } = link ?? {};
  const [currentSource, setCurrentSource] = useState(source ?? "");
  const [currentTarget, setCurrentTarget] = useState(target ?? "");
  const [currentValue, setCurrentValue] = useState(value ?? "");
  const [currentNote, setCurrentNote] = useState(note ?? "");

  const isAnyValueChanged =
    currentSource !== source ||
    currentTarget !== target ||
    currentValue !== value ||
    currentNote !== note;

  const areRequiredValuesSet = currentSource && currentTarget && currentValue;

  const canSave = isAnyValueChanged && areRequiredValuesSet;

  const handleConfirmButtonClick = (): void => {
    if (isAnyValueChanged) {
      onUpdateLink({
        oldLink: link,
        updatedLink: {
          source: currentSource,
          target: currentTarget,
          value: currentValue,
          note: currentNote,
        },
      });
    }
    toggleIsEditable?.(false);
  };
  const handleCancelButtonClick = (): void => {
    setCurrentSource(source ?? gUnknown);
    setCurrentTarget(target ?? gUnknown);
    setCurrentValue(value ?? gUnknown);
    setCurrentNote(note ?? gUnknown);
    toggleIsEditable?.(false);
  };

  const handleSelectSourceNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ): void => {
    const nodeName = event.target.value as string;
    setCurrentSource(nodeName);
  };

  const handleSelectTargetNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ): void => {
    const nodeName = event.target.value as string;
    setCurrentTarget(nodeName);
  };

  const renderOptions = nodes?.map(({ id }) => {
    return (
      <MenuItem key={id} value={id}>
        {id}
      </MenuItem>
    );
  });

  return (
    <>
      <Select
        labelId="select-source-node-label"
        id="select-source-node"
        value={currentSource ?? gUnknown}
        onChange={handleSelectSourceNode}
      >
        {renderOptions}
      </Select>

      <Select
        labelId="select-target-node-label"
        id="select-target-node"
        value={currentTarget ?? ""}
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
    </>
  );
};
