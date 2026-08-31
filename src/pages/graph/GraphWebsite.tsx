import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  pathForTopic,
  sourceAvailabilityLabels,
  sourceCandidateStatusLabels,
  territories,
  territoryFromSlug,
  territoryOrder,
  topicFromRoute,
  topics,
  workEstimateLabels,
  type TerritoryId,
  type TopicId,
} from "./graphModel";
import { contentGraphRegistry } from "../../content/graph";
import "./graphWebsite.css";

interface Point {
  x: number;
  y: number;
}

const rootPositions: Record<TerritoryId, Point> = {
  platform: { x: 29, y: 38 },
  collaborate: { x: 71, y: 38 },
  about: { x: 29, y: 62 },
  research: { x: 71, y: 62 },
};

const topicPositions: Record<TerritoryId, Point[]> = {
  platform: [
    { x: 9, y: 14 },
    { x: 33, y: 12 },
    { x: 7, y: 38 },
    { x: 22, y: 7 },
  ],
  collaborate: [
    { x: 64, y: 10 },
    { x: 80, y: 7 },
    { x: 94, y: 14 },
    { x: 88, y: 31 },
    { x: 96, y: 42 },
  ],
  about: [
    { x: 7, y: 62 },
    { x: 22, y: 93 },
    { x: 9, y: 86 },
    { x: 33, y: 88 },
  ],
  research: [
    { x: 67, y: 88 },
    { x: 91, y: 86 },
    { x: 78, y: 93 },
    { x: 93, y: 62 },
  ],
};

function isTopicId(value: string | null): value is TopicId {
  return value !== null && value in topics;
}

function Edge({
  from,
  to,
  active = false,
}: {
  from: Point;
  to: Point;
  active?: boolean;
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      strokeLinecap="round"
      className={active ? "graph-edge graph-edge--active" : "graph-edge"}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function GraphNode({
  point,
  selected,
  quiet = false,
  meta,
  label,
  onClick,
  className = "",
}: {
  point: Point;
  selected: boolean;
  quiet?: boolean;
  meta?: string;
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`graph-node ${selected ? "graph-node--selected" : ""} ${quiet ? "graph-node--quiet" : ""} ${className}`}
      style={{ left: `${point.x}%`, top: `${point.y}%` }}
      aria-pressed={selected}
      onClick={onClick}
    >
      <span className="graph-node__label">{label}</span>
      {meta && <span className="graph-node__meta">{meta}</span>}
    </button>
  );
}

export default function GraphWebsite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { territorySlug, topicSlug } = useParams<{
    territorySlug?: string;
    topicSlug?: string;
  }>();
  const palette = searchParams.get("palette") === "blue" ? "blue" : "green";
  const graphRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const focusRevealTimerRef = useRef<number | null>(null);
  const requestedFocus = searchParams.get("focus");
  const routedTerritory = territoryFromSlug(territorySlug);
  const routedTopic = topicFromRoute(routedTerritory, topicSlug);
  const hasExplicitSelection = routedTopic !== undefined;
  const selectedTopicId: TopicId = routedTopic?.id ?? "platform-model";
  const selectedTopic = topics[selectedTopicId];
  const selectedBrief = contentGraphRegistry.briefs.find(
    (brief) => brief.nodeId === selectedTopicId,
  );
  const selectedTerritory =
    routedTopic?.territory ?? routedTerritory?.id ?? "platform";
  const expandedTerritory = routedTerritory?.id ?? null;
  const activeTopics = expandedTerritory
    ? territories[expandedTerritory].topics.map((topicId) => topics[topicId])
    : [];

  useEffect(
    () => () => {
      if (focusRevealTimerRef.current !== null) {
        window.clearTimeout(focusRevealTimerRef.current);
      }
    },
    [],
  );

  const selectTopic = (topicId: TopicId, reveal = true) => {
    const topic = topics[topicId];
    navigate({
      pathname: pathForTopic(topic),
      search: palette === "blue" ? "?palette=blue" : "",
    });
    if (!reveal) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (focusRevealTimerRef.current !== null) {
      window.clearTimeout(focusRevealTimerRef.current);
    }
    focusRevealTimerRef.current = window.setTimeout(
      () => {
        const focus = focusRef.current;
        if (!focus) return;

        const retainedContext =
          window.innerWidth <= 980
            ? 72
            : Math.min(window.innerHeight * 0.18, 160);
        const targetTop =
          focus.getBoundingClientRect().top + window.scrollY - retainedContext;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: reduceMotion ? "auto" : "smooth",
        });
        focusRevealTimerRef.current = null;
      },
      reduceMotion ? 0 : 260,
    );
  };

  const selectTerritory = (territoryId: TerritoryId) => {
    if (expandedTerritory === territoryId) {
      navigate({
        pathname: "/",
        search: palette === "blue" ? "?palette=blue" : "",
      });
      return;
    }

    navigate({
      pathname: `/${territories[territoryId].slug}`,
      search: palette === "blue" ? "?palette=blue" : "",
    });
  };

  const returnToGraph = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    graphRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  if (!territorySlug && isTopicId(requestedFocus)) {
    const legacyParams = new URLSearchParams(searchParams);
    legacyParams.delete("focus");
    const legacySearch = legacyParams.toString();
    return (
      <Navigate
        to={`${pathForTopic(topics[requestedFocus])}${legacySearch ? `?${legacySearch}` : ""}`}
        replace
      />
    );
  }

  if (territorySlug && !routedTerritory) {
    return (
      <Navigate to={palette === "blue" ? "/?palette=blue" : "/"} replace />
    );
  }

  if (topicSlug && !routedTopic && routedTerritory) {
    return (
      <Navigate
        to={`/${routedTerritory.slug}${palette === "blue" ? "?palette=blue" : ""}`}
        replace
      />
    );
  }

  return (
    <main className="graph-site" data-palette={palette}>
      <header className="graph-site__masthead">
        <button
          type="button"
          className="graph-site__brand"
          onClick={() =>
            navigate({
              pathname: "/",
              search: palette === "blue" ? "?palette=blue" : "",
            })
          }
          aria-label="Return to the beginning"
        >
          LEARNGRAPH
        </button>
        <button
          type="button"
          className="graph-site__mode"
          onClick={returnToGraph}
        >
          Enter the graph
          <ArrowDown aria-hidden="true" />
        </button>
      </header>

      <section className="graph-intro" aria-labelledby="graph-intro-title">
        <p className="graph-kicker">From Map to Movement</p>
        <h1 id="graph-intro-title">
          Learning becomes navigable when relationships become visible.
        </h1>
        <p>
          Start anywhere. Follow a relationship through the product and the
          thinking beneath it
        </p>
      </section>

      <section
        ref={graphRef}
        className="graph-zone"
        aria-label="LearnGraph website map"
      >
        <div
          className={`graph-canvas graph-canvas--desktop ${expandedTerritory ? "graph-canvas--expanded" : "graph-canvas--closed"}`}
        >
          <svg
            className="graph-lines"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {territoryOrder.map((territoryId) => (
              <Edge
                key={territoryId}
                from={{ x: 50, y: 50 }}
                to={rootPositions[territoryId]}
                active={territoryId === expandedTerritory}
              />
            ))}
            {expandedTerritory &&
              activeTopics.map((topic, index) => (
                <Edge
                  key={topic.id}
                  from={rootPositions[expandedTerritory]}
                  to={topicPositions[expandedTerritory][index]}
                  active={topic.id === selectedTopicId}
                />
              ))}
          </svg>

          <div className="graph-core" aria-hidden="true">
            <span>LG</span>
          </div>

          {territoryOrder.map((territoryId) => {
            const territory = territories[territoryId];
            return (
              <GraphNode
                key={territoryId}
                point={rootPositions[territoryId]}
                label={territory.label}
                meta={
                  territory.architectureStatus === "reserved"
                    ? "Reserved"
                    : undefined
                }
                selected={territoryId === expandedTerritory}
                quiet={
                  expandedTerritory !== null &&
                  territoryId !== expandedTerritory
                }
                className="graph-node--territory"
                onClick={() => selectTerritory(territoryId)}
              />
            );
          })}

          {expandedTerritory &&
            activeTopics.map((topic, index) => (
              <GraphNode
                key={topic.id}
                point={topicPositions[expandedTerritory][index]}
                label={topic.label}
                meta={workEstimateLabels[topic.slot.workEstimate]}
                selected={topic.id === selectedTopicId}
                className="graph-node--topic"
                onClick={() => selectTopic(topic.id)}
              />
            ))}
        </div>

        <div className="graph-canvas graph-canvas--mobile">
          <div className="graph-mobile-core">LEARNGRAPH</div>
          <div className="graph-mobile-territories" aria-label="Territories">
            {territoryOrder.map((territoryId) => (
              <button
                type="button"
                key={territoryId}
                className={territoryId === expandedTerritory ? "is-active" : ""}
                onClick={() => selectTerritory(territoryId)}
              >
                {territories[territoryId].label}
              </button>
            ))}
          </div>
          {expandedTerritory && (
            <>
              <div className="graph-mobile-spine" aria-hidden="true" />
              <div
                className="graph-mobile-topics"
                aria-label={`${territories[expandedTerritory].label} topics`}
              >
                {activeTopics.map((topic) => (
                  <button
                    type="button"
                    key={topic.id}
                    className={topic.id === selectedTopicId ? "is-active" : ""}
                    onClick={() => selectTopic(topic.id)}
                  >
                    <strong>{topic.label}</strong>
                    <span>{workEstimateLabels[topic.slot.workEstimate]}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {hasExplicitSelection && (
        <section
          id="editorial-workbench"
          ref={focusRef}
          className="graph-focus"
          aria-live="polite"
        >
          <div className="graph-focus__rail">
            <span>Path in focus</span>
            <span className="graph-focus__index">
              {String(
                territories[selectedTerritory].topics.indexOf(selectedTopicId) +
                  1,
              ).padStart(2, "0")}
              /
              {String(territories[selectedTerritory].topics.length).padStart(
                2,
                "0",
              )}
            </span>
          </div>

          <article key={selectedTopic.id} className="graph-focus__content">
            <p className="graph-focus__eyebrow">
              <span>{territories[selectedTerritory].label}</span>
              {selectedTopic.clusterLabel && (
                <>
                  <span aria-hidden="true">/</span>
                  <span>{selectedTopic.clusterLabel}</span>
                </>
              )}
              <span aria-hidden="true">/</span>
              <span>{selectedTopic.label}</span>
            </p>
            <p className="graph-focus__workbench-flag">
              Editorial workbench · Not publication content
            </p>
            <h2>{selectedTopic.slot.statusNote}</h2>
            <p className="graph-focus__lead">{selectedTopic.purpose}</p>

            <div className="graph-focus__workbench">
              <section>
                <h3>Current state</h3>
                <dl>
                  <div>
                    <dt>Source</dt>
                    <dd>
                      {
                        sourceAvailabilityLabels[
                          selectedTopic.slot.sourceAvailability
                        ]
                      }
                    </dd>
                  </div>
                  <div>
                    <dt>Expected work</dt>
                    <dd>
                      {workEstimateLabels[selectedTopic.slot.workEstimate]}
                    </dd>
                  </div>
                </dl>
              </section>

              <section>
                <h3>Source shelf</h3>
                <div className="graph-focus__source-shelf">
                  {selectedTopic.sources.map((source) => (
                    <article key={source.id}>
                      <div className="graph-focus__source-heading">
                        <h4>{source.title}</h4>
                        <span>
                          {sourceCandidateStatusLabels[source.status]}
                        </span>
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

              {selectedBrief && (
                <section>
                  <h3>Argument kernel</h3>
                  <p>{selectedBrief.coreClaim}</p>
                  <p className="graph-focus__workbench-memory">
                    Intended memory: {selectedBrief.intendedMemory}
                  </p>
                </section>
              )}

              <section>
                <h3>Before publication</h3>
                {selectedTopic.slot.blockers.length > 0 ? (
                  <ul>
                    {selectedTopic.slot.blockers.map((blocker) => (
                      <li key={blocker}>{blocker}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No factual blocker identified before editorial review.</p>
                )}
              </section>

              <section>
                <h3>Supporting material</h3>
                {selectedTopic.slot.supportingMaterial.length > 0 ? (
                  <ul className="graph-focus__materials">
                    {selectedTopic.slot.supportingMaterial.map((material) => (
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

          <div className="graph-focus__return">
            <button type="button" onClick={returnToGraph}>
              Return to graph
              <ArrowUp aria-hidden="true" />
            </button>
          </div>
        </section>
      )}

      <div className="graph-site__legal">
        <span>© {new Date().getFullYear()} LearnGraph</span>
        <Link to="/imprint">Imprint</Link>
      </div>
    </main>
  );
}
