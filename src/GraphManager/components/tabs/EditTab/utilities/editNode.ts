import { GraphData, NodeType } from "../../../../types";

type EditNodeTypes = {
  graph: GraphData;
  newNode: NodeType;
  selectedNode: NodeType | undefined;
  isNewNode: boolean;
};
export const editNode = ({
  graph,
  newNode,
  selectedNode,
  isNewNode,
}: EditNodeTypes): GraphData => {
  const graphCopy = { ...graph };
  const { id: newID, group: newGroup } = newNode;

  if (isNewNode) {
    if (graphCopy.nodes.find((n) => n.id === newNode.id)) {
      throw new Error("Attempting to create a new Node that already exists");
    }
    graphCopy.nodes?.push(newNode);
    return graphCopy;
  }

  if (!selectedNode) {
    throw new Error("Attempting to update a Node when none exist");
  }

  // Update existing links to new node ID
  graphCopy?.links?.forEach((link) => {
    if (link.target === selectedNode.id) {
      link.target = newID;
    }
    if (link.source === selectedNode.id) {
      link.source = newID;
    }
  });
  selectedNode.id = newID;
  selectedNode.group = newGroup;

  return graphCopy;
};
