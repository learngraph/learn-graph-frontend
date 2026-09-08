import type { NodeContent } from "../../types";

export const learningWithoutFrontiersContent = {
  id: "content-collaborate-learning-without-frontiers",
  publicationStatus: "review",
  layout: "frontiers",
  lead: "Access to education still depends far too much on where someone was born, what they can afford and which institutions happen to be available to them.",
  sourceRefs: ["Owner-provided editorial draft 01 · 7 September 2026"],
  blocks: [
    {
      type: "prose",
      truthStatus: "principle",
      paragraphs: [
        "LearnGraph was built to make learning infrastructure travel further than those limits.",
      ],
    },
    {
      type: "statements",
      truthStatus: "principle",
      items: [
        {
          label: "When money decides who gets to keep learning",
          text: "Open educational infrastructure matters most where access would otherwise depend on what someone can pay for.",
        },
        {
          label: "When language becomes a border",
          text: "A learning path can move across languages while the underlying structure stays connected.",
        },
        {
          label: "When institutions disappear",
          text: "People still need structure, continuity and guidance when schools, universities or formal programs become unavailable.",
        },
        {
          label: "When education itself becomes restricted",
          text: "Digital learning infrastructure can keep knowledge moving where access is controlled, suppressed or politically constrained.",
        },
      ],
    },
    {
      type: "prose",
      kicker: "This is already happening",
      truthStatus: "verified-evidence",
      paragraphs: [
        "In Afghanistan, a teacher is using LearnGraph for language learning with women whose access to education has become severely restricted.",
        "The teaching happens locally. LearnGraph provides the structure around it: learning paths, material, continuity and a place where progress can keep moving.",
        "We would like to meet more people and organisations working in these spaces, and see what becomes possible together.",
      ],
    },
    {
      type: "pull-quote",
      truthStatus: "principle",
      text: "In many of these places, the missing piece is not motivation. It is infrastructure.",
    },
  ],
} as const satisfies NodeContent;
