import type { NodeContent } from "../types";
import { nodeContentSource } from "./source";

export const learngraphContent = {
  id: "content-lg-introduction",
  publicationStatus: "review",
  layout: "composition",
  sourceRefs: [`${nodeContentSource}/LG.docx`],
  blocks: [
    {
      type: "fragments",
      items: [
        {
          text: "The world is full of educational material. That should have changed everything. In many cases, it has changed less than promised.",
          source: "About",
        },
        {
          text: "Direction is not decoration. It is part of access.",
          source: "Access",
        },
        {
          text: "LearnGraph turns learning from isolated tasks into a landscape people can enter, shape and share.",
          source: "A Graph That Grows",
        },
      ],
    },
  ],
} as const satisfies NodeContent;
