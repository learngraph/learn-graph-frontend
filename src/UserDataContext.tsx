import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext, ContextSetter } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import { addAuthHeader, addLanguageHeader, addUserIDHeader } from "./rpc/link";

export interface UserDataContextValues {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  userID: string;
  userName: string;
  setUserID: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  authenticationToken: string;
  setAuthenticationToken: React.Dispatch<React.SetStateAction<string>>;
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
};

const UserDataContext =
  React.createContext<UserDataContextValues>(defaultContextValues);

export const useUserDataContext = () => React.useContext(UserDataContext);

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(defaultLanguage);
  const [userID, setUserID] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [authenticationToken, setAuthenticationToken] =
    React.useState<string>("");

  // TODO(skep): save/fetch {authToken, userID, language} from local storage
  const addUserIDHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addUserIDHeader({ headers, userID });
  };
  const linkUserID = setContext(addUserIDHeaderFromContext);
  const addAuthHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addAuthHeader({ headers, token: authenticationToken });
  };
  const linkAuth = setContext(addAuthHeaderFromContext);
  const addLanguageHeaderFromContext: ContextSetter = (_, { headers }) => {
    return addLanguageHeader({ headers, language });
  };
  const linkLang = setContext(addLanguageHeaderFromContext);
  const linkHttp: ApolloLink = new HttpLink({
    uri: process.env.REACT_APP_BACKEND_DN, // FIXME(skep): not working, option seems to be ignored, since learngraph.org is working and we currently set this to https://learn-tree.info/query, which should not work at all
    fetch,
  });
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache: cache,
    link: linkUserID.concat(linkLang.concat(linkAuth.concat(linkHttp))),
  });

  return (
    <UserDataContext.Provider
      value={{
        language,
        setLanguage,
        userID,
        userName,
        setUserID,
        setUserName,
        authenticationToken,
        setAuthenticationToken,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </UserDataContext.Provider>
  );
};
