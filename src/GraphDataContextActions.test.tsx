import { EditGraph } from "./GraphDataContext";
import { getCreateLinkAction } from "./GraphDataContextActions";
//import { pendingActionTypes } from "./GraphDataContext";

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
  it("should successfully create a link", () => {
    let editGraph: EditGraph = makeEditGraphMock();
    // backend shall return a new ID successfully
    editGraph.createLinkInBackend = (_) =>
      Promise.resolve({ data: { createEdge: { ID: "NEWID" } } });
    let createLink = getCreateLinkAction(editGraph);
    let p = createLink({ from: "A", to: "B", weight: 2 });
    return p.then((value) => {
      expect(value).toEqual({ data: { createEdge: { ID: "TMPEDGEID" } } });
    });
  });
  // TODO(skep): test all them branches
});
