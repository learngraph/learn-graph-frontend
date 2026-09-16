import type { NodeContent } from "../../content/graph";
import { resolveNodeView } from "../../nodes/nodeViews";

export function NodeRenderer({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  const NodeView = resolveNodeView(content);
  return <NodeView content={content} path={path} />;
}
