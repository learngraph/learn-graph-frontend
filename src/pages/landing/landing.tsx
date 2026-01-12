import "../styles/landing/landing.css";
import LandingSustainability from "./components/LandingSustainability";
import TilesSection from "./components/TilesSection";
import { Navbar } from "../global/components/Navbar";
import NavWaypoints from "../global/components/NavWaypoints";
import CustomerGroupSpotlightSection from "./components/CustomerGroupSpotlightSection";
import LandingStatsBar from "./components/LandingStatsBar";
import LandingTeamSection from "./components/LandingTeamSection";
import LandingPartnersSection from "./components/LandingPartnersSection";
import HeroSphere from "./components/HeroSphere";







export default function LandingPage() {
  return (
    <main className="landing">
      <Navbar />
      <NavWaypoints />

    {/* breathing sphere */}
    <section className="relative h-[80vh] w-full overflow-hidden">
      <HeroSphere />
    </section>

      <CustomerGroupSpotlightSection />
      <LandingStatsBar />
      <TilesSection />
      <LandingSustainability />
      <LandingPartnersSection />
      <LandingTeamSection />


    </main>
  );
}
