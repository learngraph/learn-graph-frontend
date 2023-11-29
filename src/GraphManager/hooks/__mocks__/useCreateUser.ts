import {
  CreateUserWithMailFn,
  CreateUserWithMailResponse,
  CreateUserWithMailResponseData,
} from "../useCreateUser";

let data: CreateUserWithMailResponseData;
let error: string | undefined;
let loading: boolean;

export function useCreateUserWithEmail(): {
  createUserWithEMail: CreateUserWithMailFn;
  response: CreateUserWithMailResponse;
} {
  return {
    createUserWithEMail: jest.fn(),
    response: { data, apollo: { loading, error } },
  };
}
