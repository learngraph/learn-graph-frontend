import {
  EditTab,
  findBackwardLinks,
  findForwardLinks,
  updateLinkFn,
  updateNodeFn,
} from "./EditTab";
import { render } from "@testing-library/react";
import { DataSetType, NodeType } from "src/GraphManager/types";
import { Text } from "src/GraphManager/hooks/types";

jest.mock("./components/EditNodeMenu");
jest.mock("./components/EditLinksMenu");
jest.mock("./utilities/editNode");

describe("EditTab", () => {
  const makeMocks = () => {
    let updateDisplayedGraph = jest.fn();
    let createNode = jest.fn();
    let setSelectedNodeDescription = jest.fn();
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
    const newNode: NodeType = {
      id: "1234",
      description: "test node",
    };
    let props = {
      // ensure graph data is copied since we use this function in multiple tests
      currentGraphDataset: JSON.parse(JSON.stringify(graphDataset)),
      updateDisplayedGraph,
      createNode,
      createEdge: jest.fn(),
    };
    const updateNode = updateNodeFn({
      currentGraphDataset: graphDataset,
      selectedNodeInGraph: newNode,
      setSelectedNodeDescription,
      updateDisplayedGraph,
      createNode,
    });
    return { updateDisplayedGraph, props, updateNode, createNode };
  };

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
        createEdge={createEdge}
        createNode={createNode}
      />
    );
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
  });
  it("should call createNode from props when updating node with no old node", () => {
    let { updateDisplayedGraph, props, updateNode } = makeMocks();
    const inputNode: NodeType = {
      id: "1234",
      description: "testier node",
    };
    interface NodeToBeCreated {
      description: Text;
    }
    const outputNode: NodeToBeCreated = {
      description: {
        translations: [
          {
            language: "en",
            content: inputNode.description,
          },
        ],
      },
    };
    updateNode({
      isNewNode: true,
      node: inputNode,
    });
    const calls = props.createNode.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toEqual(outputNode);
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
  });
  it.todo(
    "should call updateDisplayedGraph when updating node with an old node"
  );
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

describe("updateLinkFn", () => {
  const makeMocks = () => {
    let updateDisplayedGraph = jest.fn();
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
      updateDisplayedGraph,
      createNode: jest.fn(),
      createEdge: jest.fn(),
    };
    let updateLink = updateLinkFn(props);
    return { updateDisplayedGraph, props, updateLink };
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
