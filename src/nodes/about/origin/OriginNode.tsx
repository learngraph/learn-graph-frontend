import type { NodeContent } from "../../../content/graph";
import { EditorialContent } from "../../shared/EditorialContent";
import "./origin.css";

export function OriginNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return <EditorialContent content={content} path={path} />;
}
