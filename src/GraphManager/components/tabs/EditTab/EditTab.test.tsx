import { EditTab } from "./EditTab";
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
    //expect(screen.get("button")).toEqual("lol");
    expect(screen.getByDisplayValue("A", { exact: false })).toBeInTheDocument();
  });
});
