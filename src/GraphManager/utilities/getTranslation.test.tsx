import { getTranslation } from "./getTranslation";
import { Text } from "../hooks/types";

describe("translation out of Text extractor", () => {
  it("should get an empty string if the translation is not defined", () => {
    const input: Text = {
      translations: [],
    };
    const expected = "";
    const output = getTranslation({ translatedField: input, language: "" });
    expect(output).toBe(expected);
  });
  it("should get the translation if it is defined", () => {
    const input: Text = {
      translations: [
        {
          language: "en",
          content: "hellowhatsup",
        },
      ],
    };
    const expected = input.translations[0].content;
    const output = getTranslation({ translatedField: input, language: "en" });
    expect(output).toBe(expected);
  });
});
