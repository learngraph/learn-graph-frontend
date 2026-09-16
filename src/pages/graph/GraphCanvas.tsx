import { forwardRef } from "react";
import {
  territories,
  type TerritoryId,
  type Topic,
  type TopicId,
} from "./graphModel";

interface Point {
  x: number;
  y: number;
}

const rootPositions: Record<TerritoryId, Point> = {
  platform: { x: 30, y: 34 },
  "learning-access": { x: 70, y: 70 },
  collaborate: { x: 70, y: 30 },
  about: { x: 30, y: 70 },
};

const topicPositions: Record<TerritoryId, Point[]> = {
  platform: [
    { x: 11, y: 29 },
    { x: 17, y: 9 },
    { x: 31, y: 4 },
    { x: 43, y: 13 },
  ],
  "learning-access": [
    { x: 58, y: 93 },
    { x: 75, y: 96 },
    { x: 88, y: 83 },
  ],
  collaborate: [
    { x: 58, y: 7 },
    { x: 75, y: 4 },
    { x: 88, y: 17 },
  ],
  about: [
    { x: 11, y: 57 },
    { x: 9, y: 76 },
    { x: 19, y: 94 },
    { x: 34, y: 97 },
    { x: 47, y: 84 },
  ],
};

function Edge({
  from,
  to,
  selected = false,
}: {
  from: Point;
  to: Point;
  selected?: boolean;
}) {
  return (
    <>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        strokeLinecap="round"
        className="graph-edge"
        vectorEffect="non-scaling-stroke"
      />
      {selected && (
        <line
          x1={from.x}
          y1={from.y}
          x2={to.x}
          y2={to.y}
          strokeLinecap="round"
          className="graph-edge graph-edge--selected"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="x2"
            from={from.x}
            to={to.x}
            dur="240ms"
            fill="freeze"
          />
          <animate
            attributeName="y2"
            from={from.y}
            to={to.y}
            dur="240ms"
            fill="freeze"
          />
        </line>
      )}
    </>
  );
}

function GraphNode({
  point,
  selected,
  quiet = false,
  label,
  onClick,
  className = "",
}: {
  point: Point;
  selected: boolean;
  quiet?: boolean;
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
                selected={territoryId === expandedTerritory}
              />
            ))}
            {expandedTerritory &&
              activeTopics.map((topic, index) => (
                <Edge
                  key={topic.id}
                  from={rootPositions[expandedTerritory]}
                  to={topicPositions[expandedTerritory][index]}
                  selected={topic.id === selectedTopicId}
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
