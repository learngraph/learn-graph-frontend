import React, { useEffect } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLErrors } from "@apollo/client/errors";
import { setContext, ContextSetter } from "@apollo/client/link/context";
import fetch from "cross-fetch";
import i18n from "@src/shared/i18n";

import { addAuthHeader, addLanguageHeader, addUserIDHeader } from "./link";
import { AlertFnRef, AlertPopupBar } from "@src/shared/Alert";

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
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
}
type Themes = "light" | "dark";

const SUPPORTED_LANGUAGE_TAGS = ["en", "de", "zh"];
const DEFAULT_LANGUAGE = "en";

export const errMsgNoDefault =
  "'defaultContextValues' must not be used! Use UserDataContextProvider instead.";
const defaultContextValues: UserDataContextValues = {
  language: DEFAULT_LANGUAGE,
  userID: "",
  userName: "",
  authenticationToken: "",
  setLanguage: () => Promise.reject({ error: errMsgNoDefault }),
  setUserID: () => Promise.reject({ error: errMsgNoDefault }),
  setUserName: () => Promise.reject({ error: errMsgNoDefault }),
  setAuthenticationToken: () => Promise.reject({ error: errMsgNoDefault }),
  logout: () => Promise.reject({ error: errMsgNoDefault }),
  theme: "light",
  setTheme: () => Promise.reject({ error: errMsgNoDefault }),
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
  language = "language",
  theme = "theme",
}

const loadUserDataFromLS = () => {
  const r: {
    user: { id: string; name: string; token: string };
    language: string;
    theme: Themes;
  } = {
    user: {
      id: storageLoad(StorageKeys.userID),
      name: storageLoad(StorageKeys.userName),
      token: storageLoad(StorageKeys.authenticationToken),
    },
    language: storageLoad(StorageKeys.language),
    theme: storageLoad(StorageKeys.theme),
  };
  return r;
};

const deleteUserDataFromLS = () => {
  storageDel(StorageKeys.userID);
  storageDel(StorageKeys.userName);
  storageDel(StorageKeys.authenticationToken);
  storageDel(StorageKeys.language);
};

interface clearUserDataType {
  setUserID: UserDataContextValues["setUserID"];
  setUserName: UserDataContextValues["setUserName"];
  setAuthenticationToken: UserDataContextValues["setAuthenticationToken"];
}

// clearUserDataCtx is a shorthand for clearUserData
const clearUserDataCtx = (ctx: UserDataContextValues) => {
  return clearUserData({
    setUserID: ctx.setUserID,
    setUserName: ctx.setUserName,
    setAuthenticationToken: ctx.setAuthenticationToken,
  });
};

// clearUserData removes all user data from the running application and from
// browser local storage
const clearUserData = (clearUserDataFunctions: clearUserDataType) => {
  deleteUserDataFromLS();
  clearUserDataFunctions.setUserID("");
  clearUserDataFunctions.setUserName("");
  clearUserDataFunctions.setAuthenticationToken("");
};

export const handleGraphQLErrors = (
  ctx: UserDataContextValues,
  popUpWith: (msg: string) => void,
  graphQLErrors: GraphQLErrors,
) => {
  graphQLErrors.forEach(({ message }) => {
    let msg = "";
    if (message.includes("only logged in user may create graph data")) {
      msg = i18n.t("Please login/signup to contribute!");
      if (ctx.userID !== "" && ctx.authenticationToken !== "") {
        msg = i18n.t("Session expired, please login again!");
        clearUserDataCtx(ctx);
      }
    } else if (
      message.includes('violates unique constraint "users_username_key"')
    ) {
      msg = "Failed to create Account: Username already in use."; // TODO(skep): translate
    } else if (
      message.includes('violates unique constraint "users_e_mail_key"')
    ) {
      msg = "Failed to create Account: EMail already in use."; // TODO(skep): translate
    }
    if (msg !== "") {
      popUpWith(msg);
    }
  });
};
const makeNotifyUserOnNotLoggedInError = (
  ctx: UserDataContextValues,
  popUpWith: (msg: string) => void,
) => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      handleGraphQLErrors(ctx, popUpWith, graphQLErrors);
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
};

export const translateLocaleToLanguageTag = (locale: string) => {
  for (const tag of SUPPORTED_LANGUAGE_TAGS) {
    if (locale.startsWith(`${tag}_`) || locale.startsWith(tag)) {
      return tag;
    }
  }
  return "en";
};

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(DEFAULT_LANGUAGE);
  const [userID, setUserID] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [authenticationToken, setAuthenticationToken] =
    React.useState<string>("");
  const [theme, setTheme] = React.useState<Themes>("light");

  useEffect(() => {
    if (userID === "" || authenticationToken === "" || userName === "") {
      return;
    }
    storageSave(StorageKeys.userID, userID);
    storageSave(StorageKeys.userName, userName);
    storageSave(StorageKeys.authenticationToken, authenticationToken);
  }, [userID, userName, authenticationToken]);
  useEffect(() => {
    const { user, language, theme: savedTheme } = loadUserDataFromLS();
    console.log(`loaded theme=${savedTheme}`);
    if (user.id !== "" && user.name !== "" && user.token !== "") {
      setUserID(user.id);
      setUserName(user.name);
      setAuthenticationToken(user.token);
    }
    if (savedTheme && savedTheme !== theme) {
      setTheme(savedTheme);
    }
    if (language) {
      setLanguageAndTranslation(language);
    } else {
      if (navigator && navigator.language) {
        setLanguageAndTranslation(
          translateLocaleToLanguageTag(navigator.language),
        );
      }
    }
  }, []);
  useEffect(() => {
    console.log(`saving theme=${theme}`);
    storageSave(StorageKeys.theme, theme);
  }, [theme]);
  const setLanguageAndTranslation = (
    newLanguage: React.SetStateAction<string>,
  ) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toString());
    storageSave(StorageKeys.language, newLanguage);
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
    theme,
    setTheme,
  };

  const displayAlertRef: AlertFnRef = {};
  const notifyUserOnNotLoggedInError = makeNotifyUserOnNotLoggedInError(
    ctx,
    (message: string) => {
      const displayAlert = displayAlertRef.current ?? alert;
      displayAlert(message);
    },
  );
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
    //uri: import.meta.env.REACT_APP_BACKEND_DN, // FIXME(skep): not working, option seems to be ignored, since learngraph.org is working and we currently set this to https://learn-tree.info/query, which should not work at all
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
      <AlertPopupBar displayAlertRef={displayAlertRef} />
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </UserDataContext.Provider>
  );
};
