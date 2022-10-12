import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { GraphFileList, GraphManagementMenu, VoteDialog } from "./components";
import { DataSetType, NodeType } from "./types";
import { GraphRenderer } from "./GraphRenderer";
import { sanitizeGraphDataset } from "./GraphUtil";

interface GraphManagerProps {
  datasets: DataSetType[];
  fetchedDataset: DataSetType;
  queryResponse: any;
}

export const GraphManager = ({
  datasets,
  fetchedDataset,
  queryResponse,
}: GraphManagerProps): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [voteDialogNodes, setVoteDialogNodes] = useState<{
    source: NodeType | null;
    target: NodeType | null;
  }>({ source: null, target: null });

  const [selectedGraphDataset, setSelectedGraphDataset] = useState<DataSetType>(
    sanitizeGraphDataset(datasets[0])
  );

  useEffect(() => {
    if (fetchedDataset) {
      console.log("setting retrieved graph");
      setSelectedGraphDataset(sanitizeGraphDataset(fetchedDataset));
    }
  }, [queryResponse.loading, fetchedDataset]);

  const handleDatasetChange = (dataset: DataSetType) => {
    setSelectedGraphDataset(sanitizeGraphDataset(dataset));
  };

  const openVoteDialog = (params: any): void => {
    const { sourceNode, targetNode } = params;
    setIsVoteDialogOpen(true);
    setVoteDialogNodes({ source: sourceNode, target: targetNode });
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="toggle menu"
        onClick={(): void => setIsMenuVisible(!isMenuVisible)}
      >
        {isMenuVisible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Fab>
      {isMenuVisible && (
        <>
          <Grid container spacing={3}>
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
        sourceNode={voteDialogNodes.source}
        targetNode={voteDialogNodes.target}
      />
      <GraphRenderer
        selectedGraphDataset={selectedGraphDataset}
        openVoteDialog={openVoteDialog}
      />
    </>
  );
};
