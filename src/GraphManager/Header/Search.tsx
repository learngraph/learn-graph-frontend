import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { ControllerRef } from "../GraphManager";
import { useState } from "react";
import { ForceGraphNodeObject } from "../types";
import { ZOOM_LEVEL_MAX, ZOOM_TO_FIT_DURATION_MS } from "../ZoomControlPanel";
import { Controller } from "@src/GraphManager/GraphEdit/GraphEdit";

export const GLOBALSCALE_AFTER_SEARCH = 10;
export const CENTER_AT_NODE_TIME_MS = 2000;

export interface SearchBarProps {
  // userInputCallback is called with each key-stroke of the user, and always
  // given the full user-input. When "Enter" key is pressesd, the user-input
  // get's called with the user-input and an appended "\n"!
  userInputCallback: SearchCallback;
  controllerRef: ControllerRef;
}

export const userSearchMatching = (
  controllerRef: ControllerRef,
  userInput: string,
) => {
  return userSearchMatchingInternal(controllerRef, userInput);
};

export const centerOnNode = (ctrl: Controller, node: ForceGraphNodeObject) => {
  if (
    ctrl.mode.use3D &&
    // @ts-ignore: 'cameraPosition' doesn't exist on 2d forcegraph
    ctrl.forceGraphRef.current?.cameraPosition !== undefined
  ) {
    const distance = 100;
    const distRatio = 1 + distance / Math.hypot(node.x!, node.y!, node.z!);
    // @ts-ignore: 'cameraPosition' doesn't exist on 2d forcegraph
    ctrl.forceGraphRef.current?.cameraPosition(
      {
        x: node.x! * distRatio,
        y: node.y! * distRatio,
        z: node.z! * distRatio,
      }, // new position
      node, // lookAt ({ x, y, z })
      3000, // ms transition duration
    );
  } else if (!ctrl.mode.use3D && ctrl.forceGraphRef.current?.zoom) {
    ctrl.forceGraphRef.current?.centerAt(
      node.x,
      node.y,
      CENTER_AT_NODE_TIME_MS,
    );
    ctrl.forceGraphRef.current?.zoom(
      GLOBALSCALE_AFTER_SEARCH,
      ZOOM_TO_FIT_DURATION_MS,
    );
  }
};

export const userSearchMatchingInternal = (
  controllerRef: ControllerRef,
  userInput: string,
) => {
  const newHighlightNodes = new Set<ForceGraphNodeObject>();
  let zoomToFirstResult = false;
  if (!userInput || userInput === "\n") {
    controllerRef.current?.search.setIsResultShown(false);
    controllerRef.current?.search.setHighlightNodes(newHighlightNodes);
    return;
  }
  if (userInput.endsWith("\n")) {
    // user pressed return -> show results
    zoomToFirstResult = true;
    controllerRef.current?.search.setIsResultShown(true);
    controllerRef.current?.zoom.setUserZoomLevel(ZOOM_LEVEL_MAX);
    userInput = userInput.trim();
  }
  controllerRef.current?.graph.current?.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase()),
    )
    .forEach((node) => newHighlightNodes.add(node));
  controllerRef.current?.search.setHighlightNodes(newHighlightNodes);
  controllerRef.current?.forceGraphRef.current?.d3ReheatSimulation();
  if (zoomToFirstResult) {
    const results = Array.from(newHighlightNodes);
    if (
      controllerRef.current &&
      results.length >= 0 &&
      !!results[0] &&
      !!results[0].x &&
      !!results[0].y
    ) {
      centerOnNode(controllerRef.current, results[0]);
    }
  }
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export interface SearchCallback {
  (query: string): void;
}

export const SearchField = ({
  props,
  ...rest
}: { props: SearchBarProps } & any) => {
  const { t } = useTranslation();
  const [userInput, setUserInput] = useState<string>("");
  return (
    <Search {...rest}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t("search...")}
        inputProps={{ "aria-label": "search bar" }}
        onChange={(event) => {
          setUserInput(event.target.value);
          props.userInputCallback(event.target.value);
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            props.userInputCallback(`${userInput}\n`);
          }
        }}
      />
    </Search>
  );
};
