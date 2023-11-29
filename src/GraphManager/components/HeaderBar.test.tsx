import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderBar from "./HeaderBar";

describe("HeaderBar", () => {
  it("should call userInputCallback on input change", async () => {
    let userInputCallback = jest.fn();
    render(<HeaderBar userInputCallback={userInputCallback} />);
    expect(userInputCallback.mock.calls.length).toBe(0);
    let input = screen.getByLabelText("search bar");
    const user = userEvent.setup();
    await user.click(input);
    await user.keyboard("123");
    expect(userInputCallback.mock.calls.length).toBe(3);
    expect(userInputCallback.mock.calls[0][0]).toEqual("1");
    expect(userInputCallback.mock.calls[1][0]).toEqual("12");
    expect(userInputCallback.mock.calls[2][0]).toEqual("123");
  });
});
