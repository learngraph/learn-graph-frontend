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
  const createUserFn: CreateUserWithMailFn = () => new Promise(() => {});
  return {
    createUserWithEMail: createUserFn,
    response: { data, apollo: { loading, error } },
  };
}
