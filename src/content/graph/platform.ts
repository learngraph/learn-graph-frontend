import type {
  ContentArtifact,
  ContentRelationship,
  NodeContent,
} from "./types";

const projectPresentation =
  "source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx";
const legacySummary = "source-material/raw/Websiste legacy content .docx";

export const platformContents = [
  {
    id: "content-platform-model",
    publicationStatus: "draft",
    title: "Learning becomes navigable when its relationships become visible.",
    lead: "LearnGraph connects people, abilities, goals, learning material, and opportunities in one shared model.",
    sourceRefs: [projectPresentation, legacySummary],
    blocks: [
      {
        type: "prose",
        truthStatus: "principle",
        sourceRefs: [projectPresentation],
        paragraphs: [
          "A catalogue can tell you what exists. A graph can show relationships: between what a person knows, what they want to reach, and what may help them move.",
          "The model is useful only when those relationships create orientation for people and a shared structure for those supporting them.",
        ],
      },
      {
        type: "key-points",
        truthStatus: "requires-verification",
        sourceRefs: [projectPresentation],
        reviewNote:
          "Confirm the entities and relationships implemented in the current release before this becomes public copy.",
        items: [
          "People and their goals",
          "Knowledge, skills, or competences",
          "Learning material and activity",
          "Evidence, support, and opportunities",
        ],
      },
      {
        type: "artifact-reference",
        artifactIds: ["artifact-platform-model-diagram"],
      },
      {
        type: "action",
        label: "Enter the platform",
        href: "https://app.learngraph.org",
        external: true,
      },
    ],
  },
  {
    id: "content-platform-personal-paths",
    publicationStatus: "draft",
    title: "A path begins with where you are—not with a generic catalogue.",
    lead: "A shared map can turn a goal and a starting point into an understandable route.",
    sourceRefs: [projectPresentation, legacySummary],
    blocks: [
      {
        type: "prose",
        truthStatus: "principle",
        sourceRefs: [projectPresentation],
        paragraphs: [
          "A useful path makes the destination, the gaps, and the reason for each step legible without pretending that every learner should follow the same sequence.",
          "As a person learns and produces evidence, the route should be able to change with them.",
        ],
      },
      {
        type: "key-points",
        truthStatus: "requires-verification",
        reviewNote:
          "Confirm which orientation, gap, next-step, and path-adaptation behaviours the current product actually performs.",
        items: [
          "Start from an existing position",
          "Make goals and gaps visible",
          "Explain why a next step belongs",
          "Adapt as the visible situation changes",
        ],
      },
      {
        type: "artifact-reference",
        artifactIds: ["artifact-platform-path-walkthrough"],
      },
    ],
  },
  {
    id: "content-platform-learning-evidence",
    publicationStatus: "draft",
    title: "Progress should become inspectable through what a person does.",
    lead: "Learning evidence belongs to the learning structure; it is not the same thing as evidence that LearnGraph works.",
    sourceRefs: [projectPresentation, legacySummary],
    blocks: [
      {
        type: "prose",
        truthStatus: "principle",
        sourceRefs: [projectPresentation],
        paragraphs: [
          "Work, artifacts, feedback, and demonstrated capability can give learners and the people supporting them a more useful basis for reflection than attendance or a single score.",
          "What can currently be attached, reviewed, owned, or carried elsewhere still requires product-owner confirmation.",
        ],
      },
      {
        type: "artifact-reference",
        truthStatus: "requires-verification",
        reviewNote:
          "Attach only attributable case evidence with permission, scope, dates, observations, and limitations.",
        artifactIds: [
          "artifact-case-itech",
          "artifact-case-bildungszentrum-optimum",
        ],
      },
    ],
  },
  {
    id: "content-platform-sovereignty",
    publicationStatus: "draft",
    title: "Control has to be operational, not rhetorical.",
    lead: "Sovereignty asks who can inspect the system, where data lives, what can connect to it, and whether leaving remains possible.",
    sourceRefs: [projectPresentation, legacySummary],
    blocks: [
      {
        type: "prose",
        truthStatus: "principle",
        sourceRefs: [projectPresentation],
        paragraphs: [
          "Institutions and communities need credible control over the systems through which sensitive learning relationships become visible.",
          "The public claim must follow verified deployment and product reality—not the ambition alone.",
        ],
      },
      {
        type: "technical-facts",
        truthStatus: "requires-verification",
        reviewNote:
          "Replace each pending value only after the relevant product, technical, or licensing owner confirms it.",
        facts: [
          { label: "Open-core boundary", value: "Owner confirmation pending" },
          {
            label: "External self-hosting",
            value: "Owner confirmation pending",
          },
          { label: "Data location", value: "Owner confirmation pending" },
          {
            label: "Public integrations and APIs",
            value: "Owner confirmation pending",
          },
          {
            label: "Portability and exit",
            value: "Owner confirmation pending",
          },
        ],
      },
      {
        type: "artifact-reference",
        artifactIds: ["artifact-sovereignty-technical-reference"],
      },
    ],
  },
] as const satisfies readonly NodeContent[];

export const platformArtifacts = [
  {
    id: "artifact-platform-model-diagram",
    kind: "diagram",
    title: "Current LearnGraph model diagram",
    truthStatus: "requires-verification",
    publicationStatus: "draft",
    sourceRefs: [projectPresentation],
  },
  {
    id: "artifact-platform-path-walkthrough",
    kind: "video",
    title: "Current personal-path product walkthrough",
    truthStatus: "requires-verification",
    publicationStatus: "draft",
    sourceRefs: [projectPresentation],
  },
  {
    id: "artifact-case-itech",
    kind: "case",
    title: "ITECH case source pack",
    truthStatus: "requires-verification",
    publicationStatus: "hidden",
    sourceRefs: [legacySummary],
  },
  {
    id: "artifact-case-bildungszentrum-optimum",
    kind: "case",
    title: "Bildungszentrum Optimum case source pack",
    truthStatus: "requires-verification",
    publicationStatus: "hidden",
    sourceRefs: [legacySummary],
  },
  {
    id: "artifact-sovereignty-technical-reference",
    kind: "technical-reference",
    title: "Verified sovereignty and deployment facts",
    truthStatus: "requires-verification",
    publicationStatus: "hidden",
    sourceRefs: [
      "docs/architecture/research-open-source-owner-check.md",
      projectPresentation,
    ],
  },
] as const satisfies readonly ContentArtifact[];

export const platformRelationships = [
  {
    sourceId: "platform-model",
    targetId: "platform-personal-paths",
    kind: "contributes-to",
    label: "enables",
  },
  {
    sourceId: "platform-personal-paths",
    targetId: "platform-learning-evidence",
    kind: "depends-on",
    label: "becomes legible through",
  },
  {
    sourceId: "platform-sovereignty",
    targetId: "platform-model",
    kind: "depends-on",
    label: "constrains how it is deployed",
  },
  {
    sourceId: "platform-sovereignty",
    targetId: "platform-learning-evidence",
    kind: "depends-on",
    label: "protects how it is handled",
  },
  {
    sourceId: "platform-learning-evidence",
    targetId: "artifact-case-itech",
    kind: "supported-by",
  },
  {
    sourceId: "platform-learning-evidence",
    targetId: "artifact-case-bildungszentrum-optimum",
    kind: "supported-by",
  },
  {
    sourceId: "platform-sovereignty",
    targetId: "research-open-core",
    kind: "depends-on",
    label: "must eventually be substantiated by",
  },
] as const satisfies readonly ContentRelationship[];
