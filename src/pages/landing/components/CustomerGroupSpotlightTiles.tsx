import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useI18n } from "../../../i18n/useI18nStub";

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
      titleKey: "landing.customerGroups.university.title",
      textKey: "landing.customerGroups.university.text",
    },
    {
      path: "/enterprise",
      titleKey: "landing.customerGroups.enterprise.title",
      textKey: "landing.customerGroups.enterprise.text",
    },
    {
      path: "/individual",
      titleKey: "landing.customerGroups.individual.title",
      textKey: "landing.customerGroups.individual.text",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-items-center md:justify-items-stretch">
      {tiles.map((tile) => (
        <motion.div
          key={tile.path}
          role="link"
          tabIndex={0}
          onClick={() => navigate(tile.path)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") navigate(tile.path);
          }}
          whileHover={{
            y: -4,
            boxShadow: "0 0 16px 2px rgba(61,194,242,0.25)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="tile-base flex flex-col justify-between p-8
                     hover:bg-[var(--color-tile-hover)]
                     transition-colors duration-200 ease-out
                     min-h-[240px] lg:min-h-[260px]
                     w-full max-w-[360px]
                     overflow-hidden text-left cursor-pointer mx-auto outline-none"
        >
          <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-3 leading-tight">
            {t(tile.titleKey)}
          </h3>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
            {t(tile.textKey)}
          </p>
        </motion.div>
      ))}
    </div>
  );
}


