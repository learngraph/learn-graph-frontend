import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse, Status } from "./types";

const LOGOUT = gql`
  mutation logout {
    logout {
      Message
    }
  }
`;

export interface LogoutFn {
  (): Promise<LogoutUserFnResponse>;
}

export interface LogoutUserFnResponse {
  data?: {
    logout: Status;
  };
}

export interface LogoutUserResponse {
  data: LogoutUserFnResponse;
  apollo: ApolloQueryResponse;
}

export function useLogout(): {
  logout: LogoutFn;
  response: LogoutUserResponse;
} {
  const [logoutTMP, { data, loading, error }] = useMutation(LOGOUT);
  const logout: LogoutFn = () => logoutTMP();
  return {
    logout,
    response: { data, apollo: { loading, error } },
  };
}
