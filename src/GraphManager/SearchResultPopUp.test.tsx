import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { makeMockController } from "./GraphEdit.testingutil";
import { CENTER_AT_NODE_TIME_MS, SearchResultPopUp } from "./SearchResultPopUp";

describe("SearchResultPopUp", () => {
  it("should render search results", async () => {
    const ctrl = makeMockController();
    ctrl.search.isResultShown = true;
    ctrl.search.highlightNodes = new Set([
      { id: "1", description: "A", x: 0, y: 0 },
      { id: "2", description: "B", x: 10, y: 10 },
    ]);
    // @ts-ignore
    render(<SearchResultPopUp ctrl={ctrl} />);
    expect(screen.getByText("Search Results")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    let itemA = screen.getByText("A");
    let itemB = screen.getByText("B");
    const user = userEvent.setup();
    await user.click(itemA);
    expect(ctrl.forceGraphRef.current.centerAt).toHaveBeenCalledWith(
      0,
      0,
      CENTER_AT_NODE_TIME_MS,
    );
    await user.click(itemB);
    expect(ctrl.forceGraphRef.current.centerAt).toHaveBeenCalledWith(
      10,
      10,
      CENTER_AT_NODE_TIME_MS,
    );
  });
});
