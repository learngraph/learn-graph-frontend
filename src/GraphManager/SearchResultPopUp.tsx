// TODO(skep):  translations
import List from "@mui/material/List";
import { Controller } from "./GraphEdit";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import { ForceGraphNodeObject } from "./types";
import { useEffect } from "react";

export const CENTER_AT_NODE_TIME_MS = 2000;

export const SearchResultPopUp = ({ ctrl }: { ctrl: Controller }) => {
  const centerOnNode = (node: ForceGraphNodeObject) => {
    ctrl.forceGraphRef.current?.centerAt(
      node.x,
      node.y,
      CENTER_AT_NODE_TIME_MS,
    );
  };
  useEffect(() => {
    const results = Array.from(ctrl.search.highlightNodes);
    if (
      results.length >= 0 &&
      !!results[0] &&
      !!results[0].x &&
      !!results[0].y
    ) {
      centerOnNode(results[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrl.search.highlightNodes]);
  return (
    <>
      {ctrl.search.isResultShown && (
        <Paper
          elevation={24}
          aria-labelledby="search-results"
          sx={{ padding: 2, minWidth: "200px" }}
        >
          <List>
            <ListSubheader>Search Results</ListSubheader>
            {Array.from(ctrl.search.highlightNodes).map((node) => {
              return (
                <ListItemButton
                  key={node.id}
                  onClick={() => centerOnNode(node)}
                >
                  {node.description}
                </ListItemButton>
              );
            })}
          </List>
        </Paper>
      )}
    </>
  );
};
