import type { NodeContent, PartnershipFieldBlock } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import { CombinationField } from "./components/CombinationField";
import "./implementation-partnerships.css";

function isPartnershipField(
  block: NodeContent["blocks"][number],
): block is PartnershipFieldBlock {
  return block.type === "partnership-field";
}

export function ImplementationPartnershipsNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  const field = content.blocks.find(isPartnershipField);

  return (
    <NodeShell content={content} path={path}>
      {content.kicker && (
        <p className="graph-focus__content-kicker">{content.kicker}</p>
      )}
      {content.title && <h2>{content.title}</h2>}
      {content.lead && <p className="graph-focus__lead">{content.lead}</p>}

      {field && (
        <div className="partnership-field">
          {/* ── Section 1: What is already there? */}
          <section className="pf-section">
            <header className="pf-section__header">
              <p>The working mix</p>
            </header>
            <CombinationField
              contributions={field.contributions}
              reinforcement={field.reinforcement}
            />
          </section>

          {/* ── Closing node */}
          <section className="pf-section pf-section--closing">
            <h3 className="pf-closing__heading">{field.closing.heading}</h3>
            {field.closing.paragraphs.map((para, i) => (
              <p key={i} className="pf-closing__body">
                {para}
              </p>
            ))}
            <a href={field.action.href} className="graph-focus__action">
              {field.action.label}
            </a>
          </section>
        </div>
      )}
    </NodeShell>
  );
}
