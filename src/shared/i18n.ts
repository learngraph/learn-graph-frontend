// Minimal i18n stub for legacy components still expecting an i18next-like instance.
// This keeps the app runnable until real translation resources are restored.

type I18nLike = {
  language?: string;
  t: (key: string, _options?: unknown) => string;
  changeLanguage: (lng: string) => void;
};

const i18n: I18nLike = {
  language: "en",
  t: (key: string) => key,
  changeLanguage: (lng: string) => {
    i18n.language = lng;
  },
};

export default i18n;


