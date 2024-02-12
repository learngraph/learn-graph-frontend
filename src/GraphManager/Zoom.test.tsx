import {
  zoomStep,
  ZoomDirection,
  calculateNodeWeight,
  GraphDataMerged,
  ZoomArgs,
  LinkBetweenHasIDs,
  HasID,
  ZoomOperationType,
  ZoomState,
} from "./Zoom";

// Note: throughout these test-cases descriptions exist:
//  - "A -> B" denotes a link from a node with id="A" to a node with id="B".
//  - "A -> B* -> C; B <- D" the "*" symbol denotes that B is the mergeTarget
//    in this test cases
describe("zoom", () => {
  describe("zoomSteps data", () => {
    it("should push a Merge operation when merging nodes", () => {
      const [A, B] = [{ id: "A" }, { id: "B" }];
      const link = { id: "BA", source: B, target: A };
      let args: ZoomArgs = {
        steps: 1,
        direction: ZoomDirection.Out,
      };
      let state: ZoomState = {
        zoomSteps: [],
        graphData: { nodes: [A, B], links: [link] },
      };
      zoomStep(args, state);
      expect(state.zoomSteps).toEqual([
        {
          operations: [
            {
              type: ZoomOperationType.Delete,
              removedNodes: [B],
              removedLinks: [link],
            },
          ],
        },
      ]);
    });
    it("should push a LinkRewrite operation when rewriting links", () => {
      const [A, B, C] = [{ id: "A" }, { id: "B" }, { id: "C" }];
      let args: ZoomArgs = {
        steps: 1,
        direction: ZoomDirection.Out,
      };
      let state: ZoomState = {
        zoomSteps: [],
        graphData: {
          nodes: [A, B, C],
          links: [
            { id: "BA", source: B, target: A },
            { id: "BC", source: B, target: C },
          ],
        },
      };
      zoomStep(args, state);
      expect(state.graphData).toEqual({
        nodes: [A, C],
        links: [{ id: "BC", source: A, target: C }],
      });
      expect(state.zoomSteps).toEqual([
        {
          operations: [
            {
              type: ZoomOperationType.Delete,
              removedNodes: [B],
              removedLinks: [{ id: "BA", source: B, target: A }],
            },
            {
              type: ZoomOperationType.LinkRewrite,
              from: { id: "BC", source: B, target: C },
              to: { id: "BC", source: A, target: C },
            },
          ],
        },
      ]);
    });
    it("should not push self-referencing links", () => {
      const [A, B, C, D] = [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }];
      let args: ZoomArgs = {
        steps: 1,
        direction: ZoomDirection.Out,
      };
      let state: ZoomState = {
        zoomSteps: [],
        graphData: {
          nodes: [A, B, C, D],
          links: [
            { id: "DA", source: D, target: A, value: 1.5 },
            { id: "AB", source: A, target: B },
            { id: "BC", source: B, target: C },
            { id: "CB", source: C, target: B },
          ],
        },
      };
      zoomStep(args, state);
      expect(state.graphData).toEqual({
        nodes: [A, B, D],
        links: [
          { id: "DA", source: D, target: A, value: 1.5 },
          { id: "AB", source: A, target: B },
        ],
      });
      expect(state.zoomSteps).toEqual([
        {
          operations: [
            {
              type: ZoomOperationType.Delete,
              removedNodes: [C],
              removedLinks: [{ id: "CB", source: C, target: B }],
            },
            {
              type: ZoomOperationType.Delete,
              removedNodes: [],
              removedLinks: [{ id: "BC", source: B, target: C }],
            },
          ],
        },
      ]);
    });
    it("duplicate links to side-nodes should be pushed as Merge", () => {
      const [A, B, C, D, E] = [
        { id: "A" },
        { id: "B" },
        { id: "C" },
        { id: "D" },
        { id: "E" },
      ];
      let args: ZoomArgs = {
        steps: 1,
        direction: ZoomDirection.Out,
      };
      let state: ZoomState = {
        zoomSteps: [],
        graphData: {
          nodes: [A, B, C, D, E],
          links: [
            { id: "ED", source: E, target: D },
            { id: "EC", source: E, target: C, value: 3 },
            { id: "DE", source: D, target: E },
            { id: "DC", source: D, target: C, value: 2 },
            { id: "CB", source: C, target: B },
            { id: "AB", source: A, target: B, value: 3 },
            { id: "AC", source: A, target: C },
          ],
        },
      };
      zoomStep(args, state);
      expect(state.zoomSteps).toEqual([
        {
          operations: [
            {
              type: ZoomOperationType.Delete,
              removedNodes: [A],
              removedLinks: [{ id: "AC", source: A, target: C }],
            },
            {
              type: ZoomOperationType.SetLinkValue,
              link: {
                id: "CB",
                source: C,
                target: B,
              },
            },
            {
              type: ZoomOperationType.Delete,
              removedNodes: [],
              removedLinks: [{ id: "AB", source: A, target: B, value: 3 }],
            },
          ],
        },
      ]);
    });
  });

  describe("zoom out and in again", () => {
    const rawData = [
      { id: "A" },
      { id: "A3", mergeCount: 3 },
      { id: "A5", mergeCount: 5 },
      { id: "B" },
      { id: "B16", mergeCount: 16 },
      { id: "C" },
      { id: "D" },
      { id: "E" },
      { id: "F" },
      { id: "G" },
    ];
    let nodeList = rawData.map((node) => ({
      id: node.id,
      mergeCount: node.mergeCount,
    }));
    let node = Object.assign(
      // @ts-ignore
      ...nodeList.map((node) => ({ [node.id]: node })),
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
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CB", source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [{ ...node.B, mergeCount: 2 }, node.C],
          links: [{ id: "CB", source: node.C, target: node.B }],
        },
      ],
      [
        "do nothing when steps == 0",
        "A -> B",
        "A -> B",
        {
          steps: 0,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B],
            links: [{ id: "AB", source: node.A, target: node.B }],
          },
        },
        {
          nodes: [node.A, node.B],
          links: [{ id: "AB", source: node.A, target: node.B }],
        },
      ],
      [
        "do nothing when no nodes can be deleted",
        "A; B",
        "A; B",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
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
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CB", source: node.C, target: node.B },
            ],
          },
        },
        { nodes: [{ ...node.B, mergeCount: 3 }], links: [] },
      ],
      [
        "cannot zoom in further than the amount of nodes available",
        "A -> B <- C",
        "A -> B <- C",
        {
          steps: 3,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CB", source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.C],
          links: [
            { id: "AB", source: node.A, target: node.B },
            { id: "CB", source: node.C, target: node.B },
          ],
        },
      ],
      [
        "rewrite links to merged nodes",
        "A -> B -> C <- D",
        "A -> C",
        {
          steps: 2,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "BC", source: node.B, target: node.C },
              { id: "DC", source: node.D, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C],
          links: [{ id: "AB", source: node.A, target: node.C }],
        },
      ],
      [
        "preserve forward links",
        "A -> B <- C; B -> D",
        "B -> D",
        {
          steps: 2,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CB", source: node.C, target: node.B },
              { id: "BD", source: node.B, target: node.D },
            ],
          },
        },
        {
          nodes: [node.B, node.D],
          links: [{ id: "BD", source: node.B, target: node.D }],
        },
      ],
      [
        "choose mergeTargetNode by node order on equal weight",
        "A -> B; C -> D",
        "B; C -> D",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CD", source: node.C, target: node.D },
            ],
          },
        },
        {
          nodes: [node.B, node.C, node.D],
          links: [{ id: "CD", source: node.C, target: node.D }],
        },
      ],
      [
        "removed node's links, must be moved",
        "A <- B -> C <- D",
        "A <- C <- D",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "BA", source: node.B, target: node.A },
              { id: "BC", source: node.B, target: node.C },
              { id: "DC", source: node.D, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D],
          links: [
            { id: "BA", source: node.C, target: node.A },
            { id: "DC", source: node.D, target: node.C },
          ],
        },
      ],
      [
        "remove duplicate links, after link target forwarding (secondOrderTargetLinks)",
        // Note: got too complex due to other changes:
        // 1. ensure that C stays mergeTargetNode: B -2-> C
        // 2. ensure B gets deleted (lower node-weight, than A): D -2-> A
        "D -2-> A -> B -2-> C*; A -> C",
        "D -2-> A -> C",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "BC", source: node.B, target: node.C, value: 2 },
              { id: "AB", source: node.A, target: node.B },
              { id: "AC", source: node.A, target: node.C },
              { id: "DA", source: node.D, target: node.A, value: 2 },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D],
          links: [
            { id: "AC", source: node.A, target: node.C },
            { id: "DA", source: node.D, target: node.A, value: 2 },
          ],
        },
      ],
      [
        "remove duplicate links, after link source forwarding (secondOrderSourceLinks)",
        "D <- A -> B* <- C; B -> D",
        "D <- B <- C",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "AD", source: node.A, target: node.D },
              { id: "BD", source: node.B, target: node.D },
              { id: "AB", source: node.A, target: node.B },
              { id: "CB", source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.B, node.C, node.D],
          links: [
            { id: "BD", source: node.B, target: node.D },
            { id: "CB", source: node.C, target: node.B },
          ],
        },
      ],
      [
        "select deleted nodes by weight (1/2)",
        "A -2-> B -2-> C <-2- D <- E",
        "A -> B -> C <- E",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E],
            links: [
              { id: "AB", source: node.A, target: node.B, value: 2 },
              { id: "BC", source: node.B, target: node.C, value: 2 },
              { id: "DC", source: node.D, target: node.C, value: 2 },
              { id: "ED", source: node.E, target: node.D },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.C, node.E],
          links: [
            { id: "AB", source: node.A, target: node.B, value: 2 },
            { id: "BC", source: node.B, target: node.C, value: 2 },
            { id: "ED", source: node.E, target: node.C },
          ],
        },
      ],
      [
        "select deleted nodes by weight (2/2)",
        "A -> B -2-> C <-2- D <-2- E",
        "A -> C <- D <- E",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "BC", source: node.B, target: node.C, value: 2 },
              { id: "DC", source: node.D, target: node.C, value: 2 },
              { id: "ED", source: node.E, target: node.D, value: 2 },
            ],
          },
        },
        {
          nodes: [node.A, node.C, node.D, node.E],
          links: [
            { id: "AB", source: node.A, target: node.C },
            { id: "DC", source: node.D, target: node.C, value: 2 },
            { id: "ED", source: node.E, target: node.D, value: 2 },
          ],
        },
      ],
      [
        "doubly outgoing links on first order deleted nodes",
        "A* <- B -> C",
        "A -> C",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { id: "BA", source: node.B, target: node.A },
              { id: "BC", source: node.B, target: node.C },
            ],
          },
        },
        {
          nodes: [node.A, node.C],
          links: [{ id: "BC", source: node.A, target: node.C }],
        },
      ],
      [
        "self-linking node with otherwise only source links",
        "A -10-> A; C <- A -> B",
        "self-linking is not allowed (this is a snapshot-test)",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C],
            links: [
              { id: "AA", source: node.A, target: node.A, value: 10 },
              { id: "AB", source: node.A, target: node.B, value: 2 },
              { id: "AC", source: node.A, target: node.C, value: 2 },
            ],
          },
        },
        {
          nodes: [node.B, node.C],
          links: [],
        },
      ],
      [
        "2 zoom steps in separated graph (enforce recursion)",
        "A -> B; C -> D",
        "B; D",
        {
          steps: 2,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "AB", source: node.A, target: node.B },
              { id: "CD", source: node.C, target: node.D },
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
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D],
            links: [
              { id: "DA", source: node.D, target: node.A, value: 1.5 },
              { id: "AB", source: node.A, target: node.B },
              { id: "BC", source: node.B, target: node.C },
              { id: "CB", source: node.C, target: node.B },
            ],
          },
        },
        {
          nodes: [node.A, node.B, node.D],
          links: [
            { id: "DA", source: node.D, target: node.A, value: 1.5 },
            { id: "AB", source: node.A, target: node.B },
          ],
        },
      ],
      [
        "propagate mergeCount number",
        "A{mergeCount: 3} -> B",
        "B{mergeCount: 4}",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A3, node.B],
            links: [{ id: "AB", source: node.A3, target: node.B }],
          },
        },
        {
          nodes: [{ ...node.B, mergeCount: 4 }],
          links: [],
        },
      ],
      [
        "integration test with many nodes and links",
        "G -> A -> B <- C; B -> D <- E; A -> F -> D",
        "B",
        {
          steps: 6,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E, node.F, node.G],
            links: [
              { id: "GA", source: node.G, target: node.A },
              { id: "AB", source: node.A, target: node.B },
              { id: "AF", source: node.A, target: node.F },
              { id: "CB", source: node.C, target: node.B },
              { id: "BD", source: node.B, target: node.D },
              { id: "ED", source: node.E, target: node.D },
              { id: "FD", source: node.F, target: node.D },
            ],
          },
        },
        {
          nodes: [node.D],
          links: [],
        },
      ],
      [
        "merge non-merged nodes before merging more nodes into already merged nodes",
        // Explanation:
        // links to G and F ensure, that they are not removed, so that either B
        // has most links next to the mergeTarget C, but B has a high
        // mergeCount, so D must be removed instead
        "A[5] -> B[16] -> *C <- D <- E; G -> C <- F -> D; A -> G <- B; A -> F <- B",
        "A[5] -> B[16] -> C <- E; G -> C <- F -> C",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A5, node.B16, node.C, node.D, node.E, node.F, node.G],
            links: [
              { id: "AB", source: node.A5, target: node.B16 },
              { id: "BC", source: node.B16, target: node.C },
              { id: "DC", source: node.D, target: node.C },
              { id: "ED", source: node.E, target: node.D },
              { id: "GC", source: node.G, target: node.C },
              { id: "FC", source: node.F, target: node.C },
              { id: "FD", source: node.F, target: node.D },
              { id: "AG", source: node.A5, target: node.G },
              { id: "BG", source: node.B16, target: node.G },
              { id: "AF", source: node.A5, target: node.F },
              { id: "BF", source: node.B16, target: node.F },
            ],
          },
        },
        {
          nodes: [node.A5, node.B16, node.C, node.E, node.F, node.G],
          links: [
            { id: "AB", source: node.A5, target: node.B16 },
            { id: "BC", source: node.B16, target: node.C },
            { id: "ED", source: node.E, target: node.C },
            { id: "GC", source: node.G, target: node.C },
            { id: "FC", source: node.F, target: node.C /*, value: 2*/ }, // XXX(skep): should duplicate links merge their value other than averaging?
            { id: "AG", source: node.A5, target: node.G },
            { id: "BG", source: node.B16, target: node.G },
            { id: "AF", source: node.A5, target: node.F },
            { id: "BF", source: node.B16, target: node.F },
          ],
        },
      ],
      [
        "select non-merged nodes as merge target before already merged ones",
        "B[16] <- C <- D",
        "B[16] <- C[2]",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.B16, node.C, node.D],
            links: [
              { id: "CB", source: node.C, target: node.B16 },
              { id: "DC", source: node.D, target: node.C },
            ],
          },
        },
        {
          nodes: [node.B16, node.C],
          links: [
            {
              id: "CB",
              source: { ...node.C, mergeCount: 2 },
              target: node.B16,
            },
          ],
        },
      ],
      [
        "duplicate links to side-nodes should average their values",
        "E <-> D -2-> C -> B <-3- A -> C; E -3-> C",
        "E <-> D -2-> C -2-> B; E -3-> C",
        {
          steps: 1,
          direction: ZoomDirection.Out,
        },
        {
          zoomSteps: [],
          graphData: {
            nodes: [node.A, node.B, node.C, node.D, node.E],
            links: [
              { id: "ED", source: node.E, target: node.D },
              { id: "EC", source: node.E, target: node.C, value: 3 },
              { id: "DE", source: node.D, target: node.E },
              { id: "DC", source: node.D, target: node.C, value: 2 },
              { id: "CB", source: node.C, target: node.B },
              { id: "AB", source: node.A, target: node.B, value: 3 },
              { id: "AC", source: node.A, target: node.C },
            ],
          },
        },
        {
          nodes: [node.B, node.C, node.D, node.E],
          links: [
            { id: "ED", source: node.E, target: node.D },
            { id: "EC", source: node.E, target: node.C, value: 3 },
            { id: "DE", source: node.D, target: node.E },
            { id: "DC", source: node.D, target: node.C, value: 2 },
            { id: "CB", source: node.C, target: node.B, value: 2 },
          ],
        },
      ],
      //[
      //  "name",
      //  "A -> B",
      //  "A -> B",
      //  {
      //    steps: ?,
      //    direction: ZoomDirection.Out,
      //  },
      //  {
      //    zoomSteps: [],
      //    graphData: { nodes: [], links: [] },
      //  },
      //  { nodes: [], links: [] },
      //],
    ])(
      "%s: should merge %p to %p",
      (
        _test_name: string,
        _from: string,
        _to: string,
        args: ZoomArgs,
        state: ZoomState,
        expected: GraphDataMerged,
      ) => {
        // reset mutable data on node set (cannot use `beforeEach` due to
        // `it.each` usage)
        state.graphData.nodes.forEach((node) => {
          node.mergeCount = rawData.find(
            (rawNode) => node.id === rawNode.id,
          )?.mergeCount;
        });
        const argsSaved = {
          ...args,
        };
        const stateSaved = {
          ...state,
          graphData: {
            nodes: [...state.graphData.nodes.map((node) => ({ ...node }))],
            links: [...state.graphData.links.map((link) => ({ ...link }))],
          },
        };
        zoomStep(args, state);
        expect(state.graphData).toEqual(expected);
        zoomStep({ ...argsSaved, direction: ZoomDirection.In }, state);
        // must sort the nodes & links, since zoom-in changes order
        const compareIDs = (a: HasID, b: HasID) => {
          return a.id.charCodeAt(0) - b.id.charCodeAt(0);
        };
        const compareLinkIDs = (a: LinkBetweenHasIDs, b: LinkBetweenHasIDs) => {
          const diff = a.source.id.charCodeAt(0) - b.source.id.charCodeAt(0);
          if (diff !== 0) {
            return diff;
          }
          return a.target.id.charCodeAt(0) - b.target.id.charCodeAt(0);
        };
        state.graphData.nodes.sort(compareIDs);
        stateSaved.graphData.nodes.sort(compareIDs);
        state.graphData.links.sort(compareLinkIDs);
        stateSaved.graphData.links.sort(compareLinkIDs);
        expect(state).toEqual(stateSaved);
      },
    );
  });

  describe("zoom in", () => {
    const rawData = [
      { id: "A" },
      { id: "A2", mergeCount: 2 },
      { id: "A5", mergeCount: 5 },
      { id: "B" },
      { id: "B16", mergeCount: 16 },
      { id: "C" },
      { id: "D" },
      { id: "E" },
      { id: "F" },
      { id: "G" },
    ];
    let nodeList = rawData.map((node) => ({
      id: node.id,
      mergeCount: node.mergeCount,
    }));
    let node = Object.assign(
      // @ts-ignore
      ...nodeList.map((node) => ({ [node.id]: node })),
    );
    it.each([
      [
        "zoom in a single step",
        "A[5], [Merge(B into A)]",
        "A[4] <- B[1]",
        {
          steps: 1,
          direction: ZoomDirection.In,
        },
        {
          graphData: {
            nodes: [node.A5],
            links: [],
          },
          zoomSteps: [
            {
              operations: [
                {
                  type: ZoomOperationType.Delete,
                  removedNodes: [node.B],
                  removedLinks: [{ id: "BA", source: node.B, target: node.A5 }],
                },
              ],
            },
          ],
        },
        {
          nodes: [{ ...node.A5, mergeCount: 4 }, node.B],
          links: [
            { id: "BA", source: node.B, target: { ...node.A5, mergeCount: 4 } },
          ],
        },
      ],
      [
        "rewrite links, that were rewritten on merge",
        "A[2] -> B, [Merge(C into A), Rewrite(C->B to A->B)]",
        "A <- C -> B",
        {
          steps: 1,
          direction: ZoomDirection.In,
        },
        {
          graphData: {
            nodes: [node.A2, node.B],
            links: [{ id: "CB", source: node.A2, target: node.B }],
          },
          zoomSteps: [
            {
              operations: [
                {
                  type: ZoomOperationType.Delete,
                  removedNodes: [node.C],
                  removedLinks: [{ id: "CA", source: node.C, target: node.A2 }],
                },
                {
                  type: ZoomOperationType.LinkRewrite,
                  from: { id: "CB", source: node.C, target: node.B },
                  to: { id: "CB", source: node.A2, target: node.B },
                },
              ],
            },
          ],
        },
        {
          nodes: [{ ...node.A2, mergeCount: undefined }, node.B, node.C],
          links: [
            { id: "CB", source: node.C, target: node.B },
            {
              id: "CA",
              source: node.C,
              target: { ...node.A2, mergeCount: undefined },
            },
          ],
        },
      ],
    ])(
      "%s: should un-merge %p to %p",
      (
        _test_name: string,
        _from: string,
        _to: string,
        args: ZoomArgs,
        state: ZoomState,
        expected: GraphDataMerged,
      ) => {
        // reset mutable data on node set
        state.graphData.nodes.forEach((node) => {
          node.mergeCount = rawData.find(
            (rawNode) => node.id === rawNode.id,
          )?.mergeCount;
        });
        zoomStep(args, state);
        expect(state.graphData).toEqual(expected);
      },
    );
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
        { id: "AB", source: node.A, target: node.B },
        { id: "BA", source: node.B, target: node.A },
        { id: "CA", source: node.C, target: node.A },
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
        { id: "AB", source: node.A, target: node.B, value: 2 },
        { id: "BA", source: node.B, target: node.A, value: 3 },
        { id: "CA", source: node.C, target: node.A, value: 0.5 },
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
      assertions: { node: HasID; expectedWeight: number }[],
    ) => {
      assertions.forEach(({ node, expectedWeight }) => {
        expect(calculateNodeWeight(node, links)).toEqual(expectedWeight);
      });
    },
  );
});
