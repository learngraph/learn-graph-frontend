import { useI18n } from "@/i18n/i18n";
import CustomerGroupPageShell from "./CustomerGroupPageShell";
import CustomerGroupTiles from "./CustomerGroupTiles";

export default function UniversityPage() {
  const { t } = useI18n();

  return (
    <CustomerGroupPageShell currentGroup="university">

      {/* HERO */}
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            <span className="text-lime-400">
              {t("university.hero.highlight")}
            </span>{" "}
            <span className="text-white">
              {t("university.hero.title")}
            </span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            {t("university.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* CHALLENGES / VALUE */}
      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "engagement",
            "integration",
            "data",
            "interop",
          ].map((key) => (
            <div key={key} className="customer-card p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t(`university.challenges.${key}.title`)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t(`university.challenges.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "completion",
            "gaps",
            "retention",
            "dropout",
          ].map((key) => (
            <div
              key={key}
              className="customer-stat flex flex-col items-center justify-center w-40 h-40 mx-auto"
            >
              <div className="text-3xl font-bold mb-2">
                {t(`university.stats.${key}.value`)}
              </div>
              <div className="text-xs text-white/70 px-4">
                {t(`university.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "hybrid",
            "peer",
            "open",
          ].map((key) => (
            <div key={key} className="customer-card p-8">
              <h3 className="text-2xl font-semibold mb-4">
                {t(`university.offerings.${key}.title`)}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {t(`university.offerings.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

    </CustomerGroupPageShell>
  );
}
