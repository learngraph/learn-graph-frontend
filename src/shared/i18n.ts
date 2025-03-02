import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./i18n.json";
import de from "./i18n/German.json";
import es from "./i18n/Spanish.json";
import it from "./i18n/Italian.json";
import zh from "./i18n/Chinese Traditional.json";

// TODO(skep): move them in a JSON file and import them, or even better, manage
// them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: { translation: en },
  de: { translation: de },
  zh: { translation: zh },
  es: { translation: es },
  it: { translation: it },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    //lng: "de", // disables automatic language discovery
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from XSS (oh really?)
    },
  });

export default i18n;
