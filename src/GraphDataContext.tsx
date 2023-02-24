import React from "react";
import {
  CreateNodeFn,
  useCreateNode,
} from "./GraphManager/hooks/useCreateNode";
import { LinkType } from "./GraphManager/types";
import { Text } from "./GraphManager/hooks/types";
import {
  CreateEdgeFn,
  useCreateEdge,
} from "./GraphManager/hooks/useCreateEdge";
import {
  getCreateNodeAction,
  getCreateLinkAction,
} from "./GraphDataContextActions";

export interface TranslatedNode {
  id: string;
  description: Text;
  group?: number;
}

interface TranslatedGraphData {
  nodes: TranslatedNode[];
  links: LinkType[];
}

interface GraphDataContextValues {
  graph: TranslatedGraphData;
  requests: Array<RequestData>;
  createNode: CreateNodeFn;
  //updateNode: UpdateNodeFn;
  //deleteNode: DeleteNodeFn;
  createLink: CreateEdgeFn;
  submitVote: (args: { link: LinkType }) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const defaultContextValues = {
  graph: { nodes: [], links: [] },
  requests: [],
  createNode: () => Promise.reject({}),
  deleteNode: () => {
    throw new Error("not implemented");
  },
  createLink: () => Promise.reject({}),
  submitVote: () => {
    throw new Error("not implemented");
  },
};

export enum pendingActionTypes {
  CREATE_NODE_WITH_TEMP_ID,
  CREATE_LINK_WITH_TEMP_ID,
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

const pendingReducer = (state: RequestState, action: RequestData) => {
  const { type, ...payload } = action;
  switch (type) {
    case pendingActionTypes.CREATE_NODE_WITH_TEMP_ID:
      return [...state, { type, ...payload }];
    case pendingActionTypes.CREATE_LINK_WITH_TEMP_ID:
      return [...state, { type, ...payload }];
    case pendingActionTypes.CLEAR_REQUEST:
      return state.filter(({ id }) => id !== payload.id);
    default:
      throw new Error();
  }
};

export const getRequestId = () => {
  return String(Date.now());
};

const GraphDataContext =
  React.createContext<GraphDataContextValues>(defaultContextValues);

const GraphDataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [nodes, setNodes] = React.useState<TranslatedNode[]>([]);
  const [links, setLinks] = React.useState<LinkType[]>([]);
  const [requests, requestsDispatch] = React.useReducer(pendingReducer, []);

  const { createNode: createNodeAction } = useCreateNode();

  const { createEdge: createLinkAction } = useCreateEdge();

  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode: getCreateNodeAction({
          requestsDispatch,
          setNodes,
          nodes,
          createNodeAction,
        }),
        createLink: getCreateLinkAction(
          requests,
          requestsDispatch,
          setLinks,
          links,
          createLinkAction
        ),
        submitVote: () => {},
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

const useGraphDataContext = () => React.useContext(GraphDataContext);
export default GraphDataContextValues;
export { GraphDataContextProvider, useGraphDataContext };
