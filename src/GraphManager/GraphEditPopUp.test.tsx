import { INTERIM_TMP_LINK_ID } from "./GraphEdit";
import { isValidNodeForLink, nodeValidation } from "./GraphEditPopUp";
import { ForceGraphNodeObject } from "./types";
//import { LinkCreatePopUp, GraphEditPopUp } from "./GraphEditPopUp";
//import { render } from "@testing-library/react";
//import {makeMockController} from "./GraphEdit.test";

//// TODO(skep): testing this is hard..
//describe("GraphEditPopUp", () => {
//  it("should display the form from it's state", () => {
//  });
//});
//
//describe("LinkEditPopUp", () => {
//  it("should pass the selected (not only typed) entry to onFormSubmit", () => {
//    const handleClose = jest.fn();
//    const ctrl = makeMockController();
//    // @ts-ignore
//    render(<LinkCreatePopUp handleClose={handleClose} ctrl={ctrl} />);
//  });
//});

describe("isValidNodeForLink", () => {
  it("should be valid for empty input", () => {
    const isValid = isValidNodeForLink({
      // @ts-ignore
      nodes: [{ id: "1" }, { id: "2" }],
      links: [],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "",
      targetNode: "",
      linkWeight: 5,
    };
    // @ts-ignore
    expect(isValid.test("")).toBe(true);
  });
  it("should be valid if nodes exist, but link does not", () => {
    const isValid = isValidNodeForLink({
      // @ts-ignore
      nodes: [{ id: "1" }, { id: "2" }],
      links: [],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "1",
      targetNode: "2",
      linkWeight: 5,
    };
    // @ts-ignore
    expect(isValid.test("1")).toBe(true);
  });
  it("should be invalid if any node does not exist", () => {
    const isValid = isValidNodeForLink({
      // @ts-ignore
      nodes: [{ id: "1" }, { id: "2" }],
      links: [],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "3",
      targetNode: "2",
      linkWeight: 5,
    };
    // @ts-ignore
    isValid.createError = (args) => args;
    // @ts-ignore
    expect(() => isValid.test("3")).toThrow("node 3 does not exist");
  });
  it("should be invalid if a link already exists", () => {
    // @ts-ignore
    const [n1, n2]: ForceGraphNodeObject[] = [{ id: "1" }, { id: "2" }];
    const isValid = isValidNodeForLink({
      nodes: [n1, n2],
      links: [{ id: "3", source: n1, target: n2, value: 5 }],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "1",
      targetNode: "2",
      linkWeight: 5,
    };
    // @ts-ignore
    isValid.createError = (args) => args;
    // @ts-ignore
    expect(() => isValid.test("1")).toThrow("link already exists");
  });
  it("should be invalid if self-link", () => {
    const isValid = isValidNodeForLink({
      // @ts-ignore
      nodes: [{ id: "1" }, { id: "2" }],
      links: [],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "1",
      targetNode: "1",
      linkWeight: 5,
    };
    // @ts-ignore
    isValid.createError = (args) => args;
    // @ts-ignore
    expect(() => isValid.test("1")).toThrow("self-linking is not allowed");
  });
  it("should ignore a temporary existing link", () => {
    // @ts-ignore
    const [n1, n2]: ForceGraphNodeObject[] = [{ id: "1" }, { id: "2" }];
    const isValid = isValidNodeForLink({
      nodes: [n1, n2],
      links: [{ id: INTERIM_TMP_LINK_ID, source: n1, target: n2, value: 5 }],
    });
    // @ts-ignore
    isValid.parent = {
      sourceNode: "1",
      targetNode: "2",
      linkWeight: 5,
    };
    // @ts-ignore
    isValid.createError = (args) => args;
    // @ts-ignore
    expect(isValid.test("1")).toBe(true);
  });
});

describe("nodeValidation", () => {
  it.each([
    ["reject empty strings", "", false],
    ["reject long strings", "A".repeat(41), false],
    ["accept reasonable length name", "i'm ok!".repeat(41), false],
  ])(
    "should %s: '%s' -> %p",
    async (_: string, input: string, expected: boolean) => {
      expect(await nodeValidation.isValid(input)).toBe(expected);
    },
  );
});
