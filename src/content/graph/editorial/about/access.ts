import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

export const accessContent = {
  id: "content-about-access",
  publicationStatus: "review",
  layout: "editorial",
  title: "Direction is not decoration. It is part of access.",
  lead: "LearnGraph carries educational material across distance, language and circumstance. It gives that material structure where it is needed.",
  sourceRefs: [
    `${nodeContentSource}/About/Access.docx`,
    `${nodeContentSource}/LG.docx`,
  ],
  blocks: [
    {
      type: "statements",
      truthStatus: "requires-verification",
      reviewNote:
        "These contexts currently mix implemented capability, intended application, and founding direction.",
      items: [
        {
          label: "Homeschooling",
          text: "Structured resources, continuous learning, co-learning and mentors without depending on a conventional school setting.",
        },
        {
          label: "Across countries",
          text: "People can continue from the knowledge and experience they already carry. In multilingual classrooms, teachers can work from one shared structure while learners move through content in different languages and forms.",
        },
        {
          label: "Before release",
          text: "Inmates can use the time before release to build skills and strengthen an academic foundation for rehabilitation and reintegration.",
        },
        {
          label: "Returning",
          text: "Adults returning to education can re-enter from the knowledge and experience they already carry.",
        },
      ],
    },
    {
      type: "pull-quote",
      text: "The result is a learning structure that keeps moving even when the surrounding circumstances change.",
    },
  ],
} as const satisfies NodeContent;
