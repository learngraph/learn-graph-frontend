import { Leaf, BookOpen, Globe } from "lucide-react";
// import { useI18n } from "@/i18n/i18n";
import { useI18n } from "@/i18n/useI18nStub";

export default function TileContentMission() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[var(--color-text-muted)]">
      <section>
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          {t("landing.TileContentProject.mission.title")}
        </h3>
        <p>{t("landing.TileContentProject.mission.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] text-left space-y-3 font-light tracking-wide">
          <li className="flex items-start gap-2">
            <Leaf className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t(
                  "landing.TileContentProject.mission.points.sustainability.label",
                )}
              </span>{" "}
              ⟶{" "}
              {t(
                "landing.TileContentProject.mission.points.sustainability.desc",
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <BookOpen className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.mission.points.access.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.mission.points.access.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Globe className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.mission.points.alignment.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.mission.points.alignment.desc")}
            </span>
          </li>
        </ul>

        <p>{t("landing.TileContentProject.mission.closing")}</p>
      </section>
    </div>
  );
}

