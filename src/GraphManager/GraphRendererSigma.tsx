import React, { useEffect } from "react";

import { Controller } from "./GraphEdit/GraphEdit";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { MultiDirectedGraph } from "graphology";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
// import { GraphologyEdgeType, GraphologyNodeType } from "./types";

export const GraphologyGraph = () => { 
  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook 
  const loadGraph = useLoadGraph();
  useEffect(() => {
    if (data){
    const graph = new MultiDirectedGraph(); // This needs to be available for createNodeAtPosition()
    graph.import(data) 
    console.log("hi?")
    // graph.forEachNode(node => console.log(node))
    // graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
    loadGraph(graph);}
  }, [/*loadGraph, */ queryResponse]);// This now reloads the Graph whenever the query response changes...
  
  return null;
}


interface GraphRendererProps {
  controller: Controller;
  backgroundColor: "black" | "white";
  graphData: any;
  sigmaStyle: {height:number, width: number};
}


export const GraphRendererSigma: React.FC<GraphRendererProps> = () => {

  return (
    <SigmaContainer>
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





