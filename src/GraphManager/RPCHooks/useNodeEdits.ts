import { gql, useQuery } from "@apollo/client";
import { ApolloQueryResponse, NodeEdit } from "./types";

const GET_NODE_EDITS = gql`
  query nodeEdits($nodeID: ID!) {
    nodeEdits(nodeID: $nodeID) {
      username
      type
      updatedAt
    }
  }
`;
// unused nodeEdit fields:
//      newDescription
//      newResources

export interface NodeEditsResponse {
  data: { nodeEdits: NodeEdit[] };
  queryResponse: ApolloQueryResponse;
}

export function useNodeEdits(nodeID: string): NodeEditsResponse {
  const { loading, data, error, networkStatus } = useQuery(GET_NODE_EDITS, {
    variables: { nodeID: nodeID },
  });

  return { data, queryResponse: { loading, error, networkStatus } };
}
