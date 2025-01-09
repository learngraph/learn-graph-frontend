import React from "react";
import { GraphProvider, useGraph } from "./GraphContext";
import GraphComponent from "./GraphComponent";
import "../styles/GrpahStyles.nodule.css";

const Implementation: React.FC = () => {
  const { addNode } = useGraph();

  const handleAddNode = () => {
    // Generate a random ID and position for the new node
    const id = `node-${Date.now()}`;
    const newNode = {
      id,
      label: `Node ${id}`,
      x: Math.random() * 500, // Random x-coordinate
      y: Math.random() * 500, // Random y-coordinate
      size: 20, // Default size
    };
    addNode(newNode);
  };

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={handleAddNode} style={{ marginBottom: "20px" }}>
        Add Node
      </button>
      <div
        style={{
          border: "1px solid black",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <GraphComponent />
      </div>
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <GraphProvider>
    <Implementation />
  </GraphProvider>
);

export default AppWrapper;
