import { useI18n } from "@/i18n/i18n";
import CustomerGroupPageShell from "./CustomerGroupPageShell";

export default function EnterprisePage() {
  const { t } = useI18n();

  return (
    <CustomerGroupPageShell currentGroup="enterprise">

      {/* HERO */}
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            <span className="text-lime-400">
              {t("enterprise.hero.highlight")}
            </span>{" "}
            <span className="text-white">
              {t("enterprise.hero.title")}
            </span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            {t("enterprise.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "enterprise.challenges.scaling.title",
              text: "enterprise.challenges.scaling.text",
            },
            {
              title: "enterprise.challenges.completion.title",
              text: "enterprise.challenges.completion.text",
            },
            {
              title: "enterprise.challenges.silo.title",
              text: "enterprise.challenges.silo.text",
            },
            {
              title: "enterprise.challenges.roi.title",
              text: "enterprise.challenges.roi.text",
            },
          ].map((item, i) => (
            <div key={i} className="customer-card p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t(item.title)}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {t(item.text)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS / PRINCIPLES */}
      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: t("enterprise.stats.retention.value"), label: t("enterprise.stats.retention.label") },
            { value: t("enterprise.stats.practice.value"), label: t("enterprise.stats.practice.label") },
            { value: t("enterprise.stats.engagement.value"), label: t("enterprise.stats.engagement.label") },
            { value: t("enterprise.stats.roi.value"), label: t("enterprise.stats.roi.label") },
          ].map((stat, i) => (
            <div
              key={i}
              className="customer-stat flex flex-col items-center justify-center w-40 h-40 mx-auto"
            >
              <div className="text-3xl font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-white/70 px-4">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "enterprise.offerings.paths.title",
              text: "enterprise.offerings.paths.text",
            },
            {
              title: "enterprise.offerings.measure.title",
              text: "enterprise.offerings.measure.text",
            },
            {
              title: "enterprise.offerings.workflow.title",
              text: "enterprise.offerings.workflow.text",
            },
          ].map((item, i) => (
            <div key={i} className="customer-card p-8">
              <h3 className="text-2xl font-semibold mb-4">
                {t(item.title)}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {t(item.text)}
              </p>
            </div>
          ))}
        </div>
      </section>

    </CustomerGroupPageShell>
  );
}
