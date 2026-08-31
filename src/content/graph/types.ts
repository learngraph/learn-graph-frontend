export type NodeKind = "territory" | "cluster" | "topic";

export type ArchitectureStatus = "approved" | "provisional" | "reserved";
export type PublicationStatus = "draft" | "review" | "publishable" | "hidden";
export type LabelStatus = "approved" | "provisional" | "open";

export type TruthStatus =
  | "current-capability"
  | "verified-evidence"
  | "proposed-application"
  | "principle"
  | "direction"
  | "requires-verification";

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

export interface ContentBlockMeta {
  truthStatus?: TruthStatus;
  sourceRefs?: string[];
  reviewNote?: string;
}

export interface ProseBlock extends ContentBlockMeta {
  type: "prose";
  paragraphs: string[];
}

export interface KeyPointsBlock extends ContentBlockMeta {
  type: "key-points";
  items: string[];
}

export interface DiagramBlock extends ContentBlockMeta {
  type: "diagram";
  assetId: string;
  caption?: string;
}

export interface MediaBlock extends ContentBlockMeta {
  type: "media";
  mediaKind: "image" | "video" | "audio";
  src: string;
  alt?: string;
  caption?: string;
}

export interface TechnicalFactsBlock extends ContentBlockMeta {
  type: "technical-facts";
  facts: Array<{
    label: string;
    value: string;
  }>;
}

export interface ArtifactReferenceBlock extends ContentBlockMeta {
  type: "artifact-reference";
  artifactIds: string[];
}

export interface LinkGroupBlock extends ContentBlockMeta {
  type: "link-group";
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

export interface ActionBlock extends ContentBlockMeta {
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
  publicationStatus: PublicationStatus;
  title?: string;
  lead?: string;
  sourceRefs?: string[];
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
