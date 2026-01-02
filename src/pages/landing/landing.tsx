import "../styles/landing/landing.css";
import LandingMyceliumPreview from "./components/LandingMyceliumPreview";
import LandingSustainability from "./components/LandingSustainability";
import TilesSection from "./components/TilesSection";
import LandingWhyItBreaks from "./components/LandingWhyItBreaks";
import StatsBar from "./components/StatsBar";
import HeroMycelium from "./components/HeroMycelium";
import { Navbar } from "../global/components/Navbar";



export default function LandingPage() {
  return (
    <main className="landing">
      <Navbar />
      <HeroMycelium/>
      <TilesSection />
      <StatsBar />
      <LandingWhyItBreaks />
      <LandingSustainability />
      <LandingMyceliumPreview />
    </main>
  );
}