import type {
  ContentArtifact,
  ContentRelationship,
  EditorialBrief,
} from "./types";

const platformCopySource = "Desktop/LG Website/NODE CONTENT/Platform";
const projectPresentation =
  "source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx";

export const platformBriefs = [
  {
    nodeId: "platform-using-learngraph",
    status: "draft",
    coreClaim:
      "LearnGraph is one connected working environment entered through several practical tasks.",
    tension:
      "A role-by-role feature inventory would repeat the product while hiding how its working areas connect.",
    intendedMemory:
      "I understand where I would enter LearnGraph and what I could do there.",
    mustShow: [
      "Atlas to Zone to Skill Library as the shared route",
      "Cohort and organisation work as branches from the same environment",
      "Studio as the public-contribution entrance",
      "Current product interface rather than illustrative mockups",
    ],
    availableMaterial: ["Product-tour working brief"],
    avoid: [
      "Four isolated persona presentations",
      "Feature cards",
      "Invented interface imagery",
      "Grand closing claim",
    ],
    sourceRefs: [projectPresentation],
  },
  {
    nodeId: "platform-model",
    status: "draft",
    coreClaim:
      "Learning structures become reusable when their relationships remain first-class data.",
    tension:
      "Courses and catalogues tend to contain learning inside the context that first produced it.",
    intendedMemory:
      "A journey can begin with one person and remain useful beyond the course, project, or institution that created it.",
    mustShow: [
      "Who can shape a journey",
      "How one structure can move between contexts",
      "Relationships as product logic",
    ],
    availableMaterial: ["A Graph That Grows editorial baseline"],
    avoid: ["Feature inventory", "Graph as visual metaphor only"],
    sourceRefs: [`${platformCopySource}/The model.docx`, projectPresentation],
  },
  {
    nodeId: "platform-sovereignty",
    status: "draft",
    coreClaim:
      "A learner's position should remain granular and useful as their context changes.",
    tension:
      "Broad labels and course completion flatten uneven knowledge and strand it inside one programme.",
    intendedMemory:
      "Learning can outlive the course without averaging the learner into a score.",
    mustShow: [
      "Granular differences",
      "Changing goals and circumstances",
      "What persists today versus what remains direction",
    ],
    availableMaterial: ["Learning Sovereignty editorial baseline"],
    avoid: [
      "Infrastructure-sovereignty claims",
      "Cross-institution portability presented without verification",
    ],
    sourceRefs: [
      `${platformCopySource}/Learning Sovereignty.docx`,
      projectPresentation,
    ],
  },
  {
    nodeId: "platform-inclusive-learning",
    status: "draft",
    coreClaim:
      "A shared learning structure does not require one way of being taught.",
    tension:
      "Accessibility is too often added after the learning experience has already chosen one presumed learner.",
    intendedMemory:
      "The structure can stay shared while the way into it becomes personal.",
    mustShow: [
      "Language variation",
      "Presentation and guidance variation",
      "The difference between design condition and accessibility layer",
    ],
    availableMaterial: ["Inclusive Learning editorial baseline"],
    avoid: [
      "Universal-access claims",
      "A toolbox list without a human consequence",
    ],
    sourceRefs: [
      `${platformCopySource}/Inclusive Learning.docx`,
      projectPresentation,
    ],
  },
] as const satisfies readonly EditorialBrief[];

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
    id: "artifact-platform-inclusive-demo",
    kind: "video",
    title: "Adaptive presentation demonstration",
    truthStatus: "requires-verification",
    publicationStatus: "draft",
    sourceRefs: [`${platformCopySource}/Inclusive Learning.docx`],
  },
] as const satisfies readonly ContentArtifact[];

export const platformRelationships = [
  {
    sourceId: "platform-model",
    targetId: "platform-sovereignty",
    kind: "contributes-to",
    label: "lets history remain in motion",
  },
  {
    sourceId: "platform-model",
    targetId: "platform-inclusive-learning",
    kind: "contributes-to",
    label: "keeps structure shared while presentation changes",
  },
] as const satisfies readonly ContentRelationship[];
