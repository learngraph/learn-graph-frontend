import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { makeMockController } from "./GraphEdit/GraphEdit.testingutil";
import { SearchResultPopUp } from "./SearchResultPopUp";
import {
  CENTER_AT_NODE_TIME_MS,
  GLOBALSCALE_AFTER_SEARCH,
} from "./components/Search";
import { ZOOM_TO_FIT_DURATION_MS } from "./ZoomControlPanel";

describe("SearchResultPopUp", () => {
  it("should render search results", async () => {
    const ctrl = makeMockController();
    ctrl.search.isResultShown = true;
    ctrl.search.highlightNodes = new Set([
      { id: "1", description: "A", x: 0, y: 0 },
      { id: "2", description: "B", x: 10, y: 10 },
    ]);
    render(
      <SearchResultPopUp
        // @ts-ignore
        ctrl={ctrl}
        availableSpace={{ height: 100, width: 100 }}
      />,
    );
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
    expect(ctrl.forceGraphRef.current.zoom).toHaveBeenCalledWith(
      GLOBALSCALE_AFTER_SEARCH,
      ZOOM_TO_FIT_DURATION_MS,
    );
  });
});
