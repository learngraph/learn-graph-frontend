import { useState } from "react";
import type { ModelSystemBlock } from "../../../../content/graph";

interface SystemPlateProps {
  plate: ModelSystemBlock["plate"];
}

export function SystemPlate({ plate }: SystemPlateProps) {
  const [hoveredPlateNodeId, setHoveredPlateNodeId] = useState("");

  return (
    <section className="graph-focus__system-plate">
      <header>
        <p>SYSTEM PLATE</p>
      </header>

      <div className="graph-focus__system-field">
        {hoveredPlateNodeId && (
          <span
            aria-hidden="true"
            className="graph-focus__system-beam"
            data-panel={hoveredPlateNodeId}
          />
        )}
        <div className="graph-focus__system-core">
          <strong>LearnGraph</strong>
          <span>shared relation model</span>
        </div>
        {plate.nodes.map((node) => (
          <article
            className="graph-focus__system-panel"
            data-panel={node.id}
            key={node.id}
            onMouseEnter={() => setHoveredPlateNodeId(node.id)}
            onMouseLeave={() => setHoveredPlateNodeId("")}
          >
            <strong>{node.name}</strong>
            <span className="graph-focus__system-node-description">
              {node.description}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
