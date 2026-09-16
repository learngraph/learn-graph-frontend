import type { NodeContent } from "../../content/graph";

export function NodeShell({
  content,
  path,
  children,
}: {
  content: NodeContent;
  path: string[];
  children: React.ReactNode;
}) {
  return (
    <article
      className={`graph-focus__content graph-focus__content--${content.layout ?? "editorial"} graph-focus__content--${content.id}`}
    >
      <p className="graph-focus__eyebrow">
        {path.map((segment, index) => (
          <span key={segment}>
            {index > 0 && <span aria-hidden="true">/</span>}
            {segment}
          </span>
        ))}
      </p>
      {children}
    </article>
  );
}
