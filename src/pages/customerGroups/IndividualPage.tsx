import CustomerGroupPageShell from "./CustomerGroupPageShell";

export default function IndividualPage() {
  return (
    <CustomerGroupPageShell>

      {/* HERO */}
      <section id="begin" className="py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-6">
            <span className="text-lime-400">Dein</span>{" "}
            <span className="text-white">persönlicher Lernweg</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Verabschiede dich von Einheitskursen. LearnGraph hilft dir,
            deine eigene Lernreise mit Klarheit, Relevanz und Feedback zu gestalten.
          </p>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="compare" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Zu allgemein",
              text: "Ein Weg für alle funktioniert nicht. Deine Ziele brauchen eine eigene Karte.",
            },
            {
              title: "Motivation verlieren",
              text: "Ohne Relevanz fühlt sich Lernen leer an – selbst für starke Lernende.",
            },
            {
              title: "Informationsflut",
              text: "Zu viele Kurse, zu wenig Orientierung. Was ist wirklich wichtig?",
            },
            {
              title: "Allein lernen",
              text: "Ohne Austausch fehlt Halt, Perspektive und Wachstum.",
            },
          ].map((item, i) => (
            <div key={i} className="customer-card p-6">
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section id="grow" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "80 %", label: "vergessen Inhalte nach einer Woche" },
            { value: "+30 %", label: "bessere Ergebnisse durch Personalisierung" },
            { value: "↑", label: "Motivation durch Peer-Learning" },
            { value: "✓", label: "Projekte > Theorie" },
          ].map((stat, i) => (
            <div
              key={i}
              className="customer-stat flex flex-col items-center justify-center w-40 h-40 mx-auto"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-xs text-white/70 px-4">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFERINGS */}
      <section id="impact" className="customer-section">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Eine Karte nur für dich",
              text: "Sieh, wo du stehst, wohin du willst und wie du dort hinkommst.",
            },
            {
              title: "Du bist nicht allein",
              text: "Mentoring, Peer-Learning und gemeinsame Verantwortung.",
            },
            {
              title: "Lerne, was zählt",
              text: "Praxisnah, relevant und mit echtem Transfer ins Leben.",
            },
          ].map((item, i) => (
            <div key={i} className="customer-card p-8">
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

    </CustomerGroupPageShell>
  );
}
