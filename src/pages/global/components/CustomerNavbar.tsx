import "../../styles/navbar/Navbar.css";
import "../../styles/languageswitcher/languageswitcher.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

export function CustomerNavbar() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <nav className="nav-cyber">
      {/* Left */}
      <div className="nav-left">
        <span
          className="nav-logo cursor-pointer"
          onClick={() => navigate("/")}
        >
          LEARNGRAPH
        </span>
        <span className="nav-status">● LIVE</span>
      </div>

      {/* Center – customer navigation */}
      <ul className="nav-links">
        <li onClick={() => navigate("/university")}>
          {t("nav.university")}
        </li>
        <li onClick={() => navigate("/enterprise")}>
          {t("nav.enterprise")}
        </li>
        <li onClick={() => navigate("/individual")}>
          {t("nav.individual")}
        </li>
      </ul>

      {/* Right */}
      <div className="nav-right">
        <button className="nav-cta">
          {t("nav.launch")}
        </button>

        <div className="lang-switcher">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
