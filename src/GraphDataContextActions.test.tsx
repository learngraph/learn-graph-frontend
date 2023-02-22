import { getCreateLinkAction } from "./GraphDataContextActions";
//import { pendingActionTypes } from "./GraphDataContext";

describe("getCreateLinkAction", () => {
  it("should successfully create a link", () => {
    let createLink = getCreateLinkAction(
      [],
      (_) => {},
      (_) => {},
      [],
      (_) => Promise.resolve({ data: { createEdge: { ID: "NEWID" } } })
    );
    let p = createLink({ from: "A", to: "B", weight: 2 });
    return p.then((value) => {
      expect(value).toBe("Link successfully created!");
    });
  });
});
