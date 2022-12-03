import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult } from "./types";

const CREATE_EDGE = gql`
  mutation createEdge($from: ID!, $to: ID!) {
    #, $weight: Float!) {
    createEdge(from: $from, to: $to, weight: 5.0) {
      # $weight) {
      ID
    }
  }
`;

// CreateEdgeFn creates a new Edge with given description
export interface CreateEdgeFn {
  (argument: {
    from: string;
    to: string;
    weight: number;
  }): Promise<CreateEdgeFnResponse>;
}

export interface CreateEdgeFnResponse {
  data?: { createEdge: { ID: string } };
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
  const createEdge: CreateEdgeFn = ({ from, to, weight }) =>
    createEdgeTMP({ variables: { from, to, weight } });
  return { createEdge, response: { data, apollo: { loading, error } } };
}
