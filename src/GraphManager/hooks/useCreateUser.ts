import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";

const CREATE_USER_WITHMAIL = gql`
  mutation createUserWithEMail(
    $username: String!
    $password: String!
    $email: String!
  ) {
    createUserWithEMail(
      username: $username
      password: $password
      email: $email
    ) {
      login {
        success
        message
        token
        userID
      }
    }
  }
`;

export interface UserSignupInfo {
  username: string;
  password: string;
  email: string;
}
export interface CreateUserWithMailFn {
  (userInfo: UserSignupInfo): Promise<CreateUserWithMailFnResponse>;
}

export interface CreateUserWithMailFnResponse {
  data?: {
    createUserWithEMail: CreateUserWithMailResponseData;
  };
}

export interface LoginResponse {
  success: boolean;
  token: string;
  userID: string;
  message?: string;
}

export interface CreateUserWithMailResponseData {
  login: LoginResponse;
}

export interface CreateUserWithMailResponse {
  data: CreateUserWithMailResponseData;
  apollo: ApolloQueryResponse;
}

export function useCreateUserWithEmail(): {
  createUserWithEMail: CreateUserWithMailFn;
  response: CreateUserWithMailResponse;
} {
  const [createUserTMP, { data, loading, error }] =
    useMutation(CREATE_USER_WITHMAIL);
  const createUserWithEMail: CreateUserWithMailFn = ({
    username,
    password,
    email,
  }) => createUserTMP({ variables: { username, password, email } });
  return {
    createUserWithEMail,
    response: { data, apollo: { loading, error } },
  };
}
