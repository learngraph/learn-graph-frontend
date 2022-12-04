import React from 'react'
import { GraphData } from './GraphManager/types'

interface GraphDataContextValues {
  graph: GraphData
  requests: Array<string>
}

interface ProviderProps {
  children: React.ReactNode,
}

const defaultValues = {
  graph: {nodes: [], links: []},
  requests: []
}

const GraphDataContext = React.createContext<GraphDataContextValues>(defaultValues)

const GraphDataContextProvider: React.FC<ProviderProps> = ({children}) => {
  const [graph, setGraph] = React.useState(defaultValues.graph);
  const [requests, setRequests] = React.useState([])

  return (
    <GraphDataContext.Provider
      value={{
        graph,
        requests,
      }}
    >
      {children}
    </GraphDataContext.Provider>
  );
};

const useGraphDataContext = () => React.useContext(GraphDataContext)
export default GraphDataContextValues
export { GraphDataContextProvider, useGraphDataContext }