import "../styles/landing/landing.css";
import LandingMyceliumPreview from "./components/LandingMyceliumPreview";
import LandingSustainability from "./components/LandingSustainability";
import TilesSection from "./components/TilesSection";
import LandingWhyItBreaks from "./components/LandingWhyItBreaks";
import HeroMycelium from "./components/HeroMycelium";
import { Navbar } from "../global/components/Navbar";
import CustomerGroupSpotlightSection from "./components/CustomerGroupSpotlightSection";



export default function LandingPage() {
  return (
    <main className="landing">
      <Navbar />
      <HeroMycelium/>
      <CustomerGroupSpotlightSection />
      <TilesSection />
      <LandingWhyItBreaks />
      <LandingSustainability />
      <LandingMyceliumPreview />
    </main>
  );
}