import {
  EditTab,
  findBackwardLinks,
  findForwardLinks,
  TMPNODE_ID,
  updateNodeFn,
} from "./EditTab";
import { act, render } from "@testing-library/react";
import { DataSetType } from "src/GraphManager/types";
import { EditNodeMenu } from "./components/EditNodeMenu";
import { editNode } from "./utilities/editNode";
import { CreateNodeFnResponse } from "src/GraphManager/hooks/useCreateNode";

jest.mock("./components/EditNodeMenu");
jest.mock("./components/EditLinksMenu");
jest.mock("./utilities/editNode");

describe("EditTab", () => {
  it("should not crash on empty graph", () => {
    let [updateDisplayedGraph, createNode] = [jest.fn(), jest.fn()];
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
        createdNodeResponse={{
          data: { CreateEntityResult: { ID: "1" } },
          apollo: { loading: false, error: false },
        }}
      />
    );
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
  });
  it("should pass an update function to EditNodeMenu that calls createNode", () => {
    let [updateDisplayedGraph, createNode] = [jest.fn(), jest.fn()];
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
        createdNodeResponse={{
          data: { CreateEntityResult: { ID: "1" } },
          apollo: { loading: false, error: false },
        }}
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
  it("should render all nodes as options", () => {
    // FIXME(skep): for some reason we cannot find the displayOptions of the
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
  });
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
    let [createNode, setSelectedNodeDescription, updateDisplayedGraph] = [
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ];
    createNode.mockReturnValueOnce(
      Promise.resolve<CreateNodeFnResponse>({
        data: { createNode: { ID: "NEWID" } },
      })
    );
    let updateNode = updateNodeFn({
      graphData,
      selectedNodeInGraph,
      createNode,
      currentGraphDataset,
      setSelectedNodeDescription,
      updateDisplayedGraph,
    });
    // @ts-ignore: a partial node is expected here, since ID is unknown before the backend gets involved
    await updateNode({ node: { description: "A" }, isNewNode: true });
    expect(createNode.mock.calls.length).toBe(1);
    expect(
      createNode.mock.calls[0][0].description.translations[0].language
    ).toEqual("en");
    expect(
      createNode.mock.calls[0][0].description.translations[0].content
    ).toEqual("A");
    // @ts-ignore
    let editNodeMock = editNode.mock;
    expect(editNodeMock.calls.length).toBe(2); // since after the promise we update the ID
    expect(updateDisplayedGraph.mock.calls.length).toBe(2);
    // first call contains only user input, for local graph changes
    expect(editNodeMock.calls[0][0].newNode).toEqual({
      id: TMPNODE_ID,
      description: "A",
    });
    // second call contains the backend result for the id
    expect(editNodeMock.calls[1][0].newNode).toEqual({
      id: "NEWID",
      description: "A",
    });
  });
});
