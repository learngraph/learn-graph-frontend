// TODO(skep):  translations
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import { Controller } from "./GraphEdit/GraphEdit";
import { centerOnNode } from "./components/Search";
import { Rectangle } from "./GraphRenderer";

const FIXME_LAYOUT_UNCLEAR = 50; // FIXME(skep): should not have to subtract anything here..

export const SearchResultPopUp = ({
  ctrl,
  availableSpace,
}: {
  ctrl: Controller;
  availableSpace: Rectangle;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let sx = {
    ...(!isSmallScreen
      ? { maxHeight: availableSpace.height - FIXME_LAYOUT_UNCLEAR }
      : {}),
  };
  return (
    <>
      {ctrl.search.isResultShown && (
        <Box
          id="searchResultsFlex"
          sx={{
            flex: "1",
          }}
        >
          <Paper
            elevation={24}
            aria-labelledby="search-results"
            sx={{
              padding: 2,
              minWidth: "200px",
              overflowY: "auto",
              ...sx,
            }}
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
        </Box>
      )}
    </>
  );
};
