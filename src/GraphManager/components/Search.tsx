import { Node, GraphDataForceGraph } from "GraphManager/GraphRenderer";
import { MutableRefObject } from "react";

export const userSearchMatching = (
  highlightNodes: Set<Node>,
  graphDataForRender: MutableRefObject<GraphDataForceGraph | null>,
  userInput: string
) => {
  return userSearchMatchingInternal(
    highlightNodes,
    graphDataForRender.current,
    userInput
  );
};

export const userSearchMatchingInternal = (
  highlightNodes: Set<Node>,
  graphDataForRender: GraphDataForceGraph | null,
  userInput: string
) => {
  highlightNodes.clear();
  if (!userInput) {
    return;
  }
  graphDataForRender?.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase())
    )
    .forEach((node) => highlightNodes.add(node));
};
