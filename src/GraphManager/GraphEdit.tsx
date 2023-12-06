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

const snapInOutDistances = [5, 20];
export const DRAG_snapInDistanceSquared = Math.pow(snapInOutDistances[0], 2);
export const DRAG_snapOutDistanceSquared = Math.pow(snapInOutDistances[1], 2);

export const onNodeDrag = (
  { graph, nodeDrag }: Controller,
  dragSourceNode: ForceGraphNodeObject,
  _: Position,
) => {
  const distanceSquared = (a: Partial<Position>, b: Partial<Position>) => {
    return Math.pow(a.x! - b.x!, 2) + Math.pow(a.y! - b.y!, 2);
  };
  nodeDrag.dragSourceNode = dragSourceNode;
  const addInterimLink = (
    source: ForceGraphNodeObject,
    target: ForceGraphNodeObject,
  ) => {
    //console.log(`addInterimLink: from ${source.description} to ${target.description} (nodeDrag.dragSourceNode=${nodeDrag.dragSourceNode?.description})`);
    nodeDrag.interimLink = { id: "interim_1", source, target, value: 10 };
    graph.addLink(nodeDrag.interimLink);
    console.log(`nodeDrag=${JSON.stringify(nodeDrag)}`);
  };
  for (let node of graph.current.nodes) {
    if (node === dragSourceNode) {
      continue;
    }
    if (
      nodeDrag.interimLink === undefined &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      addInterimLink(dragSourceNode, node);
    }
    if (
      nodeDrag.interimLink?.source.id === dragSourceNode.id &&
      nodeDrag.interimLink?.target.id === node.id &&
      distanceSquared(dragSourceNode, node) > DRAG_snapOutDistanceSquared
    ) {
      graph.removeLink(nodeDrag.interimLink!);
      nodeDrag.interimLink = undefined;
      console.log(`[rm] nodeDrag=${JSON.stringify(nodeDrag)}`);
    }
    if (
      nodeDrag.interimLink !== undefined &&
      node !== nodeDrag.interimLink.target &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      graph.removeLink(nodeDrag.interimLink);
      addInterimLink(dragSourceNode, node);
    }
  }
  //console.log(`[final] nodeDrag=${JSON.stringify(nodeDrag)}`);
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
  // FIXME(skep): interimLink is always undefined!? maybe object destrucring problem?!
  if (nodeDrag.interimLink === undefined) {
    console.log(
      `onNodeDragEnd: NO link present (nodeDrag=${JSON.stringify(nodeDrag)})`,
    );
    return;
  }
  console.log("onNodeDragEnd: creating link");
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
