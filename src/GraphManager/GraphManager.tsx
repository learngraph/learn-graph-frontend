import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Box } from "@mui/material";

import { VoteDialog } from "./components";
import {
  DataSetType,
  ForceGraphGraphData,
  BackendGraphData,
  ForceGraphRef,
  LocalForceGraphMethods,
  ForceGraphNodeObject,
} from "./types";
import { GraphRenderer } from "./GraphRenderer";
import {
  sanitizeGraphData,
  transformDisplayedNodesToPseudoTranslated,
} from "./GraphUtil";
import HeaderBar from "./components/HeaderBar";
import { TranslatedGraphData, useGraphDataContext } from "src/GraphDataContext";
import { getTranslation } from "./utilities/getTranslation";
import { userSearchMatching } from "./components/Search";
import { VoteDialogParams } from "./components/VoteDialog";
import { useUserDataContext } from "src/UserDataContext";

interface GraphManagerProps {
  datasets: DataSetType[];
  fetchedGraph: BackendGraphData | undefined;
  queryResponse: any;
}

export const GraphManager = (props: GraphManagerProps): JSX.Element => {
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [voteDialogInput, setVoteDialogInput] = useState<
    Partial<VoteDialogParams>
  >({});

  const { setLinks, setNodes, submitVote } = useGraphDataContext();

  const { language } = useUserDataContext();

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
  }, [
    props.queryResponse.loading,
    props.fetchedGraph,
    setLinks,
    setNodes,
    language,
  ]);

  const openVoteDialog = (params: VoteDialogParams): void => {
    setIsVoteDialogOpen(true);
    setVoteDialogInput(params);
  };

  const forceGraphRef: ForceGraphRef = useRef<LocalForceGraphMethods>();
  const graphDataForRenderRef: MutableRefObject<ForceGraphGraphData | null> =
    useRef<ForceGraphGraphData | null>(null);

  const highlightNodes = new Set<ForceGraphNodeObject>();
  const searchCallback = (userInput: string) => {
    userSearchMatching(
      highlightNodes,
      graphDataForRenderRef,
      forceGraphRef,
      userInput,
    );
  };

  return (
    <Box
      id="wholePageWrapper"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display:
            "grid" /* FIXME(skep): if this is removed the force graph will only fill half height */,
        }}
      >
        <HeaderBar userInputCallback={searchCallback} />
      </Box>
      <Box sx={{ flex: 1, width: "100%" }}>
        <VoteDialog
          isDialogOpen={isVoteDialogOpen}
          setDialogOpen={setIsVoteDialogOpen}
          linkInfo={voteDialogInput}
          submitVote={submitVote}
        />
        <GraphRenderer
          graphDataRef={graphDataForRenderRef}
          forceGraphRef={forceGraphRef}
          openVoteDialog={openVoteDialog}
          highlightNodes={highlightNodes}
        />
      </Box>
    </Box>
  );
};

// TODO: extract to another file
export const transformToRenderedType = (
  graph: TranslatedGraphData,
  language: string,
): BackendGraphData => {
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
