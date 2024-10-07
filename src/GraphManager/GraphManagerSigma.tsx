// import { useRef, MutableRefObject } from "react";
// import { Box } from "@mui/material";
// import { userSearchMatching } from "./Header/Search";
// import { Controller } from "./GraphEdit/GraphEdit";
// import { NavigationWithContent } from "@src/Navigation";
// import { GraphRendererSigma } from "./GraphRendererSigma";

// interface GraphManagerProps {}

// export type ControllerRef = MutableRefObject<Controller | undefined>;

// export const GraphManagerSigma = (_: GraphManagerProps): JSX.Element => {
//   const controllerRef: ControllerRef = useRef<Controller>();
//   const searchCallback = (userInput: string) => {
//     userSearchMatching(controllerRef, userInput);
//   };

//   return (
//     <Box
//       id="wholePageWrapper"
//       sx={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//       }}
//     >
//       <NavigationWithContent
//         search={{
//           userInputCallback: searchCallback,
//           controllerRef: controllerRef,
//         }}
//         alwaysDisplayNavDrawer={true}
//       />
//       <GraphRendererSigma controllerRef={controllerRef} />
//     </Box>
//   );
// };
