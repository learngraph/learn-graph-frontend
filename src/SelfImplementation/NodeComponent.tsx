import React, { useState } from "react";
import { useGraph, Node } from "./GraphContext";

interface NodeProps {
  node: Node;
}

const NodeComponent: React.FC<NodeProps> = ({ node }) => {
  const { nodes, addEdge } = useGraph();
  const [position, setPosition] = useState({ x: node.x, y: node.y });
  const [draggingNode, setDraggingNode] = useState<boolean>(false);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleMouseDown = (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
  ) => {
    setDraggingNode(true);
    setHoveredNodeId(null);
    event.stopPropagation();
  };

  const handleMouseUp = () => {
    if (hoveredNodeId) {
      addEdge({ from: node.id, to: hoveredNodeId });
    }
    setDraggingNode(false);
    setHoveredNodeId(null);
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => {
    if (!draggingNode) return;

    const newX = position.x + event.movementX;
    const newY = position.y + event.movementY;
    setPosition({ x: newX, y: newY });

    // Check for collision with other nodes
    const overlappingNode = nodes.find(
      (otherNode) =>
        otherNode.id !== node.id &&
        Math.sqrt(
          Math.pow(otherNode.x - newX, 2) + Math.pow(otherNode.y - newY, 2),
        ) <
          otherNode.size + node.size,
    );

    setHoveredNodeId(overlappingNode ? overlappingNode.id : null);
  };

  return (
    <svg
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ cursor: draggingNode ? "grabbing" : "grab" }}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r={node.size}
        fill={hoveredNodeId ? "red" : "blue"} // Turn red if overlapping another node
        onMouseDown={handleMouseDown}
      />
    </svg>
  );
};

export default NodeComponent;
