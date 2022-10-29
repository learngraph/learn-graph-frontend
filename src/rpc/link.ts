import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext, ContextSetter } from "@apollo/client/link/context";

import fetch from "cross-fetch";

const linkHttp: ApolloLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_DN,
  fetch,
});
const cache = new InMemoryCache();

export const addAuthHeader: ContextSetter = (_, { headers }) => {
  // TODO(skep): user authentication?
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authentication: token ? `Bearer ${token}` : "unauthenticated",
    },
  };
};
const linkAuth = setContext(addAuthHeader);

export const addLanguageHeader: ContextSetter = (_, { headers }) => {
  return {
    headers: {
      ...headers,
      Language: "en", // TODO(skep): create context w/ language setting und use it's language value here
    },
  };
};
const linkLang = setContext(addLanguageHeader);

export const client = new ApolloClient({
  cache: cache,
  link: linkLang.concat(linkAuth.concat(linkHttp)),
});
