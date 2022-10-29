import { EditLinkMenu } from "./EditLinkMenu";
import { act, render, screen } from "@testing-library/react";

describe("EditLinkMenu", () => {
  it("should not call update function, if nothing changed", () => {
    let onUpdateLink = jest.fn();
    let toggleIsEditable = jest.fn();
    let expectNoCalls = () => {
      expect(onUpdateLink.mock.calls.length).toBe(0);
      expect(toggleIsEditable.mock.calls.length).toBe(0);
    };
    render(
      <EditLinkMenu
        link={{ id: "1", source: "1", target: "2", value: 2.0 }}
        toggleIsEditable={toggleIsEditable}
        onUpdateLink={onUpdateLink}
        nodes={[
          { id: "1", description: "A" },
          { id: "2", description: "B" },
        ]}
      />
    );
    expectNoCalls();
    const button = screen.queryByLabelText("confirm editing link");
    act(() => {
      button?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expectNoCalls();
  });
});
