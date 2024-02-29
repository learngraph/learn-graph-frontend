import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult, Text } from "./types";

const CREATE_NODE = gql`
  mutation createNode($description: Text!, $resources: Text) {
    createNode(description: $description, resources: $resources) {
      ID
    }
  }
`;

// CreateNodeFn creates a new node with given description (and resources)
export interface CreateNodeFn {
  (argument: {
    description: Text;
    resources?: Text;
  }): Promise<CreateNodeFnResponse>;
}

export interface CreateNodeFnResponse {
  data?: { createNode: { ID: string } };
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
  const createNode: CreateNodeFn = ({ description, resources }) =>
    createNodeTMP({ variables: { description, resources } });
  return { createNode, response: { data, apollo: { loading, error } } };
}
