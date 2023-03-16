import {
  zoomStep,
  ZoomDirection,
  calculateNodeWeight,
  GraphDataMerged,
  ZoomArgs,
  LinkBetweenHasIDs,
  HasID,
} from "./Zoom";

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
        "do nothing when steps == 0",
        "A -> B",
        "A -> B",
        {
          steps: 0,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B],
            links: [{ source: node.A, target: node.B }],
          },
        },
        {
          nodes: [node.A, node.B],
          links: [{ source: node.A, target: node.B }],
        },
      ],
      [
        "do nothing when no nodes can be deleted",
        "A; B",
        "A; B",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B],
            links: [],
          },
        },
        {
          nodes: [node.A, node.B],
          links: [],
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
        "select deleted nodes by weight (2/2)",
        "A -> B -2-> C <-2- D <-2- E",
        "A -> C <- D <- E",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E],
            links: [
              { source: node.A, target: node.B },
              { source: node.B, target: node.C, value: 2 },
              { source: node.D, target: node.C, value: 2 },
              { source: node.E, target: node.D, value: 2 },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D, node.E],
          links: [
            { source: node.A, target: node.C },
            { source: node.D, target: node.C, value: 2 },
            { source: node.E, target: node.D, value: 2 },
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
      [
        "2 zoom steps in separated graph (enforce recursion)",
        "A -> B; C -> D",
        "B; D",
        {
          steps: 2,
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
          nodes: [node.B, node.D],
          links: [],
        },
      ],
      [
        "remove self-referencing links after link rewriting",
        "D -1.5-> A -> B <-> C",
        "D -1.5-> A -> B",
        {
          steps: 1,
          direction: ZoomDirection.In,
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { source: node.D, target: node.A, value: 1.5 },
              { source: node.A, target: node.B },
              { source: node.B, target: node.C },
              { source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.D],
          links: [
            { source: node.D, target: node.A, value: 1.5 },
            { source: node.A, target: node.B },
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
    it.todo("link.weight propagation (force simmulation weight)"); // XXX: probably already correctly done
    it.todo(
      "node.weight propagation on merge (node selection weight for merge)"
    );
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
        { node: node.C, expectedWeight: 0 },
        { node: node.B, expectedWeight: 1 },
        { node: node.A, expectedWeight: 2 },
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
        { node: node.C, expectedWeight: 0 },
        { node: node.B, expectedWeight: 2 },
        { node: node.A, expectedWeight: 3.5 },
      ],
    ],
  ])(
    "should %s",
    (
      _test_name: string,
      links: LinkBetweenHasIDs[],
      assertions: { node: HasID; expectedWeight: number }[]
    ) => {
      assertions.forEach(({ node, expectedWeight }) => {
        expect(calculateNodeWeight(node, links)).toEqual(expectedWeight);
      });
    }
  );
});
