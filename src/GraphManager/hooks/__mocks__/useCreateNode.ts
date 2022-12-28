/**
 * This mocks the useCreateNode hook by returning alternating resolves with "id" 
 * and rejcting
 * maybe it should just always resolve? not sure yet
 */

import { CreateNodeResponse, CreateNodeFn } from "../useCreateNode";
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

const getCreateNodePromise = () => {
  const createNodeFn: CreateNodeFn = ({ description }) => new Promise(promiseToggleFn);
  return createNodeFn
}

export function useCreateNode(): {
  createNode: CreateNodeFn,
  response: CreateNodeResponse;
} {
  return { createNode: getCreateNodePromise(), response: { data, apollo: { loading, error } } };
}