import { addAuthHeader, addLanguageHeader } from "./link";

describe("link", () => {
  describe("addAuthHeader", () => {
    it("should add authorization header", () => {
      // @ts-ignore
      let obj = addAuthHeader(undefined, { headers: { a: "B" } });
      expect(obj.headers).toEqual({
        a: "B",
        Authentication: "unauthenticated",
      });
    });
  });
  describe("addLanguageHeader", () => {
    it("should add language header", () => {
      // @ts-ignore
      let obj = addLanguageHeader(undefined, { headers: { a: "B" } });
      expect(obj.headers).toEqual({ a: "B", Language: "en" });
      expect(obj.headers).toHaveProperty("Language");
    });
  });
});
