import { useEffect, Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
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
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import {
  Controller,
  DEFAULT_EDIT_LINK_WEIGHT,
  INTERIM_TMP_LINK_ID,
  MAX_LINK_WEIGHT,
} from "./GraphEdit";
import {
  DialogueStyles,
  TextFieldFormikGeneratorRequired,
  TextFieldFormikGeneratorAutocomplete,
} from "@src/shared/Styles";
import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
} from "@src/GraphManager/types";
import { MarkdownEditorWrapper } from "./MarkdownField";
import { useNodeEdits } from "@src/GraphManager/RPCHooks/useNodeEdits";
import { useLinkEdits } from "@src/GraphManager/RPCHooks/useLinkEdits";
import { NodeEdit as BackendNodeEdit, NodeEditType } from "../RPCHooks/types";
import { AvatarGroup, List, ListItem, useTheme } from "@mui/material";
import i18n from "@src/shared/i18n";
import { useUserDataContext } from "@src/Context/UserDataContext";

// TODO(skep): MIN_NODE_DESCRIPTION_LENGTH should be language dependent; for
// chinese words, 1-2 characters is already precise, but for english a single
// character doesn't make any sense.
const MIN_NODE_DESCRIPTION_LENGTH = 1;
const MAX_NODE_DESCRIPTION_LENGTH = 40;

interface LinkWeightSliderProps {
  defaultValue: number;
  setSliderValue: React.Dispatch<React.SetStateAction<number | Array<number>>>;
}

export const LinkWeightSlider = (props: LinkWeightSliderProps) => {
  const onSliderValueChange = (
    _event: any,
    newValue: number | Array<number>,
  ) => {
    // update internal-state to commit to the backend
    props.setSliderValue(newValue);
    // update user-interface to display slider value change
    // @ts-ignore
    setValue(newValue);
  };
  // XXX(skep): hack to update the default value, if the user already voted and
  // the last-vote result arrives delayed from the backend
  useEffect(() => {
    setValue(props.defaultValue);
  }, [props.defaultValue]);
  const [value, setValue] = useState(props.defaultValue);
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
      value={value}
      onChange={onSliderValueChange}
      step={0.1}
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
  bottomContent?: React.ReactNode;
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
  linkID?: string;
}

export interface NewNodeForm {
  nodeDescription: string;
  nodeResources: string;
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
  if (popUp.state.nodeEdit) {
    return <NodeEditPopUp handleClose={handleClose} ctrl={ctrl} />;
  } else if (popUp.state.linkEdit) {
    return <LinkCreatePopUp handleClose={handleClose} ctrl={ctrl} />;
  } else if (popUp.state.linkVote) {
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
          message: `node ${value} does not`,
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

export const getLabelForNode = (node: ForceGraphNodeObject) => {
  if (!node) {
    return "";
  }
  return `${node?.description}`;
};
export const getKeyForNode = (node: ForceGraphNodeObject) => {
  if (!node) {
    return "";
  }
  return `${node?.id}`;
};
export const getIDForNode = (node: ForceGraphNodeObject) => node?.id ?? "";
export const LinkCreatePopUp = ({
  handleClose,
  ctrl,
}: SubGraphEditPopUpProps) => {
  const [sliderValue, setSliderValue] = useState<number | Array<number>>(
    DEFAULT_EDIT_LINK_WEIGHT,
  );
  const [dynamicFields, setDynamicFields] = useState<{
    source: boolean;
    target: boolean;
  }>({ source: false, target: false });
  const [newNodeResources, setNewNodeResources] = useState<{
    source: string;
    target: string;
  }>({ source: "", target: "" });

  const formik = useFormik<NewLinkForm>({
    initialValues: {
      sourceNode: "",
      targetNode: "",
      linkWeight: 5,
    },
    validationSchema: yup.object({
      sourceNode: yup.string().test("validate-node", function (value) {
        if (!value) return true;
        if (!ctrl.graph.current.nodes.find((node) => node.id === value)) {
          return this.createError({
            path: this.path,
            message: `Node "${value}" does not exist. Click "Insert Node" to create.`,
          });
        }
        return true;
      }),
      targetNode: yup.string().test("validate-node", function (value) {
        if (!value) return true;
        if (!ctrl.graph.current.nodes.find((node) => node.id === value)) {
          return this.createError({
            path: this.path,
            message: `Node "${value}" does not exist. Click "Insert Node" to create.`,
          });
        }
        return true;
      }),
    }),
    onSubmit: (form: NewLinkForm) => {
      const finalSliderValue: number = sliderValue as number;
      ctrl.popUp.state.linkEdit?.onFormSubmit({
        ...form,
        linkWeight: finalSliderValue,
      });
      handleClose();
    },
  });

  const handleAddNode = (field: "source" | "target") => {
    const nodeName = formik.values[field === "source" ? "sourceNode" : "targetNode"];
    const newNode = {
      id: nodeName,
      description: nodeName,
      resources: newNodeResources[field],
    };

    // Add the new node to the graph
    ctrl.graph.current.nodes.push(newNode);

    // Clear the error and dynamic fields for the respective field
    setNewNodeResources({ ...newNodeResources, [field]: "" });
    setDynamicFields({ ...dynamicFields, [field]: false });
    formik.validateForm();
  };

  const nodes = ctrl.graph.current.nodes;

  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={handleClose}
      isEditingEnabled={ctrl.mode.isEditingEnabled}
      formik={formik}
      fields={[
        <div key="sourceField">
          <TextFieldFormikGeneratorAutocomplete
            fieldName="sourceNode"
            fieldLabel={"Source Node"}
            formik={formik}
            options={nodes}
            optionLabel={getLabelForNode}
            optionKey={getKeyForNode}
            optionValue={getIDForNode}
            autoFocus
          />
          {formik.errors.sourceNode && !dynamicFields.source && (
            <Typography
              variant="body2"
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "0.5em",
              }}
              onClick={() =>
                setDynamicFields({ ...dynamicFields, source: true })
              }
            >
              Insert Node
            </Typography>
          )}
          {dynamicFields.source && (
            <>
              <MarkdownEditorWrapper
                fieldName="nodeResources"
                fieldLabel={"Node Resources"}
                initialMarkdownContent=""
                setValueOnChange={(markdown: string) =>
                  setNewNodeResources({ ...newNodeResources, source: markdown })
                }
                isEditingEnabled={ctrl.mode.isEditingEnabled}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddNode("source")}
                sx={{ marginTop: "1em" }}
                disabled={!newNodeResources.source.trim()}
              >
                {"Confirm Node Creation"}
              </Button>
            </>
          )}
        </div>,
        <div key="targetField">
          <TextFieldFormikGeneratorAutocomplete
            fieldName="targetNode"
            fieldLabel={"Target Node"}
            formik={formik}
            options={nodes}
            optionLabel={getLabelForNode}
            optionKey={getKeyForNode}
            optionValue={getIDForNode}
          />
          {formik.errors.targetNode && !dynamicFields.target && (
            <Typography
              variant="body2"
              style={{
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
                marginTop: "0.5em",
              }}
              onClick={() =>
                setDynamicFields({ ...dynamicFields, target: true })
              }
            >
              Insert Node
            </Typography>
          )}
          {dynamicFields.target && (
            <>
              <MarkdownEditorWrapper
                fieldName="nodeResources"
                fieldLabel={"Node Resources"}
                initialMarkdownContent=""
                setValueOnChange={(markdown: string) =>
                  setNewNodeResources({ ...newNodeResources, target: markdown })
                }
                isEditingEnabled={ctrl.mode.isEditingEnabled}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddNode("target")}
                sx={{ marginTop: "1em" }}
                disabled={!newNodeResources.target.trim()}
              >
                {"Confirm Node Creation"}
              </Button>
            </>
          )}
        </div>,
        <LinkWeightSlider
          defaultValue={DEFAULT_EDIT_LINK_WEIGHT}
          setSliderValue={setSliderValue}
        />,
      ]}
    />
  );
};




interface VoteLinkForm {
  linkWeight: number;
}
const LinkVotePopUp = ({ handleClose, ctrl }: SubGraphEditPopUpProps) => {
  const { userName } = useUserDataContext();
  const [sliderValue, setSliderValue] = useState<number | Array<number>>(
    DEFAULT_EDIT_LINK_WEIGHT,
  );
  const {
    data,
    queryResponse: { loading },
  } = useLinkEdits(ctrl.popUp.state.linkVote!.linkID!);
  const [sliderDefault, setSliderDefault] = useState(DEFAULT_EDIT_LINK_WEIGHT);
  useEffect(() => {
    console.log(`loading=${loading}, ${data?.edgeEdits}`);
    const yourEdits = data?.edgeEdits.filter((e) => e.username == userName);
    if (yourEdits && yourEdits.length > 0) {
      const yourLinkVote = yourEdits[yourEdits.length - 1].weight;
      console.log(`yourLinkVote=${yourLinkVote}`);
      setSliderDefault(yourLinkVote); // FIXME(skep): doesn't work, MUI says we should use "controlled" slider?!
      setSliderValue(yourLinkVote); // XXX(skep): doesn't work either
    }
  }, [loading, data]);
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
      // TODO(skep): display to the user that the current value is the last
      // voted one!
      defaultValue={sliderDefault}
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
      isEditingEnabled={ctrl.mode.isEditingEnabled}
    />
  );
};

export const nodeValidation = yup.object({
  nodeDescription: yup
    .string()
    .min(MIN_NODE_DESCRIPTION_LENGTH)
    .max(MAX_NODE_DESCRIPTION_LENGTH),
});

interface LinkDisplayData {
  nodeName: string;
  weight: number;
  linkId: string;
}
interface NodeIdAccumulator {
  inboundSourceIds: LinkDisplayData[];
  outboundTargetIds: LinkDisplayData[];
}

const NodeEditPopUp = ({ handleClose, ctrl }: SubGraphEditPopUpProps) => {
  let nodeEditsAvailable, nodeEditsData, nodeEditsLoading;
  if (ctrl.popUp.state.nodeEdit?.defaultFormContent?.id) {
    const {
      data,
      queryResponse: { loading },
    } = useNodeEdits(ctrl.popUp.state.nodeEdit?.defaultFormContent?.id);
    [nodeEditsData, nodeEditsLoading, nodeEditsAvailable] = [
      data,
      loading,
      true,
    ];
  } else {
    [nodeEditsData, nodeEditsLoading, nodeEditsAvailable] = [
      undefined,
      false,
      false,
    ];
  }
  const { t } = useTranslation();

  const currentlySelectedNodeId =
    ctrl.popUp.state.nodeEdit?.defaultFormContent?.id;
  const connectedLinks: NodeIdAccumulator =
    ctrl.graph.current.links.reduce<NodeIdAccumulator>(
      (acc, currentLink) => {
        if (currentLink.target.id === currentlySelectedNodeId) {
          acc.inboundSourceIds.push({
            nodeName: currentLink.source.description,
            weight: currentLink.value,
            linkId: currentLink.id,
          });
        } else if (currentLink.source.id === currentlySelectedNodeId) {
          acc.outboundTargetIds.push({
            nodeName: currentLink.target.description,
            weight: currentLink.value,
            linkId: currentLink.id,
          });
        }
        return acc;
      },
      {
        inboundSourceIds: [],
        outboundTargetIds: [],
      },
    );

  connectedLinks.inboundSourceIds = connectedLinks.inboundSourceIds.sort(
    (linkA, linkB) => linkB.weight - linkA.weight,
  );
  connectedLinks.outboundTargetIds = connectedLinks.outboundTargetIds.sort(
    (linkA, linkB) => linkB.weight - linkA.weight,
  );

  const formik = useFormik<NewNodeForm>({
    initialValues: {
      nodeDescription:
        ctrl.popUp.state.nodeEdit?.defaultFormContent?.description ?? "",
      nodeResources:
        ctrl.popUp.state.nodeEdit?.defaultFormContent?.resources ?? "",
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

  interface LinkDisplayProps {
    linkDisplay: LinkDisplayData;
    backdropFillColor: string;
  }

  const LinkDisplay = ({
    linkDisplay,
    backdropFillColor,
  }: LinkDisplayProps) => {
    const endPosition = (100 * linkDisplay.weight) / MAX_LINK_WEIGHT;
    const theme = useTheme();
    const lowerContrast = theme.palette.text.secondary;

    return (
      <ListItem
        key={linkDisplay.linkId}
        sx={{
          border: "1px solid #eee",
          borderRadius: "5px",
          background: `linear-gradient(to right, ${backdropFillColor} ${endPosition}%, transparent ${endPosition}%, transparent 100%)`,
          "& .link-weight-display": {
            visibility: "hidden",
          },
          "&:hover": {
            border: `1px solid ${backdropFillColor}`,
            boxShadow: `inset 0 0 1px 2px ${backdropFillColor}`,
            "& .link-weight-display": {
              visibility: "visible",
              color: lowerContrast,
            },
          },
        }}
      >
        <Typography>
          {linkDisplay.nodeName}
          <span className="link-weight-display">{` — ${linkDisplay.weight}`}</span>
        </Typography>
      </ListItem>
    );
  };
  const incomingItemCount = connectedLinks.inboundSourceIds.length;
  const outgoingItemCount = connectedLinks.outboundTargetIds.length;
  const theme = useTheme();
  const primaryLight =
    theme.palette.mode === "dark"
      ? theme.palette.primary.dark
      : theme.palette.primary.light;
  const secondaryLight =
    theme.palette.mode === "dark"
      ? theme.palette.secondary.dark
      : theme.palette.secondary.light;

  const thisSubjectDescription = {
    thisSubject:
      ctrl.popUp.state.nodeEdit?.defaultFormContent?.description ??
      "[this-subject]",
  };
  const bottomContent =
    !incomingItemCount && !outgoingItemCount ? null : (
      <Box sx={{ display: "flex", gap: "2em", flexDirection: "column" }}>
        {!!outgoingItemCount && (
          <Box>
            <Typography variant="h6">
              {t("outboundDependency", thisSubjectDescription)}
            </Typography>
            <List>
              {connectedLinks.outboundTargetIds.map((linkDisplay) => (
                <LinkDisplay
                  linkDisplay={linkDisplay}
                  backdropFillColor={primaryLight}
                />
              ))}
            </List>
          </Box>
        )}
        {!!incomingItemCount && (
          <Box>
            <Typography variant="h6">
              {t("inboundDependency", thisSubjectDescription)}
            </Typography>
            <List>
              {connectedLinks.inboundSourceIds.map((linkDisplay) => (
                <LinkDisplay
                  linkDisplay={linkDisplay}
                  backdropFillColor={secondaryLight}
                />
              ))}
            </List>
          </Box>
        )}
      </Box>
    );
  const fields = [
    <TextFieldFormikGeneratorRequired
      fieldName="nodeDescription"
      fieldLabel={t("Node Description")}
      formik={formik}
      disabled={!ctrl.mode.isEditingEnabled}
      autoFocus
    />,
    <MarkdownEditorWrapper
      fieldName="nodeResources"
      fieldLabel={t("Node Resources")}
      initialMarkdownContent={formik.initialValues.nodeResources}
      setValueOnChange={(markdown: string) => {
        const helpers = formik.getFieldHelpers("nodeResources");
        helpers.setValue(markdown);
      }}
      isEditingEnabled={ctrl.mode.isEditingEnabled}
    />,
  ];
  const { nodeCreator, nodeEditors } = analyzeEdits(nodeEditsData?.nodeEdits);
  // if no edits are available (i.e. node is being created right now), don't show anything
  const topRight = !nodeEditsAvailable ? (
    <></>
  ) : nodeEditsLoading ? (
    <>...</>
  ) : (
    <Tooltip
      title={
        <>
          <Typography>
            {t("node-display.Node created by", {
              nodeCreator: nodeCreator.username,
            })}
          </Typography>
          {nodeEditors && nodeEditors.length >= 1 && (
            <Typography>
              {t("node-display.Node edited by", {
                nodeEditors: nodeEditors
                  .map((editor) => `${editor.username}`)
                  .join(", "),
              })}
            </Typography>
          )}
        </>
      }
    >
      <AvatarGroup max={4}>
        <Avatar {...stringAvatar(nodeCreator.username)} />
        {nodeEditors &&
          nodeEditors.map((editor) => (
            <Avatar {...stringAvatar(editor.username)} />
          ))}
      </AvatarGroup>
    </Tooltip>
  );
  return (
    <DraggableForm
      ctrl={ctrl}
      popUp={ctrl.popUp}
      handleClose={handleClose}
      fields={fields}
      formik={formik}
      onDelete={ctrl.popUp.state.nodeEdit?.onDelete}
      isEditingEnabled={ctrl.mode.isEditingEnabled}
      topRight={topRight}
      bottomContent={bottomContent}
    />
  );
};

export const analyzeEdits = (
  nodeEdits: BackendNodeEdit[] | undefined,
): { nodeCreator: BackendNodeEdit; nodeEditors?: BackendNodeEdit[] } => {
  const creator = nodeEdits?.find(
    (edit: BackendNodeEdit) => edit.type === NodeEditType.create,
  );
  const editors = [
    ...new Map(
      nodeEdits
        ?.filter(
          (edit: BackendNodeEdit) =>
            edit.type === NodeEditType.edit &&
            edit.username !== creator?.username,
        )
        .map((editor) => [editor.username, editor]),
    ).values(),
  ];
  return {
    // @ts-ignore
    nodeCreator: creator ?? {
      username: "unknown",
      type: NodeEditType.create,
      updatedAt: "",
    },
    nodeEditors: editors,
  };
};

// stringToColor creates colors for the avatars of people editing nodes
const stringToColor = (string: string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};
const stringAvatar = (name: string) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[1]}`,
  };
};

type DraggableFormProps = SubGraphEditPopUpProps & {
  popUp: PopUpControls;
  fields: any;
  formik: { submitForm: () => void };
  onDelete?: () => void;
  isEditingEnabled: boolean;
  topRight?: any;
  bottomContent?: React.ReactNode;
};

export const DraggableForm = (props: DraggableFormProps) => {
  const { t } = useTranslation();
  const onDelete = () => {
    props.handleClose();
    props.onDelete!();
  };
  return (
    <>
      <Dialog
        open={props.popUp.state.isOpen}
        onClose={props.handleClose}
        PaperComponent={DraggablePaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={DialogueStyles.dialogRoot}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DialogTitle
            sx={{ flex: 1 }}
            style={{ cursor: "move" }}
            id="draggable-dialog-title"
          >
            {props.popUp.state.title}
          </DialogTitle>
          {props.topRight ?? <></>}
        </Box>
        <DialogContent style={{ overflow: "visible" }}>
          <DialogContentText>{props.popUp.state.details}</DialogContentText>
          {props.fields}
        </DialogContent>
        <DialogActions sx={DialogueStyles.dialogButtons}>
          <Tooltip title={t("Esc")}>
            <Button variant="outlined" onClick={props.handleClose}>
              {" "}
              {t("Cancel")}{" "}
            </Button>
          </Tooltip>
          {!!props.onDelete && (
            <Button
              variant="contained"
              color="warning"
              onClick={onDelete}
              disabled={!props.isEditingEnabled}
            >
              {t("Delete")}
            </Button>
          )}
          <Tooltip title={t("Ctrl + Return")}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => props.formik.submitForm()}
              disabled={!props.isEditingEnabled}
            >
              {t("Save")}
            </Button>
          </Tooltip>
        </DialogActions>
        {!!props.bottomContent && (
          <DialogContent sx={{ minHeight: "120px" }}>
            {props.bottomContent}
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
