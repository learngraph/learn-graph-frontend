import { ForceGraphMethods } from "react-force-graph-2d";
import { createNodeFromMouseEvent } from "./GraphEdit";

describe("createNodeFromMouseEvent", () => {
  const makeMockController = () => {
    const ctrl = {
      backend: {
        createNode: jest.fn().mockName("backend.createNode"),
      },
      graph: {
        current: { nodes: [], links: [] },
        setGraph: jest.fn().mockName("graph.setGraph"),
        addNode: jest.fn().mockName("graph.addNode"),
        addLink: jest.fn().mockName("graph.addLink"),
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
        current: jest.mock<ForceGraphMethods>("react-force-graph-2d"),
      },
    };
    return ctrl;
  };
  const makeMockMouseEvent = (props: any) => {
    // @ts-ignore: too many unused fields
    const mouse: MouseEvent = { ...props };
    return mouse;
  };
  it("should change graph state, when backend returns a valid node ID", async () => {
    const mouse = makeMockMouseEvent({ x: 1, y: 2 });
    const ctrl = makeMockController();
    ctrl.backend.createNode.mockReturnValue(
      Promise.resolve({ data: { createNode: { ID: "123" } } })
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
    expect(ctrl.graph.addNode).toHaveBeenCalledTimes(1);
    expect(ctrl.graph.addNode.mock.calls[0][0]).toEqual({
      id: "123",
      description: "AAA",
      x: 1,
      y: 2,
    });
  });
  it("should not change graph state, when backend fails", async () => {
    const mouse = makeMockMouseEvent({ x: 1, y: 2 });
    const ctrl = makeMockController();
    ctrl.backend.createNode.mockReturnValue(
      Promise.resolve({ data: { createNode: { ID: "" } } })
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
