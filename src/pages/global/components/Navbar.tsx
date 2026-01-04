import "../../styles/navbar/Navbar.css";
import "../../styles/languageswitcher/languageswitcher.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "@/i18n/i18n";

export function Navbar() {
  const { t } = useI18n();

  return (
    <nav className="nav-cyber">
      {/* Left */}
      <div className="nav-left">
        <span className="nav-logo">LEARNGRAPH</span>
        <span className="nav-status">● LIVE</span>
      </div>

      {/* Center – Landing anchors */}
      <ul className="nav-links">
        <li>
          <a href="#begin">{t("nav.begin")}</a>
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
      </ul>

      {/* Right */}
      <div className="nav-right">
        <div className="lang-switcher">
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
