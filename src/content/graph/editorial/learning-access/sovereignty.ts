import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

export const sovereigntyContent = {
  id: "content-learning-access-sovereignty",
  publicationStatus: "review",
  layout: "editorial",
  title: "LearnGraph keeps a learner’s history in motion.",
  lead: "What someone knows, where they struggled and what they want next can remain part of the same evolving picture.",
  sourceRefs: [`${nodeContentSource}/Platform/Learning Sovereignty.docx`],
  blocks: [
    {
      type: "pull-quote",
      text: "“Maths” tells you almost nothing about where a learner actually stands.",
    },
    {
      type: "prose",
      truthStatus: "requires-verification",
      reviewNote:
        "Cross-course and cross-institution persistence must be checked against current end-to-end behaviour.",
      paragraphs: [
        "Someone can be strong in algebra, weak in statistics, experienced in one area and completely new to another. The graph can hold those differences instead of averaging them away and show where the next effort matters most.",
        "Journeys can shift as goals and circumstances change. Progress travels with the person who made it, across courses, institutions and changing contexts. The path evolves with them, and so does the picture of what they know.",
        "Learning can outlive the course. What was learned, built and connected can remain in the graph, evolve further and become part of what comes next.",
      ],
    },
  ],
} as const satisfies NodeContent;
