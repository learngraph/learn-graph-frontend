import { addAuthHeader, addLanguageHeader } from "./link";

describe("link", () => {
  describe("addAuthHeader", () => {
    it("should add authorization header (unauthorized for empty input)", () => {
      const obj = addAuthHeader({ headers: { a: "B" }, token: "" });
      expect(obj).toHaveProperty("headers");
      const headers = obj.headers;
      expect(headers).toEqual({
        a: "B",
        Authentication: "unauthenticated",
      });
    });
    it("should add authorization header with token)", () => {
      const obj = addAuthHeader({ headers: { a: "B" }, token: "123" });
      expect(obj).toHaveProperty("headers");
      const headers = obj.headers;
      expect(headers).toEqual({
        a: "B",
        Authentication: "Bearer 123",
      });
    });
  });
  describe("addLanguageHeader", () => {
    it("should add language header", () => {
      const obj = addLanguageHeader({ headers: { a: "B" }, language: "en" });
      expect(obj).toHaveProperty("headers");
      const headers = obj.headers;
      expect(headers).toEqual({ a: "B", Language: "en" });
      expect(headers).toHaveProperty("Language");
    });
  });
});
