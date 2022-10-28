import { useState, ReactNode } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { DataSetType, GraphData, LinkType, NodeType } from "../../../types";
import { EditNodeMenu } from "./components/EditNodeMenu";
import { EditLinksMenu } from "./components/EditLinksMenu";
import { editNode } from "./utilities/editNode";
import {
  Divider,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

type EditTabProps = {
  currentGraphDataset: DataSetType;
  updateDisplayedGraph: (value: DataSetType) => void;
};

export const EditTab = ({
  currentGraphDataset,
  updateDisplayedGraph,
}: EditTabProps): JSX.Element => {
  const { data: graphData } = currentGraphDataset;

  const firstNode = graphData.nodes?.[0];
  const [selectedNodeID, setSelectedNodeID] = useState(firstNode?.id);
  const [selectedNodeDescription, setSelectedNodeDescription] = useState(
    firstNode?.description
  );
  const [currentNodeEditingText, setCurrentNodeEditingText] = useState(
    selectedNodeDescription
  );
  const selectedNodeInGraph =
    graphData.nodes?.find(({ id }) => id === selectedNodeID) ??
    graphData.nodes?.[0];

  const handleSelectNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ): void => {
    //const nodeName = event.target.value as string;
    const tmp = event.target.value as string;
    const nodeName = tmp.split(";DIRTYHACK;")[0];
    const nodeID = tmp.split(";DIRTYHACK;")[1];
    setSelectedNodeID(nodeID);
    setSelectedNodeDescription(nodeName);
    setCurrentNodeEditingText(nodeName);
  };

  const updateNode = ({
    node,
    isNewNode,
  }: {
    isNewNode: boolean;
    node: NodeType;
  }): void => {
    const { description: newName } = node;
    const newGraph = editNode({
      graph: graphData,
      newNode: node,
      selectedNode: selectedNodeInGraph,
      isNewNode,
    });
    const { dataSetName } = currentGraphDataset;

    setSelectedNodeDescription(newName);
    setCurrentNodeEditingText(newName);
    updateDisplayedGraph({ dataSetName, data: newGraph });
  };

  const updateLink = ({
    oldLink,
    updatedLink,
  }: {
    oldLink: LinkType | undefined;
    updatedLink: LinkType;
  }): void => {
    const { dataSetName } = currentGraphDataset;
    const { nodes, links } = graphData;
    const updatedLinks = [...(links ?? [])];
    if (!oldLink) {
      updatedLinks?.push(updatedLink);
    } else {
      const linkIndex = links?.findIndex((link) => link === oldLink) ?? 0;
      updatedLinks[linkIndex] = updatedLink;
      if (linkIndex === -1) {
        throw new Error("Something went wrong in the updateLink method!");
      }
    }

    const newGraph = { nodes, links: updatedLinks };
    updateDisplayedGraph({ dataSetName, data: newGraph });
  };

  const findForwardLinks = (graph: GraphData, nodeId: string): LinkType[] => {
    const forwardLinks = graph.links?.filter(
      (link: LinkType) => link.target === nodeId
    );
    return forwardLinks ?? [];
  };

  const findBackwardLinks = (graph: GraphData, nodeId: string): LinkType[] => {
    const forwardLinks = graph.links?.filter(
      (link: LinkType) => link.source === nodeId
    );
    return forwardLinks ?? [];
  };

  const forwardLinks = findForwardLinks(graphData, selectedNodeID);
  const backwardLinks = findBackwardLinks(graphData, selectedNodeID);

  const renderOptions = graphData.nodes?.map(({ id, description }) => {
    return (
      <MenuItem key={id} value={description + ";DIRTYHACK;" + id}>
        {description}
      </MenuItem>
    );
  });
  const value =
    selectedNodeDescription && selectedNodeID
      ? selectedNodeDescription + ";DIRTYHACK;" + selectedNodeID
      : "";

  return (
    <>
      <Typography variant="h3">Edit Graph</Typography>
      <InputLabel id="select-active-node-label">Node</InputLabel>
      <Select
        labelId="select-active-node-label"
        id="select-active-node"
        value={value}
        //value={selectedNodeDescription}
        onChange={handleSelectNode}
      >
        {renderOptions}
      </Select>
      <Divider />
      <EditNodeMenu
        node={selectedNodeInGraph}
        currentText={currentNodeEditingText}
        updateText={setCurrentNodeEditingText}
        saveChanges={updateNode}
        finishEditing={undefined}
      />
      <EditLinksMenu
        nodes={graphData.nodes}
        forwardLinks={forwardLinks}
        backwardLinks={backwardLinks}
        onUpdateLink={updateLink}
        onUpdateNode={updateNode}
      />
    </>
  );
};
