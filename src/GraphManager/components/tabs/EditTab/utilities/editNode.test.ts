import { createNode, updateNodeInGraph } from "./editNode";

describe("editNode", () => {
  it("should create a new node", () => {
    expect(
      createNode({
        graph: { nodes: [], links: [] },
        newNode: { id: "1", description: "1", group: 2 },
      })
    ).toEqual({ nodes: [{ id: "1", description: "1", group: 2 }], links: [] });
  });
  it("should throw an error if the new node already exists", () => {
    expect(() =>
      createNode({
        graph: { nodes: [{ id: "1", description: "1", group: 2 }], links: [] },
        newNode: { id: "1", description: "1", group: 3 },
      })
    ).toThrow();
  });
  it("should update an existing node", () => {
    let graph = {
      nodes: [{ id: "1", description: "AAA", group: 2 }],
      links: [],
    };
    expect(
      updateNodeInGraph({
        graph: graph,
        newNode: { id: "1", description: "BBB", group: 3 },
        selectedNode: graph.nodes[0],
      })
    ).toEqual({
      nodes: [{ id: "1", description: "BBB", group: 3 }],
      links: [],
    });
  });
});
