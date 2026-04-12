import { useI18n } from "@/i18n/i18n";
import { GlassCardStatic } from "../components/ui/GlassCardStatic";

const TEAM = [
  { id: "laurin", name: "Laurin Hagemann" },
  { id: "jamal", name: "Jamal Daho" },
  { id: "efecan", name: "Efecan Köse" },
  { id: "ralf", name: "Ralf Waldvogel" },
  { id: "jamileh", name: "Jamileh Montazer" },
  { id: "arsham", name: "Arsham Delvarani" },
  { id: "talal", name: "Muhammad Talal" },
  { id: "lea", name: "Lea Aimée von Freital" },
  { id: "phil", name: "Phil Wolframm" },
  { id: "joyce", name: "Joyce Chen" },
] as const;

function teamRole(t: (key: string, vars?: Record<string, unknown>) => string, id: (typeof TEAM)[number]["id"]) {
  switch (id) {
    case "laurin":
      return t("landing.LandingTeamSection.roles.laurin");
    case "jamal":
      return t("landing.LandingTeamSection.roles.jamal");
    case "efecan":
      return t("landing.LandingTeamSection.roles.efecan");
    case "ralf":
      return t("landing.LandingTeamSection.roles.ralf");
    case "jamileh":
      return t("landing.LandingTeamSection.roles.jamileh");
    case "arsham":
      return t("landing.LandingTeamSection.roles.arsham");
    case "talal":
      return t("landing.LandingTeamSection.roles.talal");
    case "lea":
      return t("landing.LandingTeamSection.roles.lea");
    case "phil":
      return t("landing.LandingTeamSection.roles.phil");
    case "joyce":
      return t("landing.LandingTeamSection.roles.joyce");
  }
}

function teamQuote(t: (key: string, vars?: Record<string, unknown>) => string, id: (typeof TEAM)[number]["id"]) {
  switch (id) {
    case "laurin":
      return t("landing.LandingTeamSection.quotes.laurin");
    case "jamal":
      return t("landing.LandingTeamSection.quotes.jamal");
    case "efecan":
      return t("landing.LandingTeamSection.quotes.efecan");
    case "ralf":
      return t("landing.LandingTeamSection.quotes.ralf");
    case "jamileh":
      return t("landing.LandingTeamSection.quotes.jamileh");
    case "arsham":
      return t("landing.LandingTeamSection.quotes.arsham");
    case "talal":
      return t("landing.LandingTeamSection.quotes.talal");
    case "lea":
      return t("landing.LandingTeamSection.quotes.lea");
    case "phil":
      return t("landing.LandingTeamSection.quotes.phil");
    case "joyce":
      return t("landing.LandingTeamSection.quotes.joyce");
  }
}

export default function LandingTeamSection() {
  const { t } = useI18n();

  return (
    <section id="people" className="px-6 py-24">
      <div className="max-w-6xl mx-auto w-full overflow-x-hidden">
        {/* Heading */}
        <h2 className="font-serif mb-10 leading-tight overflow-x-hidden">
          <span className="block text-foreground text-3xl tracking-wide break-words">
            {t("landing.LandingTeamSection.title.prefix")}
          </span>
          <span className="block text-accent text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight break-words">
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
                  <span className="text-accent font-mono text-xs">|</span>
                  <span className="text-accent font-mono text-[10px] uppercase tracking-widest">
                    {teamRole(t, m.id)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{m.name}</h3>
              </div>

              {/* Quote */}
              <p className="text-foreground/90 text-sm italic leading-relaxed">
                “{teamQuote(t, m.id)}”
              </p>
            </GlassCardStatic>
          ))}
        </div>
      </div>
    </section>
  );
}
