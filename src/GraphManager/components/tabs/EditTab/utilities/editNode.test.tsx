import { editNode } from "./editNode";

describe("editNode", () => {
  it("should create a new node", () => {
    expect(
      editNode({
        graph: { nodes: [], links: [] },
        newNode: { id: "1", group: 2 },
        selectedNode: undefined,
        isNewNode: true,
      })
    ).toEqual({ nodes: [{ id: "1", group: 2 }], links: [] });
  });
  it("should throw an error if the node is new, but isNewNode is false", () => {
    expect(() =>
      editNode({
        graph: { nodes: [], links: [] },
        newNode: { id: "1", group: 2 },
        selectedNode: undefined,
        isNewNode: false,
      })
    ).toThrow();
  });
});
