import "../styles/landing/landing.css";

import { Navbar } from "../global/components/Navbar";
import CustomerGroupSpotlightTiles from "../landing/components/CustomerGroupSpotlightTiles";
import CustomerGroupStatsBar from "../landing/components/CustomerGroupStatsBar";

type CustomerGroupPageShellProps = {
  children: React.ReactNode;
};

export default function CustomerGroupPageShell({
  children,
}: CustomerGroupPageShellProps) {
  return (
    <main className="min-h-screen bg-[var(--color-section-bg)] text-[var(--color-text-primary)]">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="w-[90%] md:w-[80%] max-w-6xl mx-auto">
          <CustomerGroupSpotlightTiles />
          <div className="mt-10">
            <CustomerGroupStatsBar />
          </div>
        </div>
      </div>

      <div className="pb-24">{children}</div>
    </main>
  );
}


