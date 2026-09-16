import { useState } from "react";
import type { ModelSystemBlock } from "../../../../content/graph";

interface LearningPathSpecimenProps {
  topics: ModelSystemBlock["topics"];
  dependencies: ModelSystemBlock["dependencies"];
  views: ModelSystemBlock["views"];
  goalTopicId: string;
}

const specimenPositions: Record<string, { x: number; y: number }> = {
  "light-shadow": { x: 150, y: 125 },
  "earth-moon-sun": { x: 150, y: 415 },
  "shadow-cone": { x: 410, y: 125 },
  "orbital-motion": { x: 410, y: 415 },
  alignment: { x: 675, y: 270 },
  "solar-eclipse": { x: 900, y: 270 },
};

export function LearningPathSpecimen({
  topics,
  dependencies,
  views,
  goalTopicId,
}: LearningPathSpecimenProps) {
  const [activeViewId, setActiveViewId] = useState(views[0]?.id ?? "");
  const activeView =
    views.find((view) => view.id === activeViewId) ?? views[0];

  if (!activeView) return null;

  return (
    <section className="graph-focus__specimen">
      <header className="graph-focus__specimen-header">
        <p>ILLUSTRATIVE LEARNING PATH</p>
        <h3>Make the Sun disappear</h3>
        <p>
          A solar eclipse is the goal. Choose what the learner already
          understands. The required route changes while the concept map stays
          intact
        </p>
      </header>

      <nav
        aria-label="Choose the learner's starting knowledge"
        className="graph-focus__specimen-controls"
      >
        <p>WHAT DOES THE LEARNER ALREADY KNOW?</p>
        <div>
          {views.map((view) => (
            <button
              aria-pressed={view.id === activeView.id}
              className={view.id === activeView.id ? "is-active" : ""}
              key={view.id}
              onClick={() => setActiveViewId(view.id)}
              type="button"
            >
              <span aria-hidden="true" />
              {view.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="graph-focus__specimen-stage">
        <svg
          aria-hidden="true"
          className="graph-focus__specimen-connections"
          preserveAspectRatio="none"
          viewBox="0 0 1000 540"
        >
          {dependencies.map((dependency) => {
            const source = specimenPositions[dependency.prerequisiteId];
            const target = specimenPositions[dependency.topicId];
            const sourceIsKnown = activeView.knownTopicIds.includes(
              dependency.prerequisiteId,
            );
            const targetIsKnown = activeView.knownTopicIds.includes(
              dependency.topicId,
            );
            const sourceIsRequired = activeView.journeyTopicIds.includes(
              dependency.prerequisiteId,
            );
            const targetIsRequired = activeView.journeyTopicIds.includes(
              dependency.topicId,
            );
            const isRequired =
              targetIsRequired && (sourceIsRequired || sourceIsKnown);
            const isKnown = sourceIsKnown && targetIsKnown;

            if (!source || !target) return null;

            return (
              <line
                className={`${isRequired ? "is-required" : ""} ${isKnown ? "is-known" : ""}`}
                key={`${dependency.prerequisiteId}-${dependency.topicId}`}
                x1={source.x}
                x2={target.x}
                y1={source.y}
                y2={target.y}
              />
            );
          })}
        </svg>

        {topics.map((topic) => {
          const isKnown = activeView.knownTopicIds.includes(topic.id);
          const isRequired = activeView.journeyTopicIds.includes(topic.id);
          const prerequisites = dependencies.filter(
            (dependency) => dependency.topicId === topic.id,
          );
          const isStart =
            isRequired &&
            (prerequisites.length === 0 ||
              prerequisites.every((dependency) =>
                activeView.knownTopicIds.includes(dependency.prerequisiteId),
              ));
          const isGoal = topic.id === goalTopicId;

          return (
            <article
              className={`${isKnown ? "is-known" : ""} ${isRequired ? "is-required" : ""} ${isStart ? "is-start" : ""} ${isGoal ? "is-goal" : ""}`}
              data-topic={topic.id}
              key={topic.id}
            >
              {isGoal && (
                <span
                  aria-hidden="true"
                  className="graph-focus__specimen-eclipse"
                >
                  <i />
                </span>
              )}
              <div>
                <h4>{topic.name}</h4>
                <p>{topic.description}</p>
              </div>
              <p className="graph-focus__specimen-position">
                {isGoal
                  ? "GOAL"
                  : isKnown
                    ? "ALREADY KNOWN"
                    : isStart
                      ? "START HERE"
                      : isRequired
                        ? "REQUIRED"
                        : "NOT NEEDED"}
              </p>
            </article>
          );
        })}
      </div>

      <footer className="graph-focus__specimen-reading" aria-live="polite">
        <p>{activeView.reading}</p>
        <span>
          {activeView.journeyTopicIds.length} concepts remain on this route
        </span>
      </footer>
    </section>
  );
}
