import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

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
        { name: "Laurin Hagemann", role: "CEO" },
        { name: "Arsham Delvarani", role: "Business Developer" },
        { name: "Muhammad Talal", role: "Development Engineer" },
        {
          name: "Lea Aimée von Freital",
          role: "Design & Visual Systems",
        },
        { name: "Phil Wolframm", role: "Backend Engineering" },
        { name: "Jamal Daho", role: "Senior Consultant" },
        { name: "Julius" },
        { name: "Avi Gupta" },
        { name: "Varun Kukreja" },
      ],
    },
  ],
} as const satisfies NodeContent;
