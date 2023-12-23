import { Dispatch, SetStateAction } from "react";
import {
  LinkEditDefaultValues,
  NewLinkForm,
  NewNodeForm,
  PopUpControls,
} from "./GraphEditPopUp";
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

export const MAX_LINK_WEIGHT = 10;

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
  { backend, graph, popUp, forceGraphRef, language }: Controller,
) => {
  const onFormSubmit = async (form: NewNodeForm) => {
    backend
      .createNode({
        description: {
          translations: [{ language: language, content: form.nodeDescription }],
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
  language: string;
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

const snapInOutDistances = [15, 40];
export const DRAG_snapInDistanceSquared = Math.pow(snapInOutDistances[0], 2);
export const DRAG_snapOutDistanceSquared = Math.pow(snapInOutDistances[1], 2);

export const INTERIM_TMP_LINK_ID = "INTERIM_TMP";
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
    const interimLink = {
      id: INTERIM_TMP_LINK_ID,
      source,
      target,
      value: MAX_LINK_WEIGHT / 2,
    }; // TODO(skep): using GraphDataContextActions will remove the in-line temporary string
    setNodeDrag({ ...nodeDrag, interimLink });
    graph.addLink(interimLink!);
  };
  let newInterimLinkTarget: ForceGraphNodeObject | null = null;
  let removeCurrentInterimLink: boolean = false;
  for (let node of graph.current.nodes) {
    if (node === dragSourceNode || !node) {
      continue;
    }
    if (
      nodeDrag.interimLink === undefined &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      newInterimLinkTarget = node;
    }
    if (
      nodeDrag.interimLink?.target.id === node.id &&
      distanceSquared(dragSourceNode, node) > DRAG_snapOutDistanceSquared
    ) {
      removeCurrentInterimLink = true;
    }
    if (
      nodeDrag.interimLink !== undefined &&
      node !== nodeDrag.interimLink.target &&
      distanceSquared(dragSourceNode, node) < DRAG_snapInDistanceSquared
    ) {
      newInterimLinkTarget = node;
    }
  }
  if (removeCurrentInterimLink) {
    graph.removeLink(nodeDrag.interimLink!);
    setNodeDrag({ ...nodeDrag, interimLink: undefined });
  }
  if (!!newInterimLinkTarget) {
    if (!!nodeDrag.interimLink) {
      graph.removeLink(nodeDrag.interimLink);
    }
    addInterimLink(dragSourceNode, newInterimLinkTarget);
  }
};
export const makeOnNodeDrag = (controller: Controller) => {
  return (dragSourceNode: ForceGraphNodeObject, translate: Position) => {
    onNodeDrag(controller, dragSourceNode, translate);
  };
};

export const onNodeDragEnd = async (
  ctrl: Controller,
  _: ForceGraphNodeObject,
  __: Position,
) => {
  if (ctrl.nodeDrag.state.interimLink === undefined) {
    return;
  }
  const interimLink = ctrl.nodeDrag.state.interimLink;
  ctrl.nodeDrag.setState({});
  openCreateLinkPopUp(ctrl, {
    linkEditDefaults: {
      source: interimLink.source,
      target: interimLink.target,
    },
    updateExistingLink: interimLink,
    onCancel: () => {
      ctrl.graph.removeLink(interimLink);
    },
  });
  // TODO(skep): use this solution to reduce chaos while dragging:
  //    https://github.com/vasturiano/react-force-graph/issues/124

  // XXX(skep): consecutive user edits on the link, e.g. a vote will be
  // incorrect, this race-condition should be fixed by integrating the
  // GraphDataContextActions into this new editing schema
};
export const makeOnNodeDragEnd = (controller: Controller) => {
  return (dragSourceNode: ForceGraphNodeObject, translate: Position) => {
    onNodeDragEnd(controller, dragSourceNode, translate);
  };
};

export interface LinkEditPopUpConfig {
  linkEditDefaults?: LinkEditDefaultValues;
  updateExistingLink?: ForceGraphLinkObject;
  onCancel?: () => void;
}

export const openCreateLinkPopUp = (
  ctrl: Controller,
  conf?: LinkEditPopUpConfig,
) => {
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
    const linkID = result.data!.createEdge.ID;
    if (!!conf?.updateExistingLink) {
      ctrl.graph.updateLink(conf.updateExistingLink, {
        ...conf.updateExistingLink,
        value: form.linkWeight,
        id: linkID,
      });
    } else {
      const link: ForceGraphLinkObjectInitial = {
        id: linkID,
        source: form.sourceNode,
        target: form.targetNode,
        value: form.linkWeight,
      };
      ctrl.graph.addLink(link);
    }
  };
  ctrl.popUp.setState({
    nodeEdit: undefined,
    isOpen: true,
    title: "Create new learning dependency",
    linkEdit: {
      onFormSubmit,
      defaults: conf?.linkEditDefaults,
      onNonSubmitClose: conf?.onCancel,
    },
  });
};
