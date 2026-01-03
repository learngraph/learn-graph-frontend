import { useI18n } from "../../../i18n/useI18nStub";

const STATS = [
  {
    valueKey: "landing.customerGroups.stats.0.value",
    labelKey: "landing.customerGroups.stats.0.label",
    descKey: "landing.customerGroups.stats.0.desc",
  },
  {
    valueKey: "landing.customerGroups.stats.1.value",
    labelKey: "landing.customerGroups.stats.1.label",
    descKey: "landing.customerGroups.stats.1.desc",
  },
  {
    valueKey: "landing.customerGroups.stats.2.value",
    labelKey: "landing.customerGroups.stats.2.label",
    descKey: "landing.customerGroups.stats.2.desc",
  },
  {
    valueKey: "landing.customerGroups.stats.3.value",
    labelKey: "landing.customerGroups.stats.3.label",
    descKey: "landing.customerGroups.stats.3.desc",
  },
];

export default function CustomerGroupStatsBar() {
  const { t } = useI18n();

  return (
    <div className="w-full border-y border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="text-center py-12 px-4 group hover:bg-white/5 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500 ease-out">
                {t(stat.valueKey)}
              </div>
              <div className="text-[10px] font-mono text-neon-lime uppercase tracking-widest mb-2">
                {t(stat.labelKey)}
              </div>
              <p className="text-[10px] text-gray-500 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t(stat.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


