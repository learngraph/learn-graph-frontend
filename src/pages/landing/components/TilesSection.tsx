import { useI18n } from "@/i18n/i18n";

import TileCinematic from "../components/TileCinematic";
import TileContentInstitutions from "../components/TileContent/TileContentInstitutions";
import TileContentForge from "../components/TileContent/TileContentForge";
import TileContentUpskill from "../components/TileContent/TileContentUpskill";
import TileContentMission from "../components/TileContent/TileContentMission";

export default function TilesSection() {
  const { t } = useI18n();

  const tiles = [
    {
      title: t("landing.TileSection.tiles.institutions.title"),
      text: t("landing.TileSection.tiles.institutions.text"),
      content: <TileContentInstitutions />,
    },
    {
      title: t("landing.TileSection.tiles.forge.title"),
      text: t("landing.TileSection.tiles.forge.text"),
      content: <TileContentForge />,
    },
    {
      title: t("landing.TileSection.tiles.upskill.title"),
      text: t("landing.TileSection.tiles.upskill.text"),
      content: <TileContentUpskill />,
    },
    {
      title: t("landing.TileSection.tiles.mission.title"),
      text: t("landing.TileSection.tiles.mission.text"),
      content: <TileContentMission />,
    },
  ];

  return (
    <section id="grow"
      className="
        bg-[var(--color-section-bg)]
        text-[var(--color-text-primary)]
        py-20 md:py-24
      "
    >
      <div className="w-[90%] md:w-[80%] max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-24 max-w-5xl">
          {/* Eyebrow */}
          <div className="text-sm tracking-[0.45em] uppercase text-white mb-6">
             {t("landing.TileSection.header.eyebrow")}
          </div>

          {/* Hero word */}
          <h2
            className="
              text-7xl md:text-8xl font-bold tracking-tight
              text-[rgba(212,255,57,0.9)]
              mb-8
            "
          >
           {t("landing.TileSection.header.title")}
          </h2>

          {/* Subline */}
          <p className="italic text-white text-lg leading-relaxed max-w-2xl">
            {t("landing.TileSection.header.subline")}
          </p>
        </div>

        {/* Tiles */}
        <div
          className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
            gap-8 items-stretch
          "
        >
          {tiles.map((tile, i) => (
            <TileCinematic
              key={i}
              title={tile.title}
              text={tile.text}
              content={tile.content}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
