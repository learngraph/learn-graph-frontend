import { MutableRefObject } from "react";
import {
  ForceGraphGraphData,
  ForceGraphRef,
  LocalForceGraphMethods,
} from "../types";
import { HasID } from "../Zoom";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { styled, alpha } from "@mui/material/styles";
import { HeaderBarProps } from "./HeaderBar";

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
  return (
    <Search {...rest}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder={t("search...")}
        inputProps={{ "aria-label": "search bar" }}
        onChange={(event) => {
          props.userInputCallback(event.target.value);
        }}
      />
    </Search>
  );
};
