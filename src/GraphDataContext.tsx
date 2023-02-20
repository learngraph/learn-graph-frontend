import React from 'react'
import { useCreateNode } from './GraphManager/hooks/useCreateNode'
import { NodeType, LinkType } from './GraphManager/types'
import { Text } from './GraphManager/hooks/types'
import { useCreateEdge } from './GraphManager/hooks/useCreateEdge';

interface TranslatedNode {
  id: string
  description: Text
  group?: number
}

interface TranslatedGraphData {
  nodes: TranslatedNode[];
  links: LinkType[];
}

interface GraphDataContextValues {
  graph: TranslatedGraphData
  requests: Array<RequestData>
  createNode: (args: { description: Text }) => Promise<string | Error>,
  updateNode: (args: { node: NodeType }) => void,
  deleteNode: (args: { nodeId: string }) => void,
  createLink: (args: { from: string, to: string, weight: number }) => Promise<string | Error>,
  submitVote: (args: { link: LinkType }) => void,
}

interface ProviderProps {
  children: React.ReactNode,
}

const defaultContextValues = {
  graph: { nodes: [], links: [] },
  requests: [],
  createNode: () => new Promise<string>(() => { }),
  updateNode: () => { throw new Error("not implemented"); },
  deleteNode: () => { throw new Error("not implemented"); },
  createLink: () => new Promise<string>(() => { }),
  submitVote: () => { throw new Error("not implemented");  },
}

enum pendingActionTypes {
  CREATE_NODE_WITH_TEMP_ID,
  CREATE_LINK_WITH_TEMP_ID,
  CLEAR_REQUEST,
}

// An interface for our actions
interface RequestData {
  type: pendingActionTypes
  data?: any
  id: string
}

// An interface for our state
interface RequestState extends Array<RequestData> { }

const pendingReducer = (state: RequestState, action: RequestData) => {
  const { type, ...payload } = action;
  switch (type) {
    case pendingActionTypes.CREATE_NODE_WITH_TEMP_ID:
      return [...state, { type, ...payload }];
    case pendingActionTypes.CREATE_LINK_WITH_TEMP_ID:
      return [...state, { type, ...payload }]
    case pendingActionTypes.CLEAR_REQUEST:
      return state.filter(({ id }) => id !== payload.id)
    default:
      throw new Error();
  }
}

const getRequestId = () => {
  return String(Date.now())
}

const GraphDataContext = React.createContext<GraphDataContextValues>(defaultContextValues)

const GraphDataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [nodes, setNodes] = React.useState<TranslatedNode[]>([])
  const [links, setLinks] = React.useState<LinkType[]>([])
  const [requests, requestsDispatch] = React.useReducer(pendingReducer, [])

  const { createNode: createNodeAction } = useCreateNode()
  const createNode = (argument: { description: Text }) =>
    new Promise<string>(async (resolve, reject) => {
      const requestId = getRequestId();
      requestsDispatch({
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        id: requestId,
        data: argument,
      })
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
        reject(error)
      }
      requestsDispatch({ type: pendingActionTypes.CLEAR_REQUEST, id: requestId })
      resolve("Node successfully created!")
    })

  const { createEdge: createLinkAction } = useCreateEdge()
  const createLink = (argument: {
    from: string;
    to: string;
    weight: number;
  }) => new Promise<string>(async (resolve, reject) => {
    // check if node exists or id is in requests
    if (requests.find(({ type, id }) => ((id === argument.from || id === argument.to) && type === pendingActionTypes.CREATE_NODE_WITH_TEMP_ID))) {
      // if used node is being created, throw error and abort
      reject(new Error("Trying to create a link to a Node that hasn't been created yet!"))
      // (TODO(future): await other request to finish, then queue this one? could also be bad if the wait time is long and the user changes their mind in the meantime)
    }
    const requestId = getRequestId();
    requestsDispatch({
      type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
      id: requestId,
      data: argument,
    })
    // insert link into links with tmp id
    setLinks([...links, { source: argument.from, target: argument.to, value: argument.weight, id: requestId }])
    try {
      const response = await createLinkAction(argument)
      if (!response.data) {
        throw new Error('Creating Link didnt return an ID!')
      }
      const linksWithoutTempNode = links.filter((node) => (node.id !== requestId))
      setLinks(
        [...linksWithoutTempNode, { source: argument.from, target: argument.to, value: argument.weight, id: response.data.createEdge.ID }])
    } catch (error) {
      setLinks(links.filter((link) => link.id !== requestId))
      reject(error)
    }
    requestsDispatch({
      type: pendingActionTypes.CLEAR_REQUEST,
      id: requestId,
    })
    resolve("Link successfully created!")
  })

  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode,
        updateNode: () => { },
        deleteNode: () => { },
        createLink,
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
