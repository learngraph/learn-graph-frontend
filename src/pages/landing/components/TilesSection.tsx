import { useI18n } from "@/i18n/i18n";

import TileCinematic from "../components/TileCinematic";
import TileContentInstitutions from "../components/TileContent/TileContentInstitutions";
import TileContentForge from "../components/TileContent/TileContentForge";
import TileContentUpskill from "../components/TileContent/TileContentUpskill";
import TileContentMission from "../components/TileContent/TileContentMission";

export default function TilesSection() {
  const { t } = useI18n();

  /* Order: vocational schools → labour market & public → individuals → open core */
  const tiles = [
    {
      title: t("landing.TileSection.tiles.institutions.title"),
      text: t("landing.TileSection.tiles.institutions.text"),
      content: <TileContentInstitutions />,
    },
    {
      title: t("landing.TileSection.tiles.upskill.title"),
      text: t("landing.TileSection.tiles.upskill.text"),
      content: <TileContentUpskill />,
    },
    {
      title: t("landing.TileSection.tiles.forge.title"),
      text: t("landing.TileSection.tiles.forge.text"),
      content: <TileContentForge />,
    },
    {
      title: t("landing.TileSection.tiles.mission.title"),
      text: t("landing.TileSection.tiles.mission.text"),
      content: <TileContentMission />,
    },
  ];

  return (
    <section
      id="grow"
      className="bg-section text-ink py-20 md:py-24"
    >
      <div className="w-[90%] md:w-[80%] max-w-6xl mx-auto min-w-0">

        {/* Header */}
        <div className="mb-24 max-w-5xl min-w-0">
          {/* Eyebrow */}
          <div className="text-sm tracking-[0.45em] uppercase text-foreground mb-6">
             {t("landing.TileSection.header.eyebrow")}
          </div>

          {/* Hero word */}
          <h2
            className="
              text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight
              text-accent/90
              mb-8 break-words overflow-clip
            "
          >
           {t("landing.TileSection.header.title")}
          </h2>

          {/* Subline */}
          <p className="italic text-foreground text-lg leading-relaxed max-w-2xl">
            {t("landing.TileSection.header.subline")}
          </p>
        </div>

        {/* Tiles */}
        <div
          className="
            grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
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
