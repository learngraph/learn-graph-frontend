/**
 * This mocks the useSubmitVote hook by returning alternating resolves with "id"
 * and rejcting
 * maybe it should just always resolve? not sure yet
 */

import { ApolloQueryResponse } from "../types";
import { SubmitVoteFnResponse, SubmitVoteFn } from "../useSubmitVote";

let data: SubmitVoteFnResponse;
let error: string | undefined;
let loading: boolean;

const submitVoteFn: SubmitVoteFn = () =>
  Promise.resolve({
    data: {
      submitVote: {
        message: "msg",
      },
    },
  });

export function useSubmitVote(): {
  submitVote: SubmitVoteFn;
  data: SubmitVoteFnResponse;
  queryResponse: ApolloQueryResponse;
} {
  return {
    submitVote: submitVoteFn,
    data,
    queryResponse: { error, loading },
  };
}
