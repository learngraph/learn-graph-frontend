import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/material";

import { GraphFileList, GraphManagementMenu, VoteDialog } from "./components";
import { DataSetType, GraphData } from "./types";
import { GraphRenderer, VoteDialogParams } from "./GraphRenderer";
import {
  sanitizeGraphData,
  sanitizeGraphDataset,
  transformDisplayedNodesToPseudoTranslated,
  transformGraphDataForDisplay,
} from "./GraphUtil";
import SearchAppBar from "./components/SearchAppBar";
import { useGraphDataContext } from "src/GraphDataContext";
interface GraphManagerProps {
  datasets: DataSetType[];
  fetchedGraph: GraphData;
  queryResponse: any;
}

export const GraphManager = ({
  datasets,
  fetchedGraph,
  queryResponse,
}: GraphManagerProps): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [voteDialogInput, setVoteDialogInput] = useState<
    Partial<VoteDialogParams>
  >({});

  const { graph, setLinks, setNodes, submitVote } = useGraphDataContext();

  const [graphName, setGraphName] = useState<string>("");

  const language = "en";

  const transformedGraphData = transformGraphDataForDisplay({
    graph,
    language,
  });

  const currentGraphDataset: DataSetType = {
    dataSetName: graphName,
    data: transformedGraphData,
  };

  useEffect(() => {
    setTimeout(() => {
      if (!fetchedGraph && !(graph.links.length && graph.nodes.length))
        handleDatasetChange(datasets[0]);
    }, 3000);
    // should only be executed once on startup, thus no dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (fetchedGraph) {
      const sanitizedDataset = sanitizeGraphData(fetchedGraph);
      console.log("setting retrieved graph!");
      const pseudoTranslatedNodes = transformDisplayedNodesToPseudoTranslated({
        nodes: sanitizedDataset.data.nodes,
        language: "en",
      });
      setLinks(sanitizedDataset.data.links);
      setNodes(pseudoTranslatedNodes);
    }
  }, [queryResponse.loading, fetchedGraph, setLinks, setNodes]);

  const handleDatasetChange = (dataset: DataSetType) => {
    const sanitizedDataset = sanitizeGraphDataset(dataset);
    setGraphName(dataset.dataSetName);
    const pseudoTranslatedNodes = transformDisplayedNodesToPseudoTranslated({
      nodes: sanitizedDataset.data.nodes,
      language: "en",
    });
    setLinks(sanitizedDataset.data.links);
    setNodes(pseudoTranslatedNodes);
  };

  const openVoteDialog = (params: VoteDialogParams): void => {
    setIsVoteDialogOpen(true);
    setVoteDialogInput(params);
  };

  return (
    <>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <Fab
          color="primary"
          aria-label="toggle menu"
          onClick={(): void => setIsMenuVisible(!isMenuVisible)}
        >
          {isMenuVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Fab>
        <SearchAppBar
          userInputCallback={() => {
            /*TODO(skep)*/
          }}
        />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {isMenuVisible && (
          <>
            <Grid container spacing={3} justifyContent="flex-end">
              <Grid item xs>
                <Paper>
                  <GraphManagementMenu
                    updateDisplayedGraph={handleDatasetChange}
                    currentGraphDataset={currentGraphDataset}
                  />
                </Paper>
              </Grid>
              <Grid item xs>
                <Paper>
                  <GraphFileList
                    datasets={datasets}
                    onSelectDataSet={handleDatasetChange}
                  />
                </Paper>
              </Grid>
            </Grid>
          </>
        )}
        <VoteDialog
          isDialogOpen={isVoteDialogOpen}
          setDialogOpen={setIsVoteDialogOpen}
          linkInfo={voteDialogInput}
          submitVote={submitVote}
        />
        <GraphRenderer openVoteDialog={openVoteDialog} />
      </Box>
    </>
  );
};
