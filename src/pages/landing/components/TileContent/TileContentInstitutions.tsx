import { Eye, RefreshCw, HeartHandshake } from "lucide-react";
// import { useI18n } from "@/i18n/i18n";
import { useI18n } from "@/i18n/useI18nStub";

export default function TileContentInstitutions() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[var(--color-text-muted)]">
      <section className="mt-10 border-t border-white/10 pt-8 text-center">
        <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          {t("landing.TileContentProject.institutions.title")}
        </h3>
        <p className="max-w-2xl mx-auto leading-relaxed">
          {t("landing.TileContentProject.institutions.intro")}
        </p>

        <ul className="mx-auto my-6 w-[85%] text-left space-y-3 font-light tracking-wide">
          <li className="flex items-start gap-2">
            <Eye className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t(
                  "landing.TileContentProject.institutions.points.awareness.label",
                )}
              </span>{" "}
              ⟶{" "}
              {t(
                "landing.TileContentProject.institutions.points.awareness.desc",
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <RefreshCw className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t(
                  "landing.TileContentProject.institutions.points.adaptation.label",
                )}
              </span>{" "}
              ⟶{" "}
              {t(
                "landing.TileContentProject.institutions.points.adaptation.desc",
              )}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <HeartHandshake className="w-5 h-5 text-[var(--color-accent)] mt-1" />
            <span>
              <span className="font-medium text-[var(--color-text-primary)]">
                {t(
                  "landing.TileContentProject.institutions.points.empathy.label",
                )}
              </span>{" "}
              ⟶{" "}
              {t("landing.TileContentProject.institutions.points.empathy.desc")}
            </span>
          </li>
        </ul>

        <p className="max-w-2xl mx-auto pt-5 italic text-[var(--color-text-soft)] leading-relaxed">
          {t("landing.TileContentProject.institutions.closing")}
        </p>
      </section>
    </div>
  );
}

