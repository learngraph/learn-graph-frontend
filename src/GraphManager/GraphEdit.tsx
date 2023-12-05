import { Dispatch, SetStateAction } from "react";
import { NewNodeForm, PopUpControls } from "./GraphEditPopUp";
import { CreateNodeFn } from "./hooks/useCreateNode";
import { CreateEdgeFn } from "./hooks/useCreateEdge";
import {
  ForceGraphRef,
  ForceGraphGraphData,
  ForceGraphLinkObject,
  ForceGraphNodeObject,
} from "./types";
import { Position } from "./GraphRenderer";

export interface GraphState {
  current: ForceGraphGraphData;
  setGraph: Dispatch<SetStateAction<ForceGraphGraphData>>;
  addLink: (link: ForceGraphLinkObject) => void;
  removeLink: (link: ForceGraphLinkObject) => void;
  addNode: (node: ForceGraphNodeObject) => void;
}
export interface Backend {
  createNode: CreateNodeFn;
  createLink: CreateEdgeFn;
}

export const createNodeFromMouseEvent = (
  mouse: MouseEvent,
  { backend, graph, popUp, forceGraphRef }: Controller,
) => {
  const onFormSubmit = async (form: NewNodeForm) => {
    backend
      .createNode({
        description: {
          translations: [{ language: "en", content: form.nodeDescription }],
        },
      })
      .then((result) => {
        if (
          result.data?.createNode.ID === undefined ||
          result.data?.createNode.ID === ""
        ) {
          console.log("failed to create node in backend");
          return;
        }
        const coords = forceGraphRef.current?.screen2GraphCoords(
          mouse.pageX,
          mouse.pageY,
        );
        if (coords === undefined) {
          console.log(
            `failed to translate coordinates: page[x,y]=[${mouse.pageX},${mouse.pageY}]`,
          );
          return;
        }
        const { x, y } = coords;
        const newNode = {
          id: result.data!.createNode.ID,
          description: form.nodeDescription,
          x,
          y,
        };
        graph.addNode(newNode);
        forceGraphRef.current?.centerAt(x, y, 1000);
      });
  };
  popUp.setState({ ...popUp.state, isOpen: true, onFormSubmit });
};

export interface Controller {
  graph: GraphState;
  forceGraphRef: ForceGraphRef;
  popUp: PopUpControls;
  backend: Backend;
  nodeDrag: NodeDragState;
}

export const makeOnBackgroundClick = (controller: Controller) => {
  return (mouse: MouseEvent) => {
    console.log(mouse);
    if (mouse.ctrlKey) {
      createNodeFromMouseEvent(mouse, controller);
    }
  };
};

export interface NodeDragState {
  dragSourceNode?: ForceGraphNodeObject;
  interimLink?: ForceGraphLinkObject;
}

export const DRAG_snapInDistanceSquared = 100 * 100;
export const DRAG_snapOutDistanceSquared = 300 * 300;
export const onNodeDrag = (
  { graph, nodeDrag }: Controller,
  dragSourceNode: ForceGraphNodeObject,
  _: Position,
) => {
  const distanceSquared = (a: Partial<Position>, b: Partial<Position>) => {
    return Math.pow(a.x! - b.x!, 2) + Math.pow(a.y! - b.y!, 2);
  };
  nodeDrag.dragSourceNode = dragSourceNode;
  for (let node of graph.current.nodes) {
    if (node === dragSourceNode) {
      continue;
    }
    if (
      nodeDrag.interimLink === undefined &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      const link = {
        id: "interim_1",
        source: dragSourceNode,
        target: node,
        value: 10,
      };
      nodeDrag.interimLink = link;
      graph.addLink(nodeDrag.interimLink);
    }
    if (distanceSquared(dragSourceNode, node) > DRAG_snapOutDistanceSquared) {
      graph.removeLink(nodeDrag.interimLink!);
      nodeDrag.interimLink = undefined;
    }
    if (
      nodeDrag.interimLink !== undefined &&
      node !== nodeDrag.interimLink.target &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      graph.removeLink(nodeDrag.interimLink);
      const link = {
        id: "interim_1",
        source: dragSourceNode,
        target: node,
        value: 10,
      };
      nodeDrag.interimLink = link;
      graph.addLink(nodeDrag.interimLink);
    }
  }
};
export const makeOnNodeDrag = (controller: Controller) => {
  return (dragSourceNode: ForceGraphNodeObject, translate: Position) => {
    onNodeDrag(controller, dragSourceNode, translate);
  };
};

export const onNodeDragEnd = (
  { backend, nodeDrag }: Controller,
  _: ForceGraphNodeObject,
  __: Position,
) => {
  if (nodeDrag.interimLink === undefined) {
    return;
  }
  const link = nodeDrag.interimLink;
  nodeDrag.interimLink = undefined;
  nodeDrag.dragSourceNode = undefined;
  backend.createLink({
    from: link.source.id,
    to: link.target.id,
    weight: link.value,
  });
  // TODO(skep): CONTINUE: insert new link ID from backend into graph
  // use this solution to reduce chaos while dragging:
  //    https://github.com/vasturiano/react-force-graph/issues/124

  // NOTE(skep): consecutive user edits on the link, e.g. a vote will be
  // incorrect, this race-condition should be fixed by integrating the
  // GraphDataContextActions into this new editing schema
};
export const makeOnNodeDragEnd = (controller: Controller) => {
  return (dragSourceNode: ForceGraphNodeObject, translate: Position) => {
    onNodeDragEnd(controller, dragSourceNode, translate);
  };
};
