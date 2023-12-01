import { userSearchMatchingInternal } from "./Search";
import { Node } from "GraphManager/GraphRenderer";
import { LocalForceGraphMethods } from "../types";

describe("userSearchMatchingInternal", () => {
  const makeFGMethodsMock = () => {
    // @ts-ignore
    const m: LocalForceGraphMethods =
      jest.mock<LocalForceGraphMethods>("../types");
    // @ts-ignore
    m.d3ReheatSimulation = jest.fn().mockName("d3ReheatSimulation");
    return m;
  };
  it("should do nothing on an empty highlight set", () => {
    let fgRef = makeFGMethodsMock();
    let highlight = new Set<Node>();
    let graphData = { nodes: [{ id: "1", description: "A" }], links: [] };
    let userInput = "";
    userSearchMatchingInternal(highlight, graphData, fgRef, userInput);
    expect(highlight.size).toBe(0);
  });
  it("should match substring and clear after call without match", () => {
    let fgRef = makeFGMethodsMock();
    let highlight = new Set<Node>();
    let A = { id: "A", description: "XYabcZ" };
    let graphData = { nodes: [A], links: [] };
    let userInput = "abc";
    userSearchMatchingInternal(highlight, graphData, fgRef, userInput);
    expect(highlight.size).toBe(1);
    expect(highlight.values().next()).toEqual({ done: false, value: A });
    userSearchMatchingInternal(highlight, graphData, fgRef, "def");
    expect(highlight.size).toBe(0);
    expect(fgRef!.d3ReheatSimulation).toHaveBeenCalledTimes(2);
  });
  it("should match case-insensitive", () => {
    let fgRef = makeFGMethodsMock();
    let highlight = new Set<Node>();
    let A = { id: "A", description: "XYabcZ" };
    let graphData = { nodes: [A], links: [] };
    let userInput = "xyA";
    userSearchMatchingInternal(highlight, graphData, fgRef, userInput);
    expect(highlight.size).toBe(1);
    expect(highlight.values().next()).toEqual({ done: false, value: A });
    expect(fgRef!.d3ReheatSimulation).toHaveBeenCalledTimes(1);
  });
});
