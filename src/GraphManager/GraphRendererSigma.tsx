import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EdgeCurvedArrowProgram } from "@sigma/edge-curve"; // for edge interaction and curved edges
import Graph from "graphology";
import Sigma from "sigma";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
import { Rectangle } from "./utils";

export const GraphRendererSigma: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for Sigma container
  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using custom hook

  //// ------- scale graph to available space -------
  // Use window's size as the initial dimensions
  const [availableSpace, setAvailableSpace] = useState<Rectangle>({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  // Helper function to update the size of the container
  const resizeContainer = () => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setAvailableSpace({ width: clientWidth, height: clientHeight });
    }
  };

  // Set the graph size when the component mounts
  useLayoutEffect(() => {
    resizeContainer(); // Set the initial size when the component mounts
  }, []); // Empty dependency array, so it runs only on mount (could run on )

  // Update the container size on window resize
  useEffect(() => {
    const handleResize = () => {
      resizeContainer(); // Properly call the resizeContainer function
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //// -------- Graph rendering ----------
  useEffect(() => {
    // Ensure the data is available and the container is ready
    if (data && containerRef.current) {
      const graph = new Graph();

      // `data` must have Graphology's format
      graph.import(data);
      const renderer = new Sigma(graph, containerRef.current, {
        allowInvalidContainer: true, // Optional: handles cases where the container might not be ready immediately
        defaultEdgeType: "curve",
        edgeProgramClasses: {
          curve: EdgeCurvedArrowProgram,
        },
      });

      // Cleanup on component unmount
      return () => {
        renderer.kill(); // Kill the renderer to avoid memory leaks
      };
    }
  }, [data, availableSpace]); // Recalculate graph size when data or available space changes

  // Handle loading and error states
  if (queryResponse.loading) return <div>Loading graph...</div>;
  if (queryResponse.error)
    return <div>Error loading graph: {queryResponse.error.message}</div>;

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh", // Take the full height of the viewport
        width: "100vw", // Take the full width of the viewport
      }}
    >
      <div
        id="sigma-container"
        style={{
          height: availableSpace.height + "px",
          width: availableSpace.width + "px",
        }}
      ></div>
    </div>
  );
};

export default GraphRendererSigma;
