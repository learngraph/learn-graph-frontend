import { userSearchMatchingInternal } from "./Search";
import { Node } from "GraphManager/GraphRenderer";

describe("userSearchMatchingInternal", () => {
  it("should do nothing on an empty highlight set", () => {
    let highlight = new Set<Node>();
    let graphData = { nodes: [{ id: "1", description: "A" }], links: [] };
    let userInput = "";
    userSearchMatchingInternal(highlight, graphData, userInput);
    expect(highlight.size).toBe(0);
  });
  it("should match substring and clear after call without match", () => {
    let highlight = new Set<Node>();
    let A = { id: "A", description: "XYabcZ" };
    let graphData = { nodes: [A], links: [] };
    let userInput = "abc";
    userSearchMatchingInternal(highlight, graphData, userInput);
    expect(highlight.size).toBe(1);
    expect(highlight.values().next()).toEqual({ done: false, value: A });
    userSearchMatchingInternal(highlight, graphData, "def");
    expect(highlight.size).toBe(0);
  });
  it("should match case-insensitive", () => {
    let highlight = new Set<Node>();
    let A = { id: "A", description: "XYabcZ" };
    let graphData = { nodes: [A], links: [] };
    let userInput = "xyA";
    userSearchMatchingInternal(highlight, graphData, userInput);
    expect(highlight.size).toBe(1);
    expect(highlight.values().next()).toEqual({ done: false, value: A });
  });
});
