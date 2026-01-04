import CustomerGroupSpotlightTiles from "./CustomerGroupSpotlightTiles";
import { useI18n } from "@/i18n/i18n";

export default function CustomerGroupSpotlightSection() {
  const { t } = useI18n();

  return (
    <section id="begin" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

      {/* LEFT: STATEMENT */}
      <div className="max-w-xl lg:max-w-2xl">
        <h2 className="text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
          {/* quiet provocation */}
          <span className="block italic font-medium text-[rgba(212,284,57,0.9)]">
            {t("landing.CustomerGroupSpotlightSection.builtFor")}
          </span>

          {/* deliberate gap */}
          <span className="block h-6 md:h-10" />

          {/* loud declaration */}
          <span className="block font-black uppercase text-white">
            {t("landing.CustomerGroupSpotlightSection.ways")}
          </span>

          <span className="block font-black uppercase text-[var(--accent-main)]">
            {t("landing.CustomerGroupSpotlightSection.ofLearning")}
          </span>
        </h2>
{/* 
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/60 max-w-md">
          LearnGraph adapts to institutions, teams, and individuals
        </p>
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-white/60 max-w-md">
        without forcing everyone into the same system</p> */}
      </div>

        {/* RIGHT: VERTICAL TILES */}
        <CustomerGroupSpotlightTiles />

      </div>
    </section>
  );
}
