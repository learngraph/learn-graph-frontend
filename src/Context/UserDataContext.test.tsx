import { translateLocaleToLanguageTag } from "./UserDataContext";

describe("translateLocaleToLanguageTag", () => {
  it.each([
    ["en_US", "en"],
    ["en_AU", "en"],
    ["en_CA", "en"],
    ["en_JM", "en"],
    ["de_DE", "de"],
    ["zh_TW", "zh"],
    ["de", "de"],
    ["en", "en"],
    ["zh", "zh"],
  ])(
    "should translate '%p' to '%p'",
    (locale: string, expectedLanguage: string) => {
      expect(translateLocaleToLanguageTag(locale)).toEqual(expectedLanguage);
    },
  );
});
