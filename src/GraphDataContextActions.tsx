import React from 'react';
import { CreateNodeFn } from './GraphManager/hooks/useCreateNode';
import { Text } from './GraphManager/hooks/types';
import { RequestData, TranslatedNode, getRequestId, pendingActionTypes } from './GraphDataContext';

export function getCreateNodeAction(props: {
  requestsDispatch: React.Dispatch<RequestData>;
  setNodes: React.Dispatch<React.SetStateAction<TranslatedNode[]>>;
  nodes: TranslatedNode[];
  createNodeAction: CreateNodeFn;
}) {

  return (argument: { description: Text; }) => new Promise<string>(async (resolve, reject) => {
    const requestId = getRequestId();
    props.requestsDispatch({
      type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
      id: requestId,
      data: argument,
    });
    props.setNodes([...props.nodes, { ...argument, id: requestId }]);
    try {
      const response = await props.createNodeAction(argument);
      if (!response.data) {
        throw new Error('creating Node didnt return an ID!');
      }
      const nodesWithoutTempNode = props.nodes.filter((node) => (node.id !== requestId));
      props.setNodes([...nodesWithoutTempNode, { ...argument, id: response.data.createNode.ID }]);
    } catch (error) {
      // remove temp node before escalating error
      const nodesWithoutTempNode = props.nodes.filter((node) => node.id !== requestId);
      props.setNodes(nodesWithoutTempNode);

      // TODO: report error to user - notistack?
      // TODO(far future): log error
      reject(error);
    }
    props.requestsDispatch({ type: pendingActionTypes.CLEAR_REQUEST, id: requestId });
    resolve("Node successfully created!");
  });
}
