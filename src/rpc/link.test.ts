import { GraphQLRequest } from "@apollo/client";
import { addAuthHeader, addLanguageHeader } from "./link";

describe("link", () => {
  // @ts-ignore
  const gqlreq: GraphQLRequest = {};
  describe("addAuthHeader", () => {
    it("should add authorization header", () => {
      let obj = addAuthHeader(gqlreq, { headers: { a: "B" } });
      expect(obj).toHaveProperty("headers");
      // @ts-ignore
      const headers = obj.headers;
      expect(headers).toEqual({
        a: "B",
        Authentication: "unauthenticated",
      });
    });
  });
  describe("addLanguageHeader", () => {
    it("should add language header", () => {
      const obj = addLanguageHeader(gqlreq, { headers: { a: "B" } });
      expect(obj).toHaveProperty("headers");
      // @ts-ignore
      const headers = obj.headers;
      expect(headers).toEqual({ a: "B", Language: "en" });
      expect(headers).toHaveProperty("Language");
    });
  });
});
