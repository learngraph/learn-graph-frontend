import React from "react";
import {
  CreateNodeFn,
  CreateNodeFnResponse,
  useCreateNode,
} from "./GraphManager/hooks/useCreateNode";
import { GraphData, NodeType, LinkType } from "./GraphManager/types";
import { Text } from "./GraphManager/hooks/types";

interface GraphDataContextValues {
  graph: GraphData;
  requests: Array<string>;
  createNode: CreateNodeFn;
  updateNode: (args: { node: NodeType }) => void;
  deleteNode: (args: { nodeId: string }) => void;
  createLink: (args: { link: LinkType }) => void;
  submitVote: (args: { link: LinkType }) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const defaultContextValues = {
  graph: { nodes: [], links: [] },
  requests: [],
  createNode: async () => new Promise<CreateNodeFnResponse>(() => {}),
  updateNode: () => {},
  deleteNode: () => {},
  createLink: () => {},
  submitVote: () => {},
};

const GraphDataContext =
  React.createContext<GraphDataContextValues>(defaultContextValues);

const GraphDataContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const [nodes, setNodes] = React.useState([]);
  const [links, setLinks] = React.useState([]);
  const [requests, setRequests] = React.useState([]);

  const { createNode: createNodeAction } = useCreateNode();
  const createNode = async (argument: { description: Text }) => {
    return await createNodeAction(argument);
  };

  return (
    <GraphDataContext.Provider
      value={{
        graph: { nodes, links },
        requests,
        createNode,
        updateNode: () => {},
        deleteNode: () => {},
        createLink: () => {},
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
