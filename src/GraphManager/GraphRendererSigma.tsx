import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { EdgeCurvedArrowProgram } from "@sigma/edge-curve"; // for edge interaction and curved edges
import Graph from "graphology";
import Sigma from "sigma";
import { useGraphologyGraphData } from "./RPCHooks/useGraphData";
import { Rectangle } from "./utils";
import { Box } from "@mui/material";
import { CreateButton } from "./GraphEdit/CreateButton";
import { EditModeButton } from "./GraphEdit/ModeButton";
import { NoTouchButton } from "./GraphEdit/NoTouchButton";
import { UserSettings } from "./GraphEdit/UserSettings";
import { Controller } from "./GraphEdit/GraphEdit";

interface GraphRendererProps {
  controller: Controller;
  backgroundColor: "black" | "white";
  graphData: any;
}

export const GraphRendererSigma: React.FC<GraphRendererProps> = ({
  controller,
}) => {
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
  }, []); // Empty dependency array, so it runs only on mount (could run on [controller.search.highlightNodes] )

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
    <Box
      ref={containerRef}
      sx={{
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        position: "relative",
      }}
    >
      {/* <Box
        id="sigma-container"
        sx={{
          height: availableSpace.height + "px", // Dynamic height based on available space
          width: availableSpace.width + "px",  // Dynamic width based on available space
        }}
      /> */}

      <Box
        sx={{
          position: "fixed", // Fixed position relative to the viewport
          bottom: 0, // Stick to the bottom
          right: 0, // Stick to the right
          padding: "16px", // Add padding around the button container
          display: "flex", // Flexbox layout
          flexDirection: "column", // Arrange buttons in a column
          gap: "8px", // Space between the buttons
          zIndex: 1000, // Ensure it's above other elements
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background for visibility
        }}
      >
        {controller ? (
          <>
            <NoTouchButton ctrl={controller} />
            <UserSettings ctrl={controller} />
            <EditModeButton ctrl={controller} />
            <CreateButton ctrl={controller} />
          </>
        ) : (
          <Box>Loading...</Box>
        )}
      </Box>
    </Box>
  );
};

export default GraphRendererSigma;
