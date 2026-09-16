import type { NodeContent } from "../../../content/graph";
import { nodeContentSource } from "../../../content/graph/editorial/source";

export const peopleContent = {
  id: "content-about-people",
  publicationStatus: "review",
  layout: "index",
  title: "Us",
  sourceRefs: [`${nodeContentSource}/About.docx`],
  blocks: [
    {
      type: "roster",
      reviewNote:
        "Incomplete roles, preferred public titles, and publication consent still need confirmation.",
      people: [
        { name: "Laurin Hagemann", role: "CEO & Backend Lead" },
        { name: "Muhammad Talal", role: "Development Engineer" },
        { name: "Varun Kukreja", role: "Finance & Project Support" },
        { name: "Arsham Delvarani", role: "Business Developer" },
        { name: "Phil Wolframm", role: "Outreach & Project Support" },
        { name: "Jamal Daho", role: "Senior Consultant" },
        { name: "Lea Aimée von Freital", role: "Design & Visual Systems" },
      ],
    },
  ],
} as const satisfies NodeContent;
