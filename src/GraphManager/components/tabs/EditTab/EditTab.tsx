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
import {
  updateNodeInGraph,
  updateNodeInGraphProps,
} from "./utilities/editNode";
import {
  CreateNodeFn,
  CreateNodeFnResponse,
} from "src/GraphManager/hooks/useCreateNode";
import {
  CreateEdgeFn,
  CreateEdgeFnResponse,
} from "src/GraphManager/hooks/useCreateEdge";
import { UpdateNodeFn } from "src/GraphManager/hooks/useUpdateNode";
import { UpdateNodeFnResponse } from "src/GraphManager/hooks/useUpdateNode";

export type EditTabProps = {
  currentGraphDataset: DataSetType;
  updateDisplayedGraph: (value: DataSetType) => void;
  createNode: CreateNodeFn;
  updateNode: UpdateNodeFn;
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
export const updateNodeFn = (args: {
  currentGraphDataset: DataSetType;
  selectedNodeInGraph: NodeType;
  setSelectedNodeDescription: (description: string) => void;
  updateDisplayedGraph: (value: DataSetType) => void;
  createNode: CreateNodeFn;
  updateNode: UpdateNodeFn;
  getGraphWithUpdatedNode: (args: updateNodeInGraphProps) => GraphData;
}) => {
  return ({
    node,
    isNewNode,
  }: {
    isNewNode: boolean;
    node: NodeType;
  }): Promise<void | CreateNodeFnResponse | UpdateNodeFnResponse> => {
    if (isNewNode) {
      return args.createNode({
        description: {
          translations: [
            {
              language: "en" /*TODO(skep): use language header*/,
              content: node.description,
            },
          ],
        },
      });
    } else {
      // TODO: switch out once updateNode & backend call is available through the context as well
      return args.updateNode({
        id: node.id,
        description: {
          translations: [
            {
              language: "en" /*TODO(skep): use language header*/,
              content: node.description,
            },
          ],
        },
      });
    }
  };
};

// TODO: use running index to avoid conflicts when adding nodes in succession
export const TMPLINK_ID = "TMPNEWEDGE";
export const updateLinkFn = (props: EditTabProps) => {
  return ({
    oldLink,
    updatedLink,
  }: {
    oldLink: LinkType | undefined;
    updatedLink: LinkType; // TODO: use partial link type w/o ID field here
  }): Promise<void | CreateEdgeFnResponse> => {
    if (!oldLink) {
      return props.createEdge({
        from: updatedLink.source,
        to: updatedLink.target,
        weight: updatedLink.value,
      });
    } else {
      return new Promise<void>((resolve, reject) => {
        const {
          dataSetName,
          data: { nodes, links },
        } = props.currentGraphDataset;
        const updatedLinks = [...(links ?? [])];

        const linkIndex = links?.findIndex((link) => link === oldLink) ?? -1;
        updatedLinks[linkIndex] = updatedLink;
        if (linkIndex === -1) {
          reject("unknown index on link update");
        }
        resolve();

        const newGraph = { nodes, links: updatedLinks };
        props.updateDisplayedGraph({ dataSetName, data: newGraph });
      });
    }
  };
};

export const EditTab = (props: EditTabProps): JSX.Element => {
  const firstNode = props.currentGraphDataset.data.nodes?.[0];
  const [selectedNodeID, setSelectedNodeID] = useState(firstNode?.id);
  const [selectedNodeDescription, setSelectedNodeDescription] = useState(
    firstNode?.description
  );

  const selectedNodeInGraph =
    props.currentGraphDataset.data.nodes?.find(
      ({ id }) => id === selectedNodeID
    ) ?? props.currentGraphDataset.data.nodes?.[0];

  const handleSelectNode = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ): void => {
    //const nodeName = event.target.value as string;
    const nodeID = event.target.value as string;
    const node = props.currentGraphDataset.data.nodes.find(
      (node) => node.id === nodeID
    );
    if (!node) {
      throw new Error(`unknown node selected: id=${nodeID}`);
    }
    setSelectedNodeID(nodeID);
    setSelectedNodeDescription(node?.description);
  };

  const updateNode = updateNodeFn({
    currentGraphDataset: props.currentGraphDataset,
    selectedNodeInGraph,
    setSelectedNodeDescription,
    updateDisplayedGraph: props.updateDisplayedGraph,
    createNode: props.createNode,
    updateNode: props.updateNode,
    getGraphWithUpdatedNode: updateNodeInGraph,
  });

  const updateLink = updateLinkFn(props);

  const forwardLinks = findForwardLinks(
    props.currentGraphDataset.data,
    selectedNodeID
  );
  const backwardLinks = findBackwardLinks(
    props.currentGraphDataset.data,
    selectedNodeID
  );

  const renderOptions = props.currentGraphDataset.data.nodes?.map(
    ({ id, description }) => {
      return (
        <MenuItem key={id} value={id}>
          {description}
        </MenuItem>
      );
    }
  );

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
        nodes={props.currentGraphDataset.data.nodes}
        forwardLinks={forwardLinks}
        backwardLinks={backwardLinks}
        onUpdateLink={updateLink}
        onUpdateNode={updateNode}
      />
    </>
  );
};
