import { GraphData, NodeType } from "../../../../types";

export interface updateNodeInGraphProps {
  graph: GraphData;
  newNode: NodeType;
  selectedNode: NodeType;
}

export const updateNodeInGraph = (args: updateNodeInGraphProps): GraphData => {
  // Update existing links to new node ID
  args.graph?.links?.forEach((link) => {
    if (link.target === args.selectedNode?.id) {
      link.target = args.newNode.id;
    }
    if (link.source === args.selectedNode?.id) {
      link.source = args.newNode.id;
    }
  });
  // Update selected node with new content
  Object.assign(args.selectedNode, args.newNode);

  return args.graph;
};

export const createNode = (args: {
  graph: GraphData;
  newNode: NodeType;
}): GraphData => {
  if (args.graph.nodes.find((n) => n.id === args.newNode.id)) {
    throw new Error("Attempting to create a new Node that already exists");
  }
  args.graph.nodes?.push(args.newNode);
  return args.graph;
};
