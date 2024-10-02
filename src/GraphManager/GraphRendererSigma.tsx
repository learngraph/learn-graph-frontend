import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EdgeCurvedArrowProgram } from "@sigma/edge-curve"; // for edge interaction and curved edges
import Graph from "graphology";
import Sigma from "sigma";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
import { Rectangle, setGraphSize } from "./utils";

export const GraphRendererSigma: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null); // Create a ref for the Sigma container

  const { data, queryResponse } = useGraphologyGraphData(); // Fetch graph data using the custom hook
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [availableSpace, setAvailableSpace] = useState<Rectangle>({
    height: 400,
    width: 600,
  });
  const graphSizeConfig = { wrapperRef, setAvailableSpace };
  // Set the graph size when the component mounts
  useLayoutEffect(() => {
    resizeContainer(); // Set the initial size
    setGraphSize(graphSizeConfig); // Set size based on your custom logic
  }, []); // Empty dependency array it could contain [controller.search.highlightNodes] for 

  // Helper function to update the size of the container
  const resizeContainer = () => {
    if (wrapperRef.current) {
      const { clientWidth, clientHeight } = wrapperRef.current;
      setAvailableSpace({ width: clientWidth, height: clientHeight });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      resizeContainer();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Graph rendering
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
  }, [data]); // Dependency array to rerun effect when data changes

  // Handle loading and error states
  if (queryResponse.loading) return <div>Loading graph...</div>;
  if (queryResponse.error)
    return <div>Error loading graph: {queryResponse.error.message}</div>;

  return (
    <div
    ref={containerRef}
    style={{
      height: "100vh", // Take the full height of the viewport
      width: "100vw",  // Take the full width of the viewport
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
