import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

export const inclusiveLearningContent = {
  id: "content-platform-inclusive-learning",
  publicationStatus: "review",
  layout: "editorial",
  title: "One journey does not need one way of being taught.",
  sourceRefs: [`${nodeContentSource}/Platform/Inclusive Learning.docx`],
  blocks: [
    {
      type: "prose",
      paragraphs: [
        "LearnGraph is being built so the same learning structure can adapt to very different people. Language can change. Content can be presented differently. Guidance can become more focused, more visual, more structured, or quieter where that helps.",
        "The work goes further than adding an accessibility layer after the platform is finished. Different learning needs are part of how the experience itself is designed.",
        "That includes neurodiverse learners, people who struggle with focus, people rebuilding confidence after difficult educational experiences, and learners whose circumstances simply do not fit the standard classroom model.",
      ],
    },
    {
      type: "statements",
      truthStatus: "requires-verification",
      reviewNote:
        "Tool availability and public names require a product check.",
      items: [
        {
          label: "A growing toolbox",
          text: "Focus support, learning practices and neurodiversity controls let learners adjust how content and guidance are presented.",
        },
      ],
    },
    {
      type: "pull-quote",
      text: "The structure can stay shared while the way into it becomes personal.",
    },
  ],
} as const satisfies NodeContent;
