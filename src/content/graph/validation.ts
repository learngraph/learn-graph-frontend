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

    if (node.kind === "territory" && node.parentId) {
      errors.push(`Territory ${node.id} cannot have a parent`);
    }
    if (node.kind !== "territory" && !node.parentId) {
      errors.push(`${node.kind} ${node.id} must have a parent`);
    }
    if (node.parentId && !parent) {
      errors.push(`Node ${node.id} references missing parent ${node.parentId}`);
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
    if (node.contentId && !contentById.has(node.contentId)) {
      errors.push(
        `Node ${node.id} references missing content ${node.contentId}`,
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
