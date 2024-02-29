import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult, Text } from "./types";

const UPDATE_NODE = gql`
  mutation editNode($id: ID!, $description: Text!, $resources: Text) {
    editNode(id: $id, description: $description, resources: $resources) {
      Message
    }
  }
`;

// UpdateNodeFn updates a new node with given description (and resources)
export interface UpdateNodeFn {
  (argument: {
    id: string;
    description: Text;
    resources?: Text;
  }): Promise<UpdateNodeFnResponse>;
}

export interface UpdateNodeFnResponse {
  data?: { editNode: { Message: string } };
}

export interface UpdateNodeResponse {
  data: CreateEntityResult;
  apollo: ApolloQueryResponse;
}

export function useUpdateNode(): {
  updateNode: UpdateNodeFn;
  response: UpdateNodeResponse;
} {
  const [updateNodeTMP, { data, loading, error }] = useMutation(UPDATE_NODE);
  const updateNode: UpdateNodeFn = ({ id, description, resources }) =>
    updateNodeTMP({ variables: { id, description, resources } });
  return { updateNode, response: { data, apollo: { loading, error } } };
}
