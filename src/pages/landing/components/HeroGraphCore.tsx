import { useState } from "react";
import "./hero-graph-core.css";

type Props = {
  onActivate?: () => void;
};

export default function HeroGraphCore({ onActivate }: Props) {
  const [active, setActive] = useState(false);

  function activate() {
    setActive(true);
    onActivate?.();
  }

  return (
    <div className={`hero-core-wrapper ${active ? "active" : ""}`}>
      {/* Ambient field */}
      <div className="hero-core-field" />

      {/* Core */}
      <div className="hero-core">
        <div className="core-inner" />
      </div>

      {/* CTA */}
      <button
        className="hero-core-cta"
        onMouseEnter={() => setActive(true)}
        onClick={activate}
      >
        ENTER THE GRAPH
      </button>
    </div>
  );
}
