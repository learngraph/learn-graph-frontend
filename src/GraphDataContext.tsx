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
import { SubmitVoteFn } from "./GraphManager/hooks/useSubmitVote";
import {
  getCreateNodeAction,
  getCreateLinkAction,
  getUpdateNodeAction,
} from "./GraphDataContextActions";

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
  graph: TranslatedGraphData;
  requests: Array<RequestData>;
  createNode: CreateNodeFn;
  updateNode: UpdateNodeFn;
  //deleteNode: DeleteNodeFn;
  createLink: CreateEdgeFn;
  submitVote: SubmitVoteFn;
  setNodes: React.Dispatch<React.SetStateAction<TranslatedNode[]>>;
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
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
  submitVote: () => {
    throw new Error("defaultContextValues must not be used");
  },
  setLinks: () => {
    throw new Error("defaultContextValues must not be used");
  },
  setNodes: () => {
    throw new Error("defaultContextValues must not be used");
  },
};

export enum pendingActionTypes {
  CREATE_NODE_WITH_TEMP_ID,
  CREATE_LINK_WITH_TEMP_ID,
  UPDATE_NODE,
  CLEAR_REQUEST,
}

// An interface for our actions
export interface RequestData {
  type: pendingActionTypes;
  data?: any;
  id: string;
}

// An interface for our state
interface RequestState extends Array<RequestData> {}

export const pendingReducer = (state: RequestState, action: RequestData) => {
  const { type, ...payload } = action;
  switch (type) {
    case pendingActionTypes.CREATE_NODE_WITH_TEMP_ID:
      return [...state, { type, ...payload }];
    case pendingActionTypes.CREATE_LINK_WITH_TEMP_ID:
      return [...state, { type, ...payload }];
    case pendingActionTypes.UPDATE_NODE:
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
  };

  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode: getCreateNodeAction(editGraph),
        createLink: getCreateLinkAction(editGraph),
        updateNode: getUpdateNodeAction(editGraph),
        submitVote: () => {},
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
