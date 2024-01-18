import {
  LogoutFn,
  LogoutUserFnResponse,
  LogoutUserResponse,
} from "../useLogoutUser";

let data: LogoutUserFnResponse;
let error: string | undefined;
let loading: boolean;

export function useLogout(): {
  logout: LogoutFn;
  response: LogoutUserResponse;
} {
  return {
    logout: jest.fn(),
    response: { data, apollo: { loading, error } },
  };
}
