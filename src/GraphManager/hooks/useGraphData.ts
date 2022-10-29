import { gql, useQuery } from "@apollo/client";

const GET_GRAPH_DATA = gql`
  query getGraph {
    graph {
      nodes {
        id
        description
      }
      edges {
        id
        source: from
        target: to
        value: weight
      }
    }
  }
`;

export function useGraphData() {
  const { loading, data, error, networkStatus } = useQuery(GET_GRAPH_DATA, {});

  return { data, queryResponse: { loading, error, networkStatus } };
}
