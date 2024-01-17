import React from "react";

import { LinkType } from "./GraphManager/types";
import { Text } from "./GraphManager/hooks/types";

import {
  CreateNodeFn,
  useCreateNode,
} from "./GraphManager/hooks/useCreateNode";
import {
  CreateEdgeFn,
  useCreateEdge,
} from "./GraphManager/hooks/useCreateEdge";
import {
  UpdateNodeFn,
  useUpdateNode,
} from "./GraphManager/hooks/useUpdateNode";
import {
  SubmitVoteFn,
  useSubmitVote,
} from "./GraphManager/hooks/useSubmitVote";
import {
  getCreateNodeAction,
  getCreateLinkAction,
  getUpdateNodeAction,
  getSubmitVoteAction,
} from "./GraphDataContextActions";
import {
  CreateUserWithMailFn,
  useCreateUserWithEmail,
} from "./GraphManager/hooks/useCreateUser";
import { LoginFn, useLogin } from "./GraphManager/hooks/useLoginUser";
import { LogoutFn, useLogout } from "./GraphManager/hooks/useLogoutUser";

//// TODO(skep): remove "translated"-types, the backend always receives the
// language header, thus translation should happen there, to avoid large amount
// of unnecessary data to be transferred.
//import { Node, Link } from "./GraphManager/GraphRenderer";
//export type TranslatedNode = Node;
//export type TranslatedGraphData = Link;

export interface TranslatedNode {
  id: string;
  description: Text;
  group?: number;
}

export interface TranslatedGraphData {
  nodes: TranslatedNode[];
  links: LinkType[];
}

interface GraphDataContextValues {
  // internal data
  graph: TranslatedGraphData;
  requests: Array<RequestData>;
  // GQL queries & mutations
  createNode: CreateNodeFn;
  updateNode: UpdateNodeFn;
  createLink: CreateEdgeFn;
  submitVote: SubmitVoteFn;

  // TODO(skep): move these calls to userDataContext? or create a
  // UserController object passed through the components similar to the
  // Controller in the GraphEdit component
  // XXX: afterward the whole GraphDataContext can be removed!
  createUserWithEMail: CreateUserWithMailFn;
  loginUser: LoginFn;
  logoutUser: LogoutFn;

  // apply graph data changes to react state
  setNodes: React.Dispatch<React.SetStateAction<TranslatedNode[]>>;
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  //deleteNode: DeleteNodeFn;
  //deleteEdge: ?;
  //deleteAccount: ?;
}

const defaultContextValues = {
  graph: { nodes: [], links: [] },
  requests: [],
  createNode: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  createLink: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  updateNode: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  submitVote: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  setLinks: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  setNodes: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  createUserWithEMail: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  loginUser: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
  logoutUser: () =>
    Promise.reject({ error: "defaultContextValues must not be used" }),
};

export enum pendingActionTypes {
  CREATE_NODE_WITH_TEMP_ID,
  CREATE_LINK_WITH_TEMP_ID,
  UPDATE_NODE,
  SUBMIT_VOTE,
  CLEAR_REQUEST,
}

// An interface for our actions
export interface RequestData {
  type: pendingActionTypes;
  data?: any; // TODO(skep): define types explicitly that are possible here
  id: string;
}

// An interface for our state
interface RequestState extends Array<RequestData> {}

export const pendingReducer = (state: RequestState, action: RequestData) => {
  const { type, ...payload } = action;
  switch (type) {
    case pendingActionTypes.CREATE_NODE_WITH_TEMP_ID:
    case pendingActionTypes.CREATE_LINK_WITH_TEMP_ID:
    case pendingActionTypes.UPDATE_NODE:
    case pendingActionTypes.SUBMIT_VOTE:
      return [...state, { type, ...payload }];
    case pendingActionTypes.CLEAR_REQUEST:
      return state.filter(({ id }) => id !== payload.id);
    default:
      throw new Error();
  }
};
const MakeRequestReducer = () => {
  return React.useReducer(pendingReducer, []);
};

const GraphDataContext =
  React.createContext<GraphDataContextValues>(defaultContextValues);

// EditGraph is only to be used by GraphDataContext related functionality e.g.
// GraphDataContextActions.
export interface EditGraph {
  requests: RequestData[];
  requestsDispatch: React.Dispatch<RequestData>;
  nodes: TranslatedNode[];
  setNodes: React.Dispatch<React.SetStateAction<TranslatedNode[]>>;
  links: LinkType[];
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  createLinkInBackend: CreateEdgeFn;
  createNodeInBackend: CreateNodeFn;
  updateNodeInBackend: UpdateNodeFn;
  submitVoteInBackend: SubmitVoteFn;
}

interface ProviderProps {
  children: React.ReactNode;
}

const GraphDataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [nodes, setNodes] = React.useState<TranslatedNode[]>([]);
  const [links, setLinks] = React.useState<LinkType[]>([]);
  const [requests, requestsDispatch] = MakeRequestReducer();
  const { createNode: createNodeInBackend } = useCreateNode();
  const { createEdge: createLinkInBackend } = useCreateEdge();
  const { updateNode: updateNodeInBackend } = useUpdateNode();
  const { submitVote: submitVoteInBackend } = useSubmitVote();
  const { createUserWithEMail } = useCreateUserWithEmail();
  const { login: loginUser } = useLogin();
  const { logout: logoutUser } = useLogout();
  const editGraph: EditGraph = {
    requests,
    requestsDispatch,
    nodes,
    setNodes,
    links,
    setLinks,
    createNodeInBackend,
    createLinkInBackend,
    updateNodeInBackend,
    submitVoteInBackend,
  };
  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode: getCreateNodeAction(editGraph),
        createLink: getCreateLinkAction(editGraph),
        updateNode: getUpdateNodeAction(editGraph),
        submitVote: getSubmitVoteAction(editGraph),
        createUserWithEMail,
        loginUser,
        logoutUser,
        setLinks,
        setNodes,
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

const useGraphDataContext = () => React.useContext(GraphDataContext);
export default GraphDataContextValues;
export { GraphDataContextProvider, useGraphDataContext };
