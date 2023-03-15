/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import {
  GraphRenderer,
  nodeCanvasObject,
  onLinkClickFn,
  makeKeydownListener,
  zoomStep,
  ZoomDirection,
  calculateNodeWeight,
  GraphDataMerged,
  ZoomArgs,
  LinkBetweenHasIDs,
  HasID,
} from "./GraphRenderer";

//import { useQuery } from "@apollo/client";
import "@testing-library/jest-dom";
import crypto1 from "../graphdata/crypto-1";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

describe("GraphRenderer", () => {
  test("loads and displays Graph", async () => {
    // ARRANGE
    const dataset = {
      data: crypto1,
      dataSetName: "test",
    };
    render(
      <GraphRenderer selectedGraphDataset={dataset} openVoteDialog={() => {}} />
    );

    // ACT
    //await userEvent.click(screen.getByText('Load Greeting'))
    //await screen.findByRole('heading')

    // ASSERT
    // FIXME: does only work, when jest.fn() above works
    //expect(useQuery).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("test-graph", { exact: false }).textContent
    ).toContain("Number Theory");
  });
});

describe("onLinkClickFn", () => {
  it("should call openVoteDialog with link info", () => {
    const props = {
      openVoteDialog: jest.fn(),
      selectedGraphDataset: { dataSetName: "", data: { nodes: [], links: [] } },
    };
    const onLinkClick = onLinkClickFn(props);
    const link = {
      source: "A",
      target: "B",
      value: 1337,
      id: "C",
    };
    onLinkClick(link);
    expect(props.openVoteDialog.mock.calls.length).toEqual(1);
    expect(props.openVoteDialog.mock.calls[0][0]).toEqual({
      linkID: link.id,
      sourceNode: link.source,
      targetNode: link.target,
      weight: link.value,
    });
  });
});

describe("nodeCanvasObject", () => {
  it("[SNAPSHOT test] should have reasonable font size and background dimensions", () => {
    const node = {
      id: "A",
      description: "B",
      x: 5,
      y: 6,
    };
    //const ctx = jest.fn<typeof CanvasRenderingContext2D>();
    const ctx = {
      fillStyle: "",
      fillRect: jest.fn(),
      fillText: jest.fn(),
      measureText: jest.fn(),
      textAlign: "",
      textBaseline: "",
      font: "",
    };
    ctx.measureText.mockReturnValue({ width: 100 });
    const scale = 1;
    // @ts-ignore
    nodeCanvasObject(node, ctx, scale);
    expect(ctx.font).toEqual("22px Sans-Serif");
    expect(ctx.textAlign).toEqual("center");
    expect(ctx.textBaseline).toEqual("middle");
    expect(ctx.fillStyle).toEqual("#000");
    // TODO(skep): test fillStyle for the first fillRect() call
    expect(ctx.fillRect.mock.calls.length).toBe(1);
    expect(ctx.fillRect.mock.calls[0]).toEqual([
      -47.2, -7.199999999999999, 104.4, 26.4,
    ]);
    expect(ctx.fillText.mock.calls.length).toBe(1);
    expect(ctx.fillText.mock.calls[0]).toEqual(["B", 5, 6]);
  });
});

describe("makeKeydownListener", () => {
  const graphData = { nodes: [], links: [] };
  it("should call zoom in on key 'p'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "p" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(1);
    expect(zoom.mock.calls[0][0]).toEqual({
      steps: 1,
      direction: ZoomDirection.In,
      graphData,
    });
  });
  it("should call zoom out on key 'm'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "m" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(1);
    expect(zoom.mock.calls[0][0]).toEqual({
      steps: 1,
      direction: ZoomDirection.Out,
      graphData,
    });
  });
  it("should call nothing on key 'a'", () => {
    let zoom = jest.fn();
    let keydown = makeKeydownListener(zoom, graphData);
    let event = { key: "a" };
    keydown(event);
    expect(zoom.mock.calls.length).toBe(0);
  });
});

describe("zoom", () => {
  describe("in", () => {
    let nodeList = [
      { id: "A" },
      { id: "B" },
      { id: "C" },
      { id: "D" },
      { id: "E" },
    ];
    let node = Object.assign(
      // @ts-ignore
      ...nodeList.map((node) => ({ [node.id]: node }))
    );
    it.each([
      [
        // test name
        "zoom a single step",
        // input state visualized:
        "A -> B <- C",
        // expected output state visualized:
        "B <- C",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { source: node.A, target: node.B },
              { source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.B, node.C],
          links: [{ source: node.C, target: node.B }],
        },
      ],
      [
        "zoom 2 steps",
        "A -> B <- C",
        "B",
        {
          steps: 2,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { source: node.A, target: node.B },
              { source: node.C, target: node.B },
            ],
          },
        },
        { nodes: [node.B], links: [] },
      ],
      [
        "cannot zoom in further than the amount of nodes available",
        "A -> B <- C",
        "A -> B <- C",
        {
          steps: 3,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { source: node.A, target: node.B },
              { source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.C],
          links: [
            { source: node.A, target: node.B },
            { source: node.C, target: node.B },
          ],
        },
      ],
      [
        "rewrite links to merged nodes",
        "A -> B -> C <- D",
        "A -> C",
        {
          steps: 2,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.A, target: node.B },
              { source: node.B, target: node.C },
              { source: node.D, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C],
          links: [{ source: node.A, target: node.C }],
        },
      ],
      [
        "preserve forward links",
        "A -> B <- C; B -> D",
        "B -> D",
        {
          steps: 2,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.A, target: node.B },
              { source: node.C, target: node.B },
              { source: node.B, target: node.D },
            ],
          },
        },
        {
          nodes: [node.B, node.D],
          links: [{ source: node.B, target: node.D }],
        },
      ],
      [
        "choose mergeTargetNode by node order on equal weight",
        "A -> B; C -> D",
        "B; C -> D",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.A, target: node.B },
              { source: node.C, target: node.D },
            ],
          },
        },
        {
          nodes: [node.B, node.C, node.D],
          links: [{ source: node.C, target: node.D }],
        },
      ],
      [
        "removed node's links, must be moved",
        "A <- B -> C <- D",
        "A <- C <- D",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.B, target: node.A },
              { source: node.B, target: node.C },
              { source: node.D, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D],
          links: [
            { source: node.C, target: node.A },
            { source: node.D, target: node.C },
          ],
        },
      ],
      [
        "remove duplicate links, after link target forwarding (secondOrderTargetLinks)",
        // FIXME: got to complex due to other changes to the zoomStep function
        // 1. ensure that C stays mergeTargetNode: B -2-> C
        // 2. ensure A gets deleted (lower node-weight, than B): D -2-> A
        "D -2-> A -> B -2-> C; A -> C",
        "D -2-> A -> C",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.B, target: node.C, value: 2 },
              { source: node.A, target: node.B },
              { source: node.A, target: node.C },
              { source: node.D, target: node.A, value: 2 },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D],
          links: [
            { source: node.A, target: node.C },
            { source: node.D, target: node.A, value: 2 },
          ],
        },
      ],
      [
        "remove duplicate links, after link source forwarding (secondOrderSourceLinks)",
        "D <- A -> B <- C; B -> D",
        "D <- B <- C",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.A, target: node.D },
              { source: node.B, target: node.D },
              { source: node.A, target: node.B },
              { source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.B, node.C, node.D],
          links: [
            { source: node.B, target: node.D },
            { source: node.C, target: node.B },
          ],
        },
      ],
      [
        "select deleted nodes by weight (1/2)",
        "A -2-> B -2-> C <-2- D <- E",
        "A -> B -> C <- E",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E],
            links: [
              { source: node.A, target: node.B, value: 2 },
              { source: node.B, target: node.C, value: 2 },
              { source: node.D, target: node.C, value: 2 },
              { source: node.E, target: node.D },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.C, node.E],
          links: [
            { source: node.A, target: node.B, value: 2 },
            { source: node.B, target: node.C, value: 2 },
            { source: node.E, target: node.C },
          ],
        },
      ],
      [
        "doubly outgoing links on first order deleted nodes",
        "A <- B -> C",
        "A -> C",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { source: node.B, target: node.A },
              { source: node.B, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C],
          links: [{ source: node.A, target: node.C }],
        },
      ],
      [
        "self-linking node with otherwise only source links",
        "A -10-> A; C <- A -> B",
        "TODO: WTF?!",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { source: node.A, target: node.A, value: 10 },
              { source: node.A, target: node.B, value: 2 },
              { source: node.A, target: node.C, value: 2 },
            ],
          },
        },
        {
          nodes: [/*node.A,*/ node.B, node.C],
          links: [
            //{ source: node.A, target: node.A, value: 10 },
            //{ source: node.A, target: node.B, value: 2 },
            //{ source: node.A, target: node.C, value: 2 },
          ],
        },
      ],
      //[
      //  "name",
      //  "A -> B",
      //  "A -> B",
      //  {
      //    steps: ?,
      //    direction: ZoomDirection.In,
      //    graphData: {},
      //  },
      //  {},
      //],
    ])(
      "%s: should merge %p to %p",
      (
        _test_name: string,
        _from: string,
        _to: string,
        input: ZoomArgs,
        expected: GraphDataMerged
      ) => {
        zoomStep(input);
        expect(input.graphData).toEqual(expected);
      }
    );
    it.todo(
      "link weight propagation on merge || maybe tag merge-nodes? think first!"
    );
    it.todo("2 steps for 'A -> B; C -> D' [to enforce recursion]");
    it.todo("remove self-referencing links after link rewriting"); // XXX: @j: should we? maybe it's better not to..
  });
  describe("out", () => {
    //it.todo("...tests for zooming out...");
  });
});

describe("calculateNodeWeight", () => {
  const nodeList = [{ id: "A" }, { id: "B" }, { id: "C" }];
  // @ts-ignore: oh come on
  let node = Object.assign(...nodeList.map((node) => ({ [node.id]: node })));
  it.each([
    [
      "count links to node",
      [
        { source: node.A, target: node.B },
        { source: node.B, target: node.A },
        { source: node.C, target: node.A },
      ],
      [
        { node: node.C, expected: 0 },
        { node: node.B, expected: 1 },
        { node: node.A, expected: 2 },
      ],
    ],
    [
      "weight each link by link.value",
      [
        { source: node.A, target: node.B, value: 2 },
        { source: node.B, target: node.A, value: 3 },
        { source: node.C, target: node.A, value: 0.5 },
      ],
      [
        { node: node.C, expected: 0 },
        { node: node.B, expected: 2 },
        { node: node.A, expected: 3.5 },
      ],
    ],
  ])(
    "should %s",
    (
      _test_name: string,
      links: LinkBetweenHasIDs[],
      assertions: { node: HasID; expected: number }[]
    ) => {
      assertions.forEach(({ node, expected }) => {
        expect(calculateNodeWeight(node, links)).toEqual(expected);
      });
    }
  );
});
