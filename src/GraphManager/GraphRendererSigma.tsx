import React, { useEffect, useRef } from "react";
import EdgeCurveProgram from "@sigma/edge-curve"; // for edge interaction and curved edges
import Graph from "graphology";
import Sigma from "sigma";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";

export const GraphRendererSigma: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the Sigma container
  
    const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using the custom hook
  
    useEffect(() => {
      // Ensure the data is available and the container is ready
      if (data && containerRef.current) {
        // Create a new Graphology graph instance
        const graph = new Graph();
  
        // Import the graph data (assuming your `data` is in Graphology's format)
        graph.import(data);
  
        // Create a new Sigma renderer instance
        const renderer = new Sigma(graph, containerRef.current, {
          allowInvalidContainer: true, // Optional: handles cases where the container might not be ready immediately
          defaultEdgeType: "curve", // Set default edge type to 'curve' for curved edges
          edgeProgramClasses: {
            curve: EdgeCurveProgram, // Use the EdgeCurveProgram for rendering curved edges
          },
        });
  
        // Cleanup on component unmount
        return () => {
          renderer.kill(); // Kill the renderer to avoid memory leaks
        };
      }
    }, [data]); // Dependency array to rerun effect when data changes
  
    // Handle loading and error states
    if (queryResponse.loading) return <div>Loading graph...</div>;
    if (queryResponse.error) return <div>Error loading graph: {queryResponse.error.message}</div>;
  
    return (
      <div>
        <div ref={containerRef} id="sigma-container" style={{ height: "500px", width: "100%" }}></div>
      </div>
    );
  };
  
  export default GraphRendererSigma;