import "../../styles/navbar/Navbar.css";
import "../../styles/languageswitcher/languageswitcher.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

export function Navbar() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <nav className="nav-cyber">
      {/* Left */}
      <button
        className="nav-left"
        onClick={() => navigate("/")}
      >
        <span className="nav-logo">LEARNGRAPH</span>
        <span className="nav-status">● LIVE</span>
      </button>

      {/* Center – Landing anchors */}
      <div className="nav-spacer" />
      {/* <ul className="nav-links">
        <li>
          <a href="#begin"></a>
        </li>
        <li>
          <a href="#compare">{t("nav.compare")}</a>
        </li>
        <li>
          <a href="#grow">{t("nav.grow")}</a>
        </li>
        <li>
          <a href="#people">{t("nav.people")}</a>
        </li>
      </ul> */}

      {/* Right */}
      <div className="nav-right">
        <div className="lang-switcher">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
