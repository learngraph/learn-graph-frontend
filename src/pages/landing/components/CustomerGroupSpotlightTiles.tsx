import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

export default function CustomerGroupSpotlightTiles() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <button
        type="button"
        onClick={() => navigate("/learn/compare")}
        className="
            tile-base
            p-10
            text-left
            outline-none
            cursor-pointer
          "
      >
        <h3
          className="
            text-lg tracking-[0.35em] uppercase font-semibold
            text-white mb-6
          "
        >
          {t("landing.TargetGroupsSection.tiles.university.title")}
        </h3>
        <p
          className="
            text-lg italic leading-[1.75]
            text-white/85
          "
        >
          {t("landing.TargetGroupsSection.tiles.university.text")}
        </p>
      </button>

      <button
        type="button"
        onClick={() => navigate("/learn/grow")}
        className="
            tile-base
            p-10
            text-left
            outline-none
            cursor-pointer
          "
      >
        <h3
          className="
            text-lg tracking-[0.35em] uppercase font-semibold
            text-white mb-6
          "
        >
          {t("landing.TargetGroupsSection.tiles.enterprise.title")}
        </h3>
        <p
          className="
            text-lg italic leading-[1.75]
            text-white/85
          "
        >
          {t("landing.TargetGroupsSection.tiles.enterprise.text")}
        </p>
      </button>

      <button
        type="button"
        onClick={() => navigate("/learn/people")}
        className="
            tile-base
            p-10
            text-left
            outline-none
            cursor-pointer
          "
      >
        <h3
          className="
            text-lg tracking-[0.35em] uppercase font-semibold
            text-white mb-6
          "
        >
          {t("landing.TargetGroupsSection.tiles.individual.title")}
        </h3>
        <p
          className="
            text-lg italic leading-[1.75]
            text-white/85
          "
        >
          {t("landing.TargetGroupsSection.tiles.individual.text")}
        </p>
      </button>
    </div>
  );
}
