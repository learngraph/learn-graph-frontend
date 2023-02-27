import {
  //CreateNodeFn,
  CreateNodeFnResponse,
} from "./GraphManager/hooks/useCreateNode";
import { Text } from "./GraphManager/hooks/types";
import {
  getRequestId,
  pendingActionTypes,
  EditGraph,
} from "./GraphDataContext";
import { CreateEdgeFnResponse } from "./GraphManager/hooks/useCreateEdge";

//import { DataSetType, GraphData, NodeType } from "./GraphManager/types";
//import {
//  createNode,
//  updateNode,
//} from "./GraphManager/components/tabs/EditTab/utilities/editNode"; // TODO(skep): move editNode content here, once migration to GraphDataContext is done
//
//// TODO: use running index to avoid conflicts when adding nodes in succession
//export const TMPNODE_ID = "TMPNEWNODE";
//export const updateNodeFn = (args: {
//  currentGraphDataset: DataSetType;
//  selectedNodeInGraph: NodeType;
//  createNodeInBackend: CreateNodeFn;
//  setSelectedNodeDescription: (description: string) => void;
//  updateDisplayedGraph: (value: DataSetType) => void;
//}) => {
//  return ({
//    node,
//    isNewNode,
//  }: {
//    isNewNode: boolean;
//    node: NodeType;
//  }): Promise<void> => {
//    return new Promise<void>((resolve, reject) => {
//      const { dataSetName } = args.currentGraphDataset;
//      let newGraph: GraphData | undefined = undefined;
//      if (isNewNode) {
//        newGraph = createNode({
//          graph: args.currentGraphDataset.data,
//          newNode: { ...node, id: TMPNODE_ID },
//        });
//        args
//          .createNodeInBackend({
//            description: {
//              translations: [
//                {
//                  language: "en" /*TODO(skep): use language header*/,
//                  content: node.description,
//                },
//              ],
//            },
//          })
//          .then((rsp: CreateNodeFnResponse) => {
//            if (!rsp.data) {
//              reject("empty response from backend");
//              return;
//            }
//            const newNewGraph = updateNode({
//              graph: args.currentGraphDataset.data,
//              newNode: { ...node, id: rsp.data?.createNode.ID },
//              selectedNode: { ...node, id: TMPNODE_ID },
//            });
//            args.updateDisplayedGraph({ dataSetName, data: newNewGraph });
//            resolve();
//          });
//      } else {
//        newGraph = updateNode({
//          graph: args.currentGraphDataset.data,
//          newNode: node,
//          selectedNode: args.selectedNodeInGraph,
//        });
//        resolve();
//      }
//      args.setSelectedNodeDescription(node.description);
//      args.updateDisplayedGraph({ dataSetName, data: newGraph });
//    });
//  };
//};

export function getCreateNodeAction(graph: EditGraph) {
  return (argument: { description: Text }) =>
    new Promise<CreateNodeFnResponse>(async (resolve, reject) => {
      const requestId = getRequestId();
      graph.requestsDispatch({
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        id: requestId,
        data: argument,
      });
      graph.setNodes([...graph.nodes, { ...argument, id: requestId }]);
      try {
        const response = await graph.createNodeInBackend(argument);
        if (!response.data) {
          throw new Error("creating Node didnt return an ID!");
        }
        const nodesWithoutTempNode = graph.nodes.filter(
          (node) => node.id !== requestId
        );
        graph.setNodes([
          ...nodesWithoutTempNode,
          { ...argument, id: response.data.createNode.ID },
        ]);
      } catch (error) {
        // remove temp node before escalating error
        const nodesWithoutTempNode = graph.nodes.filter(
          (node) => node.id !== requestId
        );
        graph.setNodes(nodesWithoutTempNode);

        // TODO: report error to user - notistack?
        // TODO(far future): log error
        reject(error);
      }
      graph.requestsDispatch({
        type: pendingActionTypes.CLEAR_REQUEST,
        id: requestId,
      });
      resolve({ data: { createNode: { ID: "TMPID1" } } }); // TODO(skep): random tmp id's, since there can be multiple
    });
}

export function getCreateLinkAction(graph: EditGraph) {
  return (argument: { from: string; to: string; weight: number }) =>
    new Promise<CreateEdgeFnResponse>(async (resolve, reject) => {
      // check if node exists or id is in requests
      if (
        graph.requests.find(
          ({ type, id }) =>
            (id === argument.from || id === argument.to) &&
            type === pendingActionTypes.CREATE_NODE_WITH_TEMP_ID
        )
      ) {
        // if used node is being created, throw error and abort
        reject(
          new Error(
            "Trying to create a link to a Node that hasn't been created yet!"
          )
        );
        // (TODO(future): await other request to finish, then queue this one? could also be bad if the wait time is long and the user changes their mind in the meantime)
      }
      const requestId = getRequestId();
      graph.requestsDispatch({
        type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        id: requestId,
        data: argument,
      });
      // insert link into links with tmp id
      graph.setLinks([
        ...graph.links,
        {
          source: argument.from,
          target: argument.to,
          value: argument.weight,
          id: requestId,
        },
      ]);
      try {
        const response = await graph.createLinkInBackend(argument);
        if (!response.data) {
          throw new Error("Creating Link didn't return any data");
        }
        const linksWithoutTempNode = graph.links.filter(
          (node) => node.id !== requestId
        );
        graph.setLinks([
          ...linksWithoutTempNode,
          {
            source: argument.from,
            target: argument.to,
            value: argument.weight,
            id: response.data.createEdge.ID,
          },
        ]);
      } catch (error) {
        graph.setLinks(graph.links.filter((link) => link.id !== requestId));
        reject(error);
      }
      graph.requestsDispatch({
        type: pendingActionTypes.CLEAR_REQUEST,
        id: requestId,
      });
      resolve({ data: { createEdge: { ID: "TMPEDGEID" } } });
    });
}
