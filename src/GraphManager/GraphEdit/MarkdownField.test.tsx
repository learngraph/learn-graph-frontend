import { URL_MATCHER, MATCHERS } from "./MarkdownField";

describe("URL_MATCHER", () => {
  it("should match", () => {
    expect(URL_MATCHER.exec("https://google.com")?.toString()).toEqual(
      [
        "https://google.com",
        "https://",
        "https://",
        undefined,
        undefined,
        undefined,
      ].toString(),
    );
    expect(URL_MATCHER.exec("http://some.host:3000/")?.toString()).toEqual(
      [
        "http://some.host:3000/",
        "http://",
        "http://",
        undefined,
        undefined,
        ":3000/",
      ].toString(),
    );
  });
});

describe("MATCHERS", () => {
  it("should return an obj with the link", () => {
    expect(MATCHERS[0]("https://google.com")).toEqual({
      index: 0,
      length: 18,
      text: "https://google.com",
      url: "https://google.com",
    });
  });
});
