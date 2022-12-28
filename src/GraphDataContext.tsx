import React from 'react'
import { CreateNodeFn, CreateNodeFnResponse, useCreateNode } from './GraphManager/hooks/useCreateNode'
import { GraphData, NodeType, LinkType } from './GraphManager/types'
import { Text } from './GraphManager/hooks/types'

interface TranslatedNode {
  id: string;
  description: Text;
  group?: number;
}

interface TranslatedGraphData {
  nodes: TranslatedNode[];
  links: LinkType[];
}

interface GraphDataContextValues {
  graph: TranslatedGraphData
  requests: Array<PendingRequest>
  createNode: (args: { description: Text }) => void,
  updateNode: (args: { node: NodeType }) => void,
  deleteNode: (args: { nodeId: string }) => void,
  createLink: (args: { link: LinkType }) => void,
  submitVote: (args: { link: LinkType }) => void,
}

interface ProviderProps {
  children: React.ReactNode,
}

const defaultContextValues = {
  graph: { nodes: [], links: [] },
  requests: [],
  createNode: () => { },
  updateNode: () => { },
  deleteNode: () => { },
  createLink: () => { },
  submitVote: () => { },
}

enum pendingActionTypes {
  CREATE_NODE_WITH_TEMP_ID,
  CLEAR_REQUEST,
}

interface PendingRequest {
  data?: any
  id: String
}

// An interface for our actions
interface RequestAction {
  type: pendingActionTypes;
  payload: PendingRequest
}

// An interface for our state
interface RequestState extends Array<PendingRequest> { }

const pendingReducer = (state: RequestState, action: RequestAction) => {
  const { type, payload } = action;
  switch (type) {
    case pendingActionTypes.CREATE_NODE_WITH_TEMP_ID:
      return [...state, payload];
    case pendingActionTypes.CLEAR_REQUEST:
      console.log({ state, payload })
      return state.filter(({ id }) => id !== payload.id)
    default:
      throw new Error();
  }
}


const GraphDataContext = React.createContext<GraphDataContextValues>(defaultContextValues)

const GraphDataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [nodes, setNodes] = React.useState<TranslatedNode[]>([])
  const [links, setLinks] = React.useState<LinkType[]>([])
  const [requests, requestsDispatch] = React.useReducer(pendingReducer, [])

  const { createNode: createNodeAction } = useCreateNode()
  const createNode = async (argument: { description: Text }) => {
    const requestId = String(Date.now())
    requestsDispatch({ type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID, payload: { data: {}, id: requestId } })
    setNodes([...nodes, { ...argument, id: requestId }])
    try {
      const response = await createNodeAction(argument)
      if (!response.data) {
        throw new Error('creating Node didnt return an ID!')
      }
      const nodesWithoutTempNode = nodes.filter((node) => (node.id !== requestId))
      setNodes([...nodesWithoutTempNode, { ...argument, id: response.data.createNode.ID }])
    } catch (error) {
      // remove temp node before escalating error
      const nodesWithoutTempNode = nodes.filter((node) => node.id !== requestId)
      setNodes(nodesWithoutTempNode)

      // TODO: report error to user - notistack?
      // TODO(far future): log error
      throw error
    }
    requestsDispatch({ type: pendingActionTypes.CLEAR_REQUEST, payload: { id: requestId } })
  }

  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode,
        updateNode: () => { },
        deleteNode: () => { },
        createLink: () => { },
        submitVote: () => { },
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

const useGraphDataContext = () => React.useContext(GraphDataContext)
export default GraphDataContextValues
export { GraphDataContextProvider, useGraphDataContext }