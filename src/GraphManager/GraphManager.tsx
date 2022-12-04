import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/material";

import { useGraphDataContext } from '../GraphDataContext'
import { GraphFileList, GraphManagementMenu, VoteDialog } from "./components";
import { DataSetType, GraphData } from "./types";
import { GraphRenderer, VoteDialogParams } from "./GraphRenderer";
import { sanitizeGraphData, sanitizeGraphDataset } from "./GraphUtil";
import SearchAppBar from "./components/SearchAppBar";

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

  const [selectedGraphDataset, setSelectedGraphDataset] = useState<DataSetType>(
    sanitizeGraphDataset(datasets[0])
  );

  useEffect(() => {
    if (fetchedGraph) {
      const sanitizedDataset = sanitizeGraphData(fetchedGraph);
      console.log("setting retrieved graph!");
      setSelectedGraphDataset(sanitizedDataset);
    }
  }, [queryResponse.loading, fetchedGraph]);

  const handleDatasetChange = (dataset: DataSetType) => {
    setSelectedGraphDataset(sanitizeGraphDataset(dataset));
  };

  const openVoteDialog = (params: VoteDialogParams): void => {
    setIsVoteDialogOpen(true);
    setVoteDialogInput(params);
  };

  const {graph, requests} = useGraphDataContext();
  console.log(graph,requests)

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
                    currentGraphDataset={selectedGraphDataset}
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
        />
        <GraphRenderer
          selectedGraphDataset={selectedGraphDataset}
          openVoteDialog={openVoteDialog}
        />
      </Box>
    </>
  );
};
