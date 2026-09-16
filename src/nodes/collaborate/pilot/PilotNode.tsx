import { useState } from "react";
import type { NodeContent, PilotRecordBlock } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./pilot.css";

type Perspective = "learner" | "educator";

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: string;
}) {
  return (
    <p className="pilot-record__section-label">
      <span>{index}</span>
      {children}
    </p>
  );
}

function PilotRecord({ record }: { record: PilotRecordBlock }) {
  const [perspective, setPerspective] = useState<Perspective>("learner");
  const showDraftScaffolding =
    import.meta.env.DEV && record.status === "incomplete";
  const visibleFacts = record.facts.filter(
    (fact) => fact.value || showDraftScaffolding,
  );
  const visibleBoundary = record.boundary.filter(
    (fact) => fact.value || showDraftScaffolding,
  );
  const hasBefore = Boolean(record.before?.paragraphs.length);
  const hasAfter = Boolean(
    record.after?.observed || record.after?.unresolved || record.after?.next,
  );
  const hasPerspectives = Boolean(
    record.sharedPath?.length &&
    record.perspectives?.learner.length &&
    record.perspectives.educator.length,
  );

  return (
    <div className="pilot-record">
      <section className="pilot-record__section pilot-record__case">
        <SectionLabel index="01">One pilot</SectionLabel>
        <div className="pilot-record__heading-row">
          <h3>{record.partner}</h3>
          {showDraftScaffolding && (
            <span className="pilot-record__draft-status">
              Fact record incomplete
            </span>
          )}
        </div>
        {record.introduction && (
          <p className="pilot-record__intro">{record.introduction}</p>
        )}
        {showDraftScaffolding && !record.introduction && (
          <p className="pilot-record__draft-note">
            The implementation frame is ready. The opening sentence will appear
            when participants, scope, duration and the tested question are
            verified.
          </p>
        )}
        {visibleFacts.length > 0 && (
          <dl className="pilot-record__facts">
            {visibleFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd className={fact.value ? undefined : "is-missing"}>
                  {fact.value ?? "Awaiting verified ITECH data"}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      {(hasBefore || showDraftScaffolding) && (
        <section className="pilot-record__section">
          <SectionLabel index="02">Before</SectionLabel>
          <h3>The situation before LearnGraph</h3>
          {record.before?.paragraphs.map((paragraph) => (
            <p className="pilot-record__prose" key={paragraph}>
              {paragraph}
            </p>
          ))}
          {record.before?.observation && (
            <blockquote className="pilot-record__observation">
              “{record.before.observation.text}”
              <cite>{record.before.observation.attribution}</cite>
            </blockquote>
          )}
          {showDraftScaffolding && !hasBefore && (
            <p className="pilot-record__draft-note">
              Withheld until the previous workflow and its source are verified.
            </p>
          )}
        </section>
      )}

      <section className="pilot-record__section">
        <SectionLabel index="03">In use</SectionLabel>
        <h3>What entered LearnGraph</h3>
        {visibleBoundary.length > 0 && (
          <dl className="pilot-record__boundary">
            {visibleBoundary.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd className={fact.value ? undefined : "is-missing"}>
                  {fact.value ?? "Not yet verified"}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {hasPerspectives && record.perspectives && record.sharedPath && (
          <div className="pilot-record__perspectives">
            <div className="pilot-record__perspective-heading">
              <h4>The same work from both sides</h4>
              <div aria-label="Choose a pilot viewpoint" role="group">
                {(["learner", "educator"] as const).map((view) => (
                  <button
                    aria-pressed={perspective === view}
                    className={perspective === view ? "is-active" : undefined}
                    key={view}
                    onClick={() => setPerspective(view)}
                    type="button"
                  >
                    {view}
                  </button>
                ))}
              </div>
            </div>
            <ol
              className="pilot-record__path"
              aria-label="Shared learning path"
            >
              {record.sharedPath.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <dl className="pilot-record__view" aria-live="polite">
              {record.perspectives[perspective].map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
        {showDraftScaffolding && !hasPerspectives && (
          <p className="pilot-record__draft-note pilot-record__draft-note--interaction">
            The learner and educator view is withheld until both sides and a
            shared learning path can be reconstructed from verified evidence.
          </p>
        )}
      </section>

      {(hasAfter || showDraftScaffolding) && (
        <section className="pilot-record__section">
          <SectionLabel index="04">After</SectionLabel>
          <h3>What changed and what did not</h3>
          <dl className="pilot-record__after">
            {(["observed", "unresolved", "next"] as const).map((key) => {
              const value = record.after?.[key];
              if (!value && !showDraftScaffolding) return null;
              return (
                <div key={key}>
                  <dt>{key}</dt>
                  <dd className={value ? undefined : "is-missing"}>
                    {value ?? "Awaiting verified ITECH data"}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>
      )}

      {showDraftScaffolding && (
        <aside className="pilot-record__unresolved">
          <p>Evidence still required</p>
          <ul>
            {record.unresolvedFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </aside>
      )}

      <footer className="pilot-record__footer">
        <p>{record.closing}</p>
        <a href={record.action.href}>{record.action.label}</a>
      </footer>
    </div>
  );
}

export function PilotNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return (
    <NodeShell content={content} path={path}>
      {content.title && <h2>{content.title}</h2>}
      {content.lead && <p className="graph-focus__lead">{content.lead}</p>}
      <div className="graph-focus__blocks">
        {content.blocks.map((block, index) =>
          block.type === "pilot-record" ? (
            <PilotRecord key={`${content.id}-${index}`} record={block} />
          ) : null,
        )}
      </div>
    </NodeShell>
  );
}
