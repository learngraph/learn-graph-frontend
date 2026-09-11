import type {
  ContentArtifact,
  ContentGraphNode,
  ContentGraphRegistry,
  NodeContent,
} from "./types";

function duplicateValues(values: string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  values.forEach((value) => {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  });

  return [...duplicates];
}

export function validateContentGraph(registry: ContentGraphRegistry): string[] {
  const errors: string[] = [];
  const nodeById = new Map<string, ContentGraphNode>(
    registry.nodes.map((node) => [node.id, node]),
  );
  const contentById = new Map<string, NodeContent>(
    registry.contents.map((content) => [content.id, content]),
  );
  const artifactById = new Map<string, ContentArtifact>(
    registry.artifacts.map((artifact) => [artifact.id, artifact]),
  );

  duplicateValues(registry.nodes.map((node) => node.id)).forEach((id) => {
    errors.push(`Duplicate node id: ${id}`);
  });
  duplicateValues(registry.contents.map((content) => content.id)).forEach(
    (id) => errors.push(`Duplicate content id: ${id}`),
  );
  duplicateValues(registry.briefs.map((brief) => brief.nodeId)).forEach((id) =>
    errors.push(`Duplicate editorial brief for node: ${id}`),
  );
  duplicateValues(registry.contentSlots.map((slot) => slot.nodeId)).forEach(
    (id) => errors.push(`Duplicate content slot for node: ${id}`),
  );
  duplicateValues(registry.sourceCandidates.map((source) => source.id)).forEach(
    (id) => errors.push(`Duplicate source candidate id: ${id}`),
  );
  duplicateValues(registry.artifacts.map((artifact) => artifact.id)).forEach(
    (id) => errors.push(`Duplicate artifact id: ${id}`),
  );
  duplicateValues(
    [...registry.nodes, ...registry.artifacts]
      .map((entry) => entry.canonicalPath)
      .filter((path): path is string => path !== undefined),
  ).forEach((path) => errors.push(`Duplicate canonical path: ${path}`));

  registry.nodes.forEach((node) => {
    const parent = node.parentId ? nodeById.get(node.parentId) : undefined;

    if (node.kind === "root" && node.parentId) {
      errors.push(`Root ${node.id} cannot have a parent`);
    }
    if (node.kind !== "root" && !node.parentId) {
      errors.push(`${node.kind} ${node.id} must have a parent`);
    }
    if (node.parentId && !parent) {
      errors.push(`Node ${node.id} references missing parent ${node.parentId}`);
    }
    if (node.kind === "territory" && parent?.kind !== "root") {
      errors.push(`Territory ${node.id} must belong to the root`);
    }
    if (node.kind === "cluster" && parent?.kind !== "territory") {
      errors.push(`Cluster ${node.id} must belong to a territory`);
    }
    if (
      node.kind === "topic" &&
      parent &&
      parent.kind !== "territory" &&
      parent.kind !== "cluster"
    ) {
      errors.push(`Topic ${node.id} must belong to a territory or cluster`);
    }
    if (
      node.architectureStatus === "reserved" &&
      node.publicationStatus !== "hidden"
    ) {
      errors.push(`Reserved node ${node.id} must be hidden`);
    }
    if (
      node.publicationStatus === "publishable" &&
      (!node.canonicalPath || node.labelStatus !== "approved")
    ) {
      errors.push(
        `Publishable node ${node.id} needs a canonical path and approved label`,
      );
    }
    if (
      node.publicationStatus === "publishable" &&
      parent &&
      parent.publicationStatus !== "publishable"
    ) {
      errors.push(
        `Publishable node ${node.id} needs a publishable parent ${parent.id}`,
      );
    }
    if (
      node.publicationStatus === "publishable" &&
      node.kind === "topic" &&
      !node.contentId
    ) {
      errors.push(`Publishable topic ${node.id} needs content`);
    }
    if (node.contentId && !contentById.has(node.contentId)) {
      errors.push(
        `Node ${node.id} references missing content ${node.contentId}`,
      );
    }
    if (
      node.publicationStatus === "publishable" &&
      node.contentId &&
      contentById.get(node.contentId)?.publicationStatus !== "publishable"
    ) {
      errors.push(
        `Publishable node ${node.id} needs publishable content ${node.contentId}`,
      );
    }
  });

  registry.artifacts.forEach((artifact) => {
    if (artifact.contentId && !contentById.has(artifact.contentId)) {
      errors.push(
        `Artifact ${artifact.id} references missing content ${artifact.contentId}`,
      );
    }
  });

  registry.briefs.forEach((brief) => {
    const node = nodeById.get(brief.nodeId);
    if (!node) {
      errors.push(`Editorial brief references missing node ${brief.nodeId}`);
    } else if (node.kind !== "topic") {
      errors.push(`Editorial brief ${brief.nodeId} must belong to a topic`);
    }
  });

  const slotByNodeId = new Map(
    registry.contentSlots.map((slot) => [slot.nodeId, slot]),
  );
  registry.contentSlots.forEach((slot) => {
    const node = nodeById.get(slot.nodeId);
    if (!node) {
      errors.push(`Content slot references missing node ${slot.nodeId}`);
    } else if (node.kind !== "topic") {
      errors.push(`Content slot ${slot.nodeId} must belong to a topic`);
    }
  });
  registry.sourceCandidates.forEach((source) => {
    const node = nodeById.get(source.nodeId);
    if (!node) {
      errors.push(`Source candidate references missing node ${source.nodeId}`);
    } else if (node.kind !== "topic") {
      errors.push(`Source candidate ${source.id} must belong to a topic`);
    }
  });
  registry.nodes
    .filter((node) => node.kind === "topic")
    .forEach((node) => {
      const slot = slotByNodeId.get(node.id);
      if (!slot) {
        errors.push(`Topic ${node.id} needs a content slot`);
      }
      if (
        slot?.sourceAvailability !== "none" &&
        !registry.sourceCandidates.some((source) => source.nodeId === node.id)
      ) {
        errors.push(`Topic ${node.id} claims sources but has no source shelf`);
      }
      if (
        node.publicationStatus === "publishable" &&
        slot?.copyStatus !== "approved"
      ) {
        errors.push(`Publishable topic ${node.id} needs approved copy`);
      }
    });

  registry.contents.forEach((content) => {
    content.blocks.forEach((block) => {
      if (block.type !== "artifact-reference") return;
      block.artifactIds.forEach((artifactId) => {
        if (!artifactById.has(artifactId)) {
          errors.push(
            `Content ${content.id} references missing artifact ${artifactId}`,
          );
        }
      });
    });
  });

  const entityIds = new Set([
    ...registry.nodes.map((node) => node.id),
    ...registry.artifacts.map((artifact) => artifact.id),
  ]);
  registry.relationships.forEach((relationship) => {
    if (!entityIds.has(relationship.sourceId)) {
      errors.push(
        `Relationship references missing source ${relationship.sourceId}`,
      );
    }
    if (!entityIds.has(relationship.targetId)) {
      errors.push(
        `Relationship references missing target ${relationship.targetId}`,
      );
    }
  });

  return errors;
}

export function visibleArchitectureNodes(
  registry: ContentGraphRegistry,
): ContentGraphNode[] {
  return registry.nodes.filter(
    (node) =>
      node.architectureStatus !== "reserved" &&
      node.publicationStatus !== "hidden",
  );
}

export function publicArchitectureNodes(
  registry: ContentGraphRegistry,
): ContentGraphNode[] {
  const nodeById = new Map(
    registry.nodes.map((node) => [node.id, node] as const),
  );
  const contentById = new Map(
    registry.contents.map((content) => [content.id, content] as const),
  );
  const visibility = new Map<string, boolean>();

  const isPublic = (node: ContentGraphNode): boolean => {
    const cached = visibility.get(node.id);
    if (cached !== undefined) return cached;

    const contentIsPublic =
      !node.contentId ||
      contentById.get(node.contentId)?.publicationStatus === "publishable";
    const nodeIsPublic =
      node.architectureStatus !== "reserved" &&
      node.publicationStatus === "publishable" &&
      node.labelStatus === "approved" &&
      contentIsPublic;

    if (!nodeIsPublic) {
      visibility.set(node.id, false);
      return false;
    }

    if (!node.parentId) {
      visibility.set(node.id, true);
      return true;
    }

    const parent = nodeById.get(node.parentId);
    const result = parent ? isPublic(parent) : false;
    visibility.set(node.id, result);
    return result;
  };

  return registry.nodes.filter(isPublic);
}
