import { useState } from "react";
import type {
  CaseStudiesBlock,
  NodeContent,
} from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./impact.css";

function CaseStudyCollection({ block }: { block: CaseStudiesBlock }) {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <div className="graph-focus__cases">
      {block.cases.map((caseStudy, index) => {
        const isOpen = caseStudy.id === activeCaseId;
        const detailId = `case-study-${caseStudy.id}`;

        return (
          <article
            className={`graph-focus__case${isOpen ? " is-open" : ""}`}
            key={caseStudy.id}
          >
            <button
              type="button"
              className="graph-focus__case-header"
              aria-expanded={isOpen}
              aria-controls={detailId}
              onClick={() => setActiveCaseId(isOpen ? null : caseStudy.id)}
            >
              <span className="graph-focus__case-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="graph-focus__case-kicker">
                {caseStudy.kicker}
              </span>
              <h3>{caseStudy.partner}</h3>
              <strong>{caseStudy.title}</strong>
              <span className="graph-focus__case-command">
                {isOpen ? "Collapse story" : "Unfold story"}
              </span>
            </button>

            {isOpen && (
              <div className="graph-focus__case-detail" id={detailId}>
                <header>
                  <div>{caseStudy.lede}</div>
                </header>

                <div className="graph-focus__case-story">
                  {caseStudy.sections.map((section, sectionIndex) =>
                    section.type === "prose" ? (
                      <div key={sectionIndex}>
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ) : (
                      <blockquote key={sectionIndex}>
                        {"\u201c"}
                        {section.text}
                        {"\u201d"}
                        <cite>{section.attribution}</cite>
                      </blockquote>
                    ),
                  )}
                </div>

                <footer className="graph-focus__case-end">
                  {caseStudy.websiteUrl && caseStudy.websiteLabel && (
                    <a
                      href={caseStudy.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Project website</span>
                      <strong>{caseStudy.websiteLabel}</strong>
                    </a>
                  )}
                  <button
                    type="button"
                    className="graph-focus__case-collapse"
                    onClick={() => setActiveCaseId(null)}
                  >
                    Collapse story
                  </button>
                </footer>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export function ImpactNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return (
    <NodeShell content={content} path={path}>
      {content.kicker && (
        <p className="graph-focus__content-kicker">{content.kicker}</p>
      )}
      {content.title && <h2>{content.title}</h2>}
      {content.lead && <p className="graph-focus__lead">{content.lead}</p>}

      <div className="graph-focus__blocks">
        {content.blocks.map((block, blockIndex) => {
          if (block.type === "prose") {
            return (
              <div
                className={`graph-focus__body${block.kicker ? " graph-focus__body--section" : ""}`}
                key={blockIndex}
              >
                {block.kicker && (
                  <p className="graph-focus__body-kicker">{block.kicker}</p>
                )}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            );
          }

          if (block.type === "case-studies") {
            return (
              <CaseStudyCollection
                block={block}
                key={`${content.id}-${blockIndex}`}
              />
            );
          }

          return null;
        })}
      </div>
    </NodeShell>
  );
}
