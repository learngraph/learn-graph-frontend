import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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

function scrollTargetFromPath(pathname: string): string | null {
  const m = pathname.match(/^\/learn\/(compare|grow|partners|people)$/);
  return m ? m[1] : null;
}







export default function LandingPage() {
  const { pathname } = useLocation();

  useEffect(() => {
    const id = scrollTargetFromPath(pathname);
    if (!id) return;
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <main className="landing">
      <Navbar />
      <NavWaypoints />

    {/* breathing sphere */}
    <section className="relative h-[100svh] min-h-screen w-full overflow-hidden !p-0">
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
