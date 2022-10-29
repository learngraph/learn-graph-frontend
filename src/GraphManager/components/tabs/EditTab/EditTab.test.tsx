import { EditTab, findBackwardLinks, findForwardLinks } from "./EditTab";
import { render, screen } from "@testing-library/react";
import { DataSetType } from "src/GraphManager/types";

jest.mock("./components/EditNodeMenu");
jest.mock("./components/EditLinksMenu");

describe("EditTab", () => {
  it("should not crash on empty graph", () => {
    let updateDisplayedGraph = jest.fn();
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
      />
    );
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
  });
  it("should render all nodes as options", () => {
    let updateDisplayedGraph = jest.fn();
    let graph: DataSetType = {
      dataSetName: "test-graph",
      data: {
        nodes: [
          { id: "1", description: "A" },
          { id: "2", description: "B" },
        ],
        links: [],
      },
    };
    render(
      <EditTab
        updateDisplayedGraph={updateDisplayedGraph}
        currentGraphDataset={graph}
      />
    );
    expect(updateDisplayedGraph.mock.calls.length).toBe(0);
    expect(screen.getByDisplayValue("A", { exact: false })).toBeInTheDocument();
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
