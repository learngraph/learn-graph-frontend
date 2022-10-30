import { gql, useMutation } from "@apollo/client";

const CREATE_NODE = gql`
  input Translation {
    language: String!
    content: String!
  }

  input Text {
    translations: [Translation!]!
  }

  mutation createNode($description: Text) {
    createNode(description: $description) {
      CreateEntityResult {
        ID
      }
    }
  }
`;

interface Translation {
  language: string;
  content: string;
}
interface Text {
  translations: Translation[];
}
interface CreateEntityResult {
  CreateEntityResult: { ID: string };
}
interface CreateNodeFn {
  (argument: { variables: { description: Text } }): any;
}

export function useCreateNode(): {
  createNode: CreateNodeFn;
  data: CreateEntityResult;
  loading: any;
  error: any;
} {
  const [createNodeTMP, { data, loading, error }] = useMutation(CREATE_NODE);
  const createNode: CreateNodeFn = (argument) =>
    createNodeTMP({ variables: argument.variables });
  return { createNode, data, loading, error };
}
