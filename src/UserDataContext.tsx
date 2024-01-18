import React, { useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext, ContextSetter } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import { addAuthHeader, addLanguageHeader, addUserIDHeader } from "src/link";
import i18n from "./i18n";

export interface UserDataContextValues {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  userID: string;
  userName: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  authenticationToken: string;
  setAuthenticationToken: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}

const defaultLanguage = "en";
const errMsgNoDefault =
  "'defaultContextValues' must not be used! Use UserDataContextProvider instead.";
const defaultContextValues = {
  language: defaultLanguage,
  userID: "",
  userName: "",
  authenticationToken: "",
  setLanguage: () => Promise.reject({ error: errMsgNoDefault }),
  setUserID: () => Promise.reject({ error: errMsgNoDefault }),
  setUserName: () => Promise.reject({ error: errMsgNoDefault }),
  setAuthenticationToken: () => Promise.reject({ error: errMsgNoDefault }),
  logout: () => Promise.reject({ error: errMsgNoDefault }),
};

const UserDataContext =
  React.createContext<UserDataContextValues>(defaultContextValues);

export const useUserDataContext = () => React.useContext(UserDataContext);

const storageSave = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const storageDel = (key: string) => {
  localStorage.removeItem(key);
};
const storageLoad = (key: string) => {
  return JSON.parse(localStorage.getItem(key) ?? `""`);
};

enum StorageKeys {
  userID = "userID",
  userName = "userName",
  authenticationToken = "authenticationToken",
}

const loadUserDataFromLS = () => {
  return {
    id: storageLoad(StorageKeys.userID),
    name: storageLoad(StorageKeys.userName),
    token: storageLoad(StorageKeys.authenticationToken),
  };
};

const deleteUserDataFromLS = () => {
  storageDel(StorageKeys.userID);
  storageDel(StorageKeys.userName);
  storageDel(StorageKeys.authenticationToken);
};

interface clearUserDataType {
  setUserID: UserDataContextValues["setUserID"];
  setUserName: UserDataContextValues["setUserName"];
  setAuthenticationToken: UserDataContextValues["setAuthenticationToken"];
}

const clearUserData = (clearUserDataFunctions: clearUserDataType) => {
  deleteUserDataFromLS();
  clearUserDataFunctions.setUserID("");
  clearUserDataFunctions.setUserName("");
  clearUserDataFunctions.setAuthenticationToken("");
};

const makeNotifyUserOnNotLoggedInError = (ctx: UserDataContextValues) => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
        if (message.includes("only logged in user may create graph data")) {
          let msg = i18n.t("Please login/signup to contribute!");
          if (ctx.userID !== "" && ctx.authenticationToken !== "") {
            msg = i18n.t("Session expired, please login again!");
            clearUserData({
              setUserID: ctx.setUserID,
              setUserName: ctx.setUserName,
              setAuthenticationToken: ctx.setAuthenticationToken,
            });
          }
          alert(msg); // TODO(skep): make it a nice MUI-popup
        }
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
};

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(defaultLanguage);
  const [userID, setUserID] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [authenticationToken, setAuthenticationToken] =
    React.useState<string>("");

  useEffect(() => {
    if (userID === "" || authenticationToken === "" || userName === "") {
      return;
    }
    storageSave(StorageKeys.userID, userID);
    storageSave(StorageKeys.userName, userName);
    storageSave(StorageKeys.authenticationToken, authenticationToken);
  }, [userID, userName, authenticationToken]);
  useEffect(() => {
    const { id, name, token } = loadUserDataFromLS();
    if (id === "" || name === "" || token === "") {
      return;
    }
    setUserID(id);
    setUserName(name);
    setAuthenticationToken(token);
  }, []);
  // XXX(skep): not sure if this works, yet!
  const setLanguageAndTranslation = (
    newlanguage: React.SetStateAction<string>,
  ) => {
    setLanguage(newlanguage);
    i18n.changeLanguage(newlanguage.toString());
  };

  const logout = () =>
    clearUserData({
      setUserID,
      setUserName,
      setAuthenticationToken,
    });

  const ctx: UserDataContextValues = {
    language,
    setLanguage: setLanguageAndTranslation,
    userID,
    userName,
    setUserID,
    setUserName,
    authenticationToken,
    setAuthenticationToken,
    logout,
  };

  const notifyUserOnNotLoggedInError = makeNotifyUserOnNotLoggedInError(ctx);
  const addUserIDHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addUserIDHeader({ headers, userID: ctx.userID });
  };
  const linkUserID = setContext(addUserIDHeaderFromContext);
  const addAuthHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addAuthHeader({ headers, token: ctx.authenticationToken });
  };
  const linkAuth = setContext(addAuthHeaderFromContext);
  const addLanguageHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addLanguageHeader({ headers, language: ctx.language });
  };
  const linkLang = setContext(addLanguageHeaderFromContext);
  const linkHttp: ApolloLink = new HttpLink({
    uri: process.env.REACT_APP_BACKEND_DN, // FIXME(skep): not working, option seems to be ignored, since learngraph.org is working and we currently set this to https://learn-tree.info/query, which should not work at all
    fetch,
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache: cache,
    link: notifyUserOnNotLoggedInError.concat(
      linkUserID.concat(linkLang.concat(linkAuth.concat(linkHttp))),
    ),
  });

  return (
    <UserDataContext.Provider value={ctx}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </UserDataContext.Provider>
  );
};
