import type { ContentGraphNode, ContentGraphRegistry } from "./types";

const approved = {
  architectureStatus: "approved",
  publicationStatus: "draft",
  labelStatus: "approved",
} as const;

const reserved = {
  architectureStatus: "reserved",
  publicationStatus: "hidden",
  labelStatus: "approved",
} as const;

export const contentGraphNodes = [
  {
    id: "territory-platform",
    kind: "territory",
    slug: "platform",
    canonicalPath: "/platform",
    label: "Platform",
    purpose:
      "Explain what LearnGraph is, how it makes learning navigable, and under which conditions people and institutions can trust it.",
    ...approved,
  },
  {
    id: "platform-model",
    kind: "topic",
    parentId: "territory-platform",
    slug: "model",
    canonicalPath: "/platform/model",
    label: "The model",
    purpose:
      "Explain the connected structure beneath LearnGraph as product logic rather than visual metaphor.",
    ...approved,
  },
  {
    id: "platform-personal-paths",
    kind: "topic",
    parentId: "territory-platform",
    slug: "personal-paths",
    canonicalPath: "/platform/personal-paths",
    label: "Personal paths",
    purpose:
      "Show how the shared model becomes legible orientation and adaptable movement for a learner.",
    ...approved,
  },
  {
    id: "platform-learning-evidence",
    kind: "topic",
    parentId: "territory-platform",
    slug: "evidence",
    canonicalPath: "/platform/evidence",
    label: "Learning evidence",
    purpose:
      "Explain how work, artifacts, feedback, progress, and demonstrated capability attach to the learning structure.",
    ...approved,
  },
  {
    id: "platform-sovereignty",
    kind: "topic",
    parentId: "territory-platform",
    slug: "sovereignty",
    canonicalPath: "/platform/sovereignty",
    label: "Sovereignty",
    purpose:
      "Explain the control conditions around inspectability, deployment, data location, integration, and exit options.",
    ...approved,
  },
  {
    id: "territory-collaborate",
    kind: "territory",
    slug: "collaborate",
    canonicalPath: "/collaborate",
    label: "Collaborate",
    purpose:
      "Show how people can work with LearnGraph or the team to make a difficult system, product, or learning context actionable.",
    ...approved,
  },
  {
    id: "cluster-transformation-services",
    kind: "cluster",
    parentId: "territory-collaborate",
    slug: "transformation-services",
    label: "Transformation services",
    purpose:
      "Group the team's distinct offers for organisational process, automation, and product or service work.",
    ...approved,
  },
  {
    id: "collaborate-find-constraint",
    kind: "topic",
    parentId: "cluster-transformation-services",
    slug: "find-the-constraint",
    canonicalPath: "/collaborate/find-the-constraint",
    label: "Find the constraint",
    purpose:
      "Make one consequential workflow, its dependencies, ownership, constraints, and first viable intervention visible.",
    ...approved,
  },
  {
    id: "collaborate-reduce-manual-load",
    kind: "topic",
    parentId: "cluster-transformation-services",
    slug: "reduce-manual-load",
    canonicalPath: "/collaborate/reduce-manual-load",
    label: "Reduce manual load",
    purpose:
      "Explain how operational load can be reduced without creating another opaque or fragile system.",
    ...approved,
  },
  {
    id: "collaborate-build-offer",
    kind: "topic",
    parentId: "cluster-transformation-services",
    slug: "build-the-offer",
    canonicalPath: "/collaborate/build-the-offer",
    label: "Build the offer",
    labelStatus: "provisional",
    purpose:
      "Turn an insufficiently defined product or service idea into a coherent proposition and viable first version.",
    architectureStatus: "approved",
    publicationStatus: "draft",
  },
  {
    id: "cluster-learngraph-partnerships",
    kind: "cluster",
    parentId: "territory-collaborate",
    slug: "learngraph-partnerships",
    label: "LearnGraph partnerships",
    purpose:
      "Group bounded LearnGraph applications and the partnership structures needed to implement them responsibly.",
    ...approved,
  },
  {
    id: "collaborate-pilot-learngraph",
    kind: "topic",
    parentId: "cluster-learngraph-partnerships",
    slug: "pilots",
    canonicalPath: "/collaborate/pilots",
    label: "Pilot LearnGraph",
    purpose:
      "Explain how LearnGraph can be applied and evaluated with a partner before broader rollout.",
    ...approved,
  },
  {
    id: "collaborate-implementation-partnerships",
    kind: "topic",
    parentId: "cluster-learngraph-partnerships",
    slug: "partnerships",
    canonicalPath: "/collaborate/partnerships",
    label: "Implementation partnerships",
    purpose:
      "Clarify the roles through which organisations, foundations, networks, facilitators, and LearnGraph can build contextual work together.",
    ...approved,
  },
  {
    id: "territory-about",
    kind: "territory",
    slug: "about",
    canonicalPath: "/about",
    label: "About",
    purpose:
      "Explain why LearnGraph exists, what informs it, who is responsible, and through which relationships it develops.",
    ...approved,
  },
  {
    id: "about-why-learngraph",
    kind: "topic",
    parentId: "territory-about",
    slug: "why-learngraph",
    canonicalPath: "/about/why-learngraph",
    label: "Why LearnGraph",
    purpose:
      "State the educational thesis that material becomes usable through orientation, relationships, support, and agency.",
    ...approved,
  },
  {
    id: "about-founding-commitment",
    kind: "topic",
    parentId: "territory-about",
    slug: "founding-commitment",
    label: "Founding commitment",
    labelStatus: "open",
    purpose:
      "Address obstructed, restricted, unsafe, unequal, or politically constrained learning and provide a serious entry point into relevant work.",
    architectureStatus: "approved",
    publicationStatus: "draft",
  },
  {
    id: "about-people",
    kind: "topic",
    parentId: "territory-about",
    slug: "people",
    canonicalPath: "/about/people",
    label: "People",
    purpose:
      "Identify the current people responsible for LearnGraph and the contribution each can factually claim.",
    ...approved,
  },
  {
    id: "about-network",
    kind: "topic",
    parentId: "territory-about",
    slug: "network",
    canonicalPath: "/about/network",
    label: "Network",
    purpose:
      "Give honest context for institutional and collaborative relationships using explicit relationship types.",
    ...approved,
  },
  {
    id: "territory-research-open-source",
    kind: "territory",
    slug: "research",
    canonicalPath: "/research",
    label: "Research / Open Source",
    purpose:
      "Expose technical and research work only when it can be inspected, challenged, reused, or contributed to.",
    ...reserved,
  },
  {
    id: "research-open-core",
    kind: "topic",
    parentId: "territory-research-open-source",
    slug: "open-core",
    canonicalPath: "/research/open-core",
    label: "Open core",
    purpose:
      "Define precisely what is open, under which license, and how it can be inspected or deployed.",
    ...reserved,
  },
  {
    id: "research-interoperability",
    kind: "topic",
    parentId: "territory-research-open-source",
    slug: "interoperability",
    canonicalPath: "/research/interoperability",
    label: "Interoperability",
    purpose:
      "Explain and demonstrate how meaning, evidence, or learning structures can cross system and organisational boundaries.",
    ...reserved,
  },
  {
    id: "research-questions",
    kind: "topic",
    parentId: "territory-research-open-source",
    slug: "questions",
    canonicalPath: "/research/questions",
    label: "Research questions",
    purpose:
      "Publish active questions with owners, methods, status, and outputs rather than presenting principles as findings.",
    ...reserved,
  },
  {
    id: "research-contribute",
    kind: "topic",
    parentId: "territory-research-open-source",
    slug: "contribute",
    canonicalPath: "/research/contribute",
    label: "Contribute",
    purpose:
      "Explain concrete contribution routes, governance, licensing, review, safety, and decision authority.",
    ...reserved,
  },
] as const satisfies readonly ContentGraphNode[];

export const contentGraphRegistry: ContentGraphRegistry = {
  nodes: [...contentGraphNodes],
  contents: [],
  artifacts: [],
  relationships: [],
};
