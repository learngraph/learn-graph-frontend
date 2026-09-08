import type { NodeContent } from "../../types";
import { nodeContentSource } from "../source";

export const modelContent = {
  id: "content-platform-model",
  publicationStatus: "review",
  layout: "editorial",
  title: "A Graph That Grows",
  lead: "LearnGraph builds learning journeys inside a graph that keeps expanding.",
  sourceRefs: [`${nodeContentSource}/Platform/The model.docx`],
  blocks: [
    {
      type: "statements",
      reviewNote:
        "Current access and authoring boundaries require verification.",
      items: [
        {
          label: "01",
          text: "Every user can generate, adjust and personalize their own journeys.",
        },
        {
          label: "02",
          text: "Schools, academies and other organizations can create shared learning environments, organize cohorts, assign roles and shape journeys around specific groups.",
        },
        {
          label: "03",
          text: "People with expertise can turn what they know into structured learning paths others can use.",
        },
        {
          label: "04",
          text: "Public contributors can use the Studio editor to build new knowledge structures and add them to the shared network.",
        },
      ],
    },
    {
      type: "prose",
      paragraphs: [
        "A journey created for one learner can become useful to a class. A structure built for one community can be adapted somewhere else. What enters the graph can remain connected beyond the course, project or institution that created it.",
        "Underneath, LearnGraph stores relationships as first-class data. The platform knows how concepts, journeys, resources, people and evidence connect, which lets it work directly with prerequisites, alternatives, context and change.",
      ],
    },
    {
      type: "pull-quote",
      text: "LearnGraph turns learning from isolated tasks into a landscape people can enter, shape and share.",
    },
  ],
} as const satisfies NodeContent;
