import CustomerGroupSpotlightTiles from "./CustomerGroupSpotlightTiles";
import CustomerGroupStatsBar from "./CustomerGroupStatsBar";

export default function CustomerGroupSpotlightSection() {
  return (
    <section
      className="flex justify-center
                 bg-[var(--color-section-bg)]
                 text-[var(--color-text-primary)]
                 py-20 md:py-24 transition-colors duration-500"
    >
      <div className="w-[90%] md:w-[80%] max-w-6xl mx-auto">
        <CustomerGroupSpotlightTiles />
        <div className="mt-10">
          <CustomerGroupStatsBar />
        </div>
      </div>
    </section>
  );
}


