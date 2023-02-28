import { EditGraph } from "./GraphDataContext";
import { getCreateLinkAction } from "./GraphDataContextActions";
//import { pendingActionTypes } from "./GraphDataContext";
import {
  pendingActionTypes,
} from "./GraphDataContext";
jest.mock("./getRequestId", () => () => '1');


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
    };
  };

  it("should successfully create a link with id='NEWID'", () => {
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

  it("should successfully create a link with the ID we put in", () => {
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

  it("should store the new link with its id in the links state", () => {
    let editGraph: EditGraph = makeEditGraphMock();
    const linksEntry1 = {
      source: '123',
      target: '234',
      value: 1,
      id: 'asdf'
    };
    editGraph.links = [linksEntry1]
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });

    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "B", weight: 2 });

    return p.then((value) => {
      // @ts-ignore
      const calls = editGraph.setLinks.mock.calls
      expect(calls.length).toBe(2)

      const expectedLinksWithTempId = [
        linksEntry1,
        {
          source: 'A',
          target: 'B',
          value: 2,
          id: '1'
        }
      ]
      const expectedLinksWithFinalId = [
        linksEntry1,
        {
          source: 'A',
          target: 'B',
          value: 2,
          id: 'NEWID'
        }
      ]
      expect(calls[0][0]).toEqual(expectedLinksWithTempId)
      expect(calls[1][0]).toEqual(expectedLinksWithFinalId)
    })
  })

  it('should fail if it tries to create a link to a node that doesnt exist yet', () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.requests = [
      { type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID, id: 'NODE_BEING_CREATED' }
    ]
    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "NODE_BEING_CREATED", to: "B", weight: 2 })
    return expect(p).rejects.toEqual(new Error("Trying to create a link to a Node that hasn't been created yet!"))
  })

  it('should fail if it tries to create a link from a node that doesnt exist yet', () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.requests = [
      { type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID, id: 'NODE_BEING_CREATED' }
    ]
    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "NODE_BEING_CREATED", weight: 2 })
    return expect(p).rejects.toEqual(new Error("Trying to create a link to a Node that hasn't been created yet!"))
  })

  it('should queue and delete pending request in a successful call', () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });
    let createLink = getCreateLinkAction(editGraph);
    const p = createLink({ from: "A", to: "B", weight: 2 })

    return p.then((value) => {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls
      expect(calls.length).toBe(2)
      expect(calls[0]).toEqual([{ "data": { "from": "A", "to": "B", "weight": 2 }, "id": "1", "type": pendingActionTypes.CREATE_LINK_WITH_TEMP_ID }])
      expect(calls[1]).toEqual([{ "id": "1", "type": pendingActionTypes.CLEAR_REQUEST }])
    })
  })

  it('should queue and delete pending request in a failing call', async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.createLinkInBackend = (_) =>
      Promise.reject("some error i guess");
    let createLink = getCreateLinkAction(editGraph);
    try {
      await createLink({ from: "A", to: "B", weight: 2 })
    } catch (e) {
      // nothing
    } finally {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls
      expect(calls.length).toBe(2)
      expect(calls[0]).toEqual([{ "data": { "from": "A", "to": "B", "weight": 2 }, "id": "1", "type": pendingActionTypes.CREATE_LINK_WITH_TEMP_ID }])
      expect(calls[1]).toEqual([{ "id": "1", "type": pendingActionTypes.CLEAR_REQUEST }])
    }
  })
  it('should not queue pending request in a call that doesnt get send', async () => {
    let editGraph: EditGraph = makeEditGraphMock();
    editGraph.requests = [
      { type: pendingActionTypes.CREATE_NODE_WITH_TEMP_ID, id: 'NODE_BEING_CREATED' }
    ]
    let createLink = getCreateLinkAction(editGraph);
    try {
      await createLink({ from: "A", to: "NODE_BEING_CREATED", weight: 2 })
    } catch (e) {
    } finally {
      // @ts-ignore
      const calls = editGraph.requestsDispatch.mock.calls
      console.log(JSON.stringify(calls))
      expect(calls.length).toBe(0)
    }
  })
})

  // TODO(skep): test all them branches
