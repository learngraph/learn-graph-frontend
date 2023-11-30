import { ForceGraphMethods } from "react-force-graph-2d";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import {
  GraphDataForceGraph,
  LinkBetweenNode,
  Node,
} from "./GraphRenderer";
import { NewNodeForm, PopUpControls } from "./GraphEditPopUp";
import { CreateNodeFn } from "./hooks/useCreateNode";

export interface GraphState {
  current: GraphDataForceGraph;
  setGraph: Dispatch<SetStateAction<GraphDataForceGraph>>;
  addLink: (link: LinkBetweenNode) => void;
  addNode: (node: Node) => void;
}
export interface Backend {
  createNode: CreateNodeFn;
}

export const createNodeFromMouseEvent = (
  _: MouseEvent,
  { backend, graph, popUp }: Controller
) => {
  const onFormSubmit = async (form: NewNodeForm) => {
    const result = await backend.createNode({
      description: {
        translations: [{ language: "en", content: form.nodeDescription }],
      },
    });
    if (result.data?.createNode.ID === undefined) {
      console.error("failed to create node in backend");
      return;
    }
    const newNode = {
      id: result.data!.createNode.ID,
      description: form.nodeDescription,
    };
    graph.addNode(newNode);
  };
  popUp.setState({ ...popUp.state, isOpen: true, onFormSubmit });
};

export interface Controller {
  graph: GraphState;
  forceGraphRef: MutableRefObject<ForceGraphMethods | undefined>;
  popUp: PopUpControls;
  backend: Backend;
}

export const makeOnBackgroundClick = (
  graph: GraphState,
  forceGraphRef: MutableRefObject<ForceGraphMethods | undefined>,
  popUp: PopUpControls,
  backend: Backend
) => {
  return (mouse: MouseEvent) => {
    console.log(mouse);
    if (mouse.ctrlKey) {
      createNodeFromMouseEvent(mouse, { graph, popUp, backend, forceGraphRef });
    }
  };
};
