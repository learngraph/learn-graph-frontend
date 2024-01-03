import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// TODO(skep): move them in a JSON file and import them, or even better, manage
// them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      // general
      "search...": "Search…",
      Cancel: "Cancel",
      Save: "Save",
      Esc: "Esc",
      Delete: "Delete",
      "Ctrl + Return": "Ctrl + Return",
      "user-name-button": "User: {{userName}}",
      "switch-language-button": "Language",
      // error messages
      "Please login/signup to contribute!":
        "Please login/signup to contribute!",
      "Session expired, please login again!":
        "Session expired, please login again!",
      // graph edit
      "New Node": "New Node",
      "New Link": "New Link",
      "Link-weight-Irrelevant": "Irrelevant",
      "Link-weight-Useful": "Useful",
      "Link-weight-Necessary": "Necessary",
      "Source Node": "Knowledge Source",
      "Target Node": "Knowledge Target",
      "Node Description": "Knowledge Description",
      "Edit node with description": `Edit knowledge node "{{description}}"`,
      "To learn about source -> target is required": `To understand "{{source}}" knowledge of "{{target}}" is`,
      "Create new learning dependency": "Create new learning dependency",
      "Create new knowledge node": "Create new knowledge node",
      // user management
      "Enter a valid email": "Enter a valid email",
      "Email is required": "Email is required",
      "Username should be of minimum N characters length":
        "Username should be of minimum {{N}} characters length",
      "Username is required": "Username is required",
      "Password should be of minimum N characters length":
        "Password should be of minimum {{N}} characters length",
      "Password is required": "Password is required",
      "Login/Signup": "Login/Signup",
      Login: "Login",
      Signup: "Signup",
      "Sign In": "Sign In",
      "Remember me": "Remember me",
      "Forgot password?": "Forgot password?",
      "Don't have an account? Sign Up": "Don't have an account? Sign Up",
      "Email Address": "EMail Address",
      Password: "Password",
      "User Name": "User Name",
      Submit: "Submit",
    },
  },
  de: {
    translation: {
      // general
      "search...": "Suche…",
      Cancel: "Abbrechen",
      Save: "Speichern",
      Esc: "Esc",
      Delete: "Löschen",
      "Ctrl + Return": "Strg + Enter",
      "user-name-button": "Benutzer: {{userName}}",
      "switch-language-button": "Sprache",
      // error messages
      "Please login/signup to contribute!":
        "Bitte log Dich ein oder erstelle einen Account um beizutragen!",
      "Session expired, please login again!":
        "Session ausgelaufen, bitte log dich erneut ein!",
      // graph edit
      "New Node": "Neuer Knoten",
      "New Link": "Neue Verknüpfung",
      "Link-weight-Irrelevant": "Irrelevant",
      "Link-weight-Useful": "Nützlich",
      "Link-weight-Necessary": "Notwendig",
      "Source Node": "Wissens-Ausgangspunkt",
      "Target Node": "Wissens-Endspunkt",
      "Node Description": "Wissensbeschreibung",
      "Edit node with description": `Editiere Knoten "{{description}}"`,
      "To learn about source -> target is required": `Um "{{source}}" zu verstehen, ist das Wissen von "{{target}}"`,
      "Create new learning dependency":
        "Erstelle eine neue Wissens-Abhängigkeit",
      "Create new knowledge node": "Erstelle einen neuen Wissens-Knoten",
      // user management
      "Enter a valid email": "EMail-Addresse ungültig",
      "Email is required": "EMail-Addresse ist Notwendig",
      "Username should be of minimum N characters length":
        "Benutzername sollte mindestens {{N}} Zeichen lang sein",
      "Username is required": "Benutzername ist Notwendig",
      "Password should be of minimum N characters length":
        "Passwort solltes mindestesns {{N}} Zeichen lang sein",
      "Password is required": "Passwort ist Notwendig",
      "Login/Signup": "Login/Anmeldung",
      Login: "Login",
      Signup: "Anmeldung",
      "Sign In": "Einloggen",
      "Remember me": "Angemeldet bleiben",
      "Forgot password?": "Passwort vergessen?",
      "Don't have an account? Sign Up": "Noch keinen Account? Hier Anmelden!",
      "Email Address": "EMail Addresse",
      Password: "Passwort",
      "User Name": "Benutzername",
      Submit: "Abschicken",
    },
  },
  zh: {
    translation: {
      "search...": "找…",
      Cancel: "取消",
      Save: "確定",
    },
  },
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
