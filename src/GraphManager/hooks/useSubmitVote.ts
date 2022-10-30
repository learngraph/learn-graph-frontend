import { gql, useMutation } from "@apollo/client";

const SUBMIT_VOTE = gql`
  mutation submitVote($id: ID!, $value: Float!) {
    submitVote(id: $id, value: $value) {
      Message
    }
  }
`;

interface SubmitVoteFn {
  (argument: { variables: { id: String; value: Number } }): any;
}

// TODO(skep): should return an explicitly typed function, so that type
// checking of arguments can happen, currently garbage properties can be
// supplied without any error message / linter-dection
export function useSubmitVote(): {
  submitVote: SubmitVoteFn;
  data: any;
  loading: any;
  error: any;
} {
  const [submitVote, { data, loading, error }] = useMutation(SUBMIT_VOTE);
  const submitVoteWrapper: SubmitVoteFn = (argument) =>
    submitVote({ variables: argument.variables });
  return { submitVote: submitVoteWrapper, data, loading, error };
}
