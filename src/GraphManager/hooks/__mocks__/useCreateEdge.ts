/**
 * This mocks the useCreateEdge hook by returning alternating resolves with "id" 
 * and rejcting
 * maybe it should just always resolve? not sure yet
 */

import { CreateEdgeResponse, CreateEdgeFn } from "../useCreateEdge";
import { ApolloQueryResponse, CreateEntityResult, Text } from "../types";

let shouldReturnSuccess = false;
let data: CreateEntityResult;
let error: string | undefined;
let loading: boolean;

const promiseToggleFn = (resolve: Function, reject: Function) => {
  loading = true

  if (shouldReturnSuccess) {
    setTimeout(() => {
      loading = false;
      error = undefined
      resolve(Date.now())
    }, 200)
  } else {
    setTimeout(() => {
      loading = false
      error = "Test Error";
      reject(false)
    }, 200)
  }
}

const getCreateEdgePromise = () => {
  const createEdgeFn: CreateEdgeFn = () => new Promise(promiseToggleFn);
  return createEdgeFn
}

export function useCreateEdge(): {
  createEdge: CreateEdgeFn,
  response: CreateEdgeResponse;
} {
  return { createEdge: getCreateEdgePromise(), response: { data, apollo: { loading, error } } };
}