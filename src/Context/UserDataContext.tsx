import React, { useEffect } from "react";
import i18n from "@src/shared/i18n";
import { AlertFnRef, AlertPopupBar } from "@src/shared/Alert";

export interface UserDataContextValues {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const SUPPORTED_LANGUAGE_TAGS = ["en", "de", "zh"]; // FIXME(skep): unused now!!
const DEFAULT_LANGUAGE = "en";

export const errMsgNoDefault =
  "'defaultContextValues' must not be used! Use UserDataContextProvider instead.";
const defaultContextValues: UserDataContextValues = {
  language: DEFAULT_LANGUAGE,
  setLanguage: () => Promise.reject({ error: errMsgNoDefault }),
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
  language = "language",
}

const loadUserDataFromLS = () => {
  const r: {
    language: string;
  } = {
    language: storageLoad(StorageKeys.language),
  };
  return r;
};

const deleteUserDataFromLS = () => {
  storageDel(StorageKeys.language);
};

// clearUserDataCtx is a shorthand for clearUserData
const clearUserDataCtx = (_: UserDataContextValues) => {
  return clearUserData();
};

// clearUserData removes all user data from the running application and from
// browser local storage
const clearUserData = () => {
  deleteUserDataFromLS();
};

export const translateLocaleToLanguageTag = (locale: string) => {
  for (const tag of SUPPORTED_LANGUAGE_TAGS) {
    if (locale.startsWith(`${tag}_`) || locale.startsWith(tag)) {
      return tag;
    }
  }
  return DEFAULT_LANGUAGE;
};

export const UserDataContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const { language } = loadUserDataFromLS();
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
  const setLanguageAndTranslation = (
    newLanguage: React.SetStateAction<string>,
  ) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage.toString());
    storageSave(StorageKeys.language, newLanguage);
  };

  const ctx: UserDataContextValues = {
    language,
    setLanguage: setLanguageAndTranslation,
  };

  const displayAlertRef: AlertFnRef = {};
  return (
    <UserDataContext.Provider value={ctx}>
      <AlertPopupBar displayAlertRef={displayAlertRef} />
      {children}
    </UserDataContext.Provider>
  );
};
