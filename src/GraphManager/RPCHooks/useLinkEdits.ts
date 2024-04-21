import { gql, useQuery } from "@apollo/client";
import { ApolloQueryResponse, EdgeEdit } from "./types";

const GET_EDGE_EDITS = gql`
  query edgeEdits($edgeID: ID!) {
    edgeEdits(edgeID: $edgeID) {
      username
      type
      weight
      updatedAt
    }
  }
`;

export interface EdgeEditsResponse {
  data: { edgeEdits: EdgeEdit[] };
  queryResponse: ApolloQueryResponse;
}

export function useLinkEdits(linkID: string): EdgeEditsResponse {
  const { loading, data, error, networkStatus } = useQuery(GET_EDGE_EDITS, {
    variables: { edgeID: linkID },
  });

  return { data, queryResponse: { loading, error, networkStatus } };
}
