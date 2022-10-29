import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
// TODO: move to new styles engine in MUI v5, see https://mui.com/material-ui/migration/migration-v4/#mui-material-styles
import { makeStyles } from "@mui/styles";

import { useSubmitVote } from "../hooks";
import { NodeType } from "../types";
import { Typography } from "@mui/material";

type VoteDialogProps = {
  isDialogOpen: boolean;
  setDialogOpen: (value: boolean) => void;
  sourceNode: NodeType | null;
  targetNode: NodeType | null;
  linkID: string | null;
};

const useStyles = makeStyles((_: any) => ({
  dialogRoot: {
    padding: "40px",
    minWidth: "400px",
    minHeight: "300px",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
}));

export const VoteDialog = ({
  isDialogOpen,
  setDialogOpen,
  sourceNode,
  targetNode,
  linkID,
}: VoteDialogProps): JSX.Element => {
  const classes = useStyles();
  const { submitVote } = useSubmitVote();
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(0.5);

  const handleSubmitClick = () => {
    setDialogOpen(false);
    submitVote({
      variables: {
        id: linkID,
        value: sliderValue,
      },
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
        <Box className={classes.dialogRoot}>
          <Typography>
            From {sourceNode?.id} to {targetNode?.id}
          </Typography>
          <Slider
            defaultValue={0.5}
            onChange={onSliderValueChange}
            step={0.01}
            min={0}
            max={1}
          />
          <Box className={classes.dialogButtons}>
            <Button onClick={handleCancelClick}>Cancel</Button>
            <Button onClick={handleSubmitClick}>Submit</Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};
