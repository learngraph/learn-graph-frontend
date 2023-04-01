/**
 * This mocks the useUpdateNode hook by returning alternating resolves with "id"
 * and rejcting
 * maybe it should just always resolve? not sure yet
 */

import { UpdateNodeResponse, UpdateNodeFn,  } from "../useUpdateNode";
import { CreateEntityResult } from "../types";

let shouldReturnSuccess = false;
let data: CreateEntityResult;
let error: string | undefined;
let loading: boolean;

const promiseToggleFn = (resolve: Function, reject: Function) => {
  loading = true;

  if (shouldReturnSuccess) {
    setTimeout(() => {
      loading = false;
      error = undefined;
      resolve(Date.now());
    }, 200);
  } else {
    setTimeout(() => {
      loading = false;
      error = "Test Error";
      reject(false);
    }, 200);
  }
};

const getUpdateNodePromise = () => {
  const updateNodeFn: UpdateNodeFn = (_) => new Promise(promiseToggleFn);
  return updateNodeFn;
};

export function useUpdateNode(): {
  updateNode: UpdateNodeFn;
  response: UpdateNodeResponse;
} {
  return {
    updateNode: getUpdateNodePromise(),
    response: { data, apollo: { loading, error } },
  };
}
