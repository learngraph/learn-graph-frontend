import { useEffect, useRef, useState } from "react";
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
import type {
  CaseStudiesBlock,
  NodeContent,
  ProductTourBlock,
} from "../../content/graph";
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
    { x: 22, y: 7 },
    { x: 9, y: 14 },
    { x: 33, y: 12 },
    { x: 7, y: 38 },
  ],
  collaborate: [
    { x: 64, y: 10 },
    { x: 80, y: 7 },
    { x: 94, y: 14 },
    { x: 88, y: 31 },
    { x: 96, y: 42 },
    { x: 89, y: 53 },
  ],
  about: [
    { x: 7, y: 62 },
    { x: 22, y: 93 },
    { x: 9, y: 86 },
    { x: 33, y: 88 },
    { x: 40, y: 72 },
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
              <span className="graph-focus__case-kicker">{caseStudy.kicker}</span>
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

function ProductTour({ block }: { block: ProductTourBlock }) {
  return (
    <div className="graph-focus__product-tour">
      <div className="graph-focus__tour-roles" aria-label="Ways to use LearnGraph">
        {block.roleSummaries.map((item) => (
          <article key={item.role}>
            <h2>{item.role}</h2>
            <p>{item.introduction}</p>
            <ol>
              {item.destinations.map((destination) => (
                <li key={destination.name}>
                  <strong>{destination.name}</strong>
                  <span>{destination.job}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>

      {block.chapters.map((chapter, chapterIndex) => (
        <div key={chapter.id}>
          <section
            className={`graph-focus__tour-chapter graph-focus__tour-chapter--${chapter.layout}`}
          >
            <header className="graph-focus__tour-chapter-heading">
              <span>{String(chapterIndex + 1).padStart(2, "0")}</span>
              <h2>{chapter.label}</h2>
            </header>

            <div className="graph-focus__tour-stages">
              {chapter.stages.map((stage, stageIndex) => (
                <article className="graph-focus__tour-stage" key={stage.id}>
                  <figure className="graph-focus__tour-capture">
                    {stage.imageSrc ? (
                      <img src={stage.imageSrc} alt={stage.imageAlt ?? ""} />
                    ) : (
                      <div>
                        <span>UI capture needed</span>
                        <strong>{stage.captureLabel}</strong>
                      </div>
                    )}
                  </figure>

                  <div className="graph-focus__tour-stage-copy">
                    <div className="graph-focus__tour-stage-meta">
                      <span>{String(stageIndex + 1).padStart(2, "0")}</span>
                      <p>
                        {stage.roles.map((role) => (
                          <span key={role}>{role}</span>
                        ))}
                      </p>
                    </div>
                    <h3>{stage.name}</h3>
                    <p>{stage.description}</p>
                    <ul>
                      {stage.actions.map((action) => (
                        <li key={action}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {chapter.id === block.crossCutting.afterChapterId && (
            <aside className="graph-focus__tour-crosscut">
              <header>
                <h2>{block.crossCutting.label}</h2>
                <p>{block.crossCutting.introduction}</p>
              </header>
              <div>
                {block.crossCutting.items.map((item) => (
                  <article key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.job}</p>
                  </article>
                ))}
              </div>
            </aside>
          )}
        </div>
      ))}
    </div>
  );
}

function EditorialContent({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return (
    <article
      key={content.id}
      className={`graph-focus__content graph-focus__content--${content.layout ?? "editorial"} graph-focus__content--${content.id}`}
    >
      <p className="graph-focus__eyebrow">
        {path.map((segment, index) => (
          <span key={segment}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {segment}
          </span>
        ))}
      </p>
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

          if (block.type === "statements") {
            return (
              <div className="graph-focus__statements" key={blockIndex}>
                {block.items.map((item) => (
                  <div key={`${item.label ?? "statement"}-${item.text}`}>
                    {item.label && <span>{item.label}</span>}
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            );
          }

          if (block.type === "pull-quote") {
            return (
              <blockquote className="graph-focus__pull-quote" key={blockIndex}>
                {block.text}
              </blockquote>
            );
          }

          if (block.type === "fragments") {
            return (
              <div className="graph-focus__fragments" key={blockIndex}>
                {block.items.map((item) => (
                  <figure key={item.text}>
                    <blockquote>{item.text}</blockquote>
                    {item.source && (
                      <figcaption>from “{item.source}”</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            );
          }

          if (block.type === "roster") {
            return (
              <div className="graph-focus__roster" key={blockIndex}>
                {block.people.map((person) => (
                  <article key={person.name}>
                    <div>
                      <h3>{person.name}</h3>
                      {person.role && <p>{person.role}</p>}
                    </div>
                    {person.quote && <blockquote>“{person.quote}”</blockquote>}
                  </article>
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

          if (block.type === "product-tour") {
            return (
              <ProductTour block={block} key={`${content.id}-${blockIndex}`} />
            );
          }

          if (block.type === "relationship-atlas") {
            return (
              <div className="graph-focus__atlas" key={blockIndex}>
                <div className="graph-focus__atlas-relations">
                  {block.relationships.map((relationship, index) => (
                    <article
                      className={`graph-focus__atlas-relation graph-focus__atlas-relation--${relationship.weight ?? "secondary"}`}
                      key={relationship.name}
                      style={{ "--atlas-index": index } as React.CSSProperties}
                    >
                      <header>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div>
                          <h3>{relationship.name}</h3>
                          {relationship.context && <p>{relationship.context}</p>}
                        </div>
                      </header>
                      <p className="graph-focus__atlas-intro">
                        {relationship.introduction}
                      </p>
                      <div className="graph-focus__atlas-exchange">
                        <p>
                          <span>Their field</span>
                          {relationship.theirField}
                        </p>
                        <span className="graph-focus__atlas-axis" aria-hidden="true">
                          <i />
                          <i />
                        </span>
                        <p>
                          <span>Our part</span>
                          {relationship.sharedWork}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {block.europeanField && (
                  <section className="graph-focus__network-field">
                    <p className="graph-focus__network-field-kicker">
                      Across Europe
                    </p>
                    <h3>{block.europeanField.heading}</h3>
                    <p className="graph-focus__network-field-intro">
                      {block.europeanField.introduction}
                    </p>

                    <div className="graph-focus__network-field-organisations">
                      {block.europeanField.organisations.map((organisation) => (
                        <article key={organisation.name}>
                          <p>{organisation.location}</p>
                          <h4>{organisation.name}</h4>
                          <div>{organisation.description}</div>
                          {organisation.quote && (
                            <blockquote>
                              {"\u201c"}
                              {organisation.quote}
                              {"\u201d"}
                              {organisation.attribution && (
                                <cite>{organisation.attribution}</cite>
                              )}
                            </blockquote>
                          )}
                        </article>
                      ))}
                    </div>
                    {block.europeanField.note && (
                      <p className="graph-focus__network-field-note">
                        {block.europeanField.note}
                      </p>
                    )}
                  </section>
                )}
              </div>
            );
          }

          if (block.type === "key-points") {
            return (
              <ul className="graph-focus__key-points" key={blockIndex}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }

          return null;
        })}
      </div>
    </article>
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
  const selectedTopicId = routedTopic?.id;
  const selectedTopic = selectedTopicId ? topics[selectedTopicId] : undefined;
  const selectedBrief = contentGraphRegistry.briefs.find(
    (brief) => brief.nodeId === selectedTopicId,
  );
  const selectedTerritory = routedTopic?.territory ?? routedTerritory?.id;
  const expandedTerritory = routedTerritory?.id ?? null;
  const activeTopics = expandedTerritory
    ? territories[expandedTerritory].topics.map((topicId) => topics[topicId])
    : [];
  const selectedNodeId =
    selectedTopicId ?? routedTerritory?.nodeId ?? "root-learngraph";
  const selectedNode = contentGraphRegistry.nodes.find(
    (node) => node.id === selectedNodeId,
  );
  const selectedContent = selectedNode?.contentId
    ? contentGraphRegistry.contents.find(
        (content) => content.id === selectedNode.contentId,
      )
    : undefined;

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
    if (expandedTerritory === territoryId && !selectedTopicId) {
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

          <button
            type="button"
            className={`graph-core ${selectedNodeId === "root-learngraph" ? "graph-core--selected" : ""}`}
            onClick={() =>
              navigate({
                pathname: "/",
                search: palette === "blue" ? "?palette=blue" : "",
              })
            }
            aria-pressed={selectedNodeId === "root-learngraph"}
            aria-label="Open the LearnGraph introduction"
          >
            <span>LG</span>
          </button>

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
          <button
            type="button"
            className={`graph-mobile-core ${selectedNodeId === "root-learngraph" ? "is-active" : ""}`}
            onClick={() =>
              navigate({
                pathname: "/",
                search: palette === "blue" ? "?palette=blue" : "",
              })
            }
          >
            LEARNGRAPH
          </button>
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

      {(selectedContent || selectedTopic) && (
        <section
          id="editorial-workbench"
          ref={focusRef}
          className={`graph-focus ${selectedContent?.layout === "atlas" ? "graph-focus--atlas" : ""} ${selectedContent?.layout === "impact" ? "graph-focus--impact" : ""} ${selectedContent?.layout === "frontiers" ? "graph-focus--frontiers" : ""} ${selectedContent?.layout === "product-tour" ? "graph-focus--product-tour" : ""}`}
          aria-live="polite"
        >
          <div className="graph-focus__rail">
            <span>Path in focus</span>
            <span className="graph-focus__index">
              {selectedTopicId && selectedTerritory
                ? `${String(
                    territories[selectedTerritory].topics.indexOf(
                      selectedTopicId,
                    ) + 1,
                  ).padStart(2, "0")}/${String(
                    territories[selectedTerritory].topics.length,
                  ).padStart(2, "0")}`
                : selectedTerritory
                  ? "Territory"
                  : "Root"}
            </span>
          </div>

          {selectedContent ? (
            <EditorialContent
              content={selectedContent}
              path={
                selectedTerritory
                  ? [
                      territories[selectedTerritory].label,
                      ...(selectedTopic ? [selectedTopic.label] : []),
                    ]
                  : ["LearnGraph"]
              }
            />
          ) : selectedTopic ? (
            <article key={selectedTopic.id} className="graph-focus__content">
              <p className="graph-focus__eyebrow">
                <span>{territories[selectedTopic.territory].label}</span>
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
                    <p>
                      No factual blocker identified before editorial review.
                    </p>
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
          ) : null}

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
