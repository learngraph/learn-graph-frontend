import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n.json";
import de from "./i18n/German.json";
import es from "./i18n/Spanish.json";
import it from "./i18n/Italian.json";
import zh from "./i18n/Chinese Traditional.json";
import ar from "./i18n/Arabic.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
  zh: { translation: zh },
  es: { translation: es },
  it: { translation: it },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
