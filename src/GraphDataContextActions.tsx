import {
  //CreateNodeFn,
  CreateNodeFnResponse,
} from "./GraphManager/hooks/useCreateNode";
import { Text } from "./GraphManager/hooks/types";
import { pendingActionTypes, EditGraph } from "./GraphDataContext";
import getRequestId from "./getRequestId";
import { CreateEdgeFnResponse } from "./GraphManager/hooks/useCreateEdge";
import { UpdateNodeFnResponse } from "./GraphManager/hooks/useUpdateNode";
import { SubmitVoteFnResponse } from "./GraphManager/hooks/useSubmitVote";

export function getUpdateNodeAction(graph: EditGraph) {
  return (argument: { description: Text; id: string }) =>
    new Promise<UpdateNodeFnResponse>(async (resolve, reject) => {
      let responseID: string | undefined;

      const requestId = getRequestId();
      graph.requestsDispatch({
        type: pendingActionTypes.UPDATE_NODE,
        id: requestId,
        data: argument,
      });
      const updatingNode = graph.nodes.find(
        ({ id: searchedId }) => searchedId === argument.id
      );
      if (!updatingNode) {
        reject(new Error("Attempting to update non-existing Node!"));
        return;
      }
      const { description: oldDescription } = updatingNode;
      try {
        //TODO: check if in place updating works, otherwise replace
        updatingNode.description = argument.description;

        const response = await graph.updateNodeInBackend(argument);
        responseID = response.data?.updateNode.ID;
      } catch (e) {
        updatingNode.description = oldDescription;
        reject(e);
      }

      graph.requestsDispatch({
        type: pendingActionTypes.CLEAR_REQUEST,
        id: requestId,
      });
      if (responseID === undefined) {
        reject(new Error("Didnt receive updated node ID from the backend!"));
        return;
      }
      resolve({ data: { updateNode: { ID: responseID } } });
    });
}

export function getCreateNodeAction(graph: EditGraph) {
  return (argument: { description: Text }) =>
    new Promise<CreateNodeFnResponse>(async (resolve, reject) => {
      let responseID: string | undefined;

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
        responseID = response.data.createNode.ID;

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
      if (responseID === undefined) {
        reject("Didnt receive updated node ID from the backend!");
        return;
      }
      resolve({ data: { createNode: { ID: responseID } } });
    });
}

export interface NewLinkType {
  from: string;
  to: string;
  weight: number;
}

export function getCreateLinkAction(graph: EditGraph) {
  return (argument: NewLinkType) =>
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
        return;
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

      let responseID: string | undefined;
      try {
        const response = await graph.createLinkInBackend(argument);
        if (!response.data) {
          throw new Error("Creating Link didn't return any data");
        }
        const linksWithoutTempNode = graph.links.filter(
          (node) => node.id !== requestId
        );

        responseID = response.data.createEdge.ID;

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
        return;
      } finally {
        graph.requestsDispatch({
          type: pendingActionTypes.CLEAR_REQUEST,
          id: requestId,
        });
      }

      if (responseID === undefined) {
        reject("Didnt receive new link ID from the backend!");
        return;
      }
      resolve({ data: { createEdge: { ID: responseID } } });
    });
}

interface SubmitVoteType {
  ID: string;
  value: number;
}

export function getSubmitVoteAction(graph: EditGraph) {
  return (argument: SubmitVoteType) =>
    new Promise<SubmitVoteFnResponse>(async (resolve, reject) => {
      if (
        graph.requests.find(
          ({ type, id }) =>
            id === argument.ID && type === pendingActionTypes.SUBMIT_VOTE
        )
      ) {
        // if used node is being created, throw error and abort
        reject("Trying to update a link that is already being updated!");
        return;
      }

      //TODO: reject on update link that is being created

      const linkIndex = graph.links.findIndex(({ id }) => id === argument.ID);
      if (linkIndex === -1) {
        reject("Link not found!");
        return;
      }

      const requestId = getRequestId();
      graph.requestsDispatch({
        type: pendingActionTypes.SUBMIT_VOTE,
        id: requestId,
        data: argument,
      });

      const oldLink = graph.links[linkIndex];
      const updatedLink = { ...oldLink, value: argument.value };
      const newLinks = [...graph.links];
      newLinks.splice(linkIndex, 1, updatedLink);
      graph.setLinks(newLinks);

      let response: SubmitVoteFnResponse | undefined;
      try {
        response = await graph.submitVoteInBackend(argument);
        if (!response?.data) {
          throw new Error("Creating Link didn't return any data");
        }
      } catch (error) {
        const linkIndex = graph.links.findIndex(({ id }) => id === argument.ID);
        const oldLinks = [...graph.links].splice(linkIndex, 1, oldLink);
        graph.setLinks(oldLinks);
        reject(error);
      } finally {
        graph.requestsDispatch({
          type: pendingActionTypes.CLEAR_REQUEST,
          id: requestId,
        });
      }

      if (!response) {
        reject("Didnt receive a response from the backend!");
        return;
      }

      resolve(response);
    });
}
