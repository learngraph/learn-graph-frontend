import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";
import { LoginResponse } from "./useCreateUser";

const LOGIN = gql`
  mutation login($authentication: LoginAuthentication!) {
    login(authentication: $authentication) {
      success
      token
      message
      userID
      userName
    }
  }
`;

// data required for user authentication
export interface UserLoginInfo {
  email: string;
  password: string;
}

export interface LoginFn {
  (userInfo: UserLoginInfo): Promise<LoginUserFnResponse>;
}

export interface LoginUserFnResponse {
  data?: {
    login: LoginResponse;
  };
}

export interface LoginUserResponse {
  data: LoginUserFnResponse;
  apollo: ApolloQueryResponse;
}

export function useLogin(): {
  login: LoginFn;
  response: LoginUserResponse;
} {
  const [loginTMP, { data, loading, error }] = useMutation(LOGIN);
  const login: LoginFn = ({ email, password }) =>
    loginTMP({ variables: { authentication: { email, password } } });
  return {
    login,
    response: { data, apollo: { loading, error } },
  };
}
