import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchAppBar from "./SearchAppBar";

describe("SearchAppBar", () => {
  it("should call userInputCallback on input change", async () => {
    let userInputCallback = jest.fn();
    render(<SearchAppBar userInputCallback={userInputCallback} />);
    expect(userInputCallback.mock.calls.length).toBe(0);
    let input = screen.getByLabelText("search bar");
    userEvent.type(input, "lol");
    expect(userInputCallback.mock.calls.length).toBe(3);
    expect(userInputCallback.mock.calls[0][0]).toEqual("l");
    expect(userInputCallback.mock.calls[1][0]).toEqual("lo");
    expect(userInputCallback.mock.calls[2][0]).toEqual("lol");
  });
});
