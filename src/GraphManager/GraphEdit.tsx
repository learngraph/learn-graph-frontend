import { ForceGraphMethods } from "react-force-graph-2d";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { GraphDataForceGraph, LinkBetweenNode, Node } from "./GraphRenderer";
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
  mouse: MouseEvent,
  { backend, graph, popUp }: Controller
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
          console.error("failed to create node in backend");
          return;
        }
        const [x, y] = [mouse.x, mouse.y];
        //const [x, y] = [mouse.x - 400, mouse.y - 600]; // XXX: what the hell is this coordinate-transformation?!
        console.log(`mouse.x,mouse.y = (${mouse.x},${mouse.y})`);
        console.log(`offsetX,offsetY = (${mouse.offsetX},${mouse.offsetY})`);
        console.log(`clientX,clientY = (${mouse.clientX},${mouse.clientY})`);
        console.log(`screenX,screenY = (${mouse.screenX},${mouse.screenY})`);
        console.log(`x,y = (${x},${y})`);
        const newNode = {
          id: result.data!.createNode.ID,
          description: form.nodeDescription,
          x,
          y,
        };
        graph.addNode(newNode);
      });
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
