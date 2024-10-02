import { BackendGraphData } from "../types";

// Transform function: Converts BackendGraphData to Graphology format
export function transformGraphDataToSigma(backendData: BackendGraphData) {
  const graphologyData = {
    nodes: backendData.nodes.map((node) => ({
      key: node.id,
      attributes: {
        x: node.position?.x ?? 0,
        y: node.position?.y ?? 0,
        label: node.description,
        resources: node.resources,
        size: 10,
      },
    })),
    edges: backendData.links.map((link) => ({
      key: link.id,
      source: link.source,
      target: link.target,
      attributes: {
        size: link.value / 2, //halved looks a bit nicer but can be changed
      },
    })),
  };

  return graphologyData;
}

// export function transformGraphDataToBackend()
