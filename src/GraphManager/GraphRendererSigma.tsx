import React, { useEffect, useMemo } from "react";

import { Controller } from "./GraphEdit/GraphEdit";
import {
  ControlsContainer,
  SearchControl,
  SigmaContainer,
  useLoadGraph,
  useRegisterEvents,
} from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { GraphologyGraphData } from "./RPCHooks/useGraphData";
import {
  DEFAULT_EDGE_CURVATURE,
  EdgeCurvedArrowProgram,
} from "@sigma/edge-curve";
import { ForceGraphGraphData } from "./types";
// import { GraphologyEdgeType, GraphologyNodeType } from "./types";

interface GraphRendererProps {
  controller: Controller;
  backgroundColor: "black" | "white";
  graphData: any;
  sigmaStyle: { height: number; width: number };
}
interface GraphLoadingProps {
  // controller: Controller;
  graphData: GraphologyGraphData;
}

export const GraphologyGraph: React.FC<GraphLoadingProps> = ({ graphData }) => {
  // const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook
  const loadGraph = useLoadGraph();
  useEffect(() => {
    if (graphData) {
      // There should be load graph routine here that loads the graph everytime the data or the graphology instance changes
      const graph = new MultiDirectedGraph(); // This needs to be available for createNodeAtPosition()
      graph.import(graphData);
      console.log("hi?");
      // console.log(graphData);
      graph.forEachEdge((edge) => {
        graph.mergeEdgeAttributes(edge, {
          type: "curved",
          curvature: DEFAULT_EDGE_CURVATURE,
        });
        // console.log(graph.hasNode("3"))
        // console.log(graph.getNodeAttribute("3", "label"));
      });
      loadGraph(graph);
    }
  }, [loadGraph, graphData]);

  return null;
};

const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents();
  useEffect(() => {
    console.log("register Events");
    registerEvents({
      clickNode: (event) =>
        console.log(
          "clickNode",
          event.node,
          event.event,
          event.preventSigmaDefault,
        ),
      kill: () => console.log("kill"),
    });
  }, [registerEvents]);
  return null;
};

export function transformForceToSigma(data: ForceGraphGraphData) {
  const sigmaGraphData: GraphologyGraphData = {
    nodes: data.nodes.map((node) => ({
      key: node.id,
      attributes: {
        x: node.position?.x ?? 0,
        y: node.position?.y ?? 0,
        label: node.description,
        resources: node.resources,
        size: 10,
      },
    })),
    edges: data.links.map((link) => ({
      key: link.id,
      source: link.source.id ?? link.source,
      target: link.target.id ?? link.target,
      attributes: {
        size: link.value / 2, //halved looks a bit nicer but can be changed
      },
    })),
  };

  return sigmaGraphData;
}

export const GraphRendererSigma: React.FC<GraphRendererProps> = ({
  // controller,
  graphData,
}) => {
  const convertedData = transformForceToSigma(graphData);
  // console.log(graphData);
  // console.log(convertedData);
  const settings = useMemo(
    () => ({
      allowInvalidContainer: true,
      renderEdgeLabels: true,
      defaultEdgeType: "curved",
      edgeProgramClasses: {
        curved: EdgeCurvedArrowProgram,
      },
    }),
    [],
  );
  return (
    <SigmaContainer
      // ref={controller.setSigmaRef}
      settings={settings}
      graph={MultiDirectedGraph}
    >
      <GraphologyGraph /*controller={controller}*/ graphData={convertedData} />
      <GraphEvents />
      <ControlsContainer position={"top-right"}>
        <SearchControl style={{ width: "200px" }} />
        {/* Maybe this can be integrated into the existing search window */}
      </ControlsContainer>
    </SigmaContainer>
  );
};

export default GraphRendererSigma;
