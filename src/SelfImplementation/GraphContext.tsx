import React, { createContext, useContext, useState, PropsWithChildren } from 'react';

export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
}

export interface Edge {
  from: string;
  to: string;
}

interface GraphContextType {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (from: string, to: string) => void;
}

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const GraphProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const addNode = (node: Node) => setNodes([...nodes, node]);
  const removeNode = (id: string) => {
    setNodes(nodes.filter(node => node.id !== id));
    setEdges(edges.filter(edge => edge.from !== id && edge.to !== id));
  };

  const addEdge = (edge: Edge) => {
    if (!edges.some(e => e.from === edge.from && e.to === edge.to)) {
      setEdges([...edges, edge]);
    }
  };

  const removeEdge = (from: string, to: string) => {
    setEdges(edges.filter(edge => edge.from !== from || edge.to !== to));
  };

  return (
    <GraphContext.Provider value={{ nodes, edges, addNode, removeNode, addEdge, removeEdge }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraph must be used within a GraphProvider');
  }
  return context;
};
