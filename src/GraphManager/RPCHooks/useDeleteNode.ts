import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult, Status } from "./types";

const DELETE_NODE = gql`
  mutation deleteNode($id: ID!) {
    deleteNode(id: $id) {
      Message
    }
  }
`;

// DeleteNodeFn deletes the node with given id
export interface DeleteNodeFn {
  (argument: { id: string }): Promise<DeleteNodeFnResponse>;
}

export interface DeleteNodeFnResponse {
  data?: { deleteNode: Status };
}

export interface DeleteNodeResponse {
  data: CreateEntityResult;
  apollo: ApolloQueryResponse;
}

export function useDeleteNode(): {
  deleteNode: DeleteNodeFn;
  response: DeleteNodeResponse;
} {
  const [deleteNodeTMP, { data, loading, error }] = useMutation(DELETE_NODE);
  const deleteNode: DeleteNodeFn = ({ id }) =>
    deleteNodeTMP({ variables: { id } });
  return { deleteNode, response: { data, apollo: { loading, error } } };
}
