import type { NodeContent, ProductTourBlock } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./using-learngraph.css";

function ProductTour({ block }: { block: ProductTourBlock }) {
  return (
    <div className="graph-focus__product-tour">
      {block.roleSummaries.length > 0 && (
        <div
          className="graph-focus__tour-roles"
          aria-label="Ways to use LearnGraph"
        >
          {block.roleSummaries.map((item, index) => (
            <article key={item.role}>
              <span className="graph-focus__tour-role-index">
                {String(index + 1).padStart(2, "0")}
              </span>
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
      )}

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

          {block.crossCutting &&
            chapter.id === block.crossCutting.afterChapterId && (
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

export function UsingLearnGraphNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return (
    <NodeShell content={content} path={path}>
      {content.kicker && (
        <p className="graph-focus__content-kicker">{content.kicker}</p>
      )}
      {content.title && <h2>{content.title}</h2>}
      {content.lead && <p className="graph-focus__lead">{content.lead}</p>}

      <div className="graph-focus__blocks">
        {content.blocks.map((block, blockIndex) => {
          if (block.type === "product-tour") {
            return (
              <ProductTour block={block} key={`${content.id}-${blockIndex}`} />
            );
          }
          return null;
        })}
      </div>
    </NodeShell>
  );
}
