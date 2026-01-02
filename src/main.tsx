import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";   // ← THIS WAS MISSING / COMMENTED

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);