import {
  EditTab,
  findBackwardLinks,
  findForwardLinks,
  TMPNODE_ID,
  TMPLINK_ID,
  updateNodeFn,
  updateLinkFn,
} from "./EditTab";
import { act, render } from "@testing-library/react";
import { DataSetType } from "src/GraphManager/types";
import { EditNodeMenu } from "./components/EditNodeMenu";
import { createNode, updateNode } from "./utilities/editNode";
import { CreateNodeFnResponse } from "src/GraphManager/hooks/useCreateNode";
import { CreateEdgeFnResponse } from "src/GraphManager/hooks/useCreateEdge";

jest.mock("./components/EditNodeMenu");
jest.mock("./components/EditLinksMenu");
jest.mock("./utilities/editNode");

describe("EditTab", () => {
  it("should not crash on empty graph", () => {
    let [updateDisplayedGraph, createNode, createEdge] = [
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ];
    let graph: DataSetType = {
      dataSetName: "test-graph",
      data: {
        nodes: [],
        links: [],
      },
    };
    render(
      <EditTab
        updateDisplayedGraph={updateDisplayedGraph}
        currentGraphDataset={graph}
        createNode={createNode}
        createEdge={createEdge}
        createNodeFromCtx={createNode}
      />
    );
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
  });
  it("should pass an update function to EditNodeMenu that calls createNode", () => {
    let [updateDisplayedGraph, createNode, createEdge] = [
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ];
    createNode.mockReturnValueOnce(
      new Promise(() => {
        return { id: "1", description: "A" };
      })
    );
    let graph: DataSetType = {
      dataSetName: "test-graph",
      data: {
        nodes: [{ id: "1", description: "A" }],
        links: [],
      },
    };
    render(
      <EditTab
        updateDisplayedGraph={updateDisplayedGraph}
        currentGraphDataset={graph}
        createNode={createNode}
        createEdge={createEdge}
        createNodeFromCtx={createNode}
      />
    );
    // @ts-ignore
    let EditNodeMenuMock = EditNodeMenu.mock;
    expect(EditNodeMenuMock.calls.length).toBe(1);
    let saveChanges = EditNodeMenuMock.calls[0][0].saveChanges;
    act(() => {
      saveChanges({ node: { id: "1", description: "AA" }, isNewNode: false });
    });
    expect(createNode.mock.calls.length).toBe(0);
    act(() => {
      saveChanges({ node: { id: "2", description: "C" }, isNewNode: true });
    });
    expect(createNode.mock.calls.length).toBe(1);
  });
  it("should pass an update function to EditLinksMenu that calls createEdge", () => {});
  // FIXME(skep): for some reason we cannot find the displayOptions of the
  //it("should render all nodes as options", () => {
  // "Select" component
  //let updateDisplayedGraph = jest.fn();
  //let graph: DataSetType = {
  //  dataSetName: "test-graph",
  //  data: {
  //    nodes: [
  //      { id: "1", description: "A" },
  //      { id: "2", description: "B" },
  //    ],
  //    links: [],
  //  },
  //};
  //render(
  //  <EditTab
  //    updateDisplayedGraph={updateDisplayedGraph}
  //    currentGraphDataset={graph}
  //  />
  //);
  //});
});

describe("findForwardLinks", () => {
  it("should find no link", () => {
    expect(
      findForwardLinks(
        {
          nodes: [],
          links: [{ id: "1", source: "1", target: "2", value: 8.0 }],
        },
        "1"
      )
    ).toEqual([]);
  });
  it("should find one link", () => {
    expect(
      findForwardLinks(
        {
          nodes: [],
          links: [{ id: "1", source: "2", target: "1", value: 8.0 }],
        },
        "1"
      )
    ).toEqual([{ id: "1", source: "2", target: "1", value: 8.0 }]);
  });
  it("should find multiple link", () => {
    expect(
      findForwardLinks(
        {
          nodes: [],
          links: [
            { id: "1", source: "2", target: "1", value: 8.0 },
            { id: "1", source: "3", target: "1", value: 2.0 },
          ],
        },
        "1"
      )
    ).toEqual([
      { id: "1", source: "2", target: "1", value: 8.0 },
      { id: "1", source: "3", target: "1", value: 2.0 },
    ]);
  });
});

describe("findBackwardLinks", () => {
  it("should find one link", () => {
    expect(
      findBackwardLinks(
        {
          nodes: [],
          links: [{ id: "1", source: "1", target: "2", value: 8.0 }],
        },
        "1"
      )
    ).toEqual([{ id: "1", source: "1", target: "2", value: 8.0 }]);
  });
  it("should find no link", () => {
    expect(
      findBackwardLinks(
        {
          nodes: [],
          links: [{ id: "1", source: "2", target: "1", value: 8.0 }],
        },
        "1"
      )
    ).toEqual([]);
  });
  it("should return an empty error, even if input is undefined", () => {
    expect(
      findBackwardLinks(
        // @ts-ignore
        { nodes: [], links: undefined },
        "1"
      )
    ).toEqual([]);
  });
});

describe("updateNodeFn", () => {
  it("should call create node for new nodes", async () => {
    let graphData = {
      nodes: [],
      links: [],
    };
    let currentGraphDataset = { dataSetName: "test", data: graphData };
    let selectedNodeInGraph = { id: "2", description: "B" };
    let [
      createNodeInBackend,
      setSelectedNodeDescription,
      updateDisplayedGraph,
    ] = [jest.fn(), jest.fn(), jest.fn()];
    createNodeInBackend.mockReturnValueOnce(
      Promise.resolve<CreateNodeFnResponse>({
        data: { createNode: { ID: "NEWID" } },
      })
    );
    let updateNodeFunction = updateNodeFn({
      currentGraphDataset,
      selectedNodeInGraph,
      createNodeInBackend: createNodeInBackend,
      setSelectedNodeDescription,
      updateDisplayedGraph,
    });
    // @ts-ignore: a partial node is expected here, since ID is unknown before the backend gets involved
    await updateNodeFunction({ node: { description: "A" }, isNewNode: true });
    expect(createNodeInBackend.mock.calls.length).toBe(1);
    expect(
      createNodeInBackend.mock.calls[0][0].description.translations[0].language
    ).toEqual("en");
    expect(
      createNodeInBackend.mock.calls[0][0].description.translations[0].content
    ).toEqual("A");
    // @ts-ignore
    let createNodeMock = createNode.mock;
    // @ts-ignore
    let updateNodeMock = updateNode.mock;
    expect(createNodeMock.calls.length).toBe(1);
    expect(updateNodeMock.calls.length).toBe(1); // after the backend response we update the ID
    expect(updateDisplayedGraph.mock.calls.length).toBe(2);
    // first call contains only user input, for local graph changes
    expect(createNodeMock.calls[0][0].newNode).toEqual({
      id: TMPNODE_ID,
      description: "A",
    });
    // second call contains the backend result for the id
    expect(updateNodeMock.calls[0][0].newNode).toEqual({
      id: "NEWID",
      description: "A",
    });
  });
});

describe("updateLinkFn", () => {
  const makeMocks = () => {
    let updateDisplayedGraph = jest.fn();
    let createNode = jest.fn();
    let createEdge = jest.fn();
    let graphDataset = {
      dataSetName: "test",
      data: {
        nodes: [
          { id: "1", description: "A" },
          { id: "2", description: "B" },
        ],
        links: [{ id: "l1", source: "1", target: "2", value: 1 }],
      },
    };
    let props = {
      // ensure graph data is copied since we use this function in multiple tests
      currentGraphDataset: JSON.parse(JSON.stringify(graphDataset)),
      updateDisplayedGraph: updateDisplayedGraph,
      createNode: createNode,
      createEdge: createEdge,
      createNodeFromCtx: createNode,
    };
    let updateLink = updateLinkFn(props);
    return { updateDisplayedGraph, createEdge, createNode, props, updateLink };
  };

  it("should preserve current link content when updating the links' value", () => {
    let { updateDisplayedGraph, updateLink, props } = makeMocks();
    let oldLink = props.currentGraphDataset.data.links[0];
    updateLink({
      oldLink: oldLink,
      updatedLink: {
        ...oldLink,
        value: 3.141,
      },
    });
    expect(props.createEdge.mock.calls.length).toBe(0);
    expect(updateDisplayedGraph.mock.calls[0][0].data).toEqual({
      ...props.currentGraphDataset.data,
      links: [{ ...props.currentGraphDataset.data.links[0], value: 3.141 }],
    });
  });

  it("should create a new link, when no old link is passed", async () => {
    let { updateDisplayedGraph, updateLink, props } = makeMocks();
    // need to synchronize calls by resolving the promise with backend data at
    // the right time
    let resolver = undefined;
    let givemeresolver = (fn: any) => {
      resolver = fn;
    };
    props.createEdge.mockReturnValueOnce(
      new Promise<CreateEdgeFnResponse>((resolve, _) => {
        givemeresolver(() => {
          resolve({ data: { createEdge: { ID: "IDFROMBACKEND" } } });
        });
      })
    );
    let p = updateLink({
      oldLink: undefined,
      // @ts-ignore: a partial link is passed here since ID is unknown at this time
      updatedLink: {
        source: "2",
        target: "1",
        value: 3,
      },
    });
    expect(updateDisplayedGraph.mock.calls[0][0].data).toEqual({
      ...props.currentGraphDataset.data,
      links: props.currentGraphDataset.data.links.concat([
        { id: TMPLINK_ID, source: "2", target: "1", value: 3 },
      ]),
    });
    // @ts-ignore: it is not undefined
    resolver();
    await p;
    expect(updateDisplayedGraph.mock.calls[1][0].data).toEqual({
      ...props.currentGraphDataset.data,
      links: props.currentGraphDataset.data.links.concat([
        { id: "IDFROMBACKEND", source: "2", target: "1", value: 3 },
      ]),
    });
    // backend API is called
    expect(props.createEdge.mock.calls.length).toBe(1);
    expect(props.createEdge.mock.calls[0][0]).toEqual({
      from: "2",
      to: "1",
      weight: 3,
    });

    expect(updateDisplayedGraph.mock.calls.length).toBe(2);
  });

  it("should reject promise if the old link does not exist", async () => {
    let { updateLink, props } = makeMocks();
    let oldLink = props.currentGraphDataset.data.links[0];
    let error = undefined;
    try {
      await updateLink({
        oldLink: { ...oldLink, id: "1337" },
        updatedLink: {
          ...oldLink,
          value: 3.141,
        },
      });
    } catch (e) {
      error = e;
    }
    expect(error).toMatch("unknown index");
  });
});
