import type { NodeContent } from "../../../content/graph";
import { nodeContentSource } from "../../../content/graph/editorial/source";

export const originContent = {
  id: "content-about-origin",
  publicationStatus: "review",
  layout: "origin",
  title: "Before there was a graph",
  sourceRefs: [`${nodeContentSource}/About/Origin.docx`],
  blocks: [
    {
      type: "prose",
      paragraphs: [
        "LearnGraph started around a guy with the healthy habit of questioning systems before accepting their rules. The idea gathered a loose constellation: developers, students, educators, activists, people already working on access to learning in very different corners of the world. Some joined formally. Some simply kept showing up. The project grew from there.",
      ],
    },
  ],
} as const satisfies NodeContent;
