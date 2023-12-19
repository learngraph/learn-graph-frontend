import { useEffect, Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Draggable from "react-draggable";
import {
  TextFieldFormikGenerator,
  TextFieldFormikGeneratorAutocomplete,
} from "./components/LoginManager/Styles";
import { useFormik } from "formik";
import { Controller } from "./GraphEdit";
import { DialogueStyles, LinkWeightSlider } from "./components/VoteDialog";
import { ForceGraphGraphData, ForceGraphNodeObject } from "./types";
import * as yup from "yup";

const DraggablePaperComponent = (props: PaperProps) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} sx={DialogueStyles.dialogRoot} />
    </Draggable>
  );
};

export interface GraphEditPopUpState {
  isOpen: boolean;
  title?: string;
  details?: string;
  nodeEdit?: NodeEdit;
  linkEdit?: LinkEdit;
}

export interface NodeEdit {
  onFormSubmit: (form: NewNodeForm) => void;
}
export interface LinkEdit {
  onFormSubmit: (form: NewLinkForm) => void;
}

export interface NewNodeForm {
  nodeDescription: string;
}
export interface NewLinkForm {
  sourceNode: string;
  targetNode: string;
  linkWeight: number;
}

export interface PopUpControls {
  state: GraphEditPopUpState;
  setState: Dispatch<SetStateAction<GraphEditPopUpState>>;
}

export interface GraphEditPopUpProps {
  ctrl: Controller;
}

type SubGraphEditPopUpProps = GraphEditPopUpProps & {
  handleClose: () => void;
};

export const GraphEditPopUp = ({ ctrl }: GraphEditPopUpProps) => {
  const popUp = ctrl.popUp;
  const handleClose = () => {
    popUp.setState({ ...popUp.state, isOpen: false });
  };
  if (!!popUp.state.nodeEdit) {
    return <NodeEditPopUp handleClose={handleClose} ctrl={ctrl} />;
  } else if (!!popUp.state.linkEdit) {
    return <LinkCreatePopUp handleClose={handleClose} ctrl={ctrl} />;
  } else {
    return <></>;
  }
};

const addKeyboardShortcuts = (formik: any) => {
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
};

export const isValidNodeForLink = (graph: ForceGraphGraphData) => {
  const conf: yup.TestConfig<string | undefined, yup.AnyObject> = {
    name: "isValidNodeForLink",
    message: "unknown",
    // @ts-ignore: not sure what's happening here
    test: function (value: string | undefined) {
      const { parent }: { parent: NewLinkForm } = this;
      const sourceID = parent.sourceNode;
      const targetID = parent.targetNode;
      if (!sourceID && !targetID) {
        return true;
      }
      if (sourceID === targetID) {
        throw this.createError({
          path: this.path,
          message: "self-linking is not allowed",
        });
      }
      if (!graph.nodes.find((node) => node.id === value)) {
        throw this.createError({
          path: this.path,
          message: `node ${value} does not exist`,
        });
      }
      if (
        !!graph.links.find(
          (link) => link.source.id === sourceID && link.target.id === targetID,
        )
      ) {
        throw this.createError({
          path: this.path,
          message: "link already exists",
        });
      }
      return true;
    },
  };
  return conf;
};

export const LinkCreatePopUp = ({
  handleClose,
  ctrl,
}: SubGraphEditPopUpProps) => {
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(0.5);
  const formik = useFormik<NewLinkForm>({
    initialValues: {
      sourceNode: "",
      targetNode: "",
      linkWeight: 5,
    },
    validationSchema: yup.object({
      sourceNode: yup.string().test(isValidNodeForLink(ctrl.graph.current)),
      targetNode: yup.string().test(isValidNodeForLink(ctrl.graph.current)),
    }),
    onSubmit: (form: NewLinkForm) => {
      // @ts-ignore: FIXME
      const value: number = sliderValue * 10;
      ctrl.popUp.state.linkEdit?.onFormSubmit({ ...form, linkWeight: value });
      handleClose();
    },
  });
  useEffect(() => {
    return addKeyboardShortcuts(formik);
  }, [formik]);
  const fields = [];
  const nodes = ctrl.graph.current.nodes;
  const getLabelForNode = (node: ForceGraphNodeObject) => {
    if (!node) {
      return "";
    }
    return `${node?.description} (${node.id})`;
  };
  const getIDForNode = (node: ForceGraphNodeObject) => node?.id ?? "";
  fields.push(
    <TextFieldFormikGeneratorAutocomplete
      fieldName="sourceNode"
      fieldLabel="Source Node"
      formik={formik}
      autoFocus
      options={nodes}
      optionLabel={getLabelForNode}
      optionValue={getIDForNode}
      defaultValue=""
    />,
  );
  fields.push(
    <TextFieldFormikGeneratorAutocomplete
      fieldName="targetNode"
      fieldLabel="Target Node"
      formik={formik}
      options={nodes}
      optionLabel={getLabelForNode}
      optionValue={getIDForNode}
      defaultValue=""
    />,
  );
  fields.push(
    <LinkWeightSlider defaultValue={5} setSliderValue={setSliderValue} />,
  );
  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={handleClose}
      fields={fields}
      formik={formik}
    />
  );
};

const NodeEditPopUp = ({ handleClose, ctrl }: SubGraphEditPopUpProps) => {
  const formik = useFormik<NewNodeForm>({
    initialValues: {
      nodeDescription: "",
    },
    validationSchema: null,
    onSubmit: (form: NewNodeForm) => {
      ctrl.popUp.state.nodeEdit?.onFormSubmit(form);
      handleClose();
    },
  });
  useEffect(() => {
    return addKeyboardShortcuts(formik);
  }, [formik]);
  const fields = [];
  fields.push(
    <TextFieldFormikGenerator
      fieldName="nodeDescription"
      fieldLabel="Node Description"
      formik={formik}
      autoFocus
    />,
  );
  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={handleClose}
      fields={fields}
      formik={formik}
    />
  );
};

type DraggableFormPorops = SubGraphEditPopUpProps & {
  popUp: PopUpControls;
  fields: any;
  formik: { submitForm: () => void };
};

export const DraggableForm = ({
  popUp,
  handleClose,
  fields,
  formik,
}: DraggableFormPorops) => {
  return (
    <>
      <Dialog
        open={popUp.state.isOpen}
        onClose={handleClose}
        PaperComponent={DraggablePaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={DialogueStyles.dialogRoot}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {popUp.state.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{popUp.state.details}</DialogContentText>
          {fields}
        </DialogContent>
        <DialogActions sx={DialogueStyles.dialogButtons}>
          <Tooltip title="Esc">
            <Button onClick={handleClose}> Cancel </Button>
          </Tooltip>
          <Tooltip title="Ctrl + Enter">
            <Button onClick={() => formik.submitForm()}> Save </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};
