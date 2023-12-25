import { useRef, MutableRefObject } from "react";
import { Box } from "@mui/material";

import {
  ForceGraphGraphData,
  ForceGraphRef,
  LocalForceGraphMethods,
  ForceGraphNodeObject,
} from "./types";
import { GraphRenderer } from "./GraphRenderer";
import HeaderBar from "./components/HeaderBar";
import { userSearchMatching } from "./components/Search";

interface GraphManagerProps {}

export const GraphManager = (_: GraphManagerProps): JSX.Element => {
  const forceGraphRef: ForceGraphRef = useRef<LocalForceGraphMethods>();
  const graphDataForRenderRef: MutableRefObject<ForceGraphGraphData | null> =
    useRef<ForceGraphGraphData | null>(null);
  const highlightNodes = new Set<ForceGraphNodeObject>();
  const searchCallback = (userInput: string) => {
    userSearchMatching(
      highlightNodes,
      graphDataForRenderRef,
      forceGraphRef,
      userInput,
    );
  };

  return (
    <Box
      id="wholePageWrapper"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display:
            "grid" /* FIXME(skep): if this is removed the force graph will only fill half height */,
        }}
      >
        <HeaderBar userInputCallback={searchCallback} />
      </Box>
      <Box sx={{ flex: 1, width: "100%" }}>
        <GraphRenderer
          graphDataRef={graphDataForRenderRef}
          forceGraphRef={forceGraphRef}
          highlightNodes={highlightNodes}
        />
      </Box>
    </Box>
  );
};
