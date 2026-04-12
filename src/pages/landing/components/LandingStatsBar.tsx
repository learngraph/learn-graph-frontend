import { useI18n } from "@/i18n/i18n";

export default function LandingStatsBar() {
  const { t } = useI18n();

  return (
    <section id="compare">
      <div
        className="w-full
                    border-y border-white/55
                    bg-black/30"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="text-center py-12 px-4 group hover:bg-white/5 transition-colors">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {t("landing.CustomerGroupStatsBar.stats.institutions.value")}
              </div>
              <div className="text-xl font-mono uppercase tracking-widest mb-2 text-[rgba(212,255,57,0.9)]">
                {t("landing.CustomerGroupStatsBar.stats.institutions.label")}
              </div>
              <p className="text-sm text-white/90 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t("landing.CustomerGroupStatsBar.stats.institutions.desc")}
              </p>
            </div>

            <div className="text-center py-12 px-4 group hover:bg-white/5 transition-colors border-l border-white/55 md:border-l md:border-white/55">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {t("landing.CustomerGroupStatsBar.stats.learners.value")}
              </div>
              <div className="text-xl font-mono uppercase tracking-widest mb-2 text-[rgba(212,255,57,0.9)]">
                {t("landing.CustomerGroupStatsBar.stats.learners.label")}
              </div>
              <p className="text-sm text-white/90 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t("landing.CustomerGroupStatsBar.stats.learners.desc")}
              </p>
            </div>

            <div className="text-center py-12 px-4 group hover:bg-white/5 transition-colors border-t border-white/55 md:border-l md:border-white/55 md:border-t-0">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {t("landing.CustomerGroupStatsBar.stats.countries.value")}
              </div>
              <div className="text-xl font-mono uppercase tracking-widest mb-2 text-[rgba(212,255,57,0.9)]">
                {t("landing.CustomerGroupStatsBar.stats.countries.label")}
              </div>
              <p className="text-sm text-white/90 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t("landing.CustomerGroupStatsBar.stats.countries.desc")}
              </p>
            </div>

            <div className="text-center py-12 px-4 group hover:bg-white/5 transition-colors border-l border-white/55 border-t border-white/55 md:border-l md:border-white/55 md:border-t-0">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
                {t("landing.CustomerGroupStatsBar.stats.paths.value")}
              </div>
              <div className="text-xl font-mono uppercase tracking-widest mb-2 text-[rgba(212,255,57,0.9)]">
                {t("landing.CustomerGroupStatsBar.stats.paths.label")}
              </div>
              <p className="text-sm text-white/90 leading-tight max-w-[120px] mx-auto hidden md:block">
                {t("landing.CustomerGroupStatsBar.stats.paths.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
