import { TrendingUp, Brain, Users, BarChart3 } from "lucide-react";
// import { useI18n } from "@/i18n/i18n";
import { useI18n } from "@/i18n/useI18nStub";

export default function TileContentUpskill() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[var(--color-text-muted)]">
      <section>
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          {t("landing.TileContentProject.upskill.title")}
        </h3>
        <p>{t("landing.TileContentProject.upskill.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] text-left space-y-3 font-light tracking-wide">
          <li className="flex items-start gap-2">
            <Brain className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.upskill.points.smarter.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.smarter.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Users className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t(
                  "landing.TileContentProject.upskill.points.collaborative.label",
                )}
              </span>{" "}
              ⟶{" "}
              {t(
                "landing.TileContentProject.upskill.points.collaborative.desc",
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <TrendingUp className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.upskill.points.transfer.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.transfer.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.upskill.points.impact.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.impact.desc")}
            </span>
          </li>
        </ul>

        <p>{t("landing.TileContentProject.upskill.closing")}</p>
      </section>
    </div>
  );
}

