import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, ReactNode, useEffect } from "react";
import Logo from "../src/logo";
import LocaleManager from "./Header/LocaleManager";
import Footer from "./LandingPage/Footer";

interface NavigationWithContentConfig {
  content?: ReactNode;
}

export const NavigationWithContent = ({
  content,
}: NavigationWithContentConfig) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<"solutions" | null>(null);

  // Define the solution links
  const SOLUTION_LINKS = [
    { label: t("Navigation.Universities"), path: "/university" },
    { label: t("Navigation.Industry"), path: "/industry" },
    { label: t("Navigation.Individual"), path: "/individual" },
    //{ label: t("Navigation.Ecosystem"), path: "/ecosystem" },
    //{ label: t("Navigation.nations"), path: "/nations" },
    //{ label: "K-12", path: "/k-12" },
  ];

  // Shared CSS classes
  const linkClassesDesktop =
    "px-4 py-1 rounded-2xl bg-white/20 hover:bg-white/40 transition-colors text-white";
  const linkClassesMobile =
    "text-xl py-2 px-6 rounded-2xl bg-white/20 hover:bg-white/40 transition-colors text-white";
  const mobileSolutionLinkClasses =
    "text-lg py-1 px-4 rounded-2xl bg-blue-500/70 hover:bg-white/40 transition-colors text-white";

  // Desktop navigation component remains unchanged
  const DesktopNav = () => {
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [isHoverable, setIsHoverable] = useState(true);

    useEffect(() => {
      // Check if the device supports hover
      const mq = window.matchMedia("(hover: hover)");
      setIsHoverable(mq.matches);

      const handleChange = (e: { matches: boolean }) =>
        setIsHoverable(e.matches);
      mq.addEventListener("change", handleChange);
      return () => mq.removeEventListener("change", handleChange);
    }, []);

    return (
      <div className="hidden sm:flex items-center gap-4">
        <Link to="/" className={linkClassesDesktop}>
          {t("navigation.link-to-landing-page")}
        </Link>

        <div
          className="relative group"
          onClick={
            !isHoverable ? () => setSolutionsOpen((prev) => !prev) : undefined
          }
        >
          <button className={linkClassesDesktop}>
            {t("navigation.solutions")}
          </button>
          <div
            className={`absolute left-0 mt-2 w-48 bg-black/90 backdrop-blur-md rounded-2xl shadow-lg transition-opacity z-50 
            ${isHoverable ? "opacity-0 group-hover:opacity-100" : solutionsOpen ? "opacity-100" : "opacity-0"}`}
          >
            {SOLUTION_LINKS.map((solution) => (
              <Link
                key={solution.path}
                to={solution.path}
                className="block px-4 py-2 hover:bg-white/40 hover:rounded-2xl text-white"
                onClick={() => setSolutionsOpen(false)}
              >
                {solution.label}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/impact" className={linkClassesDesktop}>
          Impact
        </Link>

        <Link to="/about" className={linkClassesDesktop}>
          {t("navigation.link-to-about-page")}
        </Link>

        <LocaleManager />
      </div>
    );
  };

  // Mobile navigation component with sub-menu handling
  const closeButton = (
    <button
      className="absolute top-4 right-4 text-xl py-2 px-4 rounded-2xl bg-red-600/80 hover:bg-red-600/90 transition-colors text-white"
      onClick={() => setMobileMenuOpen(false)}
    >
      X
    </button>
  );
  const MobileNav = () => {
    // Main mobile menu view
    if (mobileSubMenu === null) {
      return (
        <div className="sm:hidden fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-4 overflow-y-auto">
          {closeButton}

          <Link
            to="/"
            className={linkClassesMobile}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("navigation.link-to-landing-page")}
          </Link>

          <button
            className={linkClassesMobile}
            onClick={() => setMobileSubMenu("solutions")}
          >
            {t("navigation.solutions")}
          </button>

          <Link
            to="/about"
            className={linkClassesMobile}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t("navigation.link-to-about-page")}
          </Link>

          <div>
            {/* Language dropdown remains interactive */}
            <LocaleManager />
          </div>
        </div>
      );
    }
    // Solutions sub-menu view
    else if (mobileSubMenu === "solutions") {
      return (
        <div className="sm:hidden fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6 p-4 overflow-y-auto">
          {closeButton}
          <button
            className="text-xl py-2 px-6 rounded-2xl bg-green-800/90 hover:bg-white/40 transition-colors text-white"
            onClick={() => setMobileSubMenu(null)}
          >
            ← {t("navigation.back")}
          </button>
          <h2 className="text-xl text-white bg-white/20 p-2 rounded-2xl mb-2">
            {t("navigation.solutions")}
          </h2>
          {SOLUTION_LINKS.map((solution) => (
            <Link
              key={solution.path}
              to={solution.path}
              className={mobileSolutionLinkClasses}
              onClick={() => {
                setMobileMenuOpen(false);
                setMobileSubMenu(null);
              }}
            >
              {solution.label}
            </Link>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition duration-300 backdrop-blur-md bg-black/30 py-1 hover:bg-black/60 shadow-md">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo size={50} />
            <span className="ml-2 font-bold uppercase font-orbitron tracking-widest text-white">
              {import.meta.env.PROD ? "LEARNGRAPH" : "TESTING VERSION"}
            </span>
          </div>

          <DesktopNav />

          <button
            className="sm:hidden px-3 py-1 bg-white/20 text-white rounded-2xl"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              setMobileSubMenu(null); // reset submenu on toggle
            }}
          >
            ☰
          </button>
        </nav>
      </header>

      {mobileMenuOpen && <MobileNav />}

      <main>{content ?? null}</main>
      <Footer />
    </>
  );
};
