import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";

const SUBMIT_VOTE = gql`
  mutation submitVote($id: ID!, $value: Float!) {
    submitVote(id: $id, value: $value) {
      ID
      message
      value
    }
  }
`;

// SubmitVoteFn submits a user vote to the backend, the the weight (value) of
// specified link (linkID)
export interface SubmitVoteFnArgs {
  ID: string;
  value: number;
}
export interface SubmitVoteFn {
  (argument: SubmitVoteFnArgs): any;
}

export interface SubmitVoteFnResponse {
  data?: {
    submitVote: {
      ID: string;
      message: string;
      value: number;
    };
  };
}

export function useSubmitVote(): {
  submitVote: SubmitVoteFn;
  data: SubmitVoteFnResponse;
  queryResponse: ApolloQueryResponse;
} {
  const [submitVoteTMP, { data, loading, error }] = useMutation(SUBMIT_VOTE);
  const submitVote: SubmitVoteFn = (args: SubmitVoteFnArgs) =>
    submitVoteTMP({ variables: args });
  return { submitVote, data, queryResponse: { loading, error } };
}
