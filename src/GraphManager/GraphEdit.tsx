import { Dispatch, SetStateAction } from "react";
import { ForceGraphRef, LinkBetweenNode, Node } from "./GraphRenderer";
import { NewNodeForm, PopUpControls } from "./GraphEditPopUp";
import { CreateNodeFn } from "./hooks/useCreateNode";
import { ForceGraphGraphData } from "./types";

export interface GraphState {
  current: ForceGraphGraphData;
  setGraph: Dispatch<SetStateAction<ForceGraphGraphData>>;
  addLink: (link: LinkBetweenNode) => void;
  addNode: (node: Node) => void;
}
export interface Backend {
  createNode: CreateNodeFn;
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
}

export const makeOnBackgroundClick = (
  graph: GraphState,
  forceGraphRef: ForceGraphRef,
  popUp: PopUpControls,
  backend: Backend,
) => {
  return (mouse: MouseEvent) => {
    console.log(mouse);
    if (mouse.ctrlKey) {
      createNodeFromMouseEvent(mouse, { graph, popUp, backend, forceGraphRef });
    }
  };
};
