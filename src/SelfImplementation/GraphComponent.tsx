import React from 'react';
import { useGraph } from './GraphContext';
import NodeComponent from './NodeComponent';
import EdgeComponent from './EdgeComponent';

const GraphComponent: React.FC = () => {
  const { nodes, edges } = useGraph();

  return (
    <svg width="100%" height="100%">
      {edges.map((edge, index) => (
        <EdgeComponent key={index} edge={edge} />
      ))}
      {nodes.map(node => (
        <NodeComponent key={node.id} node={node} />
      ))}
    </svg>
  );
};

export default GraphComponent;
