import { GraphData } from "./types";
import {
  sanitizeGraphData,
  TransformFunctionInput,
  transformGraphDataForDisplay,
} from "./GraphUtil";

describe("sanitizeGraphData", () => {
  it("should coalesce undefined data", () => {
    // @ts-ignore
    expect(sanitizeGraphData(undefined)).toStrictEqual({
      dataSetName: "graph from backend",
      data: { nodes: [], links: [] },
    });
  });
  it("should coalesce null values for nodes and links", () => {
    // @ts-ignore
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
        { id: "1", description: "1", group: 1 },
        { id: "2", description: "2", group: 2 },
      ],
      links: [
        { id: "1", source: "1", target: "2", value: 1.0 },
        { id: "2", source: "2", target: "1", value: 1.0 },
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
  it("should verify link type", () => {
    let node1 = { id: "1", description: "1", group: 1 };
    let node2 = { id: "1", description: "1", group: 1 };
    let inp = {
      nodes: [node1, node2],
      links: [
        { id: "1", source: node1, target: node2, value: 1.0 },
        { id: "2", source: node2, target: node1, value: 1.0 },
      ],
    };
    expect(() => {
      // @ts-ignore
      sanitizeGraphData(inp);
    }).toThrow();
    inp = {
      nodes: [node1, node2],
      links: [
        // @ts-ignore
        { source: "1", target: node2, value: 1.0 },
      ],
    };
    expect(() => {
      // @ts-ignore
      sanitizeGraphData(inp);
    }).toThrow();
  });
  it("should throw on missing nodes / invalid graph", () => {
    let inp: GraphData = {
      nodes: [
        { id: "1", description: "A" },
        // id: "2" is missing
      ],
      links: [{ id: "1", source: "1", target: "2", value: 1.0 }],
    };
    expect(() => {
      sanitizeGraphData(inp);
    }).toThrow();
  });
});

describe("transformGraphDataForDisplay", () => {
  it("should transform a translated graph into a displayed graph", () => {
    const input: TransformFunctionInput = {
      language: "en",
      graph: {
        nodes: [
          {
            id: "1",
            description: { translations: [{ language: "en", content: "A" }] },
          },
          {
            id: "2",
            description: { translations: [{ language: "en", content: "B" }] },
          },
        ],
        links: [{ id: "l1", source: "1", target: "2", value: 1 }],
      },
    };

    const expected: GraphData = {
      links: input.graph.links,
      nodes: [
        { id: "1", description: "A" },
        { id: "2", description: "B" },
      ],
    };

    const actual = transformGraphDataForDisplay(input);
    expect(actual).toEqual(expected);
  });
});
