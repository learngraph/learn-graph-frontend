import { useEffect, Dispatch, SetStateAction } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import { TextFieldFormikGenerator } from "./components/LoginManager/Styles";
import { useFormik } from "formik";

const DraggablePaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
};

export interface GraphEditPopUpState {
  isOpen: boolean;
  title: string;
  details: string;
  onFormSubmit?: (form: NewNodeForm) => void;
}

//export interface AnyStringMap {
//  [key: string]: string;
//}

export interface NewNodeForm {
  nodeDescription: string;
}

export interface PopUpControls {
  state: GraphEditPopUpState;
  setState: Dispatch<SetStateAction<GraphEditPopUpState>>;
}

export interface GraphEditPopUpProps {
  ctrl: PopUpControls;
}

export const GraphEditPopUp = ({ ctrl }: GraphEditPopUpProps) => {
  const handleClose = () => {
    ctrl.setState({ ...ctrl.state, isOpen: false });
  };
  const formik = useFormik<NewNodeForm>({
    initialValues: {
      nodeDescription: "",
    },
    validationSchema: null,
    onSubmit: (form: NewNodeForm) => {
      if (ctrl.state.onFormSubmit === undefined) {
        console.error("logic error: no submit handler given");
        return;
      }
      ctrl.state.onFormSubmit(form);
      handleClose();
    },
  });
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if Ctrl key is pressed and Enter key is pressed
      if (event.ctrlKey && event.key === "Enter") {
        formik.submitForm();
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("keydown", handleKeyPress);
    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [formik]);
  return (
    <>
      <Dialog
        open={ctrl.state.isOpen}
        onClose={handleClose}
        PaperComponent={DraggablePaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {ctrl.state.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{ctrl.state.details}</DialogContentText>
          <TextFieldFormikGenerator
            fieldName="nodeDescription"
            fieldLabel="Node Description"
            formik={formik}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel </Button>
          <Button onClick={() => formik.submitForm()}> Save </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
