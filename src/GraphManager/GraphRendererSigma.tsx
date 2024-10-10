import React, { useEffect } from "react";
// import { EdgeCurvedArrowProgram } from "@sigma/edge-curve"; // for edge interaction and curved edges
import Graph from "graphology";
// import Sigma from "sigma";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
// import { Box } from "@mui/material";
import { Controller } from "./GraphEdit/GraphEdit";
import { SigmaContainer, useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
// import { GraphologyEdgeType, GraphologyNodeType } from "./types";

interface GraphRendererProps {
  controller: Controller;
  backgroundColor: "black" | "white";
  graphData: any;
  sigmaStyle: {height:number, width: number};
}


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

export const LoadGraph = () => {
  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook
  const loadGraph = useLoadGraph();
  useEffect(() => {
    if (data){
    const graph = new Graph();
    graph.import(data) 
    console.log("hi?")
    graph.forEachNode(node => console.log(node))
    // graph.addNode("first", { x: 0, y: 0, size: 15, label: "My first node", color: "#FA4F40" });
    loadGraph(graph);}
  }, [loadGraph]);// This does not load the Graph unless I change this file while the docker service is running ':)
  
  return null;
}



export const GraphRendererSigma: React.FC<GraphRendererProps> = () => {

  return (
    <SigmaContainer>
      <LoadGraph />
    </SigmaContainer>
  );
};

export default GraphRendererSigma;
