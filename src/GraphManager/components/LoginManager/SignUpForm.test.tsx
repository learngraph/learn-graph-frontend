import { SignUpForm } from "./SignUpForm";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("SignUpForm", () => {
  it("should submit form content", () => {
    const onSubmit = jest.fn();
    render(<SignUpForm onSubmit={onSubmit} />);
    expect(onSubmit.mock.calls.length).toBe(0);
    const button = screen.queryByText("Submit");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(onSubmit.mock.calls.length).toBe(1);
  });
});
