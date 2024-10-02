import { gql, useQuery } from "@apollo/client";
import { BackendGraphData } from "../types";
import { ApolloQueryResponse } from "./types";

const GET_GRAPH_DATA = gql`
  query getGraph {
    graph {
      nodes {
        id
        description
        resources
        position {
          x
          y
          z
        }
      }
      links: edges {
        id
        source: from
        target: to
        value: weight
      }
    }
  }
`;

export interface GraphDataResponse {
  data: { graph: BackendGraphData };
  queryResponse: ApolloQueryResponse;
}

export function useGraphData(): GraphDataResponse {
  const { loading, data, error, networkStatus } = useQuery(GET_GRAPH_DATA, {});

  return { data, queryResponse: { loading, error, networkStatus } };
}

// Transform function: Converts BackendGraphData to Graphology formatq
export function transformGraphData(backendData: BackendGraphData) {
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

export interface GraphologyGraphData {
  nodes: Array<{ key: string; attributes: any }>;
  edges: Array<{
    key: string;
    source: string;
    target: string;
    attributes: any;
  }>;
}

export interface GraphologyGraphDataResponse {
  data: GraphologyGraphData | null; // Data in graphology format
  queryResponse: ApolloQueryResponse; // Loading, error, and network status info
}

// Modified useGraphData function
export function useGraphologyGraphData(): GraphologyGraphDataResponse {
  const { loading, data, error, networkStatus } = useQuery(GET_GRAPH_DATA, {});

  let transformedData: GraphologyGraphData | null = null;

  if (data) {
    // Transform the backend data into Graphology format
    transformedData = transformGraphData(data.graph as BackendGraphData);
  }

  return {
    data: transformedData,
    queryResponse: { loading, error, networkStatus },
  };
}
