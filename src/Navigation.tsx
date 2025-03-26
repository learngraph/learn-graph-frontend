import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, ReactNode } from "react";
import Logo from "../src/logo";
import LocaleManager from "./Header/LocaleManager";

interface NavigationWithContentConfig {
  content?: ReactNode;
}

export const NavigationWithContent = ({
  content,
}: NavigationWithContentConfig) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: t("navigation.link-to-landing-page"), path: "/" },
    { label: t("navigation.link-to-about-page"), path: "/about" },
    { label: t("navigation.link-to-imprint-page"), path: "/imprint" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
          scrolled ? "py-1 bg-black/30 shadow-md" : "py-2 bg-black/80"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Logo size={scrolled ? 50 : 70} />
            <span className="ml-2 font-bold uppercase font-orbitron tracking-widest text-white">
              {import.meta.env.PROD ? "LEARNGRAPH" : "TESTING VERSION"}
            </span>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="px-4 py-1 rounded-md bg-white/20 hover:bg-white/40 transition-colors text-white"
              >
                {item.label}
              </Link>
            ))}
            <LocaleManager />
          </div>

          {/* Mobile navigation button */}
          <button
            className="sm:hidden px-3 py-1 bg-white/20 text-white rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="text-xl py-2 px-6 rounded-md bg-white/20 hover:bg-white/40 transition-colors text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div onClick={() => setMobileMenuOpen(false)}>
            <LocaleManager />
          </div>
        </div>
      )}

      <main className="pt-16 sm:pt-20">{content ?? null}</main>
    </>
  );
};
