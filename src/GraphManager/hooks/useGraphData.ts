import { gql, useQuery } from "@apollo/client";
import { GraphData } from "../types";

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

export function useGraphData(): {
  data: { graph: GraphData };
  queryResponse: { loading: boolean; error: any; networkStatus: any };
} {
  const { loading, data, error, networkStatus } = useQuery(GET_GRAPH_DATA, {});

  return { data, queryResponse: { loading, error, networkStatus } };
}
