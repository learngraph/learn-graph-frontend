import type { ContentSlot } from "./types";

export const contentSlots = [
  {
    nodeId: "platform-model",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote: "Strong ideas exist; no article is approved for reuse.",
    blockers: ["Current model entities and relationships need confirmation"],
    supportingMaterial: [
      { kind: "diagram", label: "Current model diagram", status: "missing" },
    ],
  },
  {
    nodeId: "platform-personal-paths",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote: "Conceptual material exists; the article must be rebuilt.",
    blockers: ["Current path behaviour needs product confirmation"],
    supportingMaterial: [
      {
        kind: "video",
        label: "Current product walkthrough",
        status: "missing",
      },
    ],
  },
  {
    nodeId: "platform-learning-evidence",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote: "Principle is well sourced; mechanism copy is not ready.",
    blockers: [
      "Evidence model, visibility, review, and portability are unknown",
    ],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Evidence lifecycle",
        status: "blocked",
      },
      { kind: "case", label: "Verified contextual case", status: "candidate" },
    ],
  },
  {
    nodeId: "platform-sovereignty",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "owner-facts-first",
    statusNote: "Values material exists; public copy must follow facts.",
    blockers: ["Licensing, deployment, data, API, and exit facts are pending"],
    supportingMaterial: [
      {
        kind: "technical-facts",
        label: "Owner-verified sovereignty facts",
        status: "blocked",
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
    nodeId: "about-why-learngraph",
    sourceAvailability: "legacy-and-project",
    copyStatus: "needs-revision",
    workEstimate: "substantial-revision",
    statusNote:
      "Strong position material exists; no article is approved unchanged.",
    blockers: [],
    supportingMaterial: [
      {
        kind: "diagram",
        label: "Material versus usable access",
        status: "missing",
      },
    ],
  },
  {
    nodeId: "about-founding-commitment",
    sourceAvailability: "project-material",
    copyStatus: "not-created",
    workEstimate: "new-assembly",
    statusNote:
      "Substantial source material exists; the public chapter is not written.",
    blockers: ["Public label and exact framing remain open"],
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
    sourceAvailability: "legacy-content",
    copyStatus: "needs-revision",
    workEstimate: "factual-assembly",
    statusNote:
      "Legacy roster exists; every entry requires current attribution.",
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
