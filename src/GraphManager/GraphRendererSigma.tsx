import React, { useEffect, useMemo } from "react";

import { Controller } from "./GraphEdit/GraphEdit";
import { SigmaContainer, useLoadGraph, useRegisterEvents } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
import {
  DEFAULT_EDGE_CURVATURE,
  EdgeCurvedArrowProgram,
} from "@sigma/edge-curve";
// import { GraphologyEdgeType, GraphologyNodeType } from "./types";

interface GraphRendererProps {
  controller: Controller;
  backgroundColor: "black" | "white";
  graphData: any;
  sigmaStyle: { height: number; width: number };
}
interface GraphLoadingProps { 
  controller: Controller
}

export const GraphologyGraph: React.FC<GraphLoadingProps> = ({}) => {
  // const sigma = useSigma(); // Use Sigma's instance
  
  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook
  const loadGraph = useLoadGraph();
  useEffect(() => {
    if (data) {// I should have a load graph routine here that loads the graph everytime the data or the graphology instance changes
      const initialGraph = new MultiDirectedGraph(); // This needs to be available for createNodeAtPosition()
      initialGraph.import(data);
      console.log("hi?"); //this actually appears on every size change
      // graph.forEachNode(node => console.log(node))
      // graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
      initialGraph.forEachEdge((edge) => {
        initialGraph.mergeEdgeAttributes(edge, {
          type: "curved",
          curvature: DEFAULT_EDGE_CURVATURE, 
        });
      });
      loadGraph(initialGraph)
    }
  }, [loadGraph, queryResponse]); // This now reloads the Graph whenever the query response changes...

  return null;
};

const GraphEvents: React.FC = () => {
  const registerEvents = useRegisterEvents()
  useEffect(()=> {
    console.log("register Events")
    registerEvents({
      clickNode: (event)=> console.log("clickNode", event.node, event.event, event.preventSigmaDefault),
      kill: () => console.log("kill"),
    },)
  },[registerEvents]);
  return null;
};

export const GraphRendererSigma: React.FC<GraphRendererProps> = ({controller}) => {
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
    <SigmaContainer settings={settings}>
      <GraphologyGraph controller={controller} />
      <GraphEvents />
    </SigmaContainer>
  );
};

export default GraphRendererSigma;
