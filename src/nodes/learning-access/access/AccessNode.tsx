import type { NodeContent } from "../../../content/graph";
import { EditorialContent } from "../../shared/EditorialContent";
import "./access.css";

export function AccessNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return <EditorialContent content={content} path={path} />;
}
