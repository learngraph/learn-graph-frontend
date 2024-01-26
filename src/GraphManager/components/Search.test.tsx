import { userSearchMatchingInternal } from "./Search";
import { makeMockController } from "../GraphEdit.testingutil";

describe("userSearchMatchingInternal", () => {
  it("should do nothing on an empty highlight set", () => {
    const controller = makeMockController();
    controller.graph.current = {
      nodes: [{ id: "1", description: "A" }],
      links: [],
    };
    let userInput = "";
    userSearchMatchingInternal(
      controller.search.highlightNodes,
    // @ts-ignore
      { current: controller },
      userInput,
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      new Set(),
    );
  });

  it("should match substring and clear after call without match", () => {
    let A = { id: "A", description: "XYabcZ" };
    const setOfA = new Set();
    setOfA.add(A);
    let userInput = "abc";
    let controller = makeMockController();
    controller.graph.current = { nodes: [A], links: [] };
    userSearchMatchingInternal(
      controller.search.highlightNodes,
    // @ts-ignore mock func
      { current: controller },
      userInput,
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      setOfA,
    );
    userSearchMatchingInternal(
      controller.search.highlightNodes,
    // @ts-ignore mock func
      { current: controller },
      "def",
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(2);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      2,
      new Set(),
    );
    expect(
      controller.forceGraphRef.current!.d3ReheatSimulation,
    ).toHaveBeenCalledTimes(2);
  });

  it("should match case-insensitive", () => {
    let A = { id: "A", description: "XYabcZ" };

    let userInput = "xyA";
    let controller = makeMockController();
    controller.graph.current = { nodes: [A], links: [] };
    userSearchMatchingInternal(
      controller.search.highlightNodes,
    // @ts-ignore mock fn
      { current: controller },
      userInput,
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      new Set([A]),
    );
    expect(
      controller.forceGraphRef.current!.d3ReheatSimulation,
    ).toHaveBeenCalledTimes(1);
  });

  it("should open pop-up, when newline at the end", () => {
    const controller = makeMockController();
    controller.graph.current = {
      nodes: [{ id: "1", description: "abc" }],
      links: [],
    };
    userSearchMatchingInternal(
      controller.search.highlightNodes,
    // @ts-ignore
      { current: controller },
      "abc\n",
    );
    expect(controller.search.setIsResultShown).toHaveBeenCalledTimes(1);
    expect(controller.search.setIsResultShown).toHaveBeenNthCalledWith(1, true);
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      new Set([{ id: "1", description: "abc" }]),
    );
  });
});
