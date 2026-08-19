import { useI18n } from "@/i18n/i18n";
import CustomerGroupPageShell from "./CustomerGroupPageShell";

export default function IndividualPage() {
  const { t } = useI18n();

  return (
    <CustomerGroupPageShell currentGroup="individual">

      {/* HERO */}
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            <span className="text-lime-400">
              {t("individual.hero.highlight")}
            </span>{" "}
            <span className="text-white">
              {t("individual.hero.title")}
            </span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            {t("individual.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            "generic",
            "motivation",
            "overload",
            "alone",
          ].map((key) => (
            <div key={key} className="customer-card p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t(`individual.challenges.${key}.title`)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t(`individual.challenges.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            "forget",
            "personalized",
            "peer",
            "practice",
          ].map((key) => (
            <div
              key={key}
              className="customer-stat flex flex-col items-center justify-center w-40 h-40 mx-auto"
            >
              <div className="text-3xl font-bold mb-2">
                {t(`individual.stats.${key}.value`)}
              </div>
              <div className="text-xs text-white/70 px-4">
                {t(`individual.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "map",
            "support",
            "relevance",
          ].map((key) => (
            <div key={key} className="customer-card p-8">
              <h3 className="text-2xl font-semibold mb-4">
                {t(`individual.offerings.${key}.title`)}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {t(`individual.offerings.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

    </CustomerGroupPageShell>
  );
}
