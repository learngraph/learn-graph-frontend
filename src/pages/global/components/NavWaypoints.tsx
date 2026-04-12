import "../../styles/navbar/nav-waypoints.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "@/i18n/i18n";


const SECTIONS = [
  { id: "begin" as const },
  { id: "compare" as const },
  { id: "grow" as const },
  { id: "partners" as const },
  { id: "people" as const },
];

function waypointLabel(
  t: (key: string, vars?: Record<string, unknown>) => string,
  id: (typeof SECTIONS)[number]["id"],
) {
  switch (id) {
    case "begin":
      return t("nav.begin");
    case "compare":
      return t("nav.compare");
    case "grow":
      return t("nav.grow");
    case "partners":
      return t("nav.partners");
    case "people":
      return t("nav.people");
  }
}

function waypointHref(id: (typeof SECTIONS)[number]["id"]): string {
  switch (id) {
    case "begin":
      return "/learn";
    case "compare":
      return "/learn/compare";
    case "grow":
      return "/learn/grow";
    case "partners":
      return "/learn/partners";
    case "people":
      return "/learn/people";
  }
}

export default function NavWaypoints() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
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
          onClick={() => {
            const href = waypointHref(section.id);
            if (location.pathname === href) {
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            } else {
              navigate(href);
            }
          }}
        >
          <span className="label">{waypointLabel(t, section.id)}</span>
          <span className="diamond" />
        </button>
      );
    })}
  </nav>
);
}