import { Node, GraphDataForceGraph } from "GraphManager/GraphRenderer";

export const userSearchMatching = (
  highlightNodes: Set<Node>,
  graphDataForRender: GraphDataForceGraph,
  userInput: string
) => {
  highlightNodes.clear();
  if (!userInput) {
    return;
  }
  graphDataForRender.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase())
    )
    .forEach((node) => highlightNodes.add(node));
};
