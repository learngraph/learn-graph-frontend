import type { ContentGraphNode, ContentGraphRegistry } from "./types";
import { contentSlots } from "./contentSlots";
import { sourceCandidates } from "./sourceCandidates";
import {
  platformArtifacts,
  platformBriefs,
  platformRelationships,
} from "./platform";
import { editorialContents } from "./editorialContent";
import { learningAccessBriefs } from "./learningAccess";

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
    id: "root-learngraph",
    kind: "root",
    slug: "learngraph",
    canonicalPath: "/",
    label: "LearnGraph",
    purpose: "Introduce where LearnGraph came from and what holds it together.",
    contentId: "content-lg-introduction",
    ...approved,
  },
  {
    id: "territory-platform",
    kind: "territory",
    parentId: "root-learngraph",
    slug: "platform",
    canonicalPath: "/platform",
    label: "Platform",
    purpose:
      "Explain what LearnGraph is, how it makes learning navigable, and under which conditions people and institutions can trust it.",
    contentId: "content-platform-introduction",
    ...approved,
  },
  {
    id: "platform-using-learngraph",
    kind: "topic",
    parentId: "territory-platform",
    slug: "using-learngraph",
    canonicalPath: "/platform/using-learngraph",
    label: "Using LearnGraph",
    purpose:
      "Give a literal tour of the product, its working areas, and the different kinds of work people can do inside them.",
    contentId: "content-platform-using-learngraph",
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
    contentId: "content-platform-model",
    ...approved,
  },
  {
    id: "platform-inclusive-learning",
    kind: "topic",
    parentId: "territory-platform",
    slug: "inclusive-learning",
    canonicalPath: "/platform/inclusive-learning",
    label: "Inclusive Learning",
    purpose:
      "Show how one shared learning structure can support different languages, presentations, and learning needs.",
    contentId: "content-platform-inclusive-learning",
    ...approved,
  },
  {
    id: "territory-collaborate",
    kind: "territory",
    parentId: "root-learngraph",
    slug: "collaborate",
    canonicalPath: "/collaborate",
    label: "Collaborate",
    purpose:
      "Show how people can work with LearnGraph or the team to make a difficult system, product, or learning context actionable.",
    ...approved,
  },
  {
    id: "collaborate-services",
    kind: "topic",
    parentId: "territory-collaborate",
    slug: "services",
    canonicalPath: "/collaborate/services",
    label: "Services",
    labelStatus: "provisional",
    purpose:
      "Sort the work the team can genuinely provide into offers that an outside person can understand, request, and receive.",
    contentId: "content-collaborate-services-workbench",
    architectureStatus: "approved",
    publicationStatus: "draft",
  },
  {
    id: "collaborate-pilot-learngraph",
    kind: "topic",
    parentId: "territory-collaborate",
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
    parentId: "territory-collaborate",
    slug: "partnerships",
    canonicalPath: "/collaborate/partnerships",
    label: "Implementation partnerships",
    purpose:
      "Clarify the roles through which organisations, foundations, networks, facilitators, and LearnGraph can build contextual work together.",
    ...approved,
  },
  {
    id: "territory-learning-access",
    kind: "territory",
    parentId: "root-learngraph",
    slug: "who-gets-to-learn",
    canonicalPath: "/who-gets-to-learn",
    label: "Who Gets to Learn",
    purpose:
      "Examine the conditions that decide who can begin learning, continue, and carry knowledge forward.",
    contentId: "content-learning-access-introduction",
    ...approved,
  },
  {
    id: "learning-access",
    kind: "topic",
    parentId: "territory-learning-access",
    slug: "access",
    canonicalPath: "/who-gets-to-learn/access",
    label: "Access",
    labelStatus: "provisional",
    purpose:
      "Address what LearnGraph is prepared to confront when learning is obstructed by circumstance, institutions, geography, money, exclusion, or political restriction.",
    contentId: "content-learning-access",
    architectureStatus: "approved",
    publicationStatus: "draft",
  },
  {
    id: "learning-access-sovereignty",
    kind: "topic",
    parentId: "territory-learning-access",
    slug: "learning-sovereignty",
    canonicalPath: "/who-gets-to-learn/learning-sovereignty",
    label: "Learning Sovereignty",
    purpose:
      "Show how a granular learning history can remain useful and under the learner's control as goals, journeys, and contexts change.",
    contentId: "content-learning-access-sovereignty",
    ...approved,
  },
  {
    id: "learning-access-frontiers",
    kind: "topic",
    parentId: "territory-learning-access",
    slug: "learning-without-frontiers",
    canonicalPath: "/who-gets-to-learn/learning-without-frontiers",
    label: "Learning Without Frontiers",
    purpose:
      "Invite concrete collaboration where access to learning is obstructed by money, language, absent institutions, or political restriction.",
    contentId: "content-learning-access-frontiers",
    ...approved,
  },
  {
    id: "territory-about",
    kind: "territory",
    parentId: "root-learngraph",
    slug: "about",
    canonicalPath: "/about",
    label: "About",
    purpose:
      "Explain why LearnGraph exists, what informs it, who is responsible, and through which relationships it develops.",
    contentId: "content-about-introduction",
    ...approved,
  },
  {
    id: "about-origin",
    kind: "topic",
    parentId: "territory-about",
    slug: "origin",
    canonicalPath: "/about/origin",
    label: "Origin",
    purpose:
      "Show the turning points through which LearnGraph changed in meaning, reach, or possibility.",
    contentId: "content-about-origin",
    ...approved,
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
    contentId: "content-about-people",
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
    contentId: "content-about-network",
    ...approved,
  },
  {
    id: "about-impact",
    kind: "topic",
    parentId: "territory-about",
    slug: "impact",
    canonicalPath: "/about/impact",
    label: "Impact",
    purpose:
      "Show what changed when LearnGraph entered a real learning or institutional context, through grounded outcomes and case studies.",
    contentId: "content-about-impact",
    ...approved,
  },
  {
    id: "territory-research-open-source",
    kind: "territory",
    parentId: "root-learngraph",
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
  briefs: [...platformBriefs, ...learningAccessBriefs],
  contentSlots: [...contentSlots],
  sourceCandidates: [...sourceCandidates],
  contents: [...editorialContents],
  artifacts: [...platformArtifacts],
  relationships: [...platformRelationships],
};
