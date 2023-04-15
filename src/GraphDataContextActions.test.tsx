import { EditGraph } from "./GraphDataContext";
import {
  getUpdateNodeAction,
  getCreateNodeAction,
  getCreateLinkAction,
  getSubmitVoteAction,
  NewLinkType,
} from "./GraphDataContextActions";
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
      submitVoteInBackend: () => Promise.reject({}),
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

describe("getUpdateNodeAction", () => {
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
      submitVoteInBackend: () => Promise.reject({}),
    };
  };

  it("should reject if node does not exist", async () => {
    let graph: EditGraph = makeEditGraphMock();
    graph.updateNodeInBackend = jest.fn();

    const updateNodeAction = getUpdateNodeAction(graph);
    const input = {
      description: {
        translations: [{ language: "en", content: "new description" }],
      },
      id: "1",
    };
    const expected = new Error("Attempting to update non-existing Node!");
    await expect(updateNodeAction(input)).rejects.toEqual(expected);
  });

  it("should update node and return response", async () => {
    const graph = {
      ...makeEditGraphMock(),
      nodes: [
        {
          id: "1",
          description: {
            translations: [{ language: "en", content: "old description" }],
          },
        },
      ],
      updateNodeInBackend: jest.fn(() =>
        Promise.resolve({ data: { updateNode: { ID: "1" } } })
      ),
    };

    const updateNodeAction = getUpdateNodeAction(graph);
    const result = await updateNodeAction({
      description: {
        translations: [{ language: "en", content: "new description" }],
      },
      id: "1",
    });
    expect(graph.nodes[0].description).toEqual({
      translations: [{ language: "en", content: "new description" }],
    });
    expect(result).toEqual({ data: { updateNode: { ID: "1" } } });
  });

  it("should reject and undo changes if updateNodeInBackend fails", async () => {
    const rejectError = new Error("backend reject");
    const graph = {
      ...makeEditGraphMock(),
      nodes: [
        {
          id: "1",
          description: {
            translations: [{ language: "en", content: "old description" }],
          },
        },
      ],
      updateNodeInBackend: () => Promise.reject(rejectError),
    };
    const updateNodeAction = getUpdateNodeAction(graph);
    await expect(
      updateNodeAction({
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
        id: "1",
      })
    ).rejects.toEqual(rejectError);
    expect(graph.nodes[0].description).toEqual({
      translations: [{ language: "en", content: "old description" }],
    });
  });
});
describe("getCreateNodeAction", () => {
  it("should create a new node and return its ID", async () => {
    const graph = {
      setLinks: jest.fn(),
      createLinkInBackend: () => Promise.reject({}),
      updateNodeInBackend: () => Promise.reject({}),
      submitVoteInBackend: () => Promise.reject({}),
      nodes: [],
      links: [],
      requests: [],
      requestsDispatch: jest.fn(),
      setNodes: jest.fn(),
      createNodeInBackend: jest.fn(() =>
        Promise.resolve({ data: { createNode: { ID: "new-node-id" } } })
      ),
    };

    const createNodeAction = getCreateNodeAction(graph);

    await expect(
      createNodeAction({
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
      })
    ).resolves.toEqual({
      data: { createNode: { ID: "new-node-id" } },
    });

    expect(graph.requestsDispatch).toHaveBeenCalledTimes(2);
    expect(graph.requestsDispatch).toHaveBeenNthCalledWith(1, {
      type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
      id: expect.any(String),
      data: {
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
      },
    });
    expect(graph.requestsDispatch).toHaveBeenNthCalledWith(2, {
      type: pendingActionTypes.CLEAR_REQUEST,
      id: expect.any(String),
    });

    expect(graph.createNodeInBackend).toHaveBeenCalledTimes(1);
    expect(graph.createNodeInBackend).toHaveBeenCalledWith({
      description: {
        translations: [{ language: "en", content: "new description" }],
      },
    });

    expect(graph.setNodes).toHaveBeenCalledTimes(2);
    expect(graph.setNodes).toHaveBeenNthCalledWith(1, [
      {
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
        id: expect.any(String),
      },
    ]);
    expect(graph.setNodes).toHaveBeenNthCalledWith(2, [
      {
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
        id: "new-node-id",
      },
    ]);
  });

  it("should reject if node creation fails", async () => {
    const graph = {
      setLinks: jest.fn(),
      createLinkInBackend: () => Promise.reject({}),
      updateNodeInBackend: () => Promise.reject({}),
      submitVoteInBackend: () => Promise.reject({}),
      nodes: [],
      links: [],
      requests: [],
      requestsDispatch: jest.fn(),
      setNodes: jest.fn(),
      createNodeInBackend: jest.fn(() => {
        throw new Error("Failed to create node");
      }),
    };

    const createNodeAction = getCreateNodeAction(graph);

    await expect(
      createNodeAction({
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
      })
    ).rejects.toThrowError("Failed to create node");

    expect(graph.requestsDispatch).toHaveBeenCalledTimes(2);
    expect(graph.requestsDispatch).toHaveBeenNthCalledWith(1, {
      type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID,
      id: expect.any(String),
      data: {
        description: {
          translations: [{ language: "en", content: "new description" }],
        },
      },
    });
    expect(graph.requestsDispatch).toHaveBeenNthCalledWith(2, {
      type: pendingActionTypes.CLEAR_REQUEST,
      id: graph.requestsDispatch.mock.calls[0][0].id,
    });

    expect(graph.setNodes).toHaveBeenCalledTimes(2);
    expect(graph.setNodes).toHaveBeenCalledWith([]);

    expect(graph.createNodeInBackend).toHaveBeenCalledTimes(1);
    expect(graph.createNodeInBackend).toHaveBeenCalledWith({
      description: {
        translations: [{ language: "en", content: "new description" }],
      },
    });
  });
});

describe("getSubmitVoteAction", () => {
  const makeEditGraphMock = () => {
    return {
      requests: [],
      requestsDispatch: jest.fn(),
      nodes: [],
      setNodes: jest.fn(),
      links: [{ id: "some-id", source: "abc", target: "xyz", value: 2 }],
      setLinks: jest.fn(),
      createNodeInBackend: () => Promise.reject({}),
      createLinkInBackend: () => Promise.reject({}),
      updateNodeInBackend: () => Promise.reject({}),
      submitVoteInBackend: () => Promise.reject({}),
    };
  };

  it("should successfully submit a vote, queue and delete the call and store the updated values in state", async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.submitVoteInBackend = (input) => Promise.resolve({ data: input });
    const linkID = "some-id";
    const value = 5;
    const submitVoteAction = getSubmitVoteAction(editGraph);
    await expect(
      submitVoteAction({ ID: linkID, value: value })
    ).resolves.toEqual({
      data: {
        ID: linkID,
        value,
      },
    });

    expect(editGraph.requestsDispatch).toHaveBeenCalledTimes(2);
    expect(editGraph.requestsDispatch).toHaveBeenNthCalledWith(1, {
      type: pendingActionTypes.SUBMIT_VOTE,
      id: expect.any(String),
      data: { ID: linkID, value: value },
    });
    expect(editGraph.requestsDispatch).toHaveBeenNthCalledWith(2, {
      type: pendingActionTypes.CLEAR_REQUEST,
      id: expect.any(String),
    });

    expect(editGraph.setLinks).toHaveBeenCalledTimes(1);
    expect(editGraph.setLinks).toHaveBeenCalledWith([
      {
        ...editGraph.links[0],
        id: linkID,
        value,
      },
    ]);
  });

  it.each([
    ["link not found", "Link not found!"],
    [
      "link is being created",
      "Trying to update a link that is already being updated!",
    ],
  ])(
    "should abort the call if %p",
    async (testCase: string, rejectMessage: string) => {
      const linkID = "link-id";
      const value = 3;
      let editGraph: EditGraph = makeEditGraphMock();
      if (testCase === "link is being created") {
        editGraph.requests = [
          { type: pendingActionTypes.SUBMIT_VOTE, id: linkID },
        ];
      }
      const submitVoteAction = getSubmitVoteAction(editGraph);
      await expect(
        submitVoteAction({ ID: linkID, value: value })
      ).rejects.toEqual(rejectMessage);

      expect(editGraph.requestsDispatch).not.toHaveBeenCalled();

      expect(editGraph.setLinks).not.toHaveBeenCalled();
    }
  );

  it("should queue and delete the call, do and undo the changes in state if the API call fails", async () => {
    const editGraph: EditGraph = makeEditGraphMock();
    const failingRequest = {
      ID: "some-link-id",
      value: 5,
    };
    const prevLinksState = [
      { id: "some-link-id", value: 2, source: "123", target: "234" },
      { id: "another-link-id", value: 7, source: "1234", target: "2345" },
    ];
    editGraph.links = prevLinksState;

    editGraph.submitVoteInBackend = jest.fn(() =>
      Promise.reject("API call fail!")
    );

    const submitVoteAction = getSubmitVoteAction(editGraph);
    await expect(submitVoteAction(failingRequest)).rejects.toEqual(
      "API call fail!"
    );

    expect(editGraph.requestsDispatch).toHaveBeenCalledTimes(2);
    expect(editGraph.requestsDispatch).toHaveBeenNthCalledWith(1, {
      type: pendingActionTypes.SUBMIT_VOTE,
      id: expect.any(String),
      data: { ID: failingRequest.ID, value: failingRequest.value },
    });
    expect(editGraph.requestsDispatch).toHaveBeenNthCalledWith(2, {
      type: pendingActionTypes.CLEAR_REQUEST,
      id: expect.any(String),
    });

    // The state should be updated optimistically (optimistic update)
    expect(editGraph.setLinks).toHaveBeenCalledTimes(2);
  });
});
