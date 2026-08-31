import type {
  ContentArtifact,
  ContentRelationship,
  EditorialBrief,
} from "./types";

const projectPresentation =
  "source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx";
const legacySummary = "source-material/raw/Websiste legacy content .docx";

export const platformBriefs = [
  {
    nodeId: "platform-model",
    status: "draft",
    coreClaim: "Learning becomes navigable when relationships are visible.",
    tension:
      "Most systems separate content, skills, goals, evidence, and progress into inventories that show parts without showing what the parts mean together.",
    intendedMemory:
      "A list tells you what exists. A graph can show what it means in relation to something else.",
    mustShow: ["Position", "Dependency", "Direction", "Possible movement"],
    availableMaterial: [
      "A Living Map for Learning",
      "From Map to Movement",
      "Beyond the Score",
      "A future model diagram grounded in the current implementation",
    ],
    avoid: [
      "Feature inventory",
      "Audience roll-call",
      "Personalised learning platform",
      "Connected ecosystem",
      "Future of education",
      "Unlocking potential",
    ],
    sourceRefs: [projectPresentation, legacySummary],
  },
  {
    nodeId: "platform-personal-paths",
    status: "draft",
    coreClaim:
      "A useful learning path begins with a person's actual position, not a generic sequence.",
    tension:
      "Conventional programmes often begin with what is available to deliver rather than what a person already knows, needs, or is trying to reach.",
    intendedMemory:
      "A path is not a prescribed line. It is movement whose reasons remain visible.",
    mustShow: [
      "A real starting position",
      "A goal and its dependencies",
      "Why a next step belongs",
      "How the route can change",
    ],
    availableMaterial: [
      "Beyond the Score",
      "From Map to Movement",
      "Legacy individual-learning synthesis",
      "A current product walkthrough, still to be selected",
    ],
    avoid: [
      "Automatic personalisation",
      "One perfect path",
      "Learner empowerment",
      "Adaptive-learning magic",
      "Outcome claims without evidence",
    ],
    sourceRefs: [projectPresentation, legacySummary],
  },
  {
    nodeId: "platform-learning-evidence",
    status: "draft",
    coreClaim:
      "Learning should become visible through meaningful work, not be inferred from attendance alone.",
    tension:
      "Scores and completion records compress activity into results while often losing the work, judgment, and context behind them.",
    intendedMemory:
      "Evidence belongs to the learning structure; it is not a trophy cabinet for LearnGraph.",
    mustShow: [
      "What can count as evidence",
      "Where evidence attaches",
      "Who can see and assess it",
      "Whether it can move with the learner",
    ],
    availableMaterial: [
      "Beyond the Score",
      "Vocational evidence material",
      "An evidence lifecycle or relationship diagram still to be designed",
      "ITECH and Bildungszentrum Optimum case candidates, still unverified",
    ],
    avoid: [
      "Confusing learning evidence with proof that LearnGraph works",
      "Reducing people to scores",
      "Portability or recognition claims without owner truth",
      "Logos, testimonials, and decorative metrics",
    ],
    sourceRefs: [projectPresentation, legacySummary],
  },
  {
    nodeId: "platform-sovereignty",
    status: "draft",
    coreClaim:
      "Control over learning infrastructure has to remain operational rather than rhetorical.",
    tension:
      "Institutions and communities can become dependent on systems they cannot inspect, place, connect, or leave.",
    intendedMemory:
      "Sovereignty is proven by the choices that remain possible when requirements or relationships change.",
    mustShow: [
      "What can be inspected",
      "Where the system and data can live",
      "What can connect to it",
      "What a credible exit looks like",
    ],
    availableMaterial: [
      "Project principles around openness and independence",
      "Protected-context requirements from the Afghan pilot proposal",
      "Owner-verified technical facts, still pending",
      "Inspectable artifacts, still pending",
    ],
    avoid: [
      "Open-source claims inferred from repository visibility",
      "Self-hosting claims inferred from containerization",
      "Generic privacy and security assurances",
      "Long values prose in place of technical facts",
    ],
    sourceRefs: [projectPresentation, legacySummary],
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
