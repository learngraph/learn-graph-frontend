import {
  contentGraphNodes,
  contentGraphRegistry,
  publicArchitectureNodes,
} from "../../content/graph";
import type {
  ArchitectureStatus,
  ContentGraphNode,
  ContentSlot,
  SourceCandidate,
  WorkEstimate,
} from "../../content/graph";

type TopicNode = Extract<(typeof contentGraphNodes)[number], { kind: "topic" }>;

export type TerritoryId =
  | "platform"
  | "learning-access"
  | "collaborate"
  | "about";
export type TopicId = TopicNode["id"];
export type GraphSelection = TerritoryId | TopicId;

export interface Topic {
  id: TopicId;
  territory: TerritoryId;
  slug: string;
  canonicalPath?: string;
  label: string;
  purpose: string;
  clusterLabel?: string;
  slot: ContentSlot;
  sources: SourceCandidate[];
}

export interface Territory {
  id: TerritoryId;
  nodeId: string;
  slug: string;
  label: string;
  architectureStatus: ArchitectureStatus;
  topics: TopicId[];
}

export const workEstimateLabels: Record<WorkEstimate, string> = {
  "light-revision": "Light revision",
  "substantial-revision": "Substantial revision",
  "new-assembly": "New assembly",
  "factual-assembly": "Factual assembly",
  "owner-facts-first": "Owner facts first",
  review: "Ready for review",
  ready: "Content approved",
};

export const sourceAvailabilityLabels: Record<
  ContentSlot["sourceAvailability"],
  string
> = {
  none: "No source material identified",
  "legacy-content": "Legacy website material available",
  "project-material": "Project source material available",
  "legacy-and-project": "Legacy and project material available",
};

export const sourceCandidateStatusLabels: Record<
  SourceCandidate["status"],
  string
> = {
  strong: "Strong source",
  partial: "Partial source",
  "factual-only": "Factual source",
  "proposal-only": "Proposal only",
  "verification-required": "Verify before use",
};

const territoryNodeIds: Record<TerritoryId, string> = {
  platform: "territory-platform",
  "learning-access": "territory-learning-access",
  collaborate: "territory-collaborate",
  about: "territory-about",
};

const territoryIdByNodeId = new Map(
  Object.entries(territoryNodeIds).map(([id, nodeId]) => [
    nodeId,
    id as TerritoryId,
  ]),
);
const nodeById = new Map<string, ContentGraphNode>(
  contentGraphRegistry.nodes.map((node) => [node.id, node]),
);
const slotByNodeId = new Map(
  contentGraphRegistry.contentSlots.map((slot) => [slot.nodeId, slot]),
);

function territoryIdForTopic(node: TopicNode): TerritoryId {
  const parent = node.parentId ? nodeById.get(node.parentId) : undefined;
  const territoryNode =
    parent?.kind === "territory"
      ? parent
      : parent?.parentId
        ? nodeById.get(parent.parentId)
        : undefined;
  const territoryId = territoryNode
    ? territoryIdByNodeId.get(territoryNode.id)
    : undefined;

  if (!territoryId) {
    throw new Error(`Topic ${node.id} does not resolve to a graph territory`);
  }
  return territoryId;
}

export const topics = Object.fromEntries(
  contentGraphNodes
    .filter((node): node is TopicNode => node.kind === "topic")
    .map((node) => {
      const slot = slotByNodeId.get(node.id);
      if (!slot)
        throw new Error(`Topic ${node.id} has no editorial content slot`);

      const parent = node.parentId ? nodeById.get(node.parentId) : undefined;
      const topic: Topic = {
        id: node.id,
        territory: territoryIdForTopic(node),
        slug: node.slug,
        canonicalPath: "canonicalPath" in node ? node.canonicalPath : undefined,
        label: node.label,
        purpose: node.purpose,
        clusterLabel: parent?.kind === "cluster" ? parent.label : undefined,
        slot,
        sources: contentGraphRegistry.sourceCandidates.filter(
          (source) => source.nodeId === node.id,
        ),
      };
      return [node.id, topic];
    }),
) as Record<TopicId, Topic>;

export const territoryOrder: TerritoryId[] = [
  "platform",
  "learning-access",
  "collaborate",
  "about",
];

const publicNodeIds = new Set(
  publicArchitectureNodes(contentGraphRegistry).map((node) => node.id),
);

export const territories = Object.fromEntries(
  territoryOrder.map((id) => {
    const node = nodeById.get(territoryNodeIds[id]);
    if (!node) throw new Error(`Missing graph territory ${id}`);

    const territory: Territory = {
      id,
      nodeId: node.id,
      slug: node.slug,
      label: node.label,
      architectureStatus: node.architectureStatus,
      topics: Object.values(topics)
        .filter((topic) => topic.territory === id)
        .map((topic) => topic.id),
    };
    return [id, territory];
  }),
) as Record<TerritoryId, Territory>;

export const publicTerritoryOrder = territoryOrder.filter((id) =>
  publicNodeIds.has(territories[id].nodeId),
);

export function topicIdsForView(
  territoryId: TerritoryId,
  editorialView: boolean,
): TopicId[] {
  const topicIds = territories[territoryId].topics;
  return editorialView
    ? topicIds
    : topicIds.filter((topicId) => publicNodeIds.has(topicId));
}

export function territoryIsPublic(territoryId: TerritoryId): boolean {
  return publicNodeIds.has(territories[territoryId].nodeId);
}

export function topicIsPublic(topicId: TopicId): boolean {
  return publicNodeIds.has(topicId);
}

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
  return (
    topic.canonicalPath ?? `/${territories[topic.territory].slug}/${topic.slug}`
  );
}
