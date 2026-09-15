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
  publicTerritoryOrder,
  territories,
  territoryIsPublic,
  territoryFromSlug,
  territoryOrder,
  topicIdsForView,
  topicIsPublic,
  topicFromRoute,
  topics,
  type TerritoryId,
  type TopicId,
} from "./graphModel";
import { EditorialWorkbench } from "./EditorialWorkbench";
import { GraphCanvas } from "./GraphCanvas";
import { NodeRenderer } from "./NodeRenderer";
import { contentGraphRegistry } from "../../content/graph";
import "./graphWebsite.css";

function isTopicId(value: string | null): value is TopicId {
  return value !== null && value in topics;
}

export default function GraphWebsite() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { territorySlug, topicSlug } = useParams<{
    territorySlug?: string;
    topicSlug?: string;
  }>();
  const palette = searchParams.get("palette") === "blue" ? "blue" : "green";
  const publicPreview = searchParams.get("view") === "public";
  const editorialView = import.meta.env.DEV && !publicPreview;
  const displayedTerritoryOrder = editorialView
    ? territoryOrder
    : publicTerritoryOrder;
  const navigationParams = new URLSearchParams();
  if (palette === "blue") navigationParams.set("palette", "blue");
  if (publicPreview) navigationParams.set("view", "public");
  const navigationQuery = navigationParams.toString();
  const navigationSearch = navigationQuery ? `?${navigationQuery}` : "";
  const graphRef = useRef<HTMLElement>(null);
  const focusRef = useRef<HTMLElement>(null);
  const focusRevealTimerRef = useRef<number | null>(null);
  const requestedFocus = searchParams.get("focus");
  const requestedTerritory = territoryFromSlug(territorySlug);
  const routedTerritory =
    requestedTerritory &&
    (editorialView || territoryIsPublic(requestedTerritory.id))
      ? requestedTerritory
      : undefined;
  const requestedTopic = topicFromRoute(routedTerritory, topicSlug);
  const routedTopic =
    requestedTopic && (editorialView || topicIsPublic(requestedTopic.id))
      ? requestedTopic
      : undefined;
  const selectedTopicId = routedTopic?.id;
  const selectedTopic = selectedTopicId ? topics[selectedTopicId] : undefined;
  const selectedBrief = contentGraphRegistry.briefs.find(
    (brief) => brief.nodeId === selectedTopicId,
  );
  const selectedTerritory = routedTopic?.territory ?? routedTerritory?.id;
  const expandedTerritory = routedTerritory?.id ?? null;
  const activeTopics = expandedTerritory
    ? topicIdsForView(expandedTerritory, editorialView).map(
        (topicId) => topics[topicId],
      )
    : [];
  const selectedNodeId =
    selectedTopicId ?? routedTerritory?.nodeId ?? "root-learngraph";
  const selectedNode = contentGraphRegistry.nodes.find(
    (node) => node.id === selectedNodeId,
  );
  const selectedContentCandidate = selectedNode?.contentId
    ? contentGraphRegistry.contents.find(
        (content) => content.id === selectedNode.contentId,
      )
    : undefined;
  const selectedContent =
    selectedContentCandidate &&
    (editorialView ||
      selectedContentCandidate.publicationStatus === "publishable")
      ? selectedContentCandidate
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
      search: navigationSearch,
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
        search: navigationSearch,
      });
      return;
    }

    navigate({
      pathname: `/${territories[territoryId].slug}`,
      search: navigationSearch,
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
    return <Navigate to={`/${navigationSearch}`} replace />;
  }

  if (topicSlug && !routedTopic && routedTerritory) {
    return (
      <Navigate to={`/${routedTerritory.slug}${navigationSearch}`} replace />
    );
  }

  return (
    <main
      className="graph-site"
      data-palette={palette}
      data-view={editorialView ? "editorial" : "public"}
    >
      <header className="graph-site__masthead">
        <button
          type="button"
          className="graph-site__brand"
          onClick={() =>
            navigate({
              pathname: "/",
              search: navigationSearch,
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
          Learning becomes navigable when relationships become visible
        </h1>
        <p>
          Start anywhere. Follow a relationship through the product and the
          thinking beneath it
        </p>
      </section>

      <GraphCanvas
        ref={graphRef}
        displayedTerritoryOrder={displayedTerritoryOrder}
        expandedTerritory={expandedTerritory}
        activeTopics={activeTopics}
        selectedTopicId={selectedTopicId}
        selectedNodeId={selectedNodeId}
        onNavigateRoot={() =>
          navigate({
            pathname: "/",
            search: navigationSearch,
          })
        }
        onSelectTerritory={selectTerritory}
        onSelectTopic={selectTopic}
      />

      {(selectedContent || selectedTopic) && (
        <section
          id="editorial-workbench"
          ref={focusRef}
          className={`graph-focus${selectedContent?.layout ? ` graph-focus--${selectedContent.layout}` : ""}`}
          aria-live="polite"
        >
          <div className="graph-focus__rail">
            <span>Path in focus</span>
            <span className="graph-focus__index">
              {selectedTopicId && selectedTerritory
                ? `${String(
                    activeTopics.findIndex(
                      (topic) => topic.id === selectedTopicId,
                    ) + 1,
                  ).padStart(2, "0")}/${String(activeTopics.length).padStart(
                    2,
                    "0",
                  )}`
                : selectedTerritory
                  ? "Territory"
                  : "Root"}
            </span>
          </div>

          {selectedContent ? (
            <NodeRenderer
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
            <EditorialWorkbench
              topic={selectedTopic}
              brief={selectedBrief}
            />
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
