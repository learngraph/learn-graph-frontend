import type { NodeContent } from "../../../content/graph";
import { EditorialContent } from "../../shared/EditorialContent";
import "./frontiers.css";

export function FrontiersNode({
  content,
  path,
}: {
  content: NodeContent;
  path: string[];
}) {
  return <EditorialContent content={content} path={path} />;
}
