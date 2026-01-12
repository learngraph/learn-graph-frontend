import "../../styles/navbar/nav-waypoints.css";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/i18n";


const SECTIONS = [
  
  { id: "begin", label: "nav.begin" },
  { id: "compare", label: "nav.compare" },
  { id: "grow", label: "nav.grow" },
  { id: "partners", label: "nav.partners" },
  { id: "people", label: "nav.people" },
];

export default function NavWaypoints() {
  const { t } = useI18n();;
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    SECTIONS.forEach(section => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
  <nav className="nav-waypoints" aria-label="Page sections">
    {SECTIONS.map(section => {
      const isActive = active === section.id;

      return (
        <button
          key={section.id}
          className={`waypoint ${isActive ? "active" : ""}`}
          onClick={() =>
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* 👇 THIS WAS THE MISSING PIECE */}
          <span className="label">{t(section.label)}</span>
          <span className="diamond" />
        </button>
      );
    })}
  </nav>
);
}