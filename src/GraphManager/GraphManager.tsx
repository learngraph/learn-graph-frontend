import { useRef, MutableRefObject } from "react";
import { Box } from "@mui/material";

import { GraphRenderer } from "./GraphRenderer";
import HeaderBar from "./Header/HeaderBar";
import { userSearchMatching } from "./Header/Search";
import { Controller } from "./GraphEdit/GraphEdit";

interface GraphManagerProps {}

export type ControllerRef = MutableRefObject<Controller | undefined>;

export const GraphManager = (_: GraphManagerProps): JSX.Element => {
  const controllerRef: ControllerRef = useRef<Controller>();
  const searchCallback = (userInput: string) => {
    userSearchMatching(controllerRef, userInput);
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
      <HeaderBar
        userInputCallback={searchCallback}
        controllerRef={controllerRef}
      />
      <GraphRenderer controllerRef={controllerRef} />
    </Box>
  );
};
