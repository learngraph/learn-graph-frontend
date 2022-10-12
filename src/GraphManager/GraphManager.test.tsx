/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
//import { useQuery } from "@apollo/client";
import "@testing-library/jest-dom";

// Since render() does not support canvas.getContext('2d')
// we must mock ForceGraph2D.
// (https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext),
jest.mock("react-force-graph-2d", () => (props: any) => {
  return <div>test-graph: {JSON.stringify(props.graphData)}</div>;
});

// mock the client, so that no RPC happens in the test, and no react state
// change!
jest.mock("@apollo/client", () => {
  const originalModule = jest.requireActual("@apollo/client");
  let useQueryMock = jest.fn();
  useQueryMock.mockReturnValue({
    loading: "LOL",
    data: "LOL",
    error: "LOL",
    networkStatu: "LOL",
  });
  return {
    __esModule: true,
    ...originalModule,
    useQuery: () => {
      return {
        loading: "LOL",
        data: "LOL",
        error: "LOL",
        networkStatu: "LOL",
      };
    },
    // FIXME: why does this not work? It should work, see tests below.
    //useQuery: useQueryMock,
  };
});

describe("GraphManager", () => {
  test("my understanding of jest&react testing/matching", () => {
    const Hello = () => (
      <div>
        Hello <span>world</span>
      </div>
    );
    render(<Hello />);
    expect(screen.getByText("Hello").textContent).toEqual("Hello world");
    expect(screen.getByText("world").textContent).toEqual("world");
  });

  test("my understanding of jest.fn", () => {
    let useQueryMock = jest.fn();
    useQueryMock.mockReturnValue({
      loading: "LOL",
    });
    expect(useQueryMock()).toEqual({ loading: "LOL" });
    let { loading } = useQueryMock();
    expect(loading).toEqual("LOL");
  });
});
