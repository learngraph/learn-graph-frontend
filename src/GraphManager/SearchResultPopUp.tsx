// TODO(skep):  translations
import List from "@mui/material/List";
import { Controller } from "./GraphEdit";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import { centerOnNode } from "./components/Search";

export const SearchResultPopUp = ({ ctrl }: { ctrl: Controller }) => {
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
                  onClick={() => centerOnNode(ctrl, node)}
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
