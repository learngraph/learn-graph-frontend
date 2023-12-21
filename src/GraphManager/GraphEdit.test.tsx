import { ForceGraphMethods } from "react-force-graph-2d";
import {
  openCreateNodePopUpAtMousePosition,
  GraphState,
  onNodeDrag,
  NodeDragState,
  DRAG_snapOutDistanceSquared,
  DRAG_snapInDistanceSquared,
  onNodeDragEnd,
  Backend,
  openCreateLinkPopUp,
} from "./GraphEdit";
import { NewLinkForm } from "./GraphEditPopUp";
import { ForceGraphLinkObject, ForceGraphNodeObject } from "./types";

export const makeMockController = () => {
  // @ts-ignore: typescript does not understand jest.mock
  const forceGraphMethods: ForceGraphMethods = jest.mock<ForceGraphMethods>(
    "react-force-graph-2d",
  );
  forceGraphMethods.centerAt = jest.fn().mockName("forceGraphRef.centerAt");
  forceGraphMethods.screen2GraphCoords = jest
    .fn()
    .mockName("forceGraphRef.screen2GraphCoords");
  const emptyGraph: {
    nodes: ForceGraphNodeObject[];
    links: ForceGraphLinkObject[];
  } = { nodes: [], links: [] };
  const ctrl = {
    backend: {
      createNode: jest.fn().mockName("backend.createNode"),
      createLink: jest.fn().mockName("backend.createLink"),
    },
    graph: {
      current: emptyGraph,
      setGraph: jest.fn().mockName("graph.setGraph"),
      addNode: jest.fn().mockName("graph.addNode"),
      addLink: jest.fn().mockName("graph.addLink"),
      removeLink: jest.fn().mockName("graph.removeLink"),
    },
    popUp: {
      state: {
        isOpen: false,
        title: "",
        details: "",
        nodeEdit: {
          onFormSubmit: jest.fn().mockName("popUp.state.onFormSubmit"),
        },
      },
      setState: jest.fn().mockName("popUp.setState"),
    },
    // @ts-ignore
    forceGraphRef: {
      current: forceGraphMethods,
    },
    nodeDrag: {},
  };
  return ctrl;
};

describe("createNodeFromMouseEvent", () => {
  const makeMockMouseEvent = (props: any) => {
    // @ts-ignore: too many unused fields
    const mouse: MouseEvent = { ...props };
    return mouse;
  };
  it("should change graph state, when backend returns a valid node ID", async () => {
    const mouse = makeMockMouseEvent({ pageX: 321, pageY: 987 });
    const ctrl = makeMockController();
    ctrl.backend.createNode.mockReturnValue(
      Promise.resolve({ data: { createNode: { ID: "123" } } }),
    );
    // @ts-ignore
    ctrl.forceGraphRef.current.screen2GraphCoords.mockReturnValue({
      x: 333,
      y: 444,
    });
    // @ts-ignore
    openCreateNodePopUpAtMousePosition(mouse, ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    const onFormSubmit = popUpState.nodeEdit.onFormSubmit;
    await onFormSubmit({ nodeDescription: "AAA" });
    expect(ctrl.backend.createNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createNode).toHaveBeenNthCalledWith(1, {
      description: { translations: [{ language: "en", content: "AAA" }] },
    });
    expect(ctrl.graph.addNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addNode).toHaveBeenNthCalledWith(1, {
      id: "123",
      description: "AAA",
      x: 333,
      y: 444,
    });
    expect(ctrl.forceGraphRef.current.screen2GraphCoords).toHaveBeenCalledTimes(
      1,
    );
    expect(
      ctrl.forceGraphRef.current.screen2GraphCoords,
    ).toHaveBeenNthCalledWith(1, 321, 987);
    expect(ctrl.forceGraphRef.current.centerAt).toHaveBeenNthCalledWith(
      1,
      333,
      444,
      1000,
    );
  });
  it("should not change graph state, when backend fails", async () => {
    const mouse = makeMockMouseEvent({ x: 1, y: 2 });
    const ctrl = makeMockController();
    ctrl.backend.createNode.mockReturnValue(
      Promise.resolve({ data: { createNode: { ID: "" } } }),
    );
    // @ts-ignore
    openCreateNodePopUpAtMousePosition(mouse, ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    const onFormSubmit = popUpState.nodeEdit.onFormSubmit;
    await onFormSubmit({ nodeDescription: "AAA" });
    expect(ctrl.backend.createNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createNode.mock.calls[0][0]).toEqual({
      description: { translations: [{ language: "en", content: "AAA" }] },
    });
    expect(ctrl.graph.addNode).not.toHaveBeenCalled();
  });
});

const makeGraphState = () => {
  const g: GraphState = {
    current: { nodes: [], links: [] },
    setGraph: jest.fn(),
    addLink: jest.fn(),
    removeLink: jest.fn(),
    updateLink: jest.fn(),
    addNode: jest.fn(),
  };
  return g;
};

const makeNodes = () => {
  const node_1 = { id: "1", x: 0, y: 0, description: "1" };
  const node_2_far = {
    id: "2",
    x: Math.sqrt(DRAG_snapInDistanceSquared) + 1,
    y: 0,
    description: "2",
  };
  const node_3_close = {
    id: "3",
    x: Math.sqrt(DRAG_snapInDistanceSquared) - 1,
    y: 0,
    description: "3",
  };
  const node_4_far = {
    id: "4",
    x: node_2_far.x + Math.sqrt(DRAG_snapInDistanceSquared) + 1,
    y: 0,
    description: "4",
  };
  return { node_1, node_2_far, node_3_close, node_4_far };
};
describe("onNodeDrag", () => {
  const makeNodeDragState = (initialState: NodeDragState) => {
    let state: NodeDragState = initialState;
    return {
      state,
      setState: (newDrag: NodeDragState) => {
        state.dragSourceNode = newDrag.dragSourceNode;
        state.interimLink = newDrag.interimLink;
      },
    };
  };
  it("should add currently dragged node to NodeDragState, and do nothing else if no other node in range", () => {
    const { node_1, node_2_far } = makeNodes();
    const nodeDrag = makeNodeDragState({});
    const graph = makeGraphState();
    graph.current.nodes = [node_1, node_2_far];
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    expect(nodeDrag.state).toEqual({ dragSourceNode: node_1 });
  });
  it("should add interimLink for in-range node and remove for out-of-range node", () => {
    const graph = makeGraphState();
    const { node_1, node_3_close } = makeNodes();
    graph.current.nodes = [node_1, node_3_close];
    const nodeDrag = makeNodeDragState({ dragSourceNode: node_1 });
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: "INTERIM_TMP",
      source: node_1,
      target: node_3_close,
      value: 10,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(nodeDrag.state).toEqual(expDrag);
    expect(graph.addLink).toHaveBeenCalledTimes(1);
    expect(graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    graph.current.nodes[1].x = Math.sqrt(DRAG_snapOutDistanceSquared) + 1;
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    expect(graph.removeLink).toHaveBeenCalledTimes(1);
    expect(graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(nodeDrag.state).toEqual({ dragSourceNode: node_1 });
  });
  it("should switch interim link if getting close to another node", () => {
    const graph = makeGraphState();
    const { node_1, node_2_far, node_3_close } = makeNodes();
    graph.current.nodes = [node_1, node_3_close, node_2_far];
    const nodeDrag = makeNodeDragState({ dragSourceNode: node_1 });
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: "INTERIM_TMP",
      source: node_1,
      target: node_3_close,
      value: 10,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(nodeDrag.state).toEqual(expDrag);
    expect(graph.addLink).toHaveBeenCalledTimes(1);
    expect(graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    node_2_far.x = node_3_close.x - 1;
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    const interimLink2: ForceGraphLinkObject = {
      id: "INTERIM_TMP",
      source: node_1,
      target: node_2_far,
      value: 10,
    };
    const expDrag2: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink2,
    };
    expect(nodeDrag.state).toEqual(expDrag2);
    expect(graph.removeLink).toHaveBeenCalledTimes(1);
    expect(graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(graph.addLink).toHaveBeenCalledTimes(2);
    expect(graph.addLink).toHaveBeenNthCalledWith(2, interimLink2);
  });
  it("should not remove links where the source node, is not the currently dragged one", () => {
    const graph = makeGraphState();
    const { node_1, node_2_far, node_3_close, node_4_far } = makeNodes();
    graph.current.nodes = [node_1, node_4_far, node_3_close, node_2_far];
    const link_12 = { id: "1", source: node_1, target: node_2_far, value: 5 };
    const link_42 = {
      id: "INTERIM_TMP",
      source: node_4_far,
      target: node_2_far,
      value: 10,
    };
    graph.current.links = [link_12, link_42];
    const nodeDrag = makeNodeDragState({
      dragSourceNode: node_4_far,
      interimLink: link_42,
    });
    // @ts-ignore
    onNodeDrag({ graph, nodeDrag }, node_1, { x: 0, y: 0 });
    expect(graph.removeLink).toHaveBeenCalledTimes(1);
    expect(graph.removeLink).toHaveBeenNthCalledWith(1, link_42);
  });
});

describe("onNodeDragEnd", () => {
  const makeBackend = () => {
    const b: Backend = {
      createNode: jest.fn(),
      createLink: jest.fn(),
    };
    return b;
  };
  it("shoud do nothing if no interimLink exists", () => {
    const graph = makeGraphState();
    const nodeDrag: NodeDragState = {};
    const backend = makeBackend();
    onNodeDragEnd(
      // @ts-ignore
      { backend, graph, nodeDrag: { state: nodeDrag, setState: jest.fn() } },
      { id: "idk", description: "ok" },
      { x: 0, y: 0 },
    );
    expect(backend.createLink).not.toHaveBeenCalled();
  });
  it("shoud create link in backend, clear NodeDragState and assign new link ID from backend to interimLink", async () => {
    const graph = makeGraphState();
    const { node_1, node_3_close } = makeNodes();
    const interimLink = {
      id: "INTERIM_TMP",
      source: node_1,
      target: node_3_close,
      value: 10,
    };
    const state: NodeDragState = { dragSourceNode: node_1, interimLink };
    const nodeDrag = { state, setState: jest.fn() };
    const backend = makeBackend();
    backend.createLink = jest
      .fn()
      .mockReturnValue({ data: { createEdge: { ID: "NEWID" } } });
    await onNodeDragEnd(
      // @ts-ignore
      { backend, graph, nodeDrag },
      node_1,
      { x: 0, y: 0 },
    );
    expect(backend.createLink).toHaveBeenCalledTimes(1);
    expect(backend.createLink).toHaveBeenNthCalledWith(1, {
      from: interimLink.source.id,
      to: interimLink.target.id,
      weight: interimLink.value,
    });
    expect(nodeDrag.setState).toHaveBeenCalledTimes(1);
    expect(nodeDrag.setState).toHaveBeenNthCalledWith(1, {});
    expect(graph.updateLink).toHaveBeenCalledTimes(1);
    expect(graph.updateLink).toHaveBeenNthCalledWith(1, interimLink, {
      ...interimLink,
      id: "NEWID",
    });
  });
});

// doesn't work, probably due to some async/await missing?
//type MockController = ReturnType<typeof makeMockController>;
//type FnCtrl = (ctrl: MockController) => void;
//it.each([
//  ...,
//])("should %s", async (_: string, mockCtrl: FnCtrl, expectations: FnCtrl) => {
//  const ctrl = makeMockController();
//  mockCtrl(ctrl);
//  // @ts-ignore
//  openCreateLinkPopUp(ctrl);
//  expectations(ctrl);
//});

describe("openCreateLinkPopUp", () => {
  it("should open a popUp, and call createLink on submit", async () => {
    const ctrl = makeMockController();
    ctrl.graph.current.nodes = [{ id: "1", description: "ok 1" }];
    ctrl.backend.createLink.mockResolvedValue({
      data: { createEdge: { ID: "newid" } },
    });
    // @ts-ignore
    openCreateLinkPopUp(ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpSetState0 = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    const content: NewLinkForm = {
      sourceNode: "123",
      targetNode: "345",
      linkWeight: 2.2,
    };
    await popUpSetState0.linkEdit.onFormSubmit(content);
    expect(ctrl.backend.createLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createLink).toHaveBeenNthCalledWith(1, {
      from: "123",
      to: "345",
      weight: 2.2,
    });
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(1, {
      id: "newid",
      source: "123",
      target: "345",
      value: 2.2,
    });
  });
  it("should not append node to graph on backend failure", async () => {
    const ctrl = makeMockController();
    ctrl.graph.current.nodes = [{ id: "1", description: "ok 1" }];
    ctrl.backend.createLink.mockResolvedValue({});
    // @ts-ignore
    openCreateLinkPopUp(ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpSetState0 = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    const content: NewLinkForm = {
      sourceNode: "123",
      targetNode: "345",
      linkWeight: 2.2,
    };
    await popUpSetState0.linkEdit.onFormSubmit(content);
    expect(ctrl.backend.createLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createLink).toHaveBeenNthCalledWith(1, {
      from: "123",
      to: "345",
      weight: 2.2,
    });
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(0);
  });
  it("should not append node to graph on backend failure (empty ID)", async () => {
    const ctrl = makeMockController();
    ctrl.graph.current.nodes = [{ id: "1", description: "ok 1" }];
    ctrl.backend.createLink.mockResolvedValue({
      data: { createEdge: { ID: "" } },
    });
    // @ts-ignore
    openCreateLinkPopUp(ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpSetState0 = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    const content: NewLinkForm = {
      sourceNode: "123",
      targetNode: "345",
      linkWeight: 2.2,
    };
    await popUpSetState0.linkEdit.onFormSubmit(content);
    expect(ctrl.backend.createLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createLink).toHaveBeenNthCalledWith(1, {
      from: "123",
      to: "345",
      weight: 2.2,
    });
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(0);
  });
});
