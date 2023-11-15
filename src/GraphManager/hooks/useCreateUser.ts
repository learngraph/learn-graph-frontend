import { gql, useMutation } from "@apollo/client";
import { ApolloQueryResponse } from "./types";

const CREATE_USER_WITHMAIL = gql`
  mutation createUserWithEMail(
    $user: String!
    $password: String!
    $email: String!
  ) {
    createUserWithEMail(user: $user, password: $password, email: $email) {
      login {
        success
        message
      }
    }
  }
`;

// CreateNodeFn creates a new node with given description
export interface CreateUserWithMailFn {
  (userInfo: {
    username: string;
    password: string;
    email: string;
  }): Promise<CreateUserWithMailFnResponse>;
}

export interface CreateUserWithMailFnResponse {
  data?: {
    createUserWithEMail: {
      login: { success: boolean; token?: string; message?: string };
    };
  };
}

export interface LoginResponse {
  success: boolean;
  token: string;
  message?: string;
}

export interface CreateUserWithMailResponseData {
  newUserID: string;
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
