import { useRef, MutableRefObject } from "react";
import { Box } from "@mui/material";

import { PlaygroundRenderer } from "./PlaygroundRenderer";
import { userSearchMatching } from "./Header/Search";
import { Controller } from "./GraphEdit/GraphEdit";
import { NavigationWithContent } from "@src/Navigation";

interface GraphManagerProps {}

export type ControllerRef = MutableRefObject<Controller | undefined>;

export const PlaygroundManager = (_: GraphManagerProps): JSX.Element => {
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
      <NavigationWithContent
        search={{
          userInputCallback: searchCallback,
          controllerRef: controllerRef,
        }}
        alwaysDisplayNavDrawer={true}
      />
      <PlaygroundRenderer controllerRef={controllerRef} />
    </Box>
  );
};
