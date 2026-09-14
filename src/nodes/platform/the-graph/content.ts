import type { NodeContent } from "../../../content/graph";

export const theGraphContent = {
  id: "content-platform-graph",
  publicationStatus: "review",
  layout: "graph-essay",
  title: "THE GRAPH",
  lead: "LearnGraph begins with what knowledge depends on, enables and connects to",
  sourceRefs: [
    "source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx",
    "src/nodes/platform/model/content.ts",
    "src/nodes/platform/using-learngraph/content.ts",
  ],
  blocks: [],
} as const satisfies NodeContent;
