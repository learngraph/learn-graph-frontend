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

export enum NodeEditType {
  create = "create",
  edit = "edit",
}
export interface NodeEdit {
  username: string;
  type: NodeEditType;
  //newDescription: string
  //newResources?: string
  updatedAt: Date;
}
export interface EdgeEdit {
  username: string;
  type: NodeEditType;
  weight: number;
  updatedAt: Date;
}
