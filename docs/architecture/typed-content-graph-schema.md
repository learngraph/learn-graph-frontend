# Typed content-graph schema

Status: implementation contract for a non-visual foundation. The current website must continue working while this model is introduced alongside it.

## Separation of concerns

The model stores conceptual identity, hierarchy, publication state, content composition, artifacts, and meaningful relationships. It does not store screen coordinates, symmetry, animation, or desktop/mobile layout decisions.

## Node layers

```ts
type NodeKind = "territory" | "cluster" | "topic";

type ArchitectureStatus = "approved" | "provisional" | "reserved";
type PublicationStatus = "draft" | "review" | "publishable" | "hidden";
type LabelStatus = "approved" | "provisional" | "open";

interface ContentGraphNode {
  id: string;
  kind: NodeKind;
  parentId?: string;
  slug: string;
  canonicalPath?: string;
  label: string;
  labelStatus: LabelStatus;
  purpose: string;
  architectureStatus: ArchitectureStatus;
  publicationStatus: PublicationStatus;
  contentId?: string;
}
```

Rules:

- A territory is a root orientation domain.
- A cluster is optional and may be navigational without its own editorial content.
- A topic is independently addressable.
- Canonical paths are explicit and stable; they are not derived from visualization state.
- A reserved territory or topic remains modelled but is excluded from the public projection.
- Label uncertainty does not invalidate an approved conceptual node.

## Content composition

```ts
type ContentBlock =
  | ProseBlock
  | KeyPointsBlock
  | DiagramBlock
  | MediaBlock
  | TechnicalFactsBlock
  | ArtifactReferenceBlock
  | LinkGroupBlock
  | ActionBlock;

interface NodeContent {
  id: string;
  title?: string;
  lead?: string;
  blocks: ContentBlock[];
}
```

Content blocks are ordered editorial composition. A topic may legitimately contain one block or many; no block type is mandatory.

The current paragraph-based `NodeArticle` remains a temporary renderer contract until migration.

## Artifacts

```ts
type ArtifactKind =
  | "case"
  | "evidence"
  | "application"
  | "proposal"
  | "video"
  | "diagram"
  | "repository"
  | "paper"
  | "technical-reference";

type TruthStatus =
  | "current-capability"
  | "verified-evidence"
  | "proposed-application"
  | "principle"
  | "direction"
  | "requires-verification";

interface ContentArtifact {
  id: string;
  kind: ArtifactKind;
  title: string;
  truthStatus: TruthStatus;
  publicationStatus: PublicationStatus;
  canonicalPath?: string;
  contentId?: string;
  sourceRefs: string[];
}
```

Artifacts have independent identity. They can support several topics without being copied or becoming root navigation.

## Relationships

```ts
type RelationshipKind =
  | "contains"
  | "depends-on"
  | "explains"
  | "demonstrates"
  | "applies-in"
  | "supported-by"
  | "implemented-through"
  | "contributes-to";

interface ContentRelationship {
  sourceId: string;
  targetId: string;
  kind: RelationshipKind;
  label?: string;
}
```

Relationship labels are content metadata, not mandatory node captions. A projection decides which relations to show.

## Approved seed architecture

- Platform — approved
  - The model — approved label
  - Personal paths — approved label
  - Learning evidence — approved label
  - Sovereignty — approved label
- Collaborate — approved
  - Transformation services — approved cluster
    - Find the constraint — approved label
    - Reduce manual load — approved label
    - Build the offer — provisional label
  - LearnGraph partnerships — approved cluster
    - Pilot LearnGraph — approved working label
    - Implementation partnerships — approved working label
- About — approved
  - Why LearnGraph — approved label
  - Founding commitment / activism chapter — approved node, open public label
  - People — approved working label
  - Network — approved label
- Research / Open Source — reserved, hidden from launch projection pending owner/artifact verification
  - Open core — reserved
  - Interoperability — reserved
  - Research questions — reserved
  - Contribute — reserved

## Implementation sequence

1. Add these types and a seed registry without changing the current renderer.
2. Add validation tests for IDs, parent references, canonical-path uniqueness, visibility, content references, artifact references, and relationship endpoints.
3. Keep existing article files and routes operational through a compatibility adapter.
4. Do not migrate the graph visualization until the architecture registry is verified.
5. Add flexible content blocks and artifacts incrementally as approved material arrives.
6. Build desktop and mobile projections from the same registry only after topology and content density are understood.
