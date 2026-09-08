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
    nodeId: "platform-sovereignty",
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
    nodeId: "collaborate-find-constraint",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote:
      "A coherent offer exists in legacy material; it needs rebuilding.",
    blockers: ["Named experience and deliverable boundary need confirmation"],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Diagnostic and output pattern",
        status: "missing",
      },
      {
        kind: "case",
        label: "Verified experience artifact",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "collaborate-reduce-manual-load",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote: "Usable service logic exists; claims and form need revision.",
    blockers: ["Automation scope and outcome claims need verification"],
    supportingMaterial: [
      { kind: "diagram", label: "Implementation pattern", status: "missing" },
      { kind: "case", label: "Verified delivery case", status: "blocked" },
    ],
  },
  {
    nodeId: "collaborate-build-offer",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote:
      "Offer material exists; public label and distinction need work.",
    blockers: [
      "Public label remains provisional",
      "No publishable case is established",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Discovery-to-release sequence",
        status: "missing",
      },
      { kind: "case", label: "Verified build artifact", status: "blocked" },
    ],
  },
  {
    nodeId: "collaborate-pilot-learngraph",
    sourceAvailability: "legacy-and-project",
    copyStatus: "not-created",
    workEstimate: "new-assembly",
    statusNote:
      "Rich application material exists; no dedicated article exists.",
    blockers: ["Completed pilots must be separated from proposed applications"],
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
    copyStatus: "not-created",
    workEstimate: "new-assembly",
    statusNote:
      "Role logic exists across sources; no dedicated article exists.",
    blockers: ["Actively sought partnership types need owner confirmation"],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Partner roles and relationships",
        status: "missing",
      },
      {
        kind: "case",
        label: "Verified partnership example",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "collaborate-learning-without-frontiers",
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
    nodeId: "about-access",
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
  {
    nodeId: "research-open-core",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote: "Legacy claims exist; the topic remains hidden.",
    blockers: [
      "Open boundary, license intent, and public artifacts are unresolved",
    ],
    supportingMaterial: [
      {
        kind: "technical-facts",
        label: "Verified open-core boundary",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "research-interoperability",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote:
      "Principles exist; inspectable interoperability evidence does not.",
    blockers: [
      "Public APIs, schemas, exports, or demonstrations are unverified",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Verified interoperability model",
        status: "blocked",
      },
    ],
  },
  {
    nodeId: "research-questions",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote:
      "Questions and direction exist; publishable research work is unresolved.",
    blockers: [
      "Named work needs owners, methods, status, and publishable outputs",
    ],
    supportingMaterial: [
      { kind: "case", label: "Publishable research output", status: "blocked" },
    ],
  },
  {
    nodeId: "research-contribute",
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote:
      "A contribution invitation exists; supportability is unverified.",
    blockers: [
      "Governance, licensing, review capacity, and decision authority are unresolved",
    ],
    supportingMaterial: [
      {
        kind: "technical-facts",
        label: "Supported contribution routes",
        status: "blocked",
      },
    ],
  },
] as const satisfies readonly ContentSlot[];
