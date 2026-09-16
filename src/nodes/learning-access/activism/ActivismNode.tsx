import { ArrowUpRight } from "lucide-react";
import type { NodeContent } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import "./activism.css";

export function ActivismNode({
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

      <div className="activism-content">
        {content.blocks.map((block, index) => {
          if (block.type === "statements") {
            return (
              <div className="activism-principles" key={index}>
                {block.items.map((item) => (
                  <section key={item.label}>
                    {item.label && <h3>{item.label}</h3>}
                    <p>{item.text}</p>
                  </section>
                ))}
              </div>
            );
          }

          if (block.type === "prose") {
            return (
              <section className="activism-section" key={index}>
                {block.kicker && <h3>{block.kicker}</h3>}
                {block.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            );
          }

          if (block.type === "key-points") {
            return (
              <section className="activism-section" key={index}>
                {block.kicker && <h3>{block.kicker}</h3>}
                <ul>
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            );
          }

          if (block.type === "action") {
            return (
              <a
                className="activism-action"
                href={block.href}
                key={index}
                rel={block.external ? "noreferrer" : undefined}
                target={block.external ? "_blank" : undefined}
              >
                {block.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            );
          }

          return null;
        })}
      </div>
    </NodeShell>
  );
}
