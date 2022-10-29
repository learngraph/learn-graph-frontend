import { gql, useMutation } from "@apollo/client";

const SUBMIT_VOTE = gql`
  mutation submitVote($id: ID!, $value: Number!) {
    submitVote(id: $id, value: $value) {
      Message
    }
  }
`;

// TODO(skep): should return an explicitly typed function, so that type
// checking of arguments can happen, currently garbage properties can be
// supplied without any error message / linter-dection
export function useSubmitVote() {
  const [submitVote, { data, loading, error }] = useMutation(SUBMIT_VOTE);
  return { submitVote, data, loading, error };
}
