import type {
  NodeContent,
  PartnershipFieldBlock,
} from "../../../content/graph";

export const implementationPartnershipField = {
  type: "partnership-field",

  contributions: [
    {
      id: "local-knowledge",
      label: "Local knowledge",
      description: "Knows the setting from the inside",
    },
    {
      id: "relationships",
      label: "Relationships",
      description: "Creates access that cannot be manufactured from outside",
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      description:
        "Brings systems, institutions, devices or technical routes already in place",
    },
    {
      id: "resources",
      label: "Resources",
      description: "Adds funding, capacity, time or operational support",
    },
    {
      id: "learngraph",
      label: "LearnGraph",
      description: "Adds digital learning structure and implementation capacity",
    },
  ],

  reinforcement: {
    heading: "Shaping the work",
    intro:
      "A partnership becomes useful when different strengths start changing what the others can do.",
    paragraphs: [
      [
        {
          contributionId: "local-knowledge",
          text: "Local knowledge brings the realities of the setting into the implementation, while LearnGraph gives that knowledge a structure that can be connected, adapted, and carried further.",
        },
        {
          contributionId: "relationships",
          text: "Existing relationships create access and continuity around the people the work is meant to reach, while LearnGraph provides a shared environment in which that learning can continue over time.",
        },
      ],
      [
        {
          contributionId: "infrastructure",
          text: "Infrastructure gives the implementation somewhere real to live: inside institutions, systems, devices, and technical routes that already exist.",
        },
        {
          contributionId: "resources",
          text: "Resources create the time and capacity to develop, test, adapt, and extend the work properly.",
        },
      ],
      [
        {
          contributionId: "learngraph",
          text: "LearnGraph brings the graph itself, the learning structures, adaptation, multilingual support, and technical implementation.",
        },
        {
          contributionId: "learngraph",
          text: "The partnership gives those capabilities context, purpose, and a place to develop through use.",
        },
      ],
    ],
    closing:
      "The strongest implementations emerge when those contributions begin to reinforce one another.",
  },

  closing: {
    heading: "Built together",
    paragraphs: [
      "The strongest implementation comes from a real combination of strengths.",
      "Local knowledge changes the structure. The structure gives that knowledge reach. Relationships open paths into the real context. Infrastructure gives the work somewhere to live. Resources give it room to grow.",
      "LearnGraph brings those forces into one learning system and develops with them.",
      "That is what makes the implementation more than the sum of its parts.",
    ],
  },

  action: {
    label: "Start a partnership conversation",
    href: "mailto:contact@learngraph.org?subject=Implementation%20partnership",
  },

  truthStatus: "proposed-application",
  sourceRefs: [
    "Afghan Women Project · partnership, implementation, pilot-phase, and pilot-scope documents",
    "LG Project Presentation · sections 08–09",
    "docs/architecture/collaborate-source-map.md · B3 Foundation and implementation partnership pathway",
  ],
  reviewNote:
    "This is a proposed model, not evidence of completed implementation partnerships. Active partnership types and current delivery capacity still require owner confirmation.",
} as const satisfies PartnershipFieldBlock;

export const implementationPartnershipsContent = {
  id: "content-collaborate-implementation-partnerships",
  publicationStatus: "review",
  layout: "partnership-field",
  kicker: "Implementation partnerships",
  title: "The work has more than one owner",
  lead: "LearnGraph can provide a digital structure. A real implementation also depends on people who understand the context, hold trust, support learning, and make continuation possible.",
  blocks: [implementationPartnershipField],
  sourceRefs: implementationPartnershipField.sourceRefs,
} as const satisfies NodeContent;
