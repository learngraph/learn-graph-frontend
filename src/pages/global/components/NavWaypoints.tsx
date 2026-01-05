import "../../styles/navbar/nav-waypoints.css";
import { useEffect, useState } from "react";


const SECTIONS = [
  { id: "begin", label: "Begin" },
  { id: "compare", label: "Compare" },
  { id: "grow", label: "Grow" },
  { id: "people", label: "People" },
];

export default function NavWaypoints() {
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
            <span className="label">{section.label}</span>
            <span className="diamond" />
          </button>
        );
      })}
    </nav>
  );
}