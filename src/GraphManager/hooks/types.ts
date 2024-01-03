// Types related to backend communication, they must be equivalent to the
// backends' graph/schema.graphqls definitions.

// Apollo query response data.
export interface ApolloQueryResponse {
  loading: boolean;
  error: any;
  networkStatus?: any;
}

export interface CreateEntityResult {
  CreateEntityResult: { ID: string };
}

export interface Translation {
  language: string;
  content: string;
}

// All text content has an associated language.
export interface Text {
  translations: Translation[];
}

export interface Status {
  Message: string;
}
