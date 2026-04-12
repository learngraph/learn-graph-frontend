import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import DirectionController from "@/i18n/DirectionController";
import EmptyLanding from "./pages/EmptyLanding";
import LandingPage from "./pages/landing/landing";
import CookieBanner from "@/pages/global/components/CookieBanner";
import Footer from "@/pages/global/components/Footer";
import ImprintPage from "@/pages/legal/Imprint";

const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (/^\/learn\/(compare|grow|partners|people)$/.test(pathname)) {
      return;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};


export default function App() {
  return (
    <BrowserRouter>
      <DirectionController />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<EmptyLanding />} />
            <Route path="/learn" element={<LandingPage />} />
            <Route path="/learn/compare" element={<LandingPage />} />
            <Route path="/learn/grow" element={<LandingPage />} />
            <Route path="/learn/partners" element={<LandingPage />} />
            <Route path="/learn/people" element={<LandingPage />} />
            <Route path="/home" element={<Navigate to="/learn" replace />} />
            <Route path="/imprint" element={<ImprintPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <CookieBanner />
    </BrowserRouter>
  );
}
