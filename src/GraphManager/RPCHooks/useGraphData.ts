import { gql, useQuery } from "@apollo/client";
import { BackendGraphData } from "../types";
import { ApolloQueryResponse } from "./types";
import { convertBackendGraphToGraphologyData } from "../utils";

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
  console.log("called for basic graph data");
  return { data, queryResponse: { loading, error, networkStatus } };
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

  let transformedData: GraphologyGraphData | null = null; // this might be a problem.

  if (data) {
    // Transform the backend data into Graphology format
    transformedData = convertBackendGraphToGraphologyData(
      data.graph as BackendGraphData,
    );
  }

  console.log("called for Graphology data");
  return {
    data: transformedData,
    queryResponse: { loading, error, networkStatus },
  };
}
