import { useEffect, useRef, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
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
import {
  BLUE_GRAPH_HUE,
  DEFAULT_GRAPH_HUE,
  blueGraphPalette,
  graphPaletteForHue,
  greenGraphPalette,
  parseHue,
} from "./graphPalette";
import { contentGraphRegistry } from "../../content/graph";
import "./graphWebsite.css";

function isTopicId(value: string | null): value is TopicId {
  return value !== null && value in topics;
}

export default function GraphWebsite() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { territorySlug, clusterSlug, topicSlug } = useParams<{
    territorySlug?: string;
    clusterSlug?: string;
    topicSlug?: string;
  }>();
  const legacyPalette =
    searchParams.get("palette") === "blue" ? "blue" : "green";
  const requestedHue = parseHue(searchParams.get("hue"));
  const hue =
    requestedHue ??
    (legacyPalette === "blue" ? BLUE_GRAPH_HUE : DEFAULT_GRAPH_HUE);
  const graphPalette =
    requestedHue !== undefined
      ? graphPaletteForHue(hue)
      : legacyPalette === "blue"
        ? blueGraphPalette
        : greenGraphPalette;
  const graphStyle = {
    "--graph-accent-rgb": graphPalette.accentRgb,
    "--graph-ambient-rgb": graphPalette.ambientRgb,
    "--graph-bg-root": `rgb(${graphPalette.backgroundRgb})`,
    "--graph-node-bg-rgb": graphPalette.backgroundRgb,
    "--graph-ambient-alpha": graphPalette.ambientAlpha,
  } as CSSProperties;
  const publicPreview = searchParams.get("view") === "public";
  const editorialView = import.meta.env.DEV && !publicPreview;
  const displayedTerritoryOrder = editorialView
    ? territoryOrder
    : publicTerritoryOrder;
  const navigationParams = new URLSearchParams();
  if (requestedHue !== undefined) {
    navigationParams.set("hue", String(Math.round(hue)));
  } else if (legacyPalette === "blue") {
    navigationParams.set("palette", "blue");
  }
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
  const requestedTopic = topicFromRoute(
    routedTerritory,
    topicSlug,
    clusterSlug,
  );
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

  const selectHue = (nextHue: number) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete("palette");
    nextParams.set("hue", String(Math.round(nextHue)));
    setSearchParams(nextParams, { replace: true });
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
      data-palette={requestedHue === undefined ? legacyPalette : "spectrum"}
      data-view={editorialView ? "editorial" : "public"}
      style={graphStyle}
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
          className={`graph-focus graph-focus--with-utility${selectedContent?.layout ? ` graph-focus--${selectedContent.layout}` : ""}`}
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
                      ...(selectedTopic?.clusterLabel
                        ? [selectedTopic.clusterLabel]
                        : []),
                      ...(selectedTopic ? [selectedTopic.label] : []),
                    ]
                  : ["LearnGraph"]
              }
            />
          ) : selectedTopic ? (
            <EditorialWorkbench topic={selectedTopic} brief={selectedBrief} />
          ) : null}

          <div className="graph-focus__utility">
            <label className="graph-hue-control graph-focus__hue">
              <span>Colour</span>
              <input
                type="range"
                min="0"
                max="359"
                step="1"
                value={Math.round(hue)}
                onChange={(event) => selectHue(Number(event.target.value))}
                aria-label="Graph colour"
                aria-valuetext={`${Math.round(hue)} degrees`}
              />
            </label>

            <div className="graph-focus__return">
              <button type="button" onClick={returnToGraph}>
                Return to graph
              </button>
            </div>
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
