import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/material";

//import { useGraphDataContext } from "../GraphDataContext";
import { GraphFileList, GraphManagementMenu, VoteDialog } from "./components";
import { DataSetType, GraphData } from "./types";
import {
  GraphRenderer,
  VoteDialogParams,
  Node,
  GraphDataForceGraph,
} from "./GraphRenderer";
import {
  sanitizeGraphData,
  sanitizeGraphDataset,
  transformDisplayedNodesToPseudoTranslated,
  transformGraphDataForDisplay,
} from "./GraphUtil";
import SearchAppBar from "./components/SearchAppBar";
import { TranslatedGraphData, useGraphDataContext } from "src/GraphDataContext";
import { getTranslation } from "./utilities/getTranslation";
import { userSearchMatching } from "./components/Search";

interface GraphManagerProps {
  datasets: DataSetType[];
  fetchedGraph: GraphData | undefined;
  queryResponse: any;
}

export const GraphManager = (props: GraphManagerProps): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [voteDialogInput, setVoteDialogInput] = useState<
    Partial<VoteDialogParams>
  >({});

  const { graph, setLinks, setNodes } = useGraphDataContext();

  const [graphName, setGraphName] = useState<string>("");

  const language = "en"; // TODO: use language context

  const transformedGraphData = transformGraphDataForDisplay({
    graph,
    language,
  });

  const currentGraphDataset: DataSetType = {
    dataSetName: graphName,
    data: transformedGraphData,
  };

  // FIXME(j): does not work (test: don't start backend, no graph is visible)
  useEffect(() => {
    setTimeout(() => {
      if (!props.fetchedGraph && !graph) handleDatasetChange(props.datasets[0]);
    }, 500);
    // should only be executed once on startup, thus no dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.fetchedGraph) {
      const sanitizedDataset = sanitizeGraphData(props.fetchedGraph);
      console.log("setting retrieved graph!");
      const pseudoTranslatedNodes = transformDisplayedNodesToPseudoTranslated({
        nodes: sanitizedDataset.data.nodes,
        language,
      });
      setLinks(sanitizedDataset.data.links);
      setNodes(pseudoTranslatedNodes);
    }
  }, [props.queryResponse.loading, props.fetchedGraph, setLinks, setNodes]);

  const handleDatasetChange = (dataset: DataSetType) => {
    const sanitizedDataset = sanitizeGraphDataset(dataset);
    setGraphName(dataset.dataSetName);
    const pseudoTranslatedNodes = transformDisplayedNodesToPseudoTranslated({
      nodes: sanitizedDataset.data.nodes,
      language,
    });
    setLinks(sanitizedDataset.data.links);
    setNodes(pseudoTranslatedNodes);
  };

  const openVoteDialog = (params: VoteDialogParams): void => {
    setIsVoteDialogOpen(true);
    setVoteDialogInput(params);
  };

  const graphDataForRender: GraphDataForceGraph = JSON.parse(
    JSON.stringify(transformToRenderedType(graph))
  );

  const highlightNodes = new Set<Node>();
  const searchCallback = (userInput: string) => {
    userSearchMatching(highlightNodes, graphDataForRender, userInput);
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
        <SearchAppBar userInputCallback={searchCallback} />
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
                    datasets={props.datasets}
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
          graphData={graphDataForRender}
          openVoteDialog={openVoteDialog}
          highlightNodes={highlightNodes}
        />
      </Box>
    </>
  );
};

// TODO: extract to another file
const transformToRenderedType = (graph: TranslatedGraphData): GraphData => {
  // TODO: use language context
  const language = "en";
  const transformedNodes = graph.nodes.map(({ id, description, group }) => {
    return {
      id,
      description: getTranslation({ translatedField: description, language }),
      group,
    };
  });
  return {
    links: graph.links,
    nodes: transformedNodes,
  };
};
