import { EditLinksMenu } from "./EditLinksMenu";
import { act, render, screen } from "@testing-library/react";
import { LinkDisplay } from "./LinkDisplay";
import { EditLinkMenu } from "./EditLinkMenu";
import { EditNodeMenu } from "./EditNodeMenu";

jest.mock("./LinkDisplay");
jest.mock("./EditLinkMenu");
jest.mock("./EditNodeMenu");

describe("EditLinksMenu", () => {
  it("should contain new link/node buttons", () => {
    let [onUpdateLink, onUpdateNode] = [jest.fn(), jest.fn()];
    render(
      <EditLinksMenu
        forwardLinks={[]}
        backwardLinks={[]}
        onUpdateLink={onUpdateLink}
        nodes={[]}
        onUpdateNode={onUpdateNode}
      />,
    );
    expect(screen.getByText("Add new Link")).toBeInTheDocument();
    expect(screen.getByText("Add new Node")).toBeInTheDocument();
  });
  it("should create LinkDisplay for each link in forwardLinks & backwardLinks", () => {
    let [onUpdateLink, onUpdateNode] = [jest.fn(), jest.fn()];
    let nodes = [
      { id: "1", description: "A" },
      { id: "2", description: "B" },
      { id: "3", description: "C" },
    ];
    let forwardLink = { id: "1", source: "1", target: "2", value: 9.0 };
    let backwardLink = { id: "2", source: "2", target: "3", value: 9.0 };
    render(
      <EditLinksMenu
        forwardLinks={[forwardLink]}
        backwardLinks={[backwardLink]}
        onUpdateLink={onUpdateLink}
        nodes={nodes}
        onUpdateNode={onUpdateNode}
      />,
    );
    // @ts-ignore
    expect(LinkDisplay.mock.calls.length).toBe(2); // 2 links in total
    // @ts-ignore: forwardLinks
    expect(LinkDisplay.mock.calls[0][0].nodes).toEqual(nodes);
    // @ts-ignore
    expect(LinkDisplay.mock.calls[0][0].link).toEqual(forwardLink);
    // @ts-ignore: backwardLinks
    expect(LinkDisplay.mock.calls[1][0].nodes).toEqual(nodes);
    // @ts-ignore
    expect(LinkDisplay.mock.calls[1][0].link).toEqual(backwardLink);
  });
  it("should create EditLinkMenu / EditNodeMenu", () => {
    let [onUpdateLink, onUpdateNode] = [jest.fn(), jest.fn()];
    render(
      <EditLinksMenu
        forwardLinks={[]}
        backwardLinks={[]}
        onUpdateLink={onUpdateLink}
        nodes={[]}
        onUpdateNode={onUpdateNode}
      />,
    );
    const b_new_link = screen.getByText("Add new Link");
    act(() => {
      b_new_link.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // @ts-ignore
    expect(EditLinkMenu.mock.calls.length).toBe(1);
    // @ts-ignore
    expect(EditLinkMenu.mock.calls[0][0].onUpdateLink).toBe(onUpdateLink);

    const b_new_node = screen.getByText("Add new Node");
    act(() => {
      b_new_node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    // @ts-ignore
    expect(EditNodeMenu.mock.calls.length).toBe(1);
    // @ts-ignore
    let saveChanges = EditNodeMenu.mock.calls[0][0].saveChanges;
    expect(saveChanges).not.toBe(undefined);
    saveChanges({ A: "B" });
    expect(onUpdateNode.mock.calls.length).toBe(1);
    expect(onUpdateNode.mock.calls[0][0]).toEqual({ isNewNode: true, A: "B" });
  });
});
