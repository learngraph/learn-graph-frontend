import type {
  NodeContent,
  RelationshipAtlasBlock,
} from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./network.css";

function RelationshipAtlas({ block }: { block: RelationshipAtlasBlock }) {
  return (
    <div className="graph-focus__atlas">
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
          <p className="graph-focus__network-field-kicker">Across Europe</p>
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

export function NetworkNode({
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
          if (block.type === "relationship-atlas") {
            return (
              <RelationshipAtlas
                block={block}
                key={`${content.id}-${blockIndex}`}
              />
            );
          }
          return null;
        })}
      </div>
    </NodeShell>
  );
}
