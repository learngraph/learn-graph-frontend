import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult } from "./types";

const CREATE_EDGE = gql`
  mutation createEdge($from: ID!, $to: ID!, $weight: Float!) {
    createEdge(from: $from, to: $to, weight: $weight) {
      ID
    }
  }
`;

// CreateEdgeFn creates a new Edge with given description
export interface CreateEdgeFn {
  (argument: { description: Text }): Promise<CreateEdgeFnResponse>;
}

export interface CreateEdgeFnResponse {
  data?: { createEdge: { from: string; to: string; weight: number } };
}

export interface CreateEdgeResponse {
  data: CreateEntityResult;
  apollo: ApolloQueryResponse;
}

export function useCreateEdge(): {
  createEdge: CreateEdgeFn;
  response: CreateEdgeResponse;
} {
  const [createEdgeTMP, { data, loading, error }] = useMutation(CREATE_EDGE);
  const createEdge: CreateEdgeFn = ({ description }) =>
    createEdgeTMP({ variables: { description } });
  return { createEdge, response: { data, apollo: { loading, error } } };
}
