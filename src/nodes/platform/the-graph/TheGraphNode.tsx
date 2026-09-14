import type { NodeContent } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./the-graph.css";

export function TheGraphNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return (
    <NodeShell content={content} path={path}>
      {content.title && <h2>{content.title}</h2>}
      {content.lead && <p className="graph-focus__lead">{content.lead}</p>}

      <article className="graph-focus__blocks graph-article">

        {/* ── Introduction ─────────────────────────────────────────────── */}
        <section className="graph-article__introduction">
          <p>
            Most learning platforms organise knowledge around content: courses,
            modules, files. When the course ends, the structure ends with it.
            The same topic taught in two places lives twice, unconnected.
          </p>
          <p>
            LearnGraph separates knowledge structure from content. The graph
            holds topics and the relationships between them. Resources, activity
            records, and learner progress attach to that structure without
            becoming part of it. When a cohort dissolves, what they mapped stays.
            When a learner moves on, the structure they worked with remains.
            The next person who needs it can start from there.
          </p>
        </section>

        {/* ── The actual graph ─────────────────────────────────────────── */}
        <section className="graph-article__section graph-article__section--visual">
          <header>
            <h3>What it looks like</h3>
          </header>
          <div className="graph-article__visual-block">
            {/*
             * TODO: Replace this static image with a live Neo4j graph render.
             * Planned interaction: scroll to zoom, pan, hover to reveal topic
             * name + connection count. The static snapshot below is a temporary
             * placeholder — the live render will be the centrepiece of this section.
             */}
            <div className="graph-article__network-image">
              <img
                src="/graph/graph-network.png"
                alt="The current LearnGraph knowledge graph — a dense cluster of connected topics with frontier nodes scattered at the edges"
                className="graph-article__network-img"
              />
              <figcaption className="graph-article__network-caption">
                <span className="graph-article__caption-item graph-article__caption-item--dense">
                  Dense centre: topics with many connections. Most paths route through here.
                </span>
                <span className="graph-article__caption-item graph-article__caption-item--frontier">
                  Frontier nodes: newer or more specialised topics, not yet deeply linked.
                </span>
              </figcaption>
            </div>
            <p className="graph-article__visual-note">
              This is the actual public graph, not a diagram. Every node is a
              real topic. Every edge is a real relationship. The clustering is
              not visual design; it is the shape of how knowledge connects.
            </p>
          </div>
        </section>

        {/* ── Three layers ─────────────────────────────────────────────── */}
        <section className="graph-article__section">
          <header>
            <h3>Why it stays stable</h3>
          </header>
          <div>
            <p>
              The public graph is shared by everyone, which means it cannot be
              freely overwritten by anyone. LearnGraph protects it by keeping
              three contexts separate. Personal graphs are private, experimental,
              yours to change without consequence. Cohort and institutional
              graphs are shared within a bounded group. The public graph is
              canonical: contributing to it is a deliberate editorial act, not a
              side effect of using the platform.
            </p>
            <p>
              Working in your own graph does not change anyone else's. The
              boundary between private experimentation and public knowledge is
              explicit by design.
            </p>

            <div className="graph-article__layers">
              <div className="graph-article__layer">
                <h4>Personal</h4>
                <p>Private, adaptable, experimental. Atlas Graph Gen and Atlas Graph Editor work here.</p>
              </div>
              <div className="graph-article__layer">
                <h4>Cohort &amp; institutional</h4>
                <p>Shared within a bounded group. The Cohort Graph Editor works here. Separate from the public structure.</p>
              </div>
              <div className="graph-article__layer graph-article__layer--public">
                <h4>Public</h4>
                <p>Canonical. Contribution is deliberate: draft, review, acceptance. Studio is the path in.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Closing structural rule ───────────────────────────────────── */}
        <footer className="graph-article__closing">
          <p>
            The graph, the journey, and the learner state are three different
            layers of the system, connected through the same knowledge structure.
            None of them needs to rewrite the others to do its job.
          </p>
        </footer>

      </article>
    </NodeShell>
  );
}
