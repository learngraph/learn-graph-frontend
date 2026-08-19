import { useI18n } from "@/i18n/i18n";

export function LaunchButton() {
  const { t } = useI18n();

  return (
        <a
          className="nav-cta"
          href="https://app.learngraph.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("hero.cta")}
        </a>
  );
}