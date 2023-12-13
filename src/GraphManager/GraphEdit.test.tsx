import { ForceGraphMethods } from "react-force-graph-2d";
import {
  createNodeFromMouseEvent,
  GraphState,
  onNodeDrag,
  NodeDragState,
  DRAG_snapOutDistanceSquared,
  DRAG_snapInDistanceSquared,
  onNodeDragEnd,
  Backend,
} from "./GraphEdit";
import { ForceGraphLinkObject } from "./types";

const makeMockController = () => {
  // @ts-ignore: typescript does not understand jest.mock
  const forceGraphMethods: ForceGraphMethods = jest.mock<ForceGraphMethods>(
    "react-force-graph-2d",
  );
  forceGraphMethods.centerAt = jest.fn().mockName("forceGraphRef.centerAt");
  forceGraphMethods.screen2GraphCoords = jest
    .fn()
    .mockName("forceGraphRef.screen2GraphCoords");
  const ctrl = {
    backend: {
      createNode: jest.fn().mockName("backend.createNode"),
    },
    graph: {
      current: { nodes: [], links: [] },
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
        onFormSubmit: jest.fn().mockName("popUp.state.onFormSubmit"),
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
    createNodeFromMouseEvent(mouse, ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    const onFormSubmit = popUpState.onFormSubmit;
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
    createNodeFromMouseEvent(mouse, ctrl);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    const onFormSubmit = popUpState.onFormSubmit;
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
    addNode: jest.fn(),
  };
  return g;
};

describe("onNodeDrag", () => {
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
    return { node_1, node_2_far, node_3_close };
  };
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
      id: "interim_1",
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
      id: "interim_1",
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
      id: "interim_1",
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
  });
  it("shoud clear NodeDragState", () => {
    // TODO(skep): continue
  });
});

describe("wtf", () => {
  test("my understanding of js object references", () => {
    let o: { a?: number; b?: number } = { a: undefined };
    const chage = (o: { a?: number; b?: number }) => {
      o.a = 1;
      o.b = 2;
    };
    const expectation = (o: { a?: number; b?: number }) => {
      expect(o.a).toBe(1);
      expect(o.b).toBe(2);
    };
    chage(o);
    expectation(o);
  });
});
