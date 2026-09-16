import type { NodeContent } from "../../content/graph";
import { NodeShell } from "./NodeShell";

export function EditorialContent({
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
    </NodeShell>
  );
}
