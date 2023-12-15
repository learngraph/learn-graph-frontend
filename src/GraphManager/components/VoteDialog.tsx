import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { Mark } from "@mui/base/useSlider";

import { Typography } from "@mui/material";
import { SubmitVoteFn } from "../hooks/useSubmitVote";
import { ForceGraphLinkObject } from "../types";

type VoteDialogProps = {
  isDialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  linkInfo: Partial<VoteDialogParams>;
  submitVote: SubmitVoteFn;
};

export interface VoteDialogParams {
  link: ForceGraphLinkObject;
}
export interface VoteDialogFn {
  (params: VoteDialogParams): void;
}

export const DialogueStyles = {
  dialogRoot: {
    padding: "40px",
    minWidth: "400px",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
};

export const VoteDialog = ({
  isDialogOpen,
  setDialogOpen,
  linkInfo: { link },
  submitVote,
}: VoteDialogProps): JSX.Element => {
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(0.5);
  const handleSubmitClick = () => {
    setDialogOpen(false);
    if (!link || !link.id || !sliderValue || typeof sliderValue !== "number") {
      throw new Error(
        `incorrect input for submit vote function! linkID: ${link?.id}, sliderValue: ${sliderValue}`,
      );
    }
    submitVote({
      ID: link.id,
      value: sliderValue,
    });
  };

  const handleCancelClick = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <Box sx={DialogueStyles.dialogRoot}>
          <Typography>
            To learn about "{link?.source?.description}" knowledge of "
            {link?.target?.description}" is required with a weight of
          </Typography>
          <LinkWeightSlider
            defaultValue={link?.value ?? 0}
            setSliderValue={setSliderValue}
          />
          <Box sx={DialogueStyles.dialogButtons}>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleSubmitClick}>Submit</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

interface LinkWeightSliderProps {
  defaultValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<Number | Array<Number>>>;
}

export const LinkWeightSlider = (props: LinkWeightSliderProps) => {
  const onSliderValueChange = (
    _event: any,
    newValue: Number | Array<Number>,
  ) => {
    props.setSliderValue(newValue);
  };
  // TODO(skep): translations
  const marks: Mark[] = [
    {
      value: 0,
      label: "Irrelevant",
    },
    {
      value: 5,
      label: "Useful",
    },
    {
      value: 10,
      label: "Necessary",
    },
  ];
  return (
    <Slider
      defaultValue={props.defaultValue}
      onChange={onSliderValueChange}
      step={0.01}
      min={0}
      max={10}
      marks={marks}
    />
  );
};
