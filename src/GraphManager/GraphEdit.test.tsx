import { createNodeFromMouseEvent } from "./GraphEdit";

describe("createNodeFromMouseEvent", () => {
  it("should change graph state, when backend returns a valid node ID", () => {
    // @ts-ignore: too many unused fields
    const mouse: MouseEvent = { x: 1, y: 2 };
    // @ts-ignore: too many unused fields
    const ctrl: Controller = {
      backend: {
        createNode: jest
          .fn()
          .mockResolvedValue({ data: { createNode: { ID: "123" } } }),
      },
      graph: { addNode: jest.fn() },
      popUp: { setState: jest.fn() },
    };
    createNodeFromMouseEvent(mouse, ctrl);
    expect(ctrl.popUp.setState.mock.calls.length).toBe(1);
    const popUpState = ctrl.popUp.setState.mock.calls[0][0];
    expect(popUpState.isOpen).toBe(true);
    const onFormSubmit = popUpState.onFormSubmit;
    onFormSubmit({ nodeDescription: "AAA" });
    expect(ctrl.backend.createNode.mock.calls.length).toBe(1);
    expect(ctrl.backend.createNode.mock.calls[0][0]).toEqual({
      description: { translations: [{ language: "en", content: "AAA" }] },
    });
    expect(ctrl.graph.addNode.mock.calls.length).toBe(1);
    expect(ctrl.graph.addNode.mock.calls[0][0]).toEqual({
      id: "123",
      description: "AAA",
      x: 1,
      y: 2,
    });
  });
  it.todo("should not change graph state, when backend fails", () => {});
});
