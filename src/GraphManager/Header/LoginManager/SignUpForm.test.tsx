import { SignUpForm } from "./SignUpForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SignUpForm", () => {
  it("should submit form content", async () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);
    expect(onSubmit.mock.calls.length).toBe(0);
    const button = screen.getByText("Submit");
    const user = userEvent.setup();
    await user.click(button);
    // there should be no callback, since requirements for user input are not satisfied with empty fields
    expect(onSubmit.mock.calls.length).toBe(0);
    const usernameField = screen.getByLabelText(/User name/i);
    const emailField = screen.getByLabelText(/Email Address/i);
    const passwordField = screen.getByLabelText(/Password/i);
    await user.click(usernameField);
    await user.keyboard("abcd");
    await user.click(emailField);
    await user.keyboard("a@b.com");
    await user.click(passwordField);
    await user.keyboard("1234567890");
    await user.click(button);
    expect(onSubmit.mock.calls.length).toBe(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: "abcd",
      email: "a@b.com",
      password: "1234567890",
    });
  });
});
