/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { GraphRenderer } from "./GraphRenderer";

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
  test.skip("loads and displays Graph", async () => {
    // ARRANGE
    const dataset = {
      data: crypto1,
      dataSetName: "test",
    };
    render(<GraphRenderer openVoteDialog={() => {}} />);

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
