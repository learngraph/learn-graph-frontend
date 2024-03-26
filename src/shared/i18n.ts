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
      "switch-language-button-short": "Lang.",
      // error messages
      "Please login/signup to contribute!":
        "Please login/signup to contribute!",
      "Session expired, please login again!":
        "Session expired, please login again!",
      // graph edit
      "New Node": "New subject",
      "New Link": "New dependency",
      "Link-weight-Irrelevant": "Irrelevant",
      "Link-weight-Useful": "Useful",
      "Link-weight-Necessary": "Necessary",
      "Source Node": "Knowledge starting point",
      "Target Node": "Knowledge end point",
      "Node Description": "Knowledge Description",
      "Edit node with description": `Edit subject "{{description}}"`,
      "To learn about source -> target is required": `To understand "{{source}}" knowledge of "{{target}}" is`,
      "Create new learning dependency": "Create new learning dependency",
      "Create new knowledge node": "Create new subject",
      "Ctrl + Click anywhere": "Ctrl + Click anywhere",
      "Drag nodes close to each other": "Drag subjects close to each other",
      "Node Resources": "Resources (links, books, etc.)",
      inboundDependency:
        "To understand this subject, you need to understand these subjects",
      outboundDependency: "Subjects that need an understanding of this one",
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
      "sign up error: email already exists":
        "Sign up error: Email already exists!",
      "sign up error: username already exists":
        "Sign up error: Username already exists!",
      "sign up error": "Sign up error",
      Login: "Login",
      "logout-button": "Log out",
      Signup: "Signup",
      "Sign In": "Sign In",
      "Remember me": "Remember me",
      "Forgot password?": "Forgot password?",
      "Don't have an account? Sign Up": "Don't have an account? Sign Up",
      "Email Address": "EMail Address",
      Password: "Password",
      "User Name": "User Name",
      Submit: "Submit",
      "To edit the graph please login.": "To edit the graph please login.",
      landing: {
        header: "You can learn",
        headerHighlight: "anything",
        intro:
          "You decide what you want to learn.\nWe show you how to get there.",
        hintClickImage: "Click the image above or",
        buttonGoToGraph: "Jump right in!",
        missionStatementHeader: "Our Mission",
        missionStatementText:
          "We enable people to learn, <strong>independent of their situation in life</strong> and the resources at their disposal.\nKnowledge gives us the power to choose.\nWe give you the power to <strong>choose your own path</strong>.",
        crowdsourcingHeader: "Powered by Crowdsourcing",
        crowdsourcingExplanation:
          "The Learn Graph collects votes about the dependency of knowledge on other knowledge. This creates a network of dependencies, a weighted, directed graph, which anyone can navigate to learn about these dependencies.\nWe choose an open knowledge approach: Everyone gets full non-commercial access, for free. We’re here to support you in your journey.",
        crowdsourcingCallToAction:
          "That means users like you build this knowledge base, and everyone benefits from it. Contribute your knowledge today, by voting on existing connections or creating new entries!",
      },
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
      "switch-language-button-short": "Spr.",
      // error messages
      "Please login/signup to contribute!":
        "Bitte log Dich ein oder erstelle einen Account um beizutragen!",
      "Session expired, please login again!":
        "Session ausgelaufen, bitte log dich erneut ein!",
      // graph edit
      "New Node": "Neues Thema",
      "New Link": "Neue Verknüpfung",
      "Link-weight-Irrelevant": "Irrelevant",
      "Link-weight-Useful": "Nützlich",
      "Link-weight-Necessary": "Notwendig",
      "Source Node": "Wissens-Ausgangspunkt",
      "Target Node": "Wissens-Endspunkt",
      "Node Description": "Wissensbeschreibung",
      "Edit node with description": `Editiere Thema "{{description}}"`,
      "To learn about source -> target is required": `Um "{{source}}" zu verstehen, ist das Wissen von "{{target}}"`,
      "Create new learning dependency":
        "Erstelle eine neue Wissens-Abhängigkeit",
      "Create new knowledge node": "Erstelle ein neues Thema",
      "Ctrl + Click anywhere": "Strg + Klick auf den Hintergrund",
      "Drag nodes close to each other": "Themen aufeinander ziehen",
      "Node Resources": "Wissens-Quellen (Links, Bücher, etc.)",
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
      "sign up error: email already exists":
        "Anmeldefehler: Email schon vergeben!",
      "sign up error: username already exists":
        "Anmeldefehler: User-Name schon vergeben!",
      "sign up error": "Anmeldefehler!",
      Login: "Login",
      "logout-button": "Ausloggen",
      Signup: "Anmeldung",
      "Sign In": "Einloggen",
      "Remember me": "Angemeldet bleiben",
      "Forgot password?": "Passwort vergessen?",
      "Don't have an account? Sign Up": "Noch keinen Account? Hier Anmelden!",
      "Email Address": "EMail Addresse",
      Password: "Passwort",
      "User Name": "Benutzername",
      Submit: "Abschicken",
      "To edit the graph please login.":
        "Um den Graph zu editieren logge dich ein.",
    },
  },
  zh: {
    translation: {
      // general
      "search...": "搜尋…",
      Cancel: "取消",
      Save: "確定",
      Esc: "Esc",
      Delete: "Delete",
      "Ctrl + Return": "Ctrl + Enter",
      "user-name-button": "使用者：{{userName}}",
      "switch-language-button": "語言",
      "switch-language-button-short": "語",
      // error messages
      "Please login/signup to contribute!": "若要編輯，請先登入。",
      "Session expired, please login again!": "授權已過期，請再登入一次。",
      // graph edit
      "New Node": "新增節點",
      "New Link": "新增連結",
      "Link-weight-Irrelevant": "無關",
      "Link-weight-Useful": "適中",
      "Link-weight-Necessary": "高",
      "Source Node": "Knowledge starting point",
      "Target Node": "Knowledge end point",
      "Node Description": "主題名稱",
      "Edit node with description": `Edit subject "{{description}}"`,
      "To learn about source -> target is required": `「{{target}}」的知識在學習「{{source}}」時的重要度`,
      "Create new learning dependency": "連接節點",
      "Create new knowledge node": "新增主題",
      "Ctrl + Click anywhere": "在空白處 Ctrl + 左鍵",
      "Drag nodes close to each other": "將節點拖動到另一個節點上",
      "Node Resources": "Learning resources (links, books, etc.)",
      // user management
      "Enter a valid email": "請輸入正確的 Email 地址",
      "Email is required": "Email 不能爲空",
      "Username should be of minimum N characters length":
        "使用者名稱至少要有{{N}}個字",
      "Username is required": "使用者名稱不能爲空",
      "Password should be of minimum N characters length":
        "密碼至少要有{{N}}個字",
      "Password is required": "密碼不能爲空",
      "Login/Signup": "登入/注冊",
      "sign up error: email already exists": "信箱不能重複！",
      "sign up error: username already exists": "使用者名稱不能重複！",
      "sign up error": "註冊失敗。",
      Login: "登入",
      Signup: "注冊",
      "Sign In": "登入",
      "Remember me": "自動登入",
      "Forgot password?": "忘記密碼",
      "Don't have an account? Sign Up": "還沒有賬號嗎？請注冊",
      "Email Address": "信箱",
      Password: "密碼",
      "User Name": "使用者名稱",
      Submit: "確定",
      "To edit the graph please login.": "To edit the graph please login.",
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
