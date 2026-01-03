import "../../styles/navbar/navbar.css";
import "../../styles/languageswitcher/languageswitcher.css";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
  return (
    <nav className="nav-cyber">
      <div className="nav-left">
        <span className="nav-logo">LEARNGRAPH</span>
        <span className="nav-status">● LIVE</span>
      </div>

      <ul className="nav-links">
        <li>Systems</li>
        <li>Model</li>
        <li>Impact</li>
        <li>Solutions</li>
        <li>Team</li>
      </ul>

      <div className="nav-right">
        
        <button className="nav-cta">Launch App</button>
        <div className="lang-switcher">
        <LanguageSwitcher />
      </div>
      </div>
    </nav>
  );
}
