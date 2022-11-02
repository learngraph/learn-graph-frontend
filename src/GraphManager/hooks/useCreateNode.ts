import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";

const CREATE_NODE = gql`
  mutation createNode($description: Text!) {
    createNode(description: $description) {
      ID
    }
  }
`;

export interface Translation {
  language: string;
  content: string;
}
export interface Text {
  translations: Translation[];
}
export interface CreateEntityResult {
  CreateEntityResult: { ID: string };
}

// CreateNodeFn creates a new node with given description
export interface CreateNodeFn {
  (argument: { description: Text }): any;
}

export interface CreateNodeResponse {
  data: CreateEntityResult;
  apollo: ApolloQueryResponse;
}

export function useCreateNode(): {
  createNode: CreateNodeFn;
  response: CreateNodeResponse;
} {
  const [createNodeTMP, { data, loading, error }] = useMutation(CREATE_NODE);
  const createNode: CreateNodeFn = ({ description }) =>
    createNodeTMP({ variables: { description } });
  return { createNode, response: { data, apollo: { loading, error } } };
}
