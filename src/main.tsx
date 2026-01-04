import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/theme.css";
import "./index.css";  
import { I18nProvider } from "./i18n/i18n";
import PostHogGate from "./analytics/PostHogGate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <PostHogGate>
        <App />
      </PostHogGate>
    </I18nProvider>
  </React.StrictMode>
);