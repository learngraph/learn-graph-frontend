export default function LandingWhyItBreaks() {
  return (
    <section className="py-40 px-6">
      <h2 className="text-6xl font-serif mb-16">Why it breaks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border border-white/20 p-10">
          <h3 className="text-3xl font-serif mb-4">Learning is Solo</h3>
          <p className="text-white/70">
            Training is individual. Work is collaborative. There is no bridge.
          </p>
        </div>

        <div className="border border-white/20 p-10">
          <h3 className="text-3xl font-serif mb-4">No Clear ROI</h3>
          <p className="text-white/70">
            Completion rates are not outcomes. Transfer is invisible.
          </p>
        </div>
      </div>
    </section>
  );
}
