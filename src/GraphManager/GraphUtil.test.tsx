import { sanitizeGraphData } from "./GraphUtil";

describe("sanitizeGraphData", () => {
  it("should coalesce null values for nodes and links", () => {
    // @ts-ignore | Note: needed to assign null values, which can (I DONT KNOW WHY
    // YOU HAVE NON NULLABLE TYPES IF THEY CAN BE NULL) occur when deserializing
    // such an object
    expect(sanitizeGraphData({ nodes: null, links: null })).toStrictEqual({
      dataSetName: "graph from backend",
      data: { nodes: [], links: [] },
    });
  });

  it("should not change empty arrays", () => {
    expect(sanitizeGraphData({ nodes: [], links: [] })).toStrictEqual({
      dataSetName: "graph from backend",
      data: { nodes: [], links: [] },
    });
  });

  it("should copy all input nodes/links (since force-graph modifies these objects)", () => {
    let inp = {
      nodes: [
        { id: "1", group: 1 },
        { id: "2", group: 2 },
      ],
      links: [
        { source: "1", target: "2", value: 1.0 },
        { source: "2", target: "1", value: 1.0 },
      ],
    };
    for (let i = 0; i < inp.nodes.length; i++) {
      expect(sanitizeGraphData(inp).data.nodes[i]).toEqual(inp.nodes[i]);
      expect(sanitizeGraphData(inp).data.nodes[i] === inp.nodes[i]).toBe(false);
    }
    for (let i = 0; i < inp.links.length; i++) {
      expect(sanitizeGraphData(inp).data.links[i]).toEqual(inp.links[i]);
      expect(sanitizeGraphData(inp).data.links[i] === inp.links[i]).toBe(false);
    }
  });
});
