import { Edge } from "./GraphContext";

export const detectCycle = (edges: Edge[]): boolean => {
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const hasCycle = (node: string): boolean => {
    if (visited.has(node)) return false;
    if (visiting.has(node)) return true;

    visiting.add(node);

    const neighbors = edges
      .filter((edge) => edge.from === node)
      .map((edge) => edge.to);
    for (const neighbor of neighbors) {
      if (hasCycle(neighbor)) return true;
    }

    visiting.delete(node);
    visited.add(node);

    return false;
  };

  for (const edge of edges) {
    if (hasCycle(edge.from)) return true;
  }

  return false;
};
