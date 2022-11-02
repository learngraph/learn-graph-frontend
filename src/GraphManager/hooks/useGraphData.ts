import { gql, useQuery } from "@apollo/client";
import { GraphData } from "../types";
import { ApolloQueryResponse } from "./types";

const GET_GRAPH_DATA = gql`
  query getGraph {
    graph {
      nodes {
        id
        description
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
  data: { graph: GraphData };
  queryResponse: ApolloQueryResponse;
}

export function useGraphData(): GraphDataResponse {
  const { loading, data, error, networkStatus } = useQuery(GET_GRAPH_DATA, {});

  return { data, queryResponse: { loading, error, networkStatus } };
}
