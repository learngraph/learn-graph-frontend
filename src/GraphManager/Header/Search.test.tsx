import {
  CENTER_AT_NODE_TIME_MS,
  GLOBALSCALE_AFTER_SEARCH,
  userSearchMatchingInternal,
} from "./Search";
import { makeMockController } from "@src/GraphManager/GraphEdit/GraphEdit.testingutil";
import {
  ZOOM_LEVEL_MAX,
  ZOOM_TO_FIT_DURATION_MS,
} from "@src/GraphManager/ZoomControlPanel";

describe("userSearchMatchingInternal", () => {
  it("should do nothing on an empty highlight set", () => {
    const controller = makeMockController();
    controller.graph.current = {
      nodes: [{ id: "1", description: "A" }],
      links: [],
    };
    userSearchMatchingInternal(
      // @ts-ignore
      { current: controller },
      "",
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
    let controller = makeMockController();
    controller.graph.current = { nodes: [A], links: [] };
    userSearchMatchingInternal(
      // @ts-ignore mock func
      { current: controller },
      "abc",
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      setOfA,
    );
    userSearchMatchingInternal(
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
    let controller = makeMockController();
    controller.graph.current = { nodes: [A], links: [] };
    userSearchMatchingInternal(
      // @ts-ignore mock fn
      { current: controller },
      "xyA",
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
    const abcNode = { id: "1", description: "abc", x: 99, y: 99 };
    controller.graph.current = {
      nodes: [abcNode],
      links: [],
    };
    userSearchMatchingInternal(
      // @ts-ignore
      { current: controller },
      "abc\n",
    );
    expect(controller.search.setIsResultShown).toHaveBeenCalledTimes(1);
    expect(controller.search.setIsResultShown).toHaveBeenNthCalledWith(1, true);
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      new Set([abcNode]),
    );
    expect(controller.zoom.setUserZoomLevel).toHaveBeenCalledTimes(1);
    expect(controller.zoom.setUserZoomLevel).toHaveBeenNthCalledWith(
      1,
      ZOOM_LEVEL_MAX,
    );
    expect(controller.forceGraphRef.current?.zoom).toHaveBeenCalledTimes(1);
    expect(controller.forceGraphRef.current?.zoom).toHaveBeenNthCalledWith(
      1,
      GLOBALSCALE_AFTER_SEARCH,
      ZOOM_TO_FIT_DURATION_MS,
    );
    expect(controller.forceGraphRef.current.centerAt).toHaveBeenCalledWith(
      99,
      99,
      CENTER_AT_NODE_TIME_MS,
    );
  });

  it("should close search results, when no userInput is present", () => {
    const controller = makeMockController();
    userSearchMatchingInternal(
      // @ts-ignore
      { current: controller },
      "\n",
    );
    expect(controller.search.setIsResultShown).toHaveBeenCalledTimes(1);
    expect(controller.search.setIsResultShown).toHaveBeenNthCalledWith(
      1,
      false,
    );
    expect(controller.search.setHighlightNodes).toHaveBeenCalledTimes(1);
    expect(controller.search.setHighlightNodes).toHaveBeenNthCalledWith(
      1,
      new Set(),
    );
    // no nodes present, thus no centerAt..
    expect(controller.forceGraphRef.current.centerAt).not.toHaveBeenCalled();
  });
});
