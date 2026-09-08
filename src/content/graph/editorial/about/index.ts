import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

export const aboutContent = {
  id: "content-about-introduction",
  publicationStatus: "review",
  layout: "compact",
  title: "The world is full of educational material.",
  lead: "That should have changed everything. In many cases, it has changed less than promised.",
  sourceRefs: [`${nodeContentSource}/About.docx`],
  blocks: [],
} as const satisfies NodeContent;
