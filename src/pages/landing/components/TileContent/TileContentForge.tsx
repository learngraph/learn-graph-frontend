import { Package, Layers3, Users, Compass } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export default function TileContentForge() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[#a9a9a9]">
      <section>
        <h3 className="text-2xl font-semibold text-[#eaeaea]">
          {t("landing.TileContentProject.forge.title")}
        </h3>

        <div className="h-px w-16 bg-white/20 my-4" />

        <p>{t("landing.TileContentProject.forge.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] space-y-3">
          <li className="flex gap-2">
            <Package size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.forge.points.generic.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.generic.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <Layers3 size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.forge.points.overload.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.overload.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <Users size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.forge.points.alone.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.alone.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <Compass size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.forge.points.relevance.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.forge.points.relevance.desc")}
            </span>
          </li>
        </ul>

        <p className="pt-4 italic">
          {t("landing.TileContentProject.forge.closing")}
        </p>
      </section>
    </div>
  );
}
