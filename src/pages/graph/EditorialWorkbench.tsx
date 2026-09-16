import type { EditorialBrief } from "../../content/graph";
import {
  sourceAvailabilityLabels,
  sourceCandidateStatusLabels,
  territories,
  workEstimateLabels,
  type Topic,
} from "./graphModel";
import "./editorialWorkbench.css";

export function EditorialWorkbench({
  topic,
  brief,
}: {
  topic: Topic;
  brief: EditorialBrief | undefined;
}) {
  if (!topic.slot) return null;

  return (
    <article key={topic.id} className="graph-focus__content">
      <p className="graph-focus__eyebrow">
        <span>{territories[topic.territory].label}</span>
        {topic.clusterLabel && (
          <>
            <span aria-hidden="true">/</span>
            <span>{topic.clusterLabel}</span>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span>{topic.label}</span>
      </p>
      <p className="graph-focus__workbench-flag">
        Editorial workbench · Not publication content
      </p>
      <h2>{topic.slot.statusNote}</h2>
      <p className="graph-focus__lead">{topic.purpose}</p>

      <div className="graph-focus__workbench">
        <section>
          <h3>Current state</h3>
          <dl>
            <div>
              <dt>Source</dt>
              <dd>{sourceAvailabilityLabels[topic.slot.sourceAvailability]}</dd>
            </div>
            <div>
              <dt>Expected work</dt>
              <dd>{workEstimateLabels[topic.slot.workEstimate]}</dd>
            </div>
          </dl>
        </section>

        <section>
          <h3>Source shelf</h3>
          <div className="graph-focus__source-shelf">
            {topic.sources.map((source) => (
              <article key={source.id}>
                <div className="graph-focus__source-heading">
                  <h4>{source.title}</h4>
                  <span>{sourceCandidateStatusLabels[source.status]}</span>
                </div>
                <p>{source.usefulFor}</p>
                <ul>
                  {source.usefulMaterial.map((material) => (
                    <li key={material}>{material}</li>
                  ))}
                </ul>
                <small>{source.provenance}</small>
              </article>
            ))}
          </div>
        </section>

        {brief && (
          <section>
            <h3>Argument kernel</h3>
            <p>{brief.coreClaim}</p>
            <p className="graph-focus__workbench-memory">
              Intended memory: {brief.intendedMemory}
            </p>
          </section>
        )}

        <section>
          <h3>Before publication</h3>
          {topic.slot.blockers.length > 0 ? (
            <ul>
              {topic.slot.blockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          ) : (
            <p>No factual blocker identified before editorial review.</p>
          )}
        </section>

        <section>
          <h3>Supporting material</h3>
          {topic.slot.supportingMaterial.length > 0 ? (
            <ul className="graph-focus__materials">
              {topic.slot.supportingMaterial.map((material) => (
                <li key={`${material.kind}-${material.label}`}>
                  <span>{material.label}</span>
                  <small>{material.status}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No additional media requirement identified.</p>
          )}
        </section>
      </div>
    </article>
  );
}
