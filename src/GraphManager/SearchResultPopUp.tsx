// TODO(skep):  translations
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Controller } from "./GraphEdit/GraphEdit";
import { centerOnNode } from "./Header/Search";
import { Rectangle } from "./utils";

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
  const sx = {
    ...(!isSmallScreen
      ? { maxHeight: availableSpace.height - FIXME_LAYOUT_UNCLEAR }
      : {}),
  };
  const closeSearchResults = () => {
    ctrl.search.setHighlightNodes(new Set());
    ctrl.search.setIsResultShown(false);
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ListSubheader>Search Results</ListSubheader>
                <IconButton onClick={() => closeSearchResults()}>
                  {" "}
                  <CloseIcon />{" "}
                </IconButton>
              </Box>
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
