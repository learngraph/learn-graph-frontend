import { gql, useMutation } from "@apollo/client";

const SUBMIT_VOTE = gql`
  mutation submitVote($source: ID!, $target: ID!, $value: Number!) {
    submitVote(source: $source, target: $target, value: $value) {
      nothingtbh
    }
  }
`;

export function useSubmitVote() {
  const [submitVote, { data, loading, error }] = useMutation(SUBMIT_VOTE);
  return { submitVote, data, loading, error };
}
