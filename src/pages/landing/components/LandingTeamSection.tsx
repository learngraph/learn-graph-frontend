import { useI18n } from "@/i18n/i18n";
import { GlassCardStatic } from "../components/ui/GlassCardStatic";

const TEAM = [
  { id: "laurin", name: "Laurin Hagemann" },
  { id: "jamal", name: "Jamal Daho" },
  { id: "efecan", name: "Efecan Köse" },
  { id: "ralf", name: "Ralf Waldvogel" },
  { id: "malin", name: "Malin Rebke" },
  { id: "talal", name: "Muhammad Talal" },
];

export default function LandingTeamSection() {
  const { t } = useI18n();

  return (
    <section id="people" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="font-serif mb-10 leading-tight">
          <span className="block text-white text-3xl tracking-wide">
            {t("landing.LandingTeamSection.title.prefix")}
          </span>
          <span className="block text-lime-400 text-6xl md:text-7xl font-bold tracking-tight">
            {t("landing.LandingTeamSection.title.main")}
          </span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((m) => (
            <GlassCardStatic
              key={m.id}
              className="p-8 min-h-[260px] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lime-400 font-mono text-xs">|</span>
                  <span className="text-lime-400 font-mono text-[10px] uppercase tracking-widest">
                    {t(`landing.LandingTeamSection.roles.${m.id}`)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white">{m.name}</h3>
              </div>

              {/* Quote */}
              <p className="text-white/90 text-sm italic leading-relaxed">
                “{t(`landing.LandingTeamSection.quotes.${m.id}`)}”
              </p>
            </GlassCardStatic>
          ))}
        </div>
      </div>
    </section>
  );
}
