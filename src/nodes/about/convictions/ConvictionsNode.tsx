import type { NodeContent, ProseBlock } from "../../../content/graph";
import { NodeShell } from "../../shared/NodeShell";
import { AwarenessField } from "./AwarenessField";
import "./convictions.css";

function ManifestoSection({
  block,
  index,
}: {
  block: ProseBlock;
  index: number;
}) {
  const finalParagraphIndex = block.paragraphs.length - 1;
  // conclusionFrom in the content data marks where conclusion styling begins.
  // Falls back to the last paragraph only.
  const conclusionFrom = block.conclusionFrom ?? finalParagraphIndex;

  return (
    <section className={`convictions-section convictions-section--${index}`}>
      {block.kicker && <h3>{block.kicker}</h3>}
      <div className="convictions-section__copy">
        {block.paragraphs.map((paragraph, paragraphIndex) => (
          <p
            className={
              paragraphIndex >= conclusionFrom ? "is-conclusion" : undefined
            }
            key={paragraphIndex}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}

export function ConvictionsNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  const sections = content.blocks.filter(
    (block): block is ProseBlock => block.type === "prose",
  );
  const awareness = content.blocks.find((block) => block.type === "pull-quote");

  return (
    <NodeShell content={content} path={path}>
      <header className="convictions-opening">
        {content.kicker && (
          <p className="graph-focus__content-kicker">{content.kicker}</p>
        )}
        {content.title && <h2>{content.title}</h2>}
        {content.lead && (
          <p className="convictions-opening__lead">{content.lead}</p>
        )}
        {sections[0] && <ManifestoSection block={sections[0]} index={0} />}
      </header>

      {awareness && <AwarenessField phrase={awareness.text} />}

      <div className="convictions-chapters">
        {sections.slice(1).map((section, index) => (
          <ManifestoSection
            block={section}
            index={index + 1}
            key={section.kicker}
          />
        ))}
      </div>
    </NodeShell>
  );
}
