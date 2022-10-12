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
  const { id: newName } = newNode;

  if (isNewNode) {
    graphCopy.nodes?.push(newNode);
    return graphCopy;
  }

  if (!selectedNode) {
    throw new Error("Attempting to update a Node when none exist");
  }

  // Update Existing Node
  graphCopy?.links?.forEach((link) => {
    if (link.target === selectedNode.id) {
      link.target = newName;
    }
    if (link.source === selectedNode.id) {
      link.source = newName;
    }
  });
  selectedNode.id = newName;

  return graphCopy;
};
