import { useState, ReactNode } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {
  Divider,
  Typography,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

import { DataSetType, GraphData, LinkType, NodeType } from "GraphManager/types";
import { EditNodeMenu } from "./components/EditNodeMenu";
import { EditLinksMenu } from "./components/EditLinksMenu";
import { editNode } from "./utilities/editNode";
import {
  CreateNodeFn,
  CreateNodeFnResponse,
} from "src/GraphManager/hooks/useCreateNode";
import { CreateEdgeFn } from "src/GraphManager/hooks/useCreateEdge";

export type EditTabProps = {
  currentGraphDataset: DataSetType;
  updateDisplayedGraph: (value: DataSetType) => void;
  createNode: CreateNodeFn;
  createEdge: CreateEdgeFn;
};

export const findForwardLinks = (
  graph: GraphData,
  nodeId: string
): LinkType[] => {
  return graph.links?.filter((link: LinkType) => link.target === nodeId) ?? [];
};

export const findBackwardLinks = (
  graph: GraphData,
  nodeId: string
): LinkType[] => {
  return graph.links?.filter((link: LinkType) => link.source === nodeId) ?? [];
};

// TODO: use running index to avoid conflicts when adding nodes in succession
export const TMPNODE_ID = "TMPNEWNODE";
export const TMPLINK_ID = "TMPNEWEDGE";

export const updateNodeFn = (args: {
  graphData: GraphData;
  selectedNodeInGraph: NodeType;
  createNode: CreateNodeFn;
  currentGraphDataset: DataSetType;
  setSelectedNodeDescription: (description: string) => void;
  updateDisplayedGraph: (value: DataSetType) => void;
}) => {
  return ({
    node,
    isNewNode,
  }: {
    isNewNode: boolean;
    node: NodeType;
  }): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const { dataSetName } = args.currentGraphDataset;
      let newGraph: GraphData | undefined = undefined;
      if (isNewNode) {
        newGraph = editNode({
          graph: args.graphData,
          newNode: { ...node, id: TMPNODE_ID },
          selectedNode: args.selectedNodeInGraph,
          isNewNode,
        });
        args
          .createNode({
            description: {
              translations: [
                {
                  language: "en" /*TODO(skep): use language header*/,
                  content: node.description,
                },
              ],
            },
          })
          .then((rsp: CreateNodeFnResponse) => {
            if (!rsp.data) {
              reject("empty response from backend");
              return;
            }
            const newNewGraph = editNode({
              graph: args.graphData,
              newNode: { ...node, id: rsp.data?.createNode.ID },
              selectedNode: { ...node, id: TMPNODE_ID },
              isNewNode: false,
            });
            args.updateDisplayedGraph({ dataSetName, data: newNewGraph });
            resolve();
          });
      } else {
        newGraph = editNode({
          graph: args.graphData,
          newNode: node,
          selectedNode: args.selectedNodeInGraph,
          isNewNode,
        });
        resolve();
      }
      args.setSelectedNodeDescription(node.description);
      args.updateDisplayedGraph({ dataSetName, data: newGraph });
    });
  };
};

export const updateLinkFn = (props: EditTabProps) => {
  return ({
    oldLink,
    updatedLink,
  }: {
    oldLink: LinkType | undefined;
    updatedLink: LinkType; // TODO: use partial link type w/o ID field here
  }): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const {
        dataSetName,
        data: { nodes, links },
      } = props.currentGraphDataset;
      const updatedLinks = [...(links ?? [])];
      if (!oldLink) {
        updatedLinks?.push({ ...updatedLink, id: TMPLINK_ID });
        props
          .createEdge({
            from: updatedLink.source,
            to: updatedLink.target,
            weight: updatedLink.value,
          })
          .then((data) => {
            if (!data.data) {
              reject(`Could not create Edge in Backend: ${data}`);
              return;
            }
            console.log("createEdge -> ");
            console.dir(data);
            const linkIndex =
              updatedLinks?.findIndex((link) => link.id == TMPLINK_ID) ?? -1;
            if (linkIndex === -1) {
              reject("no recently edited link available (bug!)");
            }
            updatedLinks[linkIndex] = {
              ...updatedLink,
              id: data.data?.createEdge.ID,
            };
            const newGraph = { nodes, links: updatedLinks };
            props.updateDisplayedGraph({ dataSetName, data: newGraph });
            resolve();
          });
      } else {
        const linkIndex = links?.findIndex((link) => link === oldLink) ?? -1;
        updatedLinks[linkIndex] = updatedLink;
        if (linkIndex === -1) {
          reject("unknown index on link update");
        }
        resolve();
      }

      const newGraph = { nodes, links: updatedLinks };
      props.updateDisplayedGraph({ dataSetName, data: newGraph });
    });
  };
};

export const EditTab = (props: EditTabProps): JSX.Element => {
  const { data: graphData } = props.currentGraphDataset;

  const firstNode = graphData.nodes?.[0];
  const [selectedNodeID, setSelectedNodeID] = useState(firstNode?.id);
  const [selectedNodeDescription, setSelectedNodeDescription] = useState(
    firstNode?.description
  );
  const selectedNodeInGraph =
    graphData.nodes?.find(({ id }) => id === selectedNodeID) ??
    graphData.nodes?.[0];

  const handleSelectNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ): void => {
    //const nodeName = event.target.value as string;
    const nodeID = event.target.value as string;
    const node = graphData.nodes.find((node) => node.id === nodeID);
    if (!node) {
      throw new Error(`unknown node selected: id=${nodeID}`);
    }
    setSelectedNodeID(nodeID);
    setSelectedNodeDescription(node?.description);
  };

  const updateNode = updateNodeFn({
    graphData,
    selectedNodeInGraph,
    createNode: props.createNode,
    currentGraphDataset: props.currentGraphDataset,
    setSelectedNodeDescription,
    updateDisplayedGraph: props.updateDisplayedGraph,
  });

  const updateLink = updateLinkFn(props);

  const forwardLinks = findForwardLinks(graphData, selectedNodeID);
  const backwardLinks = findBackwardLinks(graphData, selectedNodeID);

  const renderOptions = graphData.nodes?.map(({ id, description }) => {
    return (
      <MenuItem key={id} value={id}>
        {description}
      </MenuItem>
    );
  });

  return (
    <>
      <Typography variant="h3">Edit Graph</Typography>
      <InputLabel id="select-active-node-label">Node</InputLabel>
      <Select
        labelId="select-active-node-label"
        id="select-active-node"
        value={selectedNodeID ?? ""}
        onChange={handleSelectNode}
      >
        {renderOptions}
      </Select>
      <Divider />
      <EditNodeMenu
        node={selectedNodeInGraph}
        currentText={selectedNodeDescription}
        updateText={setSelectedNodeDescription}
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
