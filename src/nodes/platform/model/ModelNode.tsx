import type { ModelSystemBlock, NodeContent } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import { SystemPlate } from "./components/SystemPlate";
import "./model.css";

function ModelSystem({ block }: { block: ModelSystemBlock }) {
  return (
    <section className="graph-focus__model-specimen">
      <SystemPlate plate={block.plate} />
    </section>
  );
}

export function ModelNode({
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
          if (block.type === "model-system") {
            return (
              <ModelSystem block={block} key={`${content.id}-${blockIndex}`} />
            );
          }
          return null;
        })}
      </div>
    </NodeShell>
  );
}
