import { Leaf, BookOpen, Globe } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export default function TileContentMission() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[#a9a9a9]">
      <section>
        <h3 className="text-2xl font-semibold text-[#eaeaea]">
          {t("landing.TileContentProject.mission.title")}
        </h3>

        <div className="h-px w-16 bg-white/20 my-4" />

        <p>{t("landing.TileContentProject.mission.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] space-y-3">
          <li className="flex gap-2">
            <Leaf size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.mission.points.sustainability.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.mission.points.sustainability.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <BookOpen size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.mission.points.access.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.mission.points.access.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <Globe size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.mission.points.alignment.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.mission.points.alignment.desc")}
            </span>
          </li>
        </ul>

        <p className="pt-4 italic">
          {t("landing.TileContentProject.mission.closing")}
        </p>
      </section>
    </div>
  );
}
