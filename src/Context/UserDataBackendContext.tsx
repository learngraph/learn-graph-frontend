import { createContext, useContext } from "react";
import {
  CreateUserWithMailFn,
  useCreateUserWithEmail,
} from "@src/GraphManager/RPCHooks/useCreateUser";
import { LoginFn, useLogin } from "@src/GraphManager/RPCHooks/useLoginUser";
import { LogoutFn, useLogout } from "@src/GraphManager/RPCHooks/useLogoutUser";
import { errMsgNoDefault } from "./UserDataContext";

export interface UserBackend {
  createUserWithEMail: CreateUserWithMailFn;
  loginUser: LoginFn;
  logoutUser: LogoutFn;
}

export interface UserDataBackendContextValues {
  backend: UserBackend;
}

const defaultContextValues = {
  backend: {
    createUserWithEMail: () => Promise.reject({ error: errMsgNoDefault }),
    loginUser: () => Promise.reject({ error: errMsgNoDefault }),
    logoutUser: () => Promise.reject({ error: errMsgNoDefault }),
  },
};

const UserDataBackendContext =
  createContext<UserDataBackendContextValues>(defaultContextValues);
export const useUserDataBackendContext = () =>
  useContext(UserDataBackendContext);

export const UserDataBackendContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { createUserWithEMail } = useCreateUserWithEmail();
  const { login: loginUser } = useLogin();
  const { logout: logoutUser } = useLogout();

  const ctx: UserDataBackendContextValues = {
    backend: {
      createUserWithEMail,
      loginUser,
      logoutUser,
    },
  };

  return (
    <UserDataBackendContext.Provider value={ctx}>
      {children}
    </UserDataBackendContext.Provider>
  );
};
