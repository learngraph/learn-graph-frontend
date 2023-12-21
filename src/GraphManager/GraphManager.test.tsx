import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("./GraphRenderer", () => {
  return {
    GraphRenderer: () => <div></div>,
  };
});
jest.mock("./components/GraphFileList");
jest.mock("./components/GraphManagementMenu", () => {
  return {
    GraphManagementMenu: () => <div data-testid="GMM">test</div>,
  };
});
jest.mock("./components/VoteDialog");

describe("understanding of jest", () => {
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

// TODO(skep): test graph manager (currently rewriting edit code, so purpose of GraphManager is unclear)
