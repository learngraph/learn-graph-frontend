import { MutableRefObject } from "react";
import {
  ForceGraphGraphData,
  ForceGraphNodeObject,
  ForceGraphRef,
  LocalForceGraphMethods,
} from "../types";

export const userSearchMatching = (
  highlightNodes: Set<ForceGraphNodeObject>,
  graphDataForRender: MutableRefObject<ForceGraphGraphData | null>,
  forceGraphRef: ForceGraphRef,
  userInput: string,
) => {
  return userSearchMatchingInternal(
    highlightNodes,
    graphDataForRender.current,
    forceGraphRef.current,
    userInput,
  );
};

export const userSearchMatchingInternal = (
  highlightNodes: Set<ForceGraphNodeObject>,
  graphDataForRender: ForceGraphGraphData | null,
  forceGraphRef: LocalForceGraphMethods,
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
  forceGraphRef?.d3ReheatSimulation();
};
