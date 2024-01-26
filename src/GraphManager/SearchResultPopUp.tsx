// TODO(skep):  translations
import List from "@mui/material/List";
import { Controller } from "./GraphEdit";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import { ForceGraphNodeObject } from "./types";
import { useEffect, useState } from "react";
import {HighlightNodeSet} from "./GraphRenderer";

const CENTER_AT_NODE_TIME_MS = 2000;

export const SearchResultPopUp = ({ ctrl, thatstuff }: { ctrl: Controller, thatstuff: HighlightNodeSet }) => {
  const centerOnNode = (node: ForceGraphNodeObject) => {
    ctrl.forceGraphRef.current?.centerAt(
      node.x,
      node.y,
      CENTER_AT_NODE_TIME_MS,
    );
  };
  const [searchResults, setSearchResults] = useState<any[]>([]);
  useEffect(() => {
    const newSearchResults: any[] = [];
    thatstuff.forEach((node) => {
      newSearchResults.push(
        <ListItemButton onClick={() => centerOnNode(node)}>
          {node.description}
        </ListItemButton>,
      );
    });
    setSearchResults(newSearchResults);
  }, [thatstuff]);
  return (
    <>
      {ctrl.search.isResultShown && (
        <Paper
          elevation={24}
          aria-labelledby="search-results"
          sx={{ padding: 2 }}
        >
          <List>
            <ListSubheader>Search Results</ListSubheader>
            {searchResults}
          </List>
        </Paper>
      )}
    </>
  );
};
