import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

import { Typography } from "@mui/material";
import { VoteDialogParams } from "../GraphRenderer";
import { SubmitVoteFn } from "../hooks/useSubmitVote";

type VoteDialogProps = {
  isDialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  linkInfo: Partial<VoteDialogParams>;
  submitVote: SubmitVoteFn;
};

const styles = {
  dialogRoot: {
    padding: "40px",
    minWidth: "400px",
    minHeight: "300px",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
};

export const VoteDialog = ({
  isDialogOpen,
  setDialogOpen,
  linkInfo,
  submitVote,
}: VoteDialogProps): JSX.Element => {
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(0.5);

  const handleSubmitClick = () => {
    setDialogOpen(false);
    if (!linkInfo.linkID || !sliderValue || typeof sliderValue !== "number") {
      throw new Error(
        `incorrect input for submit vote function! linkID: ${linkInfo.linkID}, sliderValue: ${sliderValue}`
      );
    }
    submitVote({
      ID: linkInfo.linkID,
      value: sliderValue,
    });
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
  };

  const onSliderValueChange = (
    _event: any,
    newValue: Number | Array<Number>
  ) => {
    setSliderValue(newValue);
  };
  return (
    <>
      <Dialog open={isDialogOpen}>
        <Box sx={styles.dialogRoot}>
          <Typography>
            From {linkInfo.sourceNode?.id} to {linkInfo.targetNode?.id}
          </Typography>
          <Slider
            defaultValue={linkInfo.weight ?? 0}
            onChange={onSliderValueChange}
            step={0.01}
            min={0}
            max={10}
          />
          <Box sx={styles.dialogButtons}>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleSubmitClick}>Submit</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
