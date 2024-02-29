import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const AUTO_HIDE_DURATION = 6000; // ms

export interface AlertFnRef {
  current?: (message: string) => void;
}

export interface AlertPopupBarProps {
  displayAlertRef: AlertFnRef;
}

export const AlertPopupBar = ({ displayAlertRef }: AlertPopupBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  displayAlertRef.current = (newMessage: string) => {
    setMessage(newMessage);
    setIsOpen(true);
  };
  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpen(false);
  };
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};
