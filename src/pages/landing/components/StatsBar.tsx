const STATS = [
  { value: "23%", label: "Graduation Increase", desc: "Data-driven interventions boost outcomes." },
  { value: "5%", label: "Decreased Gap", desc: "Reducing the achievement gap significantly." },
  { value: "30%", label: "Retention Boost", desc: "Proactive support before disengagement." },
  { value: "11%", label: "Reduced Failure", desc: "Targeted interventions that support success." },
];

const StatsBar = () => {
  return (
    <section className="relative w-full border-y border-white/10 bg-black
             before:absolute before:inset-0
             before:bg-[linear-gradient(to_bottom,rgba(198,255,61,0.08),transparent_60%)]
             before:pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-black px-6 py-14 flex flex-col items-center text-center"
            >
              <div className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-white mb-3
                drop-shadow-[0_0_12px_rgba(198,255,61,0.35)]">
                {stat.value}
              </div>

              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-neon-lime mb-3">
                {stat.label}
              </div>

              <p className="text-xs text-gray-500 leading-snug max-w-[160px] hidden md:block">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
