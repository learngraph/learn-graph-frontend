import { TrendingUp, Brain, Users, BarChart3 } from "lucide-react";
import { useI18n } from "@/i18n/i18n";

export default function TileContentUpskill() {
  const { t } = useI18n();

  return (
    <div className="space-y-6 text-[#a9a9a9]">
      <section>
        <h3 className="text-2xl font-semibold text-[#eaeaea]">
          {t("landing.TileContentProject.upskill.title")}
        </h3>

        <div className="h-px w-16 bg-white/20 my-4" />

        <p>{t("landing.TileContentProject.upskill.intro")}</p>

        <ul className="mx-auto my-6 w-[85%] space-y-3">
          <li className="flex gap-2">
            <Brain size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.upskill.points.smarter.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.smarter.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <Users size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.upskill.points.collaborative.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.collaborative.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <TrendingUp size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.upskill.points.transfer.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.transfer.desc")}
            </span>
          </li>

          <li className="flex gap-2">
            <BarChart3 size={18} />
            <span>
              <strong className="text-[#eaeaea]">
                {t("landing.TileContentProject.upskill.points.impact.label")}
              </strong>{" "}
              ⟶ {t("landing.TileContentProject.upskill.points.impact.desc")}
            </span>
          </li>
        </ul>

        <p className="pt-4 italic">
          {t("landing.TileContentProject.upskill.closing")}
        </p>
      </section>
    </div>
  );
}
