import "../../styles/footer/footer.css";
import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

export default function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-brand">LearnGraph</span>
          <span className="footer-meta">{t("footer.tagline", { year })}</span>
        </div>

        <div className="footer-right">
          <Link to="/imprint">{t("footer.imprint")}</Link>
          <a href="mailto:contact@learngraph.org">{t("footer.contact")}</a>
        </div>
      </div>
    </footer>
  );
}
