import "../styles/landing/landing.css";
import LandingSustainability from "./components/LandingSustainability";
import TilesSection from "./components/TilesSection";
import HeroMycelium from "./components/HeroMycelium";
import { Navbar } from "../global/components/Navbar";
import CustomerGroupSpotlightSection from "./components/CustomerGroupSpotlightSection";
import LandingStatsBar from "./components/LandingStatsBar";
import LandingTeamSection from "./components/LandingTeamSection";



export default function LandingPage() {
  return (
    <main className="landing">
      <Navbar />
      <HeroMycelium/>
      <CustomerGroupSpotlightSection />
      <LandingStatsBar />
      <TilesSection />
      <LandingSustainability />
      <LandingTeamSection />

    </main>
  );
}