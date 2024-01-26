import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { HeaderBarProps } from "./HeaderBar";
import { ControllerRef } from "../GraphManager";
import { useState } from "react";
import { HighlightNodeSet } from "../GraphRenderer";
import { ForceGraphNodeObject } from "../types";

export const userSearchMatching = (
  controllerRef: ControllerRef,
  userInput: string,
) => {
  return userSearchMatchingInternal(
    controllerRef.current?.search.highlightNodes ??
      new Set<ForceGraphNodeObject>(),
    controllerRef,
    userInput,
  );
};

export const userSearchMatchingInternal = (
  highlightNodes: HighlightNodeSet,
  controllerRef: ControllerRef,
  userInput: string,
) => {
  highlightNodes.clear();
  if (!userInput) {
    controllerRef.current?.search.setHighlightNodes(highlightNodes);
    return;
  }
  if (userInput.endsWith("\n")) {
    controllerRef.current?.search.setIsResultShown(true);
    userInput = userInput.trim();
  }
  controllerRef.current?.graph.current?.nodes
    .filter((node) =>
      node.description.toLowerCase().includes(userInput.toLowerCase()),
    )
    .forEach((node) => highlightNodes.add(node));
  controllerRef.current?.search.setHighlightNodes(highlightNodes);
  controllerRef.current?.forceGraphRef.current?.d3ReheatSimulation();
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
}: { props: HeaderBarProps } & any) => {
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
