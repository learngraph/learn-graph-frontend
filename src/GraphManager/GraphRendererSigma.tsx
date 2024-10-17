import React, { useEffect, useMemo, useState } from "react";

import { Controller } from "./GraphEdit/GraphEdit";
import { SigmaContainer, useLoadGraph, useSigma } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph, MultiDirectedGraph as SigmaGraph } from "graphology";
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

export const GraphologyGraph = () => {
  const sigma = useSigma(); // Use Sigma's instance
  const [graph, setGraphData] = useState<SigmaGraph | null>(null);
  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook
  // const loadGraph = useLoadGraph();
  useEffect(() => {
    if (data) {
      const loadedGraph = new MultiDirectedGraph(); // Create the new graph instance
      loadedGraph.import(data); // Import graph data into the new graph

      loadedGraph.forEachEdge((edge) => {
        loadedGraph.mergeEdgeAttributes(edge, {
          type: "curved",
          curvature: DEFAULT_EDGE_CURVATURE, // Ensure DEFAULT_EDGE_CURVATURE is defined
        });
      });

      // Set the graph in Sigma (this imports the graph into Sigma)
      sigma.getGraph().import(loadedGraph);

      // Optionally, call loadGraph if necessary (though sigma.getGraph().import does this already)
      // loadGraph(loadedGraph); 

      // Update the local graph state
      setGraphData(loadedGraph);
    }
  }, [data, queryResponse, sigma]); // Add relevant dependencies to prevent stale closures


  const updateGraph = () => {
    if (graph) {
      // const newGraph = new SigmaGraph();
      // newGraph.addNode("n1", {
        // label: "Node 1",
        // x: 0,
        // y: 0,
        // size: 10,
        // color: "#f00",
      // });
      // newGraph.addNode("n2", {
        // label: "Node 2",
        // x: 1,
        // y: 1,
        // size: 10,
        // color: "#00f",
      // });
      // newGraph.addNode("n3", {
        // label: "Node 3",
        // x: 0.5,
        // y: 0.5,
        // size: 10,
        // color: "#0f0",
      // });
      // newGraph.addEdge("n1", "n2", { size: 1, color: "#ccc" });
      // newGraph.addEdge("n1", "n3", { size: 1, color: "#aaa" });

      sigma.refresh()
    } // Update the state
  };
  return (
    <div>
      <button onClick={updateGraph}>Update Graph</button>
    </div>
  );
};

export const GraphRendererSigma: React.FC<GraphRendererProps> = () => {
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
      <GraphologyGraph />
    </SigmaContainer>
  );
};

export default GraphRendererSigma;

// export const DisplaySigma: React.FC<GraphRendererProps> = ({
//   controller,
//   backgroundColor,
// }) => {
//   controller.language; // for the linter...
//   const containerRef = useRef<HTMLDivElement | null>(null); // Ref for Sigma container
//   const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook

//   //// -------- Graph rendering ----------
//   useEffect(() => {
//     // Ensure the data is available and the container is ready
//     if (data && containerRef.current) {
//       const graph = new Graph();

//       // `data` must have Graphology's format
//       graph.import(data);
//       const renderer = new Sigma(graph, containerRef.current, {
//         allowInvalidContainer: true, // Optional: handles cases where the container might not be ready immediately
//         defaultEdgeType: "curve",
//         edgeProgramClasses: {
//           curve: EdgeCurvedArrowProgram,
//         },
//       });

//       // Cleanup on component unmount
//       return () => {
//         renderer.kill(); // Kill the renderer to avoid memory leaks
//       };
//     }
//   }, [data, availableSpace]); // Recalculate graph size when data or available space changes

//   // Handle loading and error states
//   if (queryResponse.loading) return <div>Loading graph...</div>;
//   if (queryResponse.error)
//     return <div>Error loading graph: {queryResponse.error.message}</div>;

//   return (
//     <Box
//       ref={containerRef}
//       sx={{
//         height: "100vh", // Full viewport height
//         width: "100vw", // Full viewport width
//         position: "relative",
//         background: backgroundColor,
//       }}
//     ></Box>
//   );
// };
