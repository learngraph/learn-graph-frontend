import {
  LoginFn,
  LoginUserFnResponse,
  LoginUserResponse,
} from "../useLoginUser";

let data: LoginUserFnResponse;
let error: string | undefined;
let loading: boolean;

export function useLogin(): {
  login: LoginFn;
  response: LoginUserResponse;
} {
  return {
    login: jest.fn(),
    response: { data, apollo: { loading, error } },
  };
}
