import { EditGraph } from "./GraphDataContext";
import { getUpdateNodeAction, getCreateNodeAction, getCreateLinkAction, NewLinkType } from "./GraphDataContextActions";
//import { pendingActionTypes } from "./GraphDataContext";
import { pendingActionTypes } from "./GraphDataContext";
jest.mock("./getRequestId", () => () => "1");

describe("getCreateLinkAction", () => {
  const makeEditGraphMock = () => {
    return {
      requests: [],
      requestsDispatch: jest.fn(),
      nodes: [],
      setNodes: jest.fn(),
      links: [],
      setLinks: jest.fn(),
      createNodeInBackend: () => Promise.reject({}),
      createLinkInBackend: () => Promise.reject({}),
      updateNodeInBackend: () => Promise.reject({}),
    };
  };

  it("should successfully create a link with id='NEWID'", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    // backend shall return a new ID successfully
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });
    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "B", weight: 2 });
    return p.then((value) => {
      expect(value).toEqual({ data: { createEdge: { ID: "NEWID" } } });
    });
  });

  it("should successfully create a link with the ID we put in", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    // backend shall return a new ID successfully
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "ANOTHER_ID" } } });
    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "B", weight: 2 });
    return p.then((value) => {
      expect(value).toEqual({ data: { createEdge: { ID: "ANOTHER_ID" } } });
    });
  });

  it("should store the new link with its id in the links state", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    const linksEntry1 = {
      source: "123",
      target: "234",
      value: 1,
      id: "asdf",
    };
    editGraph.links = [linksEntry1];
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });

    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "B", weight: 2 });

    return p.then(() => {
      // @ts-ignore
      const calls = editGraph.setLinks.mock.calls;
      expect(calls.length).toBe(2);

      const expectedLinksWithTempId = [
        linksEntry1,
        {
          source: "A",
          target: "B",
          value: 2,
          id: "1",
        },
      ];
      const expectedLinksWithFinalId = [
        linksEntry1,
        {
          source: "A",
          target: "B",
          value: 2,
          id: "NEWID",
        },
      ];
      expect(calls[0][0]).toEqual(expectedLinksWithTempId);
      expect(calls[1][0]).toEqual(expectedLinksWithFinalId);
    });
  });

  it.each([
    ["from", { from: "NODE_BEING_CREATED", to: "B", weight: 2 }],
    ["to", { from: "A", to: "NODE_BEING_CREATED", weight: 2 }],
  ])(
    "should fail if it tries to create a link %p a node that doesnt exist yet (link:%p)",
    (_: string, link: NewLinkType) => {
      let editGraph: EditGraph = makeEditGraphMock();
      editGraph.requests = [
        {
          type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
          id: "NODE_BEING_CREATED",
        },
      ];
      let createLink = getCreateLinkAction(editGraph);
      let p = createLink(link);
      return expect(p).rejects.toEqual(
        new Error(
          "Trying to create a link to a Node that hasn't been created yet!"
        )
      );
    }
  );

  it("should queue and delete pending request in a successful call", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });
    let createLink = getCreateLinkAction(editGraph);
    const p = createLink({ from: "A", to: "B", weight: 2 });

    return p.then(() => {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls;
      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual([
        {
          data: { from: "A", to: "B", weight: 2 },
          id: "1",
          type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        },
      ]);
      expect(calls[1]).toEqual([
        { id: "1", type: pendingActionTypes.CLEAR_REQUEST },
      ]);
    });
  });

  it("should queue and delete pending request in a failing call", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.createLinkInBackend = (_) => Promise.reject("some error i guess");
    let createLink = getCreateLinkAction(editGraph);
    try {
      await createLink({ from: "A", to: "B", weight: 2 });
    } catch (e) {
      // nothing
    } finally {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls;
      expect(calls.length).toBe(2);
      expect(calls[0]).toEqual([
        {
          data: { from: "A", to: "B", weight: 2 },
          id: "1",
          type: pendingActionTypes.CREATE_LINK_WITH_TEMP_ID,
        },
      ]);
      expect(calls[1]).toEqual([
        { id: "1", type: pendingActionTypes.CLEAR_REQUEST },
      ]);
    }
  });
  it("should not queue pending request in a call that doesnt get send", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.requests = [
      {
        type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
        id: "NODE_BEING_CREATED",
      },
    ];
    let createLink = getCreateLinkAction(editGraph);
    try {
      await createLink({ from: "A", to: "NODE_BEING_CREATED", weight: 2 });
    } catch (e) {
    } finally {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls;
      expect(calls.length).toBe(0);
    }
  });
});

describe('getUpdateNodeAction', () => {

  const makeEditGraphMock = () => {
    return {
      requests: [],
      requestsDispatch: jest.fn(),
      nodes: [],
      setNodes: jest.fn(),
      links: [],
      setLinks: jest.fn(),
      createNodeInBackend: () => Promise.reject({}),
      createLinkInBackend: () => Promise.reject({}),
      updateNodeInBackend: () => Promise.reject({}),
    };
  };

  it('should reject if node does not exist', async () => {
    let graph: EditGraph = makeEditGraphMock()
    graph.updateNodeInBackend = jest.fn()

    const updateNodeAction = getUpdateNodeAction(graph);
    const input = { description: { translations: [{ language: 'en', content: 'new description' }] }, id: '1' }
    const expected = new Error(
      "Attempting to update non-existing Node!"
    )
    await expect(updateNodeAction(input)).rejects.toEqual(expected);
  });

  it('should update node and return response', async () => {
    const graph = {
      nodes: [{ id: '1', description: { translations: [{ language: 'en', content: 'old description' }] } }],
      updateNodeInBackend: jest.fn(() => Promise.resolve({ data: { updateNode: { ID: '1' } } })),
      requests: [],
      requestsDispatch: jest.fn(),
      setNodes: jest.fn(),
      links: [],
      setLinks: jest.fn(),
      createNodeInBackend: () => Promise.reject({}),
      createLinkInBackend: () => Promise.reject({}),

    };
    const updateNodeAction = getUpdateNodeAction(graph);
    const result = await updateNodeAction({ description: { translations: [{ language: 'en', content: 'new description' }] }, id: '1' });
    expect(graph.nodes[0].description).toEqual({ translations: [{ language: 'en', content: 'new description' }] });
    expect(result).toEqual({ data: { updateNode: { ID: '1' } } });
  });

  it('should reject and undo changes if updateNodeInBackend fails', async () => {
    const graph = {
      nodes: [{ id: '1', description: { translations: [{ language: 'en', content: 'new description' }] } }],
      updateNodeInBackend: jest.fn(() => Promise.reject()),
      requestsDispatch: jest.fn(),
      requests: [],
      setNodes: jest.fn(),
      links: [],
      setLinks: jest.fn(),
      createNodeInBackend: () => Promise.reject({}),
      createLinkInBackend: () => Promise.reject({}),
    };
    const updateNodeAction = getUpdateNodeAction(graph);
    await expect(updateNodeAction({ description: { translations: [{ language: 'en', content: 'new description' }] }, id: '1' })).rejects.toEqual(undefined);
    expect(graph.nodes[0].description).toEqual({ translations: [{ language: 'en', content: 'new description' }] });
  });
});

// TODO(skep): test getCreateNodeAction
