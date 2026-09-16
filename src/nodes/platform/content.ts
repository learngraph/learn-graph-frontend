import type { NodeContent } from "../../content/graph";
import { nodeContentSource } from "../../content/graph/editorial/source";

export const platformContent = {
  id: "content-platform-introduction",
  publicationStatus: "review",
  layout: "compact",
  kicker: "The Platform",
  title: "Autonomy by design",
  lead: "LearnGraph makes learning a journey you can see, shape and share. What people know, learn, build and pass on becomes part of one interactive landscape.",
  sourceRefs: [`${nodeContentSource}/Platform.docx`],
  blocks: [
    {
      type: "statements",
      items: [
        {
          label: "Model",
          text: "Knowledge becomes a graph of prerequisites, alternatives and possible routes. The structure grows as people learn, build and contribute.",
        },
        {
          label: "Using LearnGraph",
          text: "Atlas, Zone, Skill Library, Cohorts, Organisation and Studio form one connected environment for learning, guiding, organising and contributing.",
        },
        {
          label: "Inclusive Learning",
          text: "Journeys can move across languages, while content can take different forms around different learning needs.",
        },
      ],
    },
  ],
} as const satisfies NodeContent;
