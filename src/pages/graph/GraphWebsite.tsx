import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  territories,
  territoryOrder,
  topics,
  type GraphSelection,
  type TerritoryId,
  type TopicId,
} from "./graphModel";
import "./graphWebsite.css";

interface Point {
  x: number;
  y: number;
}

const rootPositions: Record<TerritoryId, Point> = {
  platform: { x: 27, y: 29 },
  work: { x: 73, y: 29 },
  about: { x: 27, y: 71 },
  research: { x: 73, y: 71 },
};

const topicPositions: Record<TerritoryId, Point[]> = {
  platform: [
    { x: 8, y: 8 },
    { x: 29, y: 7 },
    { x: 6, y: 35 },
    { x: 28, y: 52 },
  ],
  work: [
    { x: 71, y: 7 },
    { x: 92, y: 8 },
    { x: 94, y: 35 },
    { x: 72, y: 52 },
  ],
  about: [
    { x: 6, y: 66 },
    { x: 27, y: 49 },
    { x: 8, y: 93 },
    { x: 29, y: 94 },
  ],
  research: [
    { x: 73, y: 49 },
    { x: 94, y: 66 },
    { x: 72, y: 94 },
    { x: 93, y: 93 },
  ],
};

function isTopicId(value: string | null): value is TopicId {
  return value !== null && value in topics;
}

function Edge({ from, to, active = false }: { from: Point; to: Point; active?: boolean }) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      pathLength={100}
      className={active ? "graph-edge graph-edge--active" : "graph-edge"}
      vectorEffect="non-scaling-stroke"
    />
  );
}

function GraphNode({
  point,
  selected,
  quiet = false,
  relation,
  label,
  onClick,
  className = "",
}: {
  point: Point;
  selected: boolean;
  quiet?: boolean;
  relation?: string;
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
      {relation && <span className="graph-node__relation">{relation}</span>}
      <span className="graph-node__label">{label}</span>
    </button>
  );
}

export default function GraphWebsite() {
  const [searchParams, setSearchParams] = useSearchParams();
  const graphRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const requestedFocus = searchParams.get("focus");
  const selectedTopicId: TopicId = isTopicId(requestedFocus)
    ? requestedFocus
    : "platform-model";
  const selectedTopic = topics[selectedTopicId];
  const selectedTerritory = selectedTopic.territory;
  const [expandedTerritory, setExpandedTerritory] = useState<TerritoryId | null>(
    selectedTerritory,
  );
  const activeTopics = useMemo(
    () =>
      expandedTerritory
        ? territories[expandedTerritory].topics.map((topicId) => topics[topicId])
        : [],
    [expandedTerritory],
  );

  useEffect(() => {
    setExpandedTerritory(selectedTerritory);
  }, [selectedTerritory]);

  const selectTopic = (topicId: TopicId, reveal = true) => {
    setExpandedTerritory(topics[topicId].territory);
    setSearchParams({ focus: topicId });
    if (!reveal) return;
    window.requestAnimationFrame(() => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      focusRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  const selectTerritory = (territoryId: TerritoryId) => {
    if (expandedTerritory === territoryId) {
      setExpandedTerritory(null);
      return;
    }

    setExpandedTerritory(territoryId);
    if (selectedTerritory !== territoryId) {
      selectTopic(territories[territoryId].topics[0], false);
    }
  };

  const selectConnection = (selection: GraphSelection) => {
    if (selection in territories) {
      selectTerritory(selection as TerritoryId);
      return;
    }
    selectTopic(selection as TopicId, false);
  };

  return (
    <main className="graph-site">
      <header className="graph-site__masthead">
        <button
          type="button"
          className="graph-site__brand"
          onClick={() => selectTopic("platform-model", false)}
          aria-label="Return to the beginning"
        >
          LEARNGRAPH
        </button>
        <button
          type="button"
          className="graph-site__mode"
          onClick={() => graphRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
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
          Start anywhere. 
          Follow a relationship through the product and the thinking beneath it
        </p>
      </section>

      <section ref={graphRef} className="graph-zone" aria-label="LearnGraph website map">
        <div className="graph-canvas graph-canvas--desktop">
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
                selected={territoryId === expandedTerritory}
                quiet={expandedTerritory !== null && territoryId !== expandedTerritory}
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
                relation={topic.relation}
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
              <p className="graph-mobile-relation">
                {territories[expandedTerritory].statement}
              </p>
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
                    <span>{topic.relation}</span>
                    {topic.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section ref={focusRef} className="graph-focus" aria-live="polite">
        <div className="graph-focus__rail">
          <span>Selected relationship</span>
          <span className="graph-focus__index">
            {String(territories[selectedTerritory].topics.indexOf(selectedTopicId) + 1).padStart(2, "0")}
            /04
          </span>
        </div>

        <article key={selectedTopic.id} className="graph-focus__content">
          <p className="graph-focus__eyebrow">{selectedTopic.eyebrow}</p>
          <h2>{selectedTopic.title}</h2>
          <p className="graph-focus__lead">{selectedTopic.lead}</p>
          <div className="graph-focus__body">
            {selectedTopic.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {selectedTopic.action && (
            <a
              className="graph-focus__action"
              href={selectedTopic.action.href}
              target={selectedTopic.action.external ? "_blank" : undefined}
              rel={selectedTopic.action.external ? "noreferrer" : undefined}
            >
              {selectedTopic.action.label}
              <ArrowUpRight aria-hidden="true" />
            </a>
          )}
        </article>

        {selectedTopic.connections && selectedTopic.connections.length > 0 && (
          <aside className="graph-focus__connections" aria-label="Connected topics">
            <p>Connected thinking</p>
            {selectedTopic.connections.map((connection) => (
              <button
                type="button"
                key={connection.id}
                onClick={() => selectConnection(connection.id)}
              >
                <span>{connection.relation}</span>
                {topics[connection.id].label}
              </button>
            ))}
          </aside>
        )}
      </section>

      <div className="graph-site__legal">
        <span>© {new Date().getFullYear()} LearnGraph</span>
        <Link to="/imprint">Imprint</Link>
      </div>
    </main>
  );
}
