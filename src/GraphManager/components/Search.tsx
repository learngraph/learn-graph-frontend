import { MutableRefObject } from "react";
import {
  ForceGraphGraphData,
  ForceGraphRef,
  LocalForceGraphMethods,
} from "../types";
import { HasID } from "../Zoom";

export const userSearchMatching = (
  highlightNodes: Set<HasID>,
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
  highlightNodes: Set<HasID>,
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
