import { Package, Layers3, Users, Compass } from "lucide-react";
// import { useI18n } from "@/i18n/i18n";
import { useI18n } from "@/i18n/useI18nStub";

export default function TileContentForge() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[var(--color-text-muted)]">
      <section>
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
          {t("landing.TileContentProject.forge.title")}
        </h3>
        <p>{t("landing.TileContentProject.forge.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] text-left space-y-3 font-light tracking-wide">
          <li className="flex items-start gap-2">
            <Package className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.forge.points.generic.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.generic.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Layers3 className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.forge.points.overload.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.overload.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Users className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.forge.points.alone.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.alone.desc")}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <Compass className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t("landing.TileContentProject.forge.points.relevance.label")}
              </span>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.relevance.desc")}
            </span>
          </li>
        </ul>

        <p className="pt-4">{t("landing.TileContentProject.forge.closing")}</p>
      </section>
    </div>
  );
}

