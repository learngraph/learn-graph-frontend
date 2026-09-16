import { useState } from "react";
import type { PartnershipFieldBlock } from "../../../../content/graph";

export function CombinationField({
  contributions,
  reinforcement,
}: {
  contributions: PartnershipFieldBlock["contributions"];
  reinforcement: PartnershipFieldBlock["reinforcement"];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="contribution-field">
      {/* ── Five bubbles in a masonry grid ──────────────────────── */}
      <ul className="contribution-bubbles" role="list">
        {contributions.map((c) => (
          <li
            key={c.id}
            className={`contribution-bubble${activeId === c.id ? " is-active" : ""}`}
            onMouseEnter={() => setActiveId(c.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(c.id)}
            onBlur={() => setActiveId(null)}
            tabIndex={0}
          >
            <strong className="contribution-bubble__label">{c.label}</strong>
            <span className="contribution-bubble__desc">{c.description}</span>
          </li>
        ))}
      </ul>

      {/* ── Reinforcement passage ────────────────────────────────── */}
      <div className="contribution-reinforcement">
        <h3>{reinforcement.heading}</h3>

        <p className="contribution-reinforcement__intro">{reinforcement.intro}</p>

        {reinforcement.paragraphs.map((paragraph, pi) => (
          <p key={pi} className="contribution-reinforcement__body">
            {paragraph.map((sentence, si) => (
              <span
                key={`${sentence.contributionId}-${si}`}
                className={`contribution-sentence${
                  activeId === sentence.contributionId
                    ? " is-active"
                    : activeId !== null
                      ? " is-dim"
                      : ""
                }`}
                onMouseEnter={() => setActiveId(sentence.contributionId)}
                onMouseLeave={() => setActiveId(null)}
                onFocus={() => setActiveId(sentence.contributionId)}
                onBlur={() => setActiveId(null)}
                tabIndex={-1}
              >
                {si > 0 ? " " : ""}
                {sentence.text}
              </span>
            ))}
          </p>
        ))}

        <p className="contribution-reinforcement__closing">
          {reinforcement.closing}
        </p>
      </div>
    </div>
  );
}
