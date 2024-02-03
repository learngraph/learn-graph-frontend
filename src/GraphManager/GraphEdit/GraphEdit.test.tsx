import {
  DEFAULT_EDIT_LINK_WEIGHT,
  DRAG_snapInDistanceSquared,
  DRAG_snapOutDistanceSquared,
  FG_ENGINE_COOLDOWN_TICKS_DISABLED,
  INTERIM_TMP_LINK_ID,
  NodeDragState,
  onLinkClick,
  onNodeClick,
  onNodeDrag,
  onNodeDragEnd,
  openCreateLinkPopUp,
  openCreateNodePopUpAtMousePosition,
} from "./GraphEdit";
import { GraphEditPopUpState, NewLinkForm } from "./PopUp";
import { ForceGraphLinkObject } from "src/GraphManager/types";
import { makeMockController } from "./GraphEdit.testingutil";

describe("openCreateNodePopUpAtMousePosition", () => {
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
  it("should add resources if defined", async () => {
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
    const onFormSubmit = popUpState.nodeEdit.onFormSubmit;
    await onFormSubmit({ nodeDescription: "AAA", nodeResources: "BBB" });
    expect(ctrl.backend.createNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createNode).toHaveBeenNthCalledWith(1, {
      description: { translations: [{ language: "en", content: "AAA" }] },
      resources: { translations: [{ language: "en", content: "BBB" }] },
    });
    expect(ctrl.graph.addNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addNode).toHaveBeenNthCalledWith(1, {
      id: "123",
      description: "AAA",
      resources: "BBB",
      x: 333,
      y: 444,
    });
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

const makeNodes = () => {
  const node_1 = { id: "1", x: 0, y: 0, description: "1" };
  const node_2_far = {
    id: "2",
    x: Math.sqrt(DRAG_snapInDistanceSquared) + 2,
    y: 0,
    description: "2",
  };
  const node_3_close = {
    id: "3",
    x: Math.sqrt(DRAG_snapInDistanceSquared) - 2,
    y: 0,
    description: "3",
  };
  const node_4_far = {
    id: "4",
    x: node_2_far.x + Math.sqrt(DRAG_snapInDistanceSquared) + 2,
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
    const ctrl = makeMockController();
    // @ts-ignore
    ctrl.nodeDrag = makeNodeDragState({});
    ctrl.graph.current.nodes = [node_1, node_2_far];
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    expect(ctrl.nodeDrag.state).toEqual({ dragSourceNode: node_1 });
    expect(ctrl.setCooldownTicks).toHaveBeenCalledWith(
      FG_ENGINE_COOLDOWN_TICKS_DISABLED,
    );
  });
  it("should add interimLink for in-range node and remove for out-of-range node", () => {
    const ctrl = makeMockController();
    const { node_1, node_3_close } = makeNodes();
    ctrl.graph.current.nodes = [node_1, node_3_close];
    // @ts-ignore
    ctrl.nodeDrag = makeNodeDragState({ dragSourceNode: node_1 });
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_3_close,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(ctrl.nodeDrag.state).toEqual(expDrag);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    ctrl.graph.current.nodes[1].x = Math.sqrt(DRAG_snapOutDistanceSquared) + 1;
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(ctrl.nodeDrag.state).toEqual({ dragSourceNode: node_1 });
  });
  it("should switch interim link if getting close to another node", () => {
    const ctrl = makeMockController();
    const { node_1, node_2_far, node_3_close } = makeNodes();
    ctrl.graph.current.nodes = [node_1, node_3_close, node_2_far];
    // @ts-ignore
    ctrl.nodeDrag = makeNodeDragState({ dragSourceNode: node_1 });
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_3_close,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(ctrl.nodeDrag.state).toEqual(expDrag);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    node_2_far.x = node_3_close.x - 1;
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    const interimLink2: ForceGraphLinkObject = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_2_far,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const expDrag2: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink2,
    };
    expect(ctrl.nodeDrag.state).toEqual(expDrag2);
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeLink).toHaveBeenNthCalledWith(1, interimLink);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(2);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(2, interimLink2);
  });
  it("should not switch interim if current node is closer than the new one", () => {
    const ctrl = makeMockController();
    const { node_1, node_2_far, node_3_close } = makeNodes();
    ctrl.graph.current.nodes = [node_1, node_3_close, node_2_far];
    // @ts-ignore
    ctrl.nodeDrag = makeNodeDragState({ dragSourceNode: node_1 });
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    const interimLink: ForceGraphLinkObject = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_3_close,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const expDrag: NodeDragState = {
      dragSourceNode: node_1,
      interimLink: interimLink,
    };
    expect(ctrl.nodeDrag.state).toEqual(expDrag);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(1, interimLink);
    node_2_far.x = node_3_close.x + 1;
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    // expect no changes:
    expect(ctrl.nodeDrag.state).toEqual(expDrag);
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(0);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
  });
  it("should not remove links where the source node, is not the currently dragged one", () => {
    const ctrl = makeMockController();
    const { node_1, node_2_far, node_3_close, node_4_far } = makeNodes();
    ctrl.graph.current.nodes = [node_1, node_4_far, node_3_close, node_2_far];
    const link_12 = { id: "1", source: node_1, target: node_2_far, value: 5 };
    const link_42 = {
      id: INTERIM_TMP_LINK_ID,
      source: node_4_far,
      target: node_2_far,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    ctrl.graph.current.links = [link_12, link_42];
    // @ts-ignore
    ctrl.nodeDrag = makeNodeDragState({
      dragSourceNode: node_4_far,
      interimLink: link_42,
    });
    // @ts-ignore
    onNodeDrag(ctrl, node_1, { x: 0, y: 0 });
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeLink).toHaveBeenNthCalledWith(1, link_42);
  });
});

describe("onNodeDragEnd", () => {
  it("shoud do nothing if no interimLink exists", () => {
    const ctrl = makeMockController();
    ctrl.nodeDrag.state = {};
    // @ts-ignore
    onNodeDragEnd(ctrl, { id: "idk", description: "ok" }, { x: 0, y: 0 });
    expect(ctrl.backend.createLink).not.toHaveBeenCalled();
  });
  it("shoud do same as openCreateLinkPopUp, with default values for links from interimLink", async () => {
    const ctrl = makeMockController();
    const { node_1, node_3_close } = makeNodes();
    const interimLink = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_3_close,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const state: NodeDragState = { dragSourceNode: node_1, interimLink };
    const nodeDrag = { state, setState: jest.fn() };
    ctrl.backend.createLink = jest
      .fn()
      .mockResolvedValue({ data: { createEdge: { ID: "newid" } } });
    await onNodeDragEnd(
      // @ts-ignore
      { ...ctrl, nodeDrag },
      node_1,
      { x: 0, y: 0 },
    );
    expect(nodeDrag.setState).toHaveBeenCalledTimes(1);
    expect(nodeDrag.setState).toHaveBeenNthCalledWith(1, {});
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpSetState0 = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    const content: NewLinkForm = {
      sourceNode: interimLink.source.id,
      targetNode: interimLink.target.id,
      linkWeight: 8.8,
    };
    await popUpSetState0.linkEdit.onFormSubmit(content);
    expect(ctrl.backend.createLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createLink).toHaveBeenNthCalledWith(1, {
      from: interimLink.source.id,
      to: interimLink.target.id,
      weight: 8.8,
    });
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(0);
    expect(ctrl.graph.updateLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.updateLink).toHaveBeenNthCalledWith(1, interimLink, {
      ...interimLink,
      id: "newid",
      value: 8.8,
    });
  });
  it("shoud do same as openCreateLinkPopUp, but remove the temporary link onCancel", async () => {
    const ctrl = makeMockController();
    // @ts-ignore: mock type
    ctrl.popUp.setState = (state: GraphEditPopUpState) => {
      // @ts-ignore: mock type
      ctrl.popUp.state = state;
    };
    const { node_1, node_3_close } = makeNodes();
    const interimLink = {
      id: INTERIM_TMP_LINK_ID,
      source: node_1,
      target: node_3_close,
      value: DEFAULT_EDIT_LINK_WEIGHT,
    };
    const state: NodeDragState = { dragSourceNode: node_1, interimLink };
    const nodeDrag = { state, setState: jest.fn() };
    ctrl.backend.createLink = jest
      .fn()
      .mockResolvedValue({ data: { createEdge: { ID: "newid" } } });
    await onNodeDragEnd(
      // @ts-ignore
      { ...ctrl, nodeDrag },
      node_1,
      { x: 0, y: 0 },
    );
    expect(nodeDrag.setState).toHaveBeenCalledTimes(1);
    expect(nodeDrag.setState).toHaveBeenNthCalledWith(1, {});
    const popUpSetState0 = ctrl.popUp.state;
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    await ctrl.popUp.state.linkEdit.onNonSubmitClose();
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
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
  it("should remove temporary links, if nodes were changed by the popUp form", async () => {
    const ctrl = makeMockController();
    const [n1, n2, n3] = [
      { id: "1", description: "ok 1" },
      { id: "2", description: "ok 2" },
      { id: "3", description: "ok 3" },
    ];
    ctrl.graph.current.nodes = [n1, n2, n3];
    const link12 = {
      id: INTERIM_TMP_LINK_ID,
      source: n1,
      target: n2,
      value: 5,
    };
    ctrl.graph.current.links = [link12];
    ctrl.backend.createLink.mockResolvedValue({
      data: { createEdge: { ID: "newid" } },
    });
    // @ts-ignore
    openCreateLinkPopUp(ctrl, { updateExistingLink: link12 });
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpSetState0 = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpSetState0.nodeEdit).toBe(undefined);
    expect(popUpSetState0.isOpen).toBe(true);
    expect(popUpSetState0.title).toEqual("Create new learning dependency");
    expect(popUpSetState0.linkEdit.onFormSubmit).not.toBe(undefined);
    const content: NewLinkForm = {
      sourceNode: "3", // changed source node by user in form
      targetNode: "2",
      linkWeight: 2.2,
    };
    await popUpSetState0.linkEdit.onFormSubmit(content);
    expect(ctrl.backend.createLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.createLink).toHaveBeenNthCalledWith(1, {
      from: "3",
      to: "2",
      weight: 2.2,
    });
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeLink).toHaveBeenNthCalledWith(1, link12);
    expect(ctrl.graph.addLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addLink).toHaveBeenNthCalledWith(1, {
      id: "newid",
      source: "3",
      target: "2",
      value: 2.2,
    });
  });
});

describe("onLinkClick", () => {
  it("should open link popUp", () => {
    const ctrl = makeMockController();
    const link = {
      id: 9,
      source: { id: 1, description: "A" },
      target: { id: 2, description: "B" },
      value: 5,
    };
    // @ts-ignore
    onLinkClick(ctrl, link);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const args = ctrl.popUp.setState.mock.calls[0][0];
    expect(args.isOpen).toBe(true);
    expect(args.title).toEqual(`To understand "A" knowledge of "B" is`);
    expect(args.linkVote?.onSubmit).not.toBe(undefined);
    args.linkVote?.onSubmit(2.2);
    ctrl.backend.submitVote.mockResolvedValue({}); // nothing means, no error
    expect(ctrl.backend.submitVote).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.submitVote).toHaveBeenNthCalledWith(1, {
      ID: 9,
      value: 2.2,
    });
    // XXX(skep): should we update the display? probably just a popUp:
    // "successfully voted!", otherwise RPC has to be extended..
    //expect(ctrl.graph.updateLink)
  });
  it("should have a popup with delete button", async () => {
    const ctrl = makeMockController();
    ctrl.backend.deleteLink.mockResolvedValue({}); // nothing means, no error
    const link = {
      id: "9",
      source: { id: 1, description: "A" },
      target: { id: 2, description: "B" },
      value: 5,
    };
    // @ts-ignore
    onLinkClick(ctrl, link);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const args = ctrl.popUp.setState.mock.calls[0][0];
    expect(args.linkVote?.onDelete).not.toBe(undefined);
    await args.linkVote?.onDelete();
    expect(ctrl.backend.deleteLink).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.deleteLink).toHaveBeenNthCalledWith(1, { id: "9" });
    expect(ctrl.graph.removeLink).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeLink).toHaveBeenNthCalledWith(1, link);
  });
});

describe("onNodeClick", () => {
  it("should open node-edit popup: with only description", async () => {
    const ctrl = makeMockController();
    const node = { id: "1", description: "1" };
    // @ts-ignore
    onNodeClick(ctrl, node);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    expect(popUpState.title).toEqual(`Edit subject "1"`);
    expect(popUpState.nodeEdit.defaultFormContent).toEqual(node);
    expect(popUpState.nodeEdit.onFormSubmit).not.toBe(undefined);
    const form = { nodeDescription: "ok" };
    await popUpState.nodeEdit.onFormSubmit(form);
    expect(ctrl.backend.updateNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.updateNode).toHaveBeenNthCalledWith(1, {
      id: "1",
      description: { translations: [{ language: "en", content: "ok" }] },
    });
    expect(ctrl.graph.updateNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.updateNode).toHaveBeenNthCalledWith(1, node, {
      id: "1",
      description: "ok",
    });
  });
  it("should open node-edit popup: with description & resources", async () => {
    const ctrl = makeMockController();
    const node = { id: "1", description: "1" };
    // @ts-ignore
    onNodeClick(ctrl, node);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.nodeEdit.onFormSubmit).not.toBe(undefined);
    const form = { nodeDescription: "ok", nodeResources: "abc" };
    await popUpState.nodeEdit.onFormSubmit(form);
    expect(ctrl.backend.updateNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.updateNode).toHaveBeenNthCalledWith(1, {
      id: "1",
      description: { translations: [{ language: "en", content: "ok" }] },
      resources: { translations: [{ language: "en", content: "abc" }] },
    });
    expect(ctrl.graph.updateNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.updateNode).toHaveBeenNthCalledWith(1, node, {
      id: "1",
      description: "ok",
      resources: "abc",
    });
  });
  it("should have a delete button in popup", async () => {
    const ctrl = makeMockController();
    const node = { id: "1", description: "1" };
    // @ts-ignore
    onNodeClick(ctrl, node);
    expect(ctrl.popUp.setState).toHaveBeenCalledTimes(1);
    const args = ctrl.popUp.setState.mock.calls[0][0];
    expect(args.nodeEdit?.onDelete).not.toBe(undefined);
    await args.nodeEdit?.onDelete();
    expect(ctrl.backend.deleteNode).toHaveBeenCalledTimes(1);
    expect(ctrl.backend.deleteNode).toHaveBeenNthCalledWith(1, { id: "1" });
    expect(ctrl.graph.removeNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.removeNode).toHaveBeenNthCalledWith(1, node);
  });
});
