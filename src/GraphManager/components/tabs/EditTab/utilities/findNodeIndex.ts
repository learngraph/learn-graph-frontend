import { BackendGraphData } from "../../../../types";

export const findNodeIndex = ({
  graph,
  nodeId,
}: {
  graph: BackendGraphData;
  nodeId: string | undefined;
}): number | -1 => {
  if (!graph.nodes) {
    throw new Error("searching for node in empty graph!");
  }
  if (nodeId === undefined) {
    return -1;
  }
  const nodeToReplace = graph.nodes.findIndex((node) => node.id === nodeId);
  if (nodeToReplace === -1 || nodeToReplace === undefined) {
    return -1;
  }
  return nodeToReplace;
};
