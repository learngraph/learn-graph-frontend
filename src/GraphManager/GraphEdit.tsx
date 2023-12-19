import { Dispatch, SetStateAction } from "react";
import { NewLinkForm, NewNodeForm, PopUpControls } from "./GraphEditPopUp";
import { CreateNodeFn } from "./hooks/useCreateNode";
import { CreateEdgeFn } from "./hooks/useCreateEdge";
import {
  ForceGraphRef,
  ForceGraphGraphData,
  ForceGraphLinkObject,
  ForceGraphNodeObject,
  ForceGraphLinkObjectInitial,
} from "./types";
import { Position } from "./GraphRenderer";

export interface GraphState {
  current: ForceGraphGraphData;
  setGraph: Dispatch<SetStateAction<ForceGraphGraphData>>;
  addLink: (link: ForceGraphLinkObject | ForceGraphLinkObjectInitial) => void;
  updateLink: (
    link: ForceGraphLinkObject,
    newLink: ForceGraphLinkObject,
  ) => void;
  removeLink: (link: ForceGraphLinkObject) => void;
  addNode: (node: ForceGraphNodeObject) => void;
}
export interface Backend {
  createNode: CreateNodeFn;
  createLink: CreateEdgeFn;
}

export const openCreateNodePopUpAtMousePosition = (
  mouse: MouseEvent,
  ctrl: Controller,
) => {
  return openCreateNodePopUpAtPagePosition(
    { x: mouse.pageX, y: mouse.pageY },
    ctrl,
  );
};

export const openCreateNodePopUpAtPagePosition = (
  pagePosition: Position,
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
        const graphCoordinates = forceGraphRef.current?.screen2GraphCoords(
          pagePosition.x,
          pagePosition.y,
        );
        if (graphCoordinates === undefined) {
          console.log(
            `failed to translate coordinates: page[x,y]=[${pagePosition.x},${pagePosition.y}]`,
          );
          return;
        }
        const { x, y } = graphCoordinates;
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
  popUp.setState({
    ...popUp.state,
    isOpen: true,
    title: "Create new knowledge node",
    nodeEdit: { onFormSubmit },
  });
};

export interface Controller {
  graph: GraphState;
  forceGraphRef: ForceGraphRef;
  popUp: PopUpControls;
  backend: Backend;
  nodeDrag: NodeDrag;
}

export const makeOnBackgroundClick = (controller: Controller) => {
  return (mouse: MouseEvent) => {
    console.log(mouse);
    if (mouse.ctrlKey) {
      openCreateNodePopUpAtMousePosition(mouse, controller);
    }
  };
};

export interface NodeDrag {
  state: NodeDragState;
  setState: Dispatch<SetStateAction<NodeDragState>>;
}

export interface NodeDragState {
  dragSourceNode?: ForceGraphNodeObject;
  interimLink?: ForceGraphLinkObject;
}

//let interimLink: ForceGraphLinkObject | undefined = undefined;

const snapInOutDistances = [15, 40];
export const DRAG_snapInDistanceSquared = Math.pow(snapInOutDistances[0], 2);
export const DRAG_snapOutDistanceSquared = Math.pow(snapInOutDistances[1], 2);

export const onNodeDrag = (
  { graph, nodeDrag: { state: nodeDrag, setState: setNodeDrag } }: Controller,
  dragSourceNode: ForceGraphNodeObject,
  _: Position,
) => {
  const distanceSquared = (a: Partial<Position>, b: Partial<Position>) => {
    return Math.pow(a.x! - b.x!, 2) + Math.pow(a.y! - b.y!, 2);
  };
  if (nodeDrag.dragSourceNode !== dragSourceNode) {
    setNodeDrag({ ...nodeDrag, dragSourceNode: dragSourceNode });
  }
  const addInterimLink = (
    source: ForceGraphNodeObject,
    target: ForceGraphNodeObject,
  ) => {
    const interimLink = { id: "INTERIM_TMP", source, target, value: 10 }; // TODO(skep): using GraphDataContextActions will remove the in-line temporary string
    setNodeDrag({ ...nodeDrag, interimLink });
    graph.addLink(interimLink!);
  };
  for (let node of graph.current.nodes) {
    if (node === dragSourceNode || !node) {
      continue;
    }
    if (
      nodeDrag.interimLink === undefined &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      addInterimLink(dragSourceNode, node);
    }
    if (
      // XXX(skep): should be necessary, but tests are ok.. (┙>∧<)┙へ┻┻
      //nodeDrag.interimLink?.source.id === dragSourceNode.id &&
      nodeDrag.interimLink?.target.id === node.id &&
      distanceSquared(dragSourceNode, node) > DRAG_snapOutDistanceSquared
    ) {
      graph.removeLink(nodeDrag.interimLink!);
      setNodeDrag({ ...nodeDrag, interimLink: undefined });
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
};
export const makeOnNodeDrag = (controller: Controller) => {
  return (dragSourceNode: ForceGraphNodeObject, translate: Position) => {
    onNodeDrag(controller, dragSourceNode, translate);
  };
};

export const onNodeDragEnd = async (
  {
    graph,
    backend,
    nodeDrag: { state: nodeDrag, setState: setNodeDrag },
  }: Controller,
  _: ForceGraphNodeObject,
  __: Position,
) => {
  if (nodeDrag.interimLink === undefined) {
    return;
  }
  const link = nodeDrag.interimLink;
  setNodeDrag({});
  const newLink = await backend.createLink({
    from: link.source.id,
    to: link.target.id,
    weight: link.value,
  });
  if (!newLink || !newLink.data || !newLink.data.createEdge.ID) {
    console.log("failed to create link in backend");
    return;
  }
  graph.updateLink(link, { ...link, id: newLink.data.createEdge.ID });

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

export const openCreateLinkPopUp = (ctrl: Controller) => {
  const onFormSubmit = async (form: NewLinkForm) => {
    const result = await ctrl.backend.createLink({
      from: form.sourceNode,
      to: form.targetNode,
      weight: form.linkWeight,
    });
    if (!result.data?.createEdge.ID) {
      // TODO(skep): display error to user?!
      return;
    }
    const link: ForceGraphLinkObjectInitial = {
      id: result.data!.createEdge.ID,
      source: form.sourceNode,
      target: form.targetNode,
      value: form.linkWeight,
    };
    ctrl.graph.addLink(link);
  };
  ctrl.popUp.setState({
    nodeEdit: undefined,
    isOpen: true,
    title: "Create new learning dependency",
    linkEdit: { onFormSubmit },
  });
};
