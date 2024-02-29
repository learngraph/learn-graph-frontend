interface AuthHeaderArgs {
  headers: any;
  token: string;
}
interface HeaderArgs {
  headers: any;
  header: string;
  content: string;
}

export const addHeaderWithContent = (args: HeaderArgs) => {
  return {
    headers: {
      ...args.headers,
      [args.header]: args.content,
    },
  };
};

export const addAuthHeader = (args: AuthHeaderArgs) => {
  return addHeaderWithContent({
    headers: args.headers,
    header: "Authentication",
    content: args.token ? `Bearer ${args.token}` : "unauthenticated",
  });
};

interface LanguageHeaderArgs {
  headers: any;
  language: string;
}
export const addLanguageHeader = (args: LanguageHeaderArgs) => {
  return addHeaderWithContent({
    headers: args.headers,
    header: "Language",
    content: args.language,
  });
};

interface UserIDHeaderArgs {
  headers: any;
  userID: string;
}
export const addUserIDHeader = (args: UserIDHeaderArgs) => {
  return addHeaderWithContent({
    headers: args.headers,
    header: "UserID",
    content: args.userID,
  });
};
