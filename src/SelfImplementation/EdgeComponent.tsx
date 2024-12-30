import React from 'react';
import { Edge, useGraph } from './GraphContext';

interface EdgeProps {
  edge: Edge;
}

const EdgeComponent: React.FC<EdgeProps> = ({ edge }) => {
  const { nodes } = useGraph();

  const fromNode = nodes.find(node => node.id === edge.from);
  const toNode = nodes.find(node => node.id === edge.to);

  if (!fromNode || !toNode) return null;

  return (
    <line
      x1={fromNode.x}
      y1={fromNode.y}
      x2={toNode.x}
      y2={toNode.y}
      stroke="black"
      strokeWidth={2}
    />
  );
};

export default EdgeComponent;
