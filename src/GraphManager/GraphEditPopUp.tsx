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
import Slider from "@mui/material/Slider";
import { Mark } from "@mui/base/useSlider";
import { useFormik } from "formik";
import {
  Controller,
  DEFAULT_EDIT_LINK_WEIGHT,
  INTERIM_TMP_LINK_ID,
  MAX_LINK_WEIGHT,
} from "./GraphEdit";
import {
  DialogueStyles,
  TextFieldFormikGenerator,
  TextFieldFormikGeneratorAutocomplete,
} from "src/shared/Styles";
import { ForceGraphGraphData, ForceGraphNodeObject } from "./types";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/system";

const MIN_NODE_DESCRIPTION_LENGTH = 2; // note: for chinese words, 2 characters is already precise
const MAX_NODE_DESCRIPTION_LENGTH = 40;

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
  const { t } = useTranslation();
  const marks: Mark[] = [
    {
      value: 1,
      label: t("Link-weight-Irrelevant"),
    },
    {
      value: 5,
      label: t("Link-weight-Useful"),
    },
    {
      value: 9,
      label: t("Link-weight-Necessary"),
    },
  ];
  return (
    <Slider
      defaultValue={props.defaultValue}
      onChange={onSliderValueChange}
      step={0.01}
      min={0.00001}
      max={MAX_LINK_WEIGHT}
      marks={marks}
    />
  );
};

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
  linkVote?: LinkVote;
}

export interface NodeEdit {
  onFormSubmit: (form: NewNodeForm) => void;
  defaultFormContent?: ForceGraphNodeObject;
  onDelete?: () => void;
}
export interface LinkEditDefaultValues {
  source?: ForceGraphNodeObject;
  target?: ForceGraphNodeObject;
}
export interface LinkEdit {
  onFormSubmit: (form: NewLinkForm) => void;
  defaults?: LinkEditDefaultValues;
  onNonSubmitClose?: () => void;
}

export interface LinkVote {
  onSubmit: (value: number) => void;
  onDelete?: () => void;
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
    popUp.setState({ isOpen: false });
  };
  if (!!popUp.state.nodeEdit) {
    return <NodeEditPopUp handleClose={handleClose} ctrl={ctrl} />;
  } else if (!!popUp.state.linkEdit) {
    return <LinkCreatePopUp handleClose={handleClose} ctrl={ctrl} />;
  } else if (!!popUp.state.linkVote) {
    return <LinkVotePopUp handleClose={handleClose} ctrl={ctrl} />;
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
      if ((!sourceID && !targetID) || !value) {
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
      const existingLink = graph.links.find(
        (link) => link.source.id === sourceID && link.target.id === targetID,
      );
      if (!!existingLink && existingLink.id !== INTERIM_TMP_LINK_ID) {
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
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(
    DEFAULT_EDIT_LINK_WEIGHT,
  );
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
      const value: number = sliderValue;
      ctrl.popUp.state.linkEdit?.onFormSubmit({ ...form, linkWeight: value });
      handleClose();
    },
  });
  const extendedHandleClose = () => {
    if (!!ctrl.popUp.state.linkEdit?.onNonSubmitClose) {
      ctrl.popUp.state.linkEdit?.onNonSubmitClose();
    }
    handleClose();
  };
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
  const { t } = useTranslation();
  fields.push(
    <TextFieldFormikGeneratorAutocomplete
      fieldName="sourceNode"
      fieldLabel={t("Source Node")}
      formik={formik}
      autoFocus
      options={nodes}
      optionLabel={getLabelForNode}
      optionValue={getIDForNode}
      defaultValue={ctrl.popUp.state.linkEdit?.defaults?.source ?? ""}
    />,
  );
  fields.push(
    <TextFieldFormikGeneratorAutocomplete
      fieldName="targetNode"
      fieldLabel={t("Target Node")}
      formik={formik}
      options={nodes}
      optionLabel={getLabelForNode}
      optionValue={getIDForNode}
      defaultValue={ctrl.popUp.state.linkEdit?.defaults?.target ?? ""}
    />,
  );
  fields.push(
    <LinkWeightSlider
      defaultValue={DEFAULT_EDIT_LINK_WEIGHT}
      setSliderValue={setSliderValue}
    />,
  );
  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={extendedHandleClose}
      fields={fields}
      formik={formik}
    />
  );
};

interface VoteLinkForm {
  linkWeight: number;
}
const LinkVotePopUp = ({ handleClose, ctrl }: SubGraphEditPopUpProps) => {
  const [sliderValue, setSliderValue] = useState<Number | Array<Number>>(
    DEFAULT_EDIT_LINK_WEIGHT,
  );
  const formik = useFormik<VoteLinkForm>({
    initialValues: {
      linkWeight: 5,
    },
    validationSchema: null,
    onSubmit: (_: VoteLinkForm) => {
      // @ts-ignore: FIXME
      const value: number = sliderValue;
      ctrl.popUp.state.linkVote?.onSubmit(value);
      handleClose();
    },
  });
  const fields = [];
  fields.push(
    <LinkWeightSlider
      defaultValue={DEFAULT_EDIT_LINK_WEIGHT}
      setSliderValue={setSliderValue}
    />,
  );
  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={handleClose}
      fields={fields}
      formik={formik}
      onDelete={ctrl.popUp.state.linkVote?.onDelete}
    />
  );
};

export const nodeValidation = yup.object({
  nodeDescription: yup
    .string()
    .min(MIN_NODE_DESCRIPTION_LENGTH)
    .max(MAX_NODE_DESCRIPTION_LENGTH),
});

const NodeEditPopUp = ({ handleClose, ctrl }: SubGraphEditPopUpProps) => {
  const formik = useFormik<NewNodeForm>({
    initialValues: {
      nodeDescription:
        ctrl.popUp.state.nodeEdit?.defaultFormContent?.description ?? "",
    },
    validationSchema: nodeValidation,
    onSubmit: (form: NewNodeForm) => {
      ctrl.popUp.state.nodeEdit?.onFormSubmit(form);
      handleClose();
    },
  });
  useEffect(() => {
    return addKeyboardShortcuts(formik);
  }, [formik]);
  const fields = [];
  const { t } = useTranslation();
  fields.push(
    <TextFieldFormikGenerator
      fieldName="nodeDescription"
      fieldLabel={t("Node Description")}
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
      onDelete={ctrl.popUp.state.nodeEdit?.onDelete}
    />
  );
};

type DraggableFormPorops = SubGraphEditPopUpProps & {
  popUp: PopUpControls;
  fields: any;
  formik: { submitForm: () => void };
  onDelete?: () => void;
};

export const DraggableForm = (props: DraggableFormPorops) => {
  const { t } = useTranslation();
  const onDelete = () => {
    props.handleClose();
    props.onDelete!();
  };
  const theme = useTheme();
  return (
    <>
      <Dialog
        open={props.popUp.state.isOpen}
        onClose={props.handleClose}
        PaperComponent={DraggablePaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={DialogueStyles.dialogRoot}
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {props.popUp.state.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{props.popUp.state.details}</DialogContentText>
          {props.fields}
        </DialogContent>
        <DialogActions sx={DialogueStyles.dialogButtons}>
          <Tooltip title={t("Esc")}>
            <Button onClick={props.handleClose}> {t("Cancel")} </Button>
          </Tooltip>
          {!!props.onDelete && (
            <Button
              onClick={onDelete}
              style={{
                backgroundColor: theme.palette.warning.main,
                color: theme.palette.warning.contrastText,
              }}
            >
              {t("Delete")}
            </Button>
          )}
          <Tooltip title={t("Ctrl + Return")}>
            <Button onClick={() => props.formik.submitForm()}>
              {t("Save")}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
};
