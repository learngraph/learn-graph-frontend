import { forwardRef } from "react";
import {
  territories,
  workEstimateLabels,
  type TerritoryId,
  type Topic,
  type TopicId,
} from "./graphModel";

interface Point {
  x: number;
  y: number;
}

const rootPositions: Record<TerritoryId, Point> = {
  platform: { x: 29, y: 35 },
  "learning-access": { x: 71, y: 72 },
  collaborate: { x: 71, y: 32 },
  about: { x: 29, y: 68 },
};

const topicPositions: Record<TerritoryId, Point[]> = {
  platform: [
    { x: 11, y: 16 },
    { x: 4, y: 37 },
    { x: 22, y: 7 },
    { x: 38, y: 11 },
  ],
  "learning-access": [
    { x: 57, y: 90 },
    { x: 74, y: 93 },
    { x: 89, y: 83 },
  ],
  collaborate: [
    { x: 62, y: 13 },
    { x: 80, y: 10 },
    { x: 93, y: 27 },
  ],
  about: [
    { x: 8, y: 57 },
    { x: 16, y: 83 },
    { x: 7, y: 71 },
    { x: 32, y: 88 },
    { x: 43, y: 75 },
  ],
};

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

export interface GraphCanvasProps {
  displayedTerritoryOrder: TerritoryId[];
  expandedTerritory: TerritoryId | null;
  activeTopics: Topic[];
  selectedTopicId: TopicId | undefined;
  selectedNodeId: string;
  onNavigateRoot: () => void;
  onSelectTerritory: (id: TerritoryId) => void;
  onSelectTopic: (id: TopicId) => void;
}

export const GraphCanvas = forwardRef<HTMLElement, GraphCanvasProps>(
  function GraphCanvas(
    {
      displayedTerritoryOrder,
      expandedTerritory,
      activeTopics,
      selectedTopicId,
      selectedNodeId,
      onNavigateRoot,
      onSelectTerritory,
      onSelectTopic,
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
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
            {displayedTerritoryOrder.map((territoryId) => (
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

          <button
            type="button"
            className={`graph-core ${selectedNodeId === "root-learngraph" ? "graph-core--selected" : ""}`}
            onClick={onNavigateRoot}
            aria-pressed={selectedNodeId === "root-learngraph"}
            aria-label="Open the LearnGraph introduction"
          >
            <span>LG</span>
          </button>

          {displayedTerritoryOrder.map((territoryId) => {
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
                onClick={() => onSelectTerritory(territoryId)}
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
                onClick={() => onSelectTopic(topic.id)}
              />
            ))}
        </div>

        <div className="graph-canvas graph-canvas--mobile">
          <button
            type="button"
            className={`graph-mobile-core ${selectedNodeId === "root-learngraph" ? "is-active" : ""}`}
            onClick={onNavigateRoot}
          >
            LEARNGRAPH
          </button>
          <div className="graph-mobile-territories" aria-label="Territories">
            {displayedTerritoryOrder.map((territoryId) => (
              <button
                type="button"
                key={territoryId}
                className={territoryId === expandedTerritory ? "is-active" : ""}
                onClick={() => onSelectTerritory(territoryId)}
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
                    onClick={() => onSelectTopic(topic.id)}
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
    );
  },
);
