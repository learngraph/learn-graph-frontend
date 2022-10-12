import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

import fetch from "cross-fetch";

const link: ApolloLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_DN,
  fetch,
});
const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link,
});
