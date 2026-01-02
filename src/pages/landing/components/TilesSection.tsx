// import { useI18n } from "@/i18n/i18n";
import { useI18n } from "../../../i18n/useI18nStub";

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
    <section
      className="flex justify-center 
                 bg-[var(--color-section-bg)] 
                 text-[var(--color-text-primary)]
                 py-32 md:py-40 transition-colors duration-500"
    >
      <div
        className="w-[90%] md:w-[80%] max-w-6xl 
                   grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                   gap-8 items-stretch justify-items-center md:justify-items-stretch mx-auto"
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
    </section>
  );
}

