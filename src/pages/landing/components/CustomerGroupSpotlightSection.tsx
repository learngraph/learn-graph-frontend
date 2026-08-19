import CustomerGroupSpotlightTiles from "./CustomerGroupSpotlightTiles";
import { useI18n } from "@/i18n/i18n";

export default function CustomerGroupSpotlightSection() {
  const { t } = useI18n();

  return (
    <section id="begin" className="py-28 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 w-full overflow-x-hidden">


      {/* LEFT: STATEMENT */}
      <div className="flex items-center">
        <div className="max-w-xl lg:max-w-[36rem]">
          <h2 className="text-[clamp(3.2rem,5.5vw,5.6rem)] leading-[1.05] tracking-[-0.02em]">
            <span className="block uppercase font-black text-[rgba(212,284,57,0.9)]">
              {t("landing.TargetGroupsSection.headline.primary")}
            </span>

            <span className="block h-6 md:h-10" />

            <span className="block italic font-medium text-[var(--accent-main)]">
              {t("landing.TargetGroupsSection.headline.secondary")}
            </span>

            <span className="block h-4 md:h-6" />

            <span className="block italic font-medium text-[var(--accent-main)]">
              {t("landing.TargetGroupsSection.headline.third")}
            </span>
          </h2>
        </div>
      </div>

        {/* RIGHT: VERTICAL TILES */}
        <CustomerGroupSpotlightTiles />

      </div>
    </section>
  );
}
