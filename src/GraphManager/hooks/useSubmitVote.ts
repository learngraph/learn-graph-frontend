import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";

const SUBMIT_VOTE = gql`
  mutation submitVote($id: ID!, $value: Float!) {
    submitVote(id: $id, value: $value) {
      Message
    }
  }
`;

// SubmitVoteFn submits a user vote to the backend, the the weight (value) of
// specified link (linkID)
export interface SubmitVoteFnArgs {
  id: string;
  value: number;
}
export interface SubmitVoteFn {
  (argument: SubmitVoteFnArgs): any;
}

export function useSubmitVote(): {
  submitVote: SubmitVoteFn;
  data: any; // TODO(skep): Message with ID?
  queryResponse: ApolloQueryResponse;
} {
  const [submitVoteTMP, { data, loading, error }] = useMutation(SUBMIT_VOTE);
  const submitVote: SubmitVoteFn = (args: SubmitVoteFnArgs) =>
    submitVoteTMP({ variables: args });
  return { submitVote, data, queryResponse: { loading, error } };
}
