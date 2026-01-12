import { useI18n } from "@/i18n/i18n";

export default function LandingSustainability() {
  const { t } = useI18n();

  return (
    <section className="px-6 py-10 landing-static">
      <div className="max-w-4xl mx-auto w-full overflow-x-hidden">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif mb-10 break-words overflow-x-hidden">
          {t("landing.LandingSustainability.title.prefix")}{" "}
          <span className="text-lime-400">
            {t("landing.LandingSustainability.title.highlight")}
          </span>
        </h2>

        <div className="flex flex-wrap gap-4">
          <div className="px-5 py-2.5 rounded-full bg-lime-400 text-black text-sm font-medium">
            {t("landing.LandingSustainability.items.free")}
          </div>

          <div className="px-5 py-2.5 rounded-full bg-lime-400 text-black text-sm font-medium">
            {t("landing.LandingSustainability.items.noAds")}
          </div>

          <div className="px-5 py-2.5 rounded-full bg-lime-400 text-black text-sm font-medium">
            {t("landing.LandingSustainability.items.openSource")}
          </div>
        </div>
      </div>
    </section>
  );
}
