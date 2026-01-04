import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";

type SpotlightTile = {
  path: string;
  titleKey: string;
  textKey: string;
};

export default function CustomerGroupSpotlightTiles() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const tiles: SpotlightTile[] = [
    {
      path: "/university",
      titleKey: "landing.TargetGroupsSection.tiles.university.title",
      textKey: "landing.TargetGroupsSection.tiles.university.text",
    },
    {
      path: "/enterprise",
      titleKey: "landing.TargetGroupsSection.tiles.enterprise.title",
      textKey: "landing.TargetGroupsSection.tiles.enterprise.text",
    },
    {
      path: "/individual",
      titleKey: "landing.TargetGroupsSection.tiles.individual.title",
      textKey: "landing.TargetGroupsSection.tiles.individual.text",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      {tiles.map((tile) => (
        <motion.button
          key={tile.path}
          type="button"
          onClick={() => navigate(tile.path)}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="
            tile-base
            p-10
            text-left
            outline-none
            bg-transparent
            border-none
            cursor-pointer
          "
        >
          <h3
            className="
              text-lg tracking-[0.35em] uppercase font-semibold
              text-white mb-6
            "
          >
            {t(tile.titleKey)}
          </h3>

          <p
            className="
              text-lg italic leading-[1.75]
              text-white/85
            "
          >
            {t(tile.textKey)}
          </p>
        </motion.button>
      ))}
    </div>
  );
}
