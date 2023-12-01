import { Node } from "GraphManager/GraphRenderer";
import { MutableRefObject } from "react";
import { ForceGraphGraphData } from "../types";

export const userSearchMatching = (
  highlightNodes: Set<Node>,
  graphDataForRender: MutableRefObject<ForceGraphGraphData | null>,
  userInput: string,
) => {
  return userSearchMatchingInternal(
    highlightNodes,
    graphDataForRender.current,
    userInput,
  );
};

export const userSearchMatchingInternal = (
  highlightNodes: Set<Node>,
  graphDataForRender: ForceGraphGraphData | null,
  userInput: string,
) => {
  highlightNodes.clear();
  if (!userInput) {
    return;
  }
  graphDataForRender?.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase()),
    )
    .forEach((node) => highlightNodes.add(node));
};
