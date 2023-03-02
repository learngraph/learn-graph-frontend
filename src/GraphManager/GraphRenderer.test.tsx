/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { GraphRenderer, onLinkClickFn } from "./GraphRenderer";

//import { useQuery } from "@apollo/client";
import "@testing-library/jest-dom";
import crypto1 from "../graphdata/crypto-1";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

describe("GraphRenderer", () => {
  test("loads and displays Graph", async () => {
    // ARRANGE
    const dataset = {
      data: crypto1,
      dataSetName: "test",
    };
    render(
      <GraphRenderer selectedGraphDataset={dataset} openVoteDialog={() => {}} />
    );

    // ACT
    //await userEvent.click(screen.getByText('Load Greeting'))
    //await screen.findByRole('heading')

    // ASSERT
    // FIXME: does only work, when jest.fn() above works
    //expect(useQuery).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("test-graph", { exact: false }).textContent
    ).toContain("Number Theory");
  });
});

describe("onLinkClickFn", () => {
  it("should call openVoteDialog with link info", () => {
    const props = {
      openVoteDialog: jest.fn(),
      selectedGraphDataset: { dataSetName: "", data: { nodes: [], links: [] } },
    };
    const onLinkClick = onLinkClickFn(props);
    const link = {
      source: "A",
      target: "B",
      value: 1337,
      id: "C",
    };
    onLinkClick(link);
    expect(props.openVoteDialog.mock.calls.length).toEqual(1);
    expect(props.openVoteDialog.mock.calls[0][0]).toEqual({
      linkID: link.id,
      sourceNode: link.source,
      targetNode: link.target,
      weight: link.value,
    });
  });
});
