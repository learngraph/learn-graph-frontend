import { Dispatch, SetStateAction } from "react";
import {
  LinkEditDefaultValues,
  NewLinkForm,
  NewNodeForm,
  PopUpControls,
} from "./GraphEditPopUp";
import {
  ForceGraphRef,
  ForceGraphGraphData,
  ForceGraphLinkObject,
  ForceGraphNodeObject,
  ForceGraphLinkObjectInitial,
} from "./types";
import { Position, SpecialNodes } from "./GraphRenderer";
import { CreateNodeFn } from "./hooks/useCreateNode";
import { CreateEdgeFn } from "./hooks/useCreateEdge";
import { SubmitVoteFn } from "./hooks/useSubmitVote";
import { UpdateNodeFn } from "./hooks/useUpdateNode";
import { DeleteNodeFn } from "./hooks/useDeleteNode";
import { DeleteEdgeFn } from "./hooks/useDeleteEdge";
import { HasID } from "./Zoom";
import i18n from "src/i18n";

export const MAX_LINK_WEIGHT = 10;
export const DEFAULT_EDIT_LINK_WEIGHT = MAX_LINK_WEIGHT / 2;

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
  updateNode: (
    node: ForceGraphNodeObject,
    newNode: ForceGraphNodeObject,
  ) => void;
  removeNode: (node: ForceGraphNodeObject) => void;
}
export interface Backend {
  createNode: CreateNodeFn;
  updateNode: UpdateNodeFn;
  createLink: CreateEdgeFn;
  submitVote: SubmitVoteFn;
  deleteNode: DeleteNodeFn;
  deleteLink: DeleteEdgeFn;
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
    const result = await backend.createNode({
      description: {
        translations: [{ language: language, content: form.nodeDescription }],
      },
    });
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
  };
  popUp.setState({
    isOpen: true,
    title: i18n.t("Create new knowledge node"),
    nodeEdit: { onFormSubmit },
  });
};

export interface KeyboardState {
  shiftHeld: boolean;
};

export interface ZoomControl {
  zoomLevel: number,
  setZoomLevel: Dispatch<SetStateAction<number>>
};

export interface Controller {
  graph: GraphState;
  forceGraphRef: ForceGraphRef;
  popUp: PopUpControls;
  backend: Backend;
  nodeDrag: NodeDrag;
  language: string;
  // TODO(skep): should merge these two types
  highlightNodes: Set<HasID>;
  specialNodes: SpecialNodes;
  keys: KeyboardState;
  zoom: ZoomControl;
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

const snapInOutDistances = [40, 65];
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
      value: DEFAULT_EDIT_LINK_WEIGHT,
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
    if (
      !!conf?.updateExistingLink &&
      form.sourceNode === conf.updateExistingLink.source.id &&
      form.targetNode === conf.updateExistingLink.target.id
    ) {
      ctrl.graph.updateLink(conf.updateExistingLink, {
        ...conf.updateExistingLink,
        value: form.linkWeight,
        id: linkID,
      });
    } else {
      if (!!conf?.updateExistingLink) {
        ctrl.graph.removeLink(conf.updateExistingLink);
      }
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
    title: i18n.t("Create new learning dependency"),
    linkEdit: {
      onFormSubmit,
      defaults: conf?.linkEditDefaults,
      onNonSubmitClose: conf?.onCancel,
    },
  });
};

export const makeOnLinkClick = (ctrl: Controller) => {
  return (link: ForceGraphLinkObject) => {
    onLinkClick(ctrl, link);
  };
};

export const onLinkClick = (ctrl: Controller, link: ForceGraphLinkObject) => {
  const onSubmit = (weight: number) => {
    ctrl.backend.submitVote({ ID: link.id, value: weight });
  };
  const onDelete = async () => {
    await ctrl.backend.deleteLink({ id: link.id });
    ctrl.graph.removeLink(link);
  };
  ctrl.popUp.setState({
    isOpen: true,
    title: i18n.t("To learn about source -> target is required", {
      source: link?.source?.description,
      target: link?.target?.description,
    }),
    linkVote: { onSubmit, onDelete },
  });
};

export const makeOnNodeClick = (ctrl: Controller) => {
  return (node: ForceGraphNodeObject): void => onNodeClick(ctrl, node);
};

export const onNodeClick = (
  ctrl: Controller,
  node: ForceGraphNodeObject,
): void => {
  const onFormSubmit = async (form: NewNodeForm) => {
    await ctrl.backend.updateNode({
      id: node.id,
      description: {
        translations: [
          { language: ctrl.language, content: form.nodeDescription },
        ],
      },
    });
    ctrl.graph.updateNode(node, { ...node, description: form.nodeDescription });
  };
  const onDelete = async () => {
    await ctrl.backend.deleteNode({ id: node.id });
    ctrl.graph.removeNode(node);
  };
  ctrl.popUp.setState({
    isOpen: true,
    title: i18n.t("Edit node with description", {
      description: node.description,
    }),
    nodeEdit: { onFormSubmit, defaultFormContent: node, onDelete },
  });
};
