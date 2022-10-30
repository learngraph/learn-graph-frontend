import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GraphManager } from "./GraphManager";
import { act } from "react-dom/test-utils";

jest.mock("./GraphRenderer", () => {
  return { GraphRenderer: () => <div></div> };
});
jest.mock("./components/GraphFileList");
jest.mock("./components/GraphManagementMenu", () => {
  return {
    GraphManagementMenu: () => <div data-testid="GMM">test</div>,
  };
});
jest.mock("./components/VoteDialog");

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

describe("opening/closing of edit menu", () => {
  it("should initially be closed", () => {
    render(
      <GraphManager
        datasets={[{ dataSetName: "mockSEt", data: { nodes: [], links: [] } }]}
        // @ts-ignore
        fetchedGraph={undefined}
        queryResponse={{}}
      />
    );
    expect(screen.queryByTestId("GMM")).not.toBeInTheDocument();
  });
  it("should be opened & closed after button click", () => {
    render(
      <GraphManager
        datasets={[{ dataSetName: "mockSEt", data: { nodes: [], links: [] } }]}
        // @ts-ignore
        fetchedGraph={undefined}
        queryResponse={{}}
      />
    );
    const button = screen.queryByLabelText("toggle menu");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(screen.getByTestId("GMM")).toBeInTheDocument();
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(screen.queryByTestId("GMM")).not.toBeInTheDocument();
  });
});
