import { Link } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

export default function CustomerGroupSpotlightTiles() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Link
        to="/university"
        className="tile-base block w-full p-10 text-left no-underline outline-none cursor-pointer"
      >
        <h3 className="text-lg tracking-[0.35em] uppercase font-semibold text-foreground mb-6">
          {t("landing.TargetGroupsSection.tiles.university.title")}
        </h3>
        <p className="text-lg italic leading-[1.75] text-foreground/85">
          {t("landing.TargetGroupsSection.tiles.university.text")}
        </p>
      </Link>

      <Link
        to="/enterprise"
        className="tile-base block w-full p-10 text-left no-underline outline-none cursor-pointer"
      >
        <h3 className="text-lg tracking-[0.35em] uppercase font-semibold text-foreground mb-6">
          {t("landing.TargetGroupsSection.tiles.enterprise.title")}
        </h3>
        <p className="text-lg italic leading-[1.75] text-foreground/85">
          {t("landing.TargetGroupsSection.tiles.enterprise.text")}
        </p>
      </Link>

      <Link
        to="/individual"
        className="tile-base block w-full p-10 text-left no-underline outline-none cursor-pointer"
      >
        <h3 className="text-lg tracking-[0.35em] uppercase font-semibold text-foreground mb-6">
          {t("landing.TargetGroupsSection.tiles.individual.title")}
        </h3>
        <p className="text-lg italic leading-[1.75] text-foreground/85">
          {t("landing.TargetGroupsSection.tiles.individual.text")}
        </p>
      </Link>
    </div>
  );
}
