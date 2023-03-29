import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchAppBar from "./SearchAppBar";

describe("SearchAppBar", () => {
  it("should call userInputCallback on input change", async () => {
    let userInputCallback = jest.fn();
    render(<SearchAppBar userInputCallback={userInputCallback} />);
    expect(userInputCallback.mock.calls.length).toBe(0);
    let input = screen.getByLabelText("search bar");
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard("1234");
    expect(userInputCallback.mock.calls.length).toBe(2);
    expect(userInputCallback.mock.calls[0][0]).toEqual("123");
    expect(userInputCallback.mock.calls[1][0]).toEqual("1234");
  });
});
