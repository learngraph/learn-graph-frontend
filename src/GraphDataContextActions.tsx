import React from "react";
import {
  CreateNodeFn,
  CreateNodeFnResponse,
} from "./GraphManager/hooks/useCreateNode";
import { Text } from "./GraphManager/hooks/types";
import {
  RequestData,
  TranslatedNode,
  getRequestId,
  pendingActionTypes,
} from "./GraphDataContext";
import { CreateEdgeFn } from "./GraphManager/hooks/useCreateEdge";
import { LinkType } from "./GraphManager/types";

export function getCreateNodeAction(props: {
  requestsDispatch: React.Dispatch<RequestData>;
  setNodes: React.Dispatch<React.SetStateAction<TranslatedNode[]>>;
  nodes: TranslatedNode[];
  createNodeAction: CreateNodeFn;
}) {
  return (argument: { description: Text }) =>
    new Promise<CreateNodeFnResponse>(async (resolve, reject) => {
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
          throw new Error("creating Node didnt return an ID!");
        }
        const nodesWithoutTempNode = props.nodes.filter(
          (node) => node.id !== requestId
        );
        props.setNodes([
          ...nodesWithoutTempNode,
          { ...argument, id: response.data.createNode.ID },
        ]);
      } catch (error) {
        // remove temp node before escalating error
        const nodesWithoutTempNode = props.nodes.filter(
          (node) => node.id !== requestId
        );
        props.setNodes(nodesWithoutTempNode);

        // TODO: report error to user - notistack?
        // TODO(far future): log error
        reject(error);
      }
      props.requestsDispatch({
        type: pendingActionTypes.CLEAR_REQUEST,
        id: requestId,
      });
      resolve({ data: { createNode: { ID: "TMPID1" } } }); // TODO(skep): random tmp id's, since there can be multiple
    });
}

export function getCreateLinkAction(
  requests: RequestData[],
  requestsDispatch: React.Dispatch<RequestData>,
  setLinks: React.Dispatch<React.SetStateAction<LinkType[]>>,
  links: LinkType[],
  createLinkAction: CreateEdgeFn
) {
  return (argument: { from: string; to: string; weight: number }) =>
    new Promise<string>(async (resolve, reject) => {
      // check if node exists or id is in requests
      if (
        requests.find(
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
      requestsDispatch({
        type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        id: requestId,
        data: argument,
      });
      // insert link into links with tmp id
      setLinks([
        ...links,
        {
          source: argument.from,
          target: argument.to,
          value: argument.weight,
          id: requestId,
        },
      ]);
      try {
        const response = await createLinkAction(argument);
        if (!response.data) {
          throw new Error("Creating Link didn't return any data");
        }
        const linksWithoutTempNode = links.filter(
          (node) => node.id !== requestId
        );
        setLinks([
          ...linksWithoutTempNode,
          {
            source: argument.from,
            target: argument.to,
            value: argument.weight,
            id: response.data.createEdge.ID,
          },
        ]);
      } catch (error) {
        setLinks(links.filter((link) => link.id !== requestId));
        reject(error);
      }
      requestsDispatch({
        type: pendingActionTypes.CLEAR_REQUEST,
        id: requestId,
      });
      resolve("Link successfully created!");
    });
}
