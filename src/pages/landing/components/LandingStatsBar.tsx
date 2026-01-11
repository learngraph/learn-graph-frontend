import { useI18n } from "@/i18n/i18n";

const STATS = [
  {
    valueKey: "landing.CustomerGroupStatsBar.stats.institutions.value",
    labelKey: "landing.CustomerGroupStatsBar.stats.institutions.label",
    descKey: "landing.CustomerGroupStatsBar.stats.institutions.desc",
  },
  {
    valueKey: "landing.CustomerGroupStatsBar.stats.learners.value",
    labelKey: "landing.CustomerGroupStatsBar.stats.learners.label",
    descKey: "landing.CustomerGroupStatsBar.stats.learners.desc",
  },
  {
    valueKey: "landing.CustomerGroupStatsBar.stats.countries.value",
    labelKey: "landing.CustomerGroupStatsBar.stats.countries.label",
    descKey: "landing.CustomerGroupStatsBar.stats.countries.desc",
  },
  {
    valueKey: "landing.CustomerGroupStatsBar.stats.paths.value",
    labelKey: "landing.CustomerGroupStatsBar.stats.paths.label",
    descKey: "landing.CustomerGroupStatsBar.stats.paths.desc",
  },
];

export default function LandingStatsBar() {
  const { t } = useI18n();

  return (
  <section id="compare" className="...">
    <div className="w-full
                    border-y border-white/55
                    bg-black/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/55">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center py-12 px-4 group hover:bg-white/5 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {t(stat.valueKey)}
              </div>
              <div className="text-xl font-mono uppercase tracking-widest mb-2 text-[rgba(212,255,57,0.9)]">
                {t(stat.labelKey)}
              </div>
              <p className="text-sm text-white/90 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t(stat.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
  );
}


