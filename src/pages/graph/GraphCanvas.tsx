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

const topicPositions: Record<TerritoryId, Record<string, Point>> = {
  platform: {
    "platform-using-learngraph": { x: 11, y: 29 },
    "platform-model": { x: 17, y: 9 },
    "platform-graph": { x: 31, y: 4 },
    "platform-inclusive-learning": { x: 43, y: 13 },
  },
  "learning-access": {
    "learning-access": { x: 54, y: 93 },
    "learning-access-sovereignty": { x: 68, y: 96 },
    "learning-access-frontiers": { x: 82, y: 90 },
    "learning-access-activism": { x: 88, y: 70 },
    "activism-gfcca": { x: 94, y: 50 },
    "activism-afghanistan": { x: 95, y: 67 },
    "activism-world-educare-network": { x: 93, y: 84 },
  },
  collaborate: {
    "collaborate-services": { x: 58, y: 7 },
    "collaborate-pilot-learngraph": { x: 75, y: 4 },
    "collaborate-implementation-partnerships": { x: 88, y: 17 },
  },
  about: {
    "about-origin": { x: 11, y: 57 },
    "about-convictions": { x: 9, y: 76 },
    "about-people": { x: 19, y: 94 },
    "about-network": { x: 34, y: 97 },
    "about-impact": { x: 47, y: 84 },
  },
};

function pointForTopic(topic: Topic): Point {
  return topicPositions[topic.territory][topic.id] ?? { x: 50, y: 50 };
}

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
    const selectedTopic = activeTopics.find(
      (topic) => topic.id === selectedTopicId,
    );
    const activePathIds = new Set<TopicId>();
    let pathTopic = selectedTopic;

    while (pathTopic && !activePathIds.has(pathTopic.id)) {
      activePathIds.add(pathTopic.id);
      pathTopic = activeTopics.find(
        (candidate) => candidate.id === pathTopic?.parentId,
      );
    }

    const territoryNodeId = expandedTerritory
      ? territories[expandedTerritory].nodeId
      : undefined;
    const territoryTopics = territoryNodeId
      ? activeTopics.filter((topic) => topic.parentId === territoryNodeId)
      : [];
    const clusterCaseBlocks = territoryTopics
      .filter((topic) => topic.kind === "cluster")
      .map((cluster) => ({
        cluster,
        cases: activeTopics.filter((topic) => topic.parentId === cluster.id),
      }))
      .filter(
        (block) =>
          block.cases.length > 0 && activePathIds.has(block.cluster.id),
      );

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
              activeTopics.map((topic) => {
                const parent = activeTopics.find(
                  (candidate) => candidate.id === topic.parentId,
                );
                return (
                  <Edge
                    key={topic.id}
                    from={
                      parent
                        ? pointForTopic(parent)
                        : rootPositions[expandedTerritory]
                    }
                    to={pointForTopic(topic)}
                    selected={activePathIds.has(topic.id)}
                  />
                );
              })}
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
            activeTopics.map((topic) => (
              <GraphNode
                key={topic.id}
                point={pointForTopic(topic)}
                label={topic.label}
                selected={activePathIds.has(topic.id)}
                className={`graph-node--topic graph-node--${topic.kind}${topic.clusterLabel ? " graph-node--case" : ""}`}
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
              <div className="graph-mobile-level">
                <div className="graph-mobile-spine" aria-hidden="true" />
                <div
                  className="graph-mobile-topics"
                  aria-label={`${territories[expandedTerritory].label} topics`}
                >
                  {territoryTopics.map((topic) => (
                    <button
                      type="button"
                      key={topic.id}
                      className={`${activePathIds.has(topic.id) ? "is-active" : ""}${topic.kind === "cluster" ? " is-cluster" : ""}`}
                      onClick={() => onSelectTopic(topic.id)}
                    >
                      <strong>{topic.label}</strong>
                    </button>
                  ))}
                </div>
              </div>
              {clusterCaseBlocks.map(({ cluster, cases }) => (
                <div
                  key={cluster.id}
                  className="graph-mobile-level graph-mobile-level--nested"
                >
                  <div
                    className="graph-mobile-spine graph-mobile-spine--nested"
                    aria-hidden="true"
                  />
                  <div
                    className="graph-mobile-cases"
                    aria-label={`${cluster.label} initiatives`}
                  >
                    {cases.map((topic) => (
                      <button
                        type="button"
                        key={topic.id}
                        className={
                          activePathIds.has(topic.id) ? "is-active" : ""
                        }
                        onClick={() => onSelectTopic(topic.id)}
                      >
                        <strong>{topic.label}</strong>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    );
  },
);
