export type TerritoryId = "platform" | "work" | "about" | "research";

export type TopicId =
  | "platform-model"
  | "platform-paths"
  | "platform-evidence"
  | "platform-sovereignty"
  | "work-clarity"
  | "work-automation"
  | "work-products"
  | "work-together"
  | "about-origin"
  | "about-team"
  | "about-network"
  | "about-contact"
  | "research-fields"
  | "research-open"
  | "research-interoperability"
  | "research-contribute";

export type GraphSelection = TerritoryId | TopicId;

export interface Topic {
  id: TopicId;
  territory: TerritoryId;
  slug: string;
  label: string;
  relation: string;
  connections?: Array<{
    id: TopicId;
    relation: string;
  }>;
}

export interface Territory {
  id: TerritoryId;
  slug: string;
  label: string;
  topics: TopicId[];
}

export const territoryOrder: TerritoryId[] = [
  "platform",
  "work",
  "about",
  "research",
];

export const territories: Record<TerritoryId, Territory> = {
  platform: {
    id: "platform",
    slug: "platform",
    label: "Platform",
    topics: [
      "platform-model",
      "platform-paths",
      "platform-evidence",
      "platform-sovereignty",
    ],
  },
  work: {
    id: "work",
    slug: "collaborate",
    label: "Collaborate",
    topics: [
      "work-clarity",
      "work-automation",
      "work-products",
      "work-together",
    ],
  },
  about: {
    id: "about",
    slug: "about",
    label: "About",
    topics: ["about-origin", "about-team", "about-network", "about-contact"],
  },
  research: {
    id: "research",
    slug: "research",
    label: "Research",
    topics: [
      "research-fields",
      "research-open",
      "research-interoperability",
      "research-contribute",
    ],
  },
};

export const topics: Record<TopicId, Topic> = {
  "platform-model": {
    id: "platform-model",
    territory: "platform",
    slug: "model",
    label: "The model",
    relation: "gives structure to",
    connections: [
      { id: "research-interoperability", relation: "is made portable by" },
      { id: "platform-sovereignty", relation: "remains accountable through" },
    ],
  },
  "platform-paths": {
    id: "platform-paths",
    territory: "platform",
    slug: "personal-paths",
    label: "Personal paths",
    relation: "turns goals into",
    connections: [
      { id: "platform-evidence", relation: "becomes credible through" },
      { id: "research-fields", relation: "is informed by" },
    ],
  },
  "platform-evidence": {
    id: "platform-evidence",
    territory: "platform",
    slug: "evidence",
    label: "Evidence",
    relation: "makes progress visible through",
    connections: [
      { id: "about-network", relation: "gains context from" },
      { id: "work-together", relation: "can be tested through" },
    ],
  },
  "platform-sovereignty": {
    id: "platform-sovereignty",
    territory: "platform",
    slug: "sovereignty",
    label: "Sovereignty",
    relation: "keeps control with",
    connections: [
      { id: "research-open", relation: "is implemented through" },
      { id: "research-interoperability", relation: "depends on" },
    ],
  },
  "work-clarity": {
    id: "work-clarity",
    territory: "work",
    slug: "find-the-constraint",
    label: "Find the constraint",
    relation: "starts by",
    connections: [
      {
        id: "platform-model",
        relation: "uses the same structural thinking as",
      },
    ],
  },
  "work-automation": {
    id: "work-automation",
    territory: "work",
    slug: "reduce-manual-load",
    label: "Reduce manual load",
    relation: "can continue by",
  },
  "work-products": {
    id: "work-products",
    territory: "work",
    slug: "build-the-offer",
    label: "Build the offer",
    relation: "becomes tangible when we",
    connections: [{ id: "about-team", relation: "is carried by" }],
  },
  "work-together": {
    id: "work-together",
    territory: "work",
    slug: "work-together",
    label: "Work together",
    relation: "creates value when we",
    connections: [
      { id: "about-network", relation: "grows through" },
      { id: "platform-evidence", relation: "should produce" },
    ],
  },
  "about-origin": {
    id: "about-origin",
    territory: "about",
    slug: "why-learngraph",
    label: "Why LearnGraph",
    relation: "exists because",
    connections: [{ id: "platform-model", relation: "became concrete as" }],
  },
  "about-team": {
    id: "about-team",
    territory: "about",
    slug: "team",
    label: "The team",
    relation: "is built by",
    connections: [
      { id: "work-products", relation: "delivers" },
      { id: "research-fields", relation: "investigates" },
    ],
  },
  "about-network": {
    id: "about-network",
    territory: "about",
    slug: "network",
    label: "The network",
    relation: "grows with",
    connections: [
      { id: "work-together", relation: "is extended through" },
      { id: "platform-evidence", relation: "creates" },
    ],
  },
  "about-contact": {
    id: "about-contact",
    territory: "about",
    slug: "contact",
    label: "Contact",
    relation: "can be reached through",
  },
  "research-fields": {
    id: "research-fields",
    territory: "research",
    slug: "questions",
    label: "Questions",
    relation: "investigates",
    connections: [
      { id: "platform-paths", relation: "shapes" },
      { id: "about-network", relation: "is grounded with" },
    ],
  },
  "research-open": {
    id: "research-open",
    territory: "research",
    slug: "open-core",
    label: "Open core",
    relation: "makes inspectable",
    connections: [{ id: "platform-sovereignty", relation: "protects" }],
  },
  "research-interoperability": {
    id: "research-interoperability",
    territory: "research",
    slug: "interoperability",
    label: "Interoperability",
    relation: "connects through",
    connections: [
      { id: "platform-model", relation: "makes portable" },
      { id: "platform-sovereignty", relation: "supports" },
    ],
  },
  "research-contribute": {
    id: "research-contribute",
    territory: "research",
    slug: "contribute",
    label: "Contribute",
    relation: "invites others to",
    connections: [{ id: "work-together", relation: "can begin as" }],
  },
};

export function isTerritory(id: GraphSelection): id is TerritoryId {
  return territoryOrder.includes(id as TerritoryId);
}

export function topicForSelection(selection: GraphSelection): Topic {
  if (isTerritory(selection)) {
    return topics[territories[selection].topics[0]];
  }
  return topics[selection];
}

export function territoryFromSlug(
  slug: string | undefined,
): Territory | undefined {
  if (!slug) return undefined;
  return territoryOrder
    .map((id) => territories[id])
    .find((territory) => territory.slug === slug);
}

export function topicFromRoute(
  territory: Territory | undefined,
  slug: string | undefined,
): Topic | undefined {
  if (!territory || !slug) return undefined;
  return territory.topics
    .map((id) => topics[id])
    .find((topic) => topic.slug === slug);
}

export function pathForTopic(topic: Topic): string {
  return `/${territories[topic.territory].slug}/${topic.slug}`;
}
