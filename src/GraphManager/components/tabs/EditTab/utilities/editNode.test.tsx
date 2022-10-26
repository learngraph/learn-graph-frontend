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
  it("should throw an error if the new node already exists", () => {
    expect(() =>
      editNode({
        graph: { nodes: [{ id: "1", group: 2 }], links: [] },
        newNode: { id: "1", group: 3 },
        selectedNode: { id: "1", group: 2 },
        isNewNode: true,
      })
    ).toThrow();
  });
  it("should throw an error if no selectedNode is passed for an edit", () => {
    expect(() =>
      editNode({
        graph: { nodes: [{ id: "1", group: 2 }], links: [] },
        newNode: { id: "1", group: 3 },
        selectedNode: undefined,
        isNewNode: false,
      })
    ).toThrow();
  });
  it("should update an existing node", () => {
    let graph = { nodes: [{ id: "1", group: 2 }], links: [] };
    expect(
      editNode({
        graph: graph,
        newNode: { id: "1", group: 3 },
        selectedNode: graph.nodes[0],
        isNewNode: false,
      })
    ).toEqual({ nodes: [{ id: "1", group: 3 }], links: [] });
  });
});
