import CustomerGroupPageShell from "./CustomerGroupPageShell";

export default function UniversityPage() {
  return (
    <CustomerGroupPageShell>

      {/* =========================
          HERO
      ========================= */}
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-serif mb-6">
          <span className="text-lime-400">Stärken</span>{" "}
          <span className="text-white">Sie Ihre Institution</span>
        </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Transformieren Sie Ihr Bildungsökosystem mit personalisierten Analysen,
            hybriden Lernlösungen und nahtloser Interoperabilität.
          </p>
        </div>
      </section>

      {/* =========================
          CHALLENGES / VALUE
      ========================= */}
      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Verbesserte Bindung",
              text: "Fördern Sie langfristiges Engagement durch transparente Lernpfade und adaptive Unterstützung.",
            },
            {
              title: "Integrierte Pfade",
              text: "Verbinden Sie formale Curricula, informelles Lernen und Forschung in einem kohärenten System.",
            },
            {
              title: "Daten in Aktionen",
              text: "Verwandeln Sie Lerndaten in konkrete, nachvollziehbare Entscheidungen.",
            },
            {
              title: "Nahtlose Interoperabilität",
              text: "Integrieren Sie bestehende Systeme ohne Vendor Lock-in oder Medienbrüche.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="customer-card p-6"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================
          OUTCOMES / STATS
      ========================= */}
      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "23 %", label: "Steigerung des Studienabschlusses" },
            { value: "5 %", label: "Verringerte Leistungsunterschiede" },
            { value: "30 %", label: "Verbesserte Bindung" },
            { value: "11 %", label: "Reduzierte Ausfallraten" },
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

      {/* =========================
          OFFERINGS
      ========================= */}
      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Hybride Lerncontainer",
              text: "Flexible Lernräume, die Präsenz, Online- und selbstgesteuertes Lernen verbinden.",
            },
            {
              title: "Peer-Coaching & Mentoring",
              text: "Skalierbare Unterstützung durch Peer-Netzwerke und begleitete Lernprozesse.",
            },
            {
              title: "Interoperabilität & Open Source",
              text: "Offene Infrastruktur für langfristige Unabhängigkeit und nachhaltige Innovation.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="customer-card p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>
              <p className="text-white/70 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

    </CustomerGroupPageShell>
  );
}
