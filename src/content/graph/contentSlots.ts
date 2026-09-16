import type { ContentSlot } from "./types";

export const contentSlots = [
  {
    nodeId: "platform-using-learngraph",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "factual-assembly",
    statusNote:
      "The product-tour structure is assembled; real interface captures and a current capability check remain.",
    blockers: [
      "Replace every capture slot with current product imagery",
      "Verify each described workflow against the operational product",
    ],
    supportingMaterial: [
      { kind: "image", label: "Atlas interface capture", status: "missing" },
      { kind: "video", label: "Zone movement capture", status: "missing" },
      {
        kind: "image",
        label: "Skill Library interface capture",
        status: "missing",
      },
      {
        kind: "image",
        label: "Cohort and organisation interface captures",
        status: "missing",
      },
      { kind: "image", label: "Studio interface capture", status: "missing" },
    ],
  },
  {
    nodeId: "platform-model",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote: "Current editorial baseline is ready for product review.",
    blockers: ["Current authoring roles and graph entities need confirmation"],
    supportingMaterial: [
      { kind: "diagram", label: "Current model diagram", status: "missing" },
    ],
  },
  {
    nodeId: "platform-graph",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote:
      "The editorial node exists; ontology names and ownership boundaries need product review.",
    blockers: [
      "Confirm the current names and boundaries for shared, contextual, personal, and connected material",
      "Confirm which contribution and publication stages exist in the operational product",
    ],
    supportingMaterial: [
      {
        kind: "technical-facts",
        label: "Current graph entities and relation vocabulary",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "learning-access-sovereignty",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote: "Current editorial baseline is ready for product review.",
    blockers: [
      "Cross-course and cross-institution persistence needs confirmation",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Granular learner-position example",
        status: "candidate",
      },
    ],
  },
  {
    nodeId: "platform-inclusive-learning",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote: "Current editorial baseline is ready for product review.",
    blockers: [
      "Current accessibility and neurodiversity controls need confirmation",
    ],
    supportingMaterial: [
      {
        kind: "video",
        label: "Adaptive presentation demonstration",
        status: "candidate",
      },
    ],
  },
  {
    nodeId: "collaborate-services",
    sourceAvailability: "legacy-content",
    copyStatus: "not-created",
    workEstimate: "new-assembly",
    statusNote:
      "The weekend workshop is sorting raw service material into coherent offers.",
    blockers: [
      "No offer family has survived the shared workshop test yet",
      "Relationship to LearnGraph and delivery ownership remain unresolved",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Offer-family map",
        status: "candidate",
      },
      { kind: "case", label: "Verified service examples", status: "blocked" },
    ],
  },
  {
    nodeId: "collaborate-pilot-learngraph",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "new-assembly",
    statusNote:
      "The editorial frame and typed ITECH record exist; verified case facts and evidence are still pending.",
    blockers: [
      "The ITECH activity type, scope, participants, use, observations, and permissions need verification",
      "Completed pilots must be separated from proposed applications",
    ],
    supportingMaterial: [
      { kind: "diagram", label: "Pilot pattern", status: "missing" },
      {
        kind: "application",
        label: "Protected Learning Maps",
        status: "candidate",
      },
      { kind: "case", label: "Verified completed pilot", status: "blocked" },
    ],
  },
  {
    nodeId: "collaborate-implementation-partnerships",
    sourceAvailability: "legacy-and-project",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote:
      "An interactive role model now makes contribution, responsibility, dependency, and shared decisions explicit.",
    blockers: [
      "Actively sought partnership types need owner confirmation",
      "Current LearnGraph delivery and adaptation capacity needs owner confirmation",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Partner roles and relationships",
        status: "available",
      },
      {
        kind: "case",
        label: "Verified partnership example",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "learning-access-frontiers",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote:
      "A complete editorial baseline and a current field example are ready for review.",
    blockers: [],
    supportingMaterial: [
      {
        kind: "case",
        label: "Afghanistan language-learning collaboration",
        status: "available",
      },
    ],
  },
  {
    nodeId: "about-origin",
    sourceAvailability: "project-material",
    copyStatus: "ready-for-review",
    workEstimate: "owner-facts-first",
    statusNote:
      "The opening is ready for review; the milestone layer is still missing.",
    blockers: ["Four to six meaningful, verifiable turning points are needed"],
    supportingMaterial: [
      {
        kind: "timeline",
        label: "Turning points with dates and artifacts",
        status: "missing",
      },
    ],
  },
  {
    nodeId: "about-convictions",
    sourceAvailability: "legacy-content",
    copyStatus: "ready-for-review",
    workEstimate: "review",
    statusNote:
      "A focused three-part manifesto now grounds access, travelling knowledge, and orientation in explicit structural demands.",
    blockers: [],
    supportingMaterial: [],
  },
  {
    nodeId: "learning-access",
    sourceAvailability: "project-material",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote:
      "The node has a distinct job; the current body still overlaps Platform.",
    blockers: [
      "Public label remains provisional",
      "Implemented capability, proposed application, and founding commitment must be separated",
    ],
    supportingMaterial: [
      {
        kind: "application",
        label: "Protected Learning Maps",
        status: "candidate",
      },
    ],
  },
  {
    nodeId: "about-people",
    sourceAvailability: "legacy-and-project",
    copyStatus: "ready-for-review",
    workEstimate: "factual-assembly",
    statusNote:
      "The credit-field baseline is ready; incomplete entries remain blocked.",
    blockers: [
      "Current roles, contributions, and publication consent are pending",
    ],
    supportingMaterial: [
      {
        kind: "roster",
        label: "Approved current team roster",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "about-network",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "factual-assembly",
    statusNote:
      "Names and logos exist; relationships are not yet publication-ready.",
    blockers: [
      "Every organisation needs a verified relationship type and permission",
    ],
    supportingMaterial: [
      {
        kind: "relationship-directory",
        label: "Verified relationship directory",
        status: "blocked",
      },
      {
        kind: "case",
        label: "ITECH relationship and case",
        status: "candidate",
      },
    ],
  },
  {
    nodeId: "about-impact",
    sourceAvailability: "legacy-content",
    copyStatus: "ready-for-review",
    workEstimate: "substantial-revision",
    statusNote:
      "Two complete legacy cases are migrated; editorial pruning and outcome review remain.",
    blockers: [
      "Case claims, attribution, currentness, and publication permission need confirmation",
    ],
    supportingMaterial: [
      {
        kind: "case",
        label: "ITECH case study",
        status: "available",
      },
      {
        kind: "case",
        label: "Bildungszentrum Optimum case study",
        status: "available",
      },
      {
        kind: "technical-facts",
        label: "Measured outcomes",
        status: "blocked",
      },
    ],
  },
] as const satisfies readonly ContentSlot[];
