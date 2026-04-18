import { useI18n } from "@/i18n/i18n";
import CustomerGroupPageShell from "./CustomerGroupPageShell";
import ScheduleCallButton from "./ScheduleCallButton";

export default function SchoolsPage() {
  const { t } = useI18n();

  return (
    <CustomerGroupPageShell currentGroup="schools">
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            <span className="text-accent">{t("schools.hero.highlight")}</span>{" "}
            <span className="text-foreground">{t("schools.hero.title")}</span>
          </h1>
          <p className="text-foreground/80 text-lg leading-relaxed">
            {t("schools.hero.subtitle")}
          </p>
          <div className="mt-8">
            <ScheduleCallButton />
          </div>
        </div>
      </section>

      <section id="demo" className="pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm text-foreground/55 mb-3">{t("schools.demo.germanNote")}</p>
          <div className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 aspect-video shadow-lg shadow-black/30">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/bcNzNqi_vVg"
              title={t("schools.demo.iframeTitle")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </section>

      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {["pathways", "practice", "partners", "evidence"].map((key) => (
            <div key={key} className="customer-card p-6">
              <h3 className="text-xl font-semibold mb-3">
                {t(`schools.challenges.${key}.title`)}
              </h3>
              <p className="text-foreground/70 text-sm leading-relaxed">
                {t(`schools.challenges.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {["learners", "clarity", "integration", "open"].map((key) => (
            <div
              key={key}
              className="customer-stat flex flex-col items-center justify-center w-44 max-w-[11rem] min-h-[10rem] mx-auto py-2"
            >
              <div className="text-3xl font-bold mb-2 text-foreground">
                {t(`schools.stats.${key}.value`)}
              </div>
              <div className="text-xs text-foreground/70 px-2">
                {t(`schools.stats.${key}.label`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-10">
            {t("schools.caseStudies.sectionTitle")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="customer-card p-0 overflow-hidden relative min-h-[200px]">
              <span className="absolute top-4 right-4 z-10 rounded-full border border-accent/50 bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {t("schools.caseStudies.comingSoon")}
              </span>
              <div className="p-8 pt-14">
                <h3 className="text-xl font-semibold text-foreground">
                  {t("schools.caseStudies.itech.title")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CustomerGroupPageShell>
  );
}
