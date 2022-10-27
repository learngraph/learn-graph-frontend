import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { EditNodeMenu } from "./EditNodeMenu";

describe("EditNodeMenu", () => {
  it("should call saveChanges when confirm button is clicked", () => {
    let saveChanges = jest.fn();
    let updateText = jest.fn();
    render(
      <EditNodeMenu
        node={{ id: "1", description: "A" }}
        currentText={"A"}
        updateText={updateText}
        saveChanges={saveChanges}
        finishEditing={undefined}
      />
    );
    expect(saveChanges.mock.calls.length).toBe(0);
    const button = screen.queryByLabelText("confirm changing name");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(saveChanges.mock.calls.length).toBe(1);
    expect(updateText.mock.calls.length).toBe(0);
  });
  it("should call updateText when cancel button is clicked", () => {
    let saveChanges = jest.fn();
    let updateText = jest.fn();
    render(
      <EditNodeMenu
        node={{ id: "1", description: "A" }}
        currentText={"A"}
        updateText={updateText}
        saveChanges={saveChanges}
        finishEditing={undefined}
      />
    );
    expect(saveChanges.mock.calls.length).toBe(0);
    const button = screen.queryByLabelText("cancel changing name");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(saveChanges.mock.calls.length).toBe(0);
    expect(updateText.mock.calls.length).toBe(1);
  });
});
