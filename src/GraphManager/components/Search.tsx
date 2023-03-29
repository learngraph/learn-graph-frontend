import { Node, GraphDataForceGraph } from "GraphManager/GraphRenderer";

export const userSearchMatching = (
  highlightNodes: Set<Node>,
  graphDataForRender: GraphDataForceGraph,
  userInput: string
) => {
  if (!userInput) {
    return;
  }
  highlightNodes.clear();
  graphDataForRender.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase())
    )
    .forEach((node) => highlightNodes.add(node));
};
