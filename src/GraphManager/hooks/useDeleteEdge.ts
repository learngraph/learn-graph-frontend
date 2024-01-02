import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, CreateEntityResult, Status } from "./types";

const DELETE_EDGE = gql`
  mutation deleteEdge($id: ID!) {
    deleteEdge(id: $id) {
      Message
    }
  }
`;

// DeleteEdgeFn deletes the Edge with given id
export interface DeleteEdgeFn {
  (argument: { id: string }): Promise<DeleteEdgeFnResponse>;
}

export interface DeleteEdgeFnResponse {
  data?: { deleteEdge: Status };
}

export interface DeleteEdgeResponse {
  data: CreateEntityResult;
  apollo: ApolloQueryResponse;
}

export function useDeleteEdge(): {
  deleteEdge: DeleteEdgeFn;
  response: DeleteEdgeResponse;
} {
  const [deleteEdgeTMP, { data, loading, error }] = useMutation(DELETE_EDGE);
  const deleteEdge: DeleteEdgeFn = ({ id }) =>
    deleteEdgeTMP({ variables: { id } });
  return { deleteEdge, response: { data, apollo: { loading, error } } };
}
