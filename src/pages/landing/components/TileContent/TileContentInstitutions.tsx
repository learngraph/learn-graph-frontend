import { Eye, RefreshCw, HeartHandshake } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export default function TileContentInstitutions() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[#a9a9a9]">
      <section>
        <h3 className="text-2xl font-semibold text-[#eaeaea]">
          {t("landing.TileContentProject.institutions.title")}
        </h3>

        <div className="h-px w-16 bg-white/20 my-4" />

        <p>{t("landing.TileContentProject.institutions.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] space-y-3">
          <li className="flex gap-2">
            <Eye size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.institutions.points.awareness.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.institutions.points.awareness.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <RefreshCw size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.institutions.points.adaptation.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.institutions.points.adaptation.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <HeartHandshake size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.institutions.points.empathy.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.institutions.points.empathy.desc")}
            </span>
          </li>
        </ul>

        <p className="pt-4 italic">
          {t("landing.TileContentProject.institutions.closing")}
        </p>
      </section>
    </div>
  );
}
