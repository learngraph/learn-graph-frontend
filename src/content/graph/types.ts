export type NodeKind = "territory" | "cluster" | "topic";

export type ArchitectureStatus = "approved" | "provisional" | "reserved";
export type PublicationStatus = "draft" | "review" | "publishable" | "hidden";
export type LabelStatus = "approved" | "provisional" | "open";

export interface ContentGraphNode {
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

export interface ProseBlock {
  type: "prose";
  paragraphs: string[];
}

export interface KeyPointsBlock {
  type: "key-points";
  items: string[];
}

export interface DiagramBlock {
  type: "diagram";
  assetId: string;
  caption?: string;
}

export interface MediaBlock {
  type: "media";
  mediaKind: "image" | "video" | "audio";
  src: string;
  alt?: string;
  caption?: string;
}

export interface TechnicalFactsBlock {
  type: "technical-facts";
  facts: Array<{
    label: string;
    value: string;
  }>;
}

export interface ArtifactReferenceBlock {
  type: "artifact-reference";
  artifactIds: string[];
}

export interface LinkGroupBlock {
  type: "link-group";
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface ActionBlock {
  type: "action";
  label: string;
  href: string;
  external?: boolean;
}

export type ContentBlock =
  | ProseBlock
  | KeyPointsBlock
  | DiagramBlock
  | MediaBlock
  | TechnicalFactsBlock
  | ArtifactReferenceBlock
  | LinkGroupBlock
  | ActionBlock;

export interface NodeContent {
  id: string;
  title?: string;
  lead?: string;
  blocks: ContentBlock[];
}

export type ArtifactKind =
  | "case"
  | "evidence"
  | "application"
  | "proposal"
  | "video"
  | "diagram"
  | "repository"
  | "paper"
  | "technical-reference";

export type TruthStatus =
  | "current-capability"
  | "verified-evidence"
  | "proposed-application"
  | "principle"
  | "direction"
  | "requires-verification";

export interface ContentArtifact {
  id: string;
  kind: ArtifactKind;
  title: string;
  truthStatus: TruthStatus;
  publicationStatus: PublicationStatus;
  canonicalPath?: string;
  contentId?: string;
  sourceRefs: string[];
}

export type RelationshipKind =
  | "contains"
  | "depends-on"
  | "explains"
  | "demonstrates"
  | "applies-in"
  | "supported-by"
  | "implemented-through"
  | "contributes-to";

export interface ContentRelationship {
  sourceId: string;
  targetId: string;
  kind: RelationshipKind;
  label?: string;
}

export interface ContentGraphRegistry {
  nodes: ContentGraphNode[];
  contents: NodeContent[];
  artifacts: ContentArtifact[];
  relationships: ContentRelationship[];
}
