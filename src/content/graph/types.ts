export type NodeKind = "root" | "territory" | "cluster" | "topic";

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
  kicker?: string;
  paragraphs: string[];
  /** Index from which paragraphs receive the "conclusion" treatment.
   *  Defaults to the final paragraph only. Set to e.g. 3 to mark the
   *  last two paragraphs of a five-paragraph block as conclusions. */
  conclusionFrom?: number;
}

export interface KeyPointsBlock extends ContentBlockMeta {
  type: "key-points";
  kicker?: string;
  items: string[];
}

export interface StatementsBlock extends ContentBlockMeta {
  type: "statements";
  items: Array<{
    label?: string;
    text: string;
  }>;
}

export interface PullQuoteBlock extends ContentBlockMeta {
  type: "pull-quote";
  text: string;
}

export interface FragmentsBlock extends ContentBlockMeta {
  type: "fragments";
  items: Array<{
    text: string;
    source?: string;
  }>;
}

export interface RosterBlock extends ContentBlockMeta {
  type: "roster";
  people: Array<{
    name: string;
    role?: string;
    quote?: string;
  }>;
}

export interface CaseStudiesBlock extends ContentBlockMeta {
  type: "case-studies";
  cases: Array<{
    id: string;
    partner: string;
    kicker: string;
    title: string;
    teaser: string;
    lede: string;
    websiteUrl?: string;
    websiteLabel?: string;
    sections: Array<
      | {
          type: "prose";
          paragraphs: string[];
        }
      | {
          type: "quote";
          text: string;
          attribution: string;
        }
    >;
  }>;
}

export interface ProductTourBlock extends ContentBlockMeta {
  type: "product-tour";
  roleSummaries: Array<{
    role: string;
    introduction: string;
    destinations: Array<{
      name: string;
      job: string;
    }>;
  }>;
  crossCutting?: {
    afterChapterId: string;
    label: string;
    introduction: string;
    items: Array<{
      name: string;
      job: string;
    }>;
  };
  chapters: Array<{
    id: string;
    label: string;
    layout: "route" | "system" | "studio";
    stages: Array<{
      id: string;
      name: string;
      roles: string[];
      description: string;
      actions: string[];
      imageSrc?: string;
      imageAlt?: string;
      captureLabel: string;
    }>;
  }>;
}

export interface ModelSystemBlock extends ContentBlockMeta {
  type: "model-system";
  plate: {
    nodes: Array<{
      id: string;
      name: string;
      description: string;
    }>;
    relations: Array<{
      sourceId: string;
      targetId: string;
      label: string;
      reading: string;
    }>;
  };
}

export interface RelationshipAtlasBlock extends ContentBlockMeta {
  type: "relationship-atlas";
  relationships: Array<{
    name: string;
    context?: string;
    introduction: string;
    theirField: string;
    sharedWork: string;
    weight?: "primary" | "secondary";
  }>;
  europeanField?: {
    heading: string;
    introduction: string;
    organisations: Array<{
      name: string;
      location: string;
      description: string;
      quote?: string;
      attribution?: string;
    }>;
    note?: string;
  };
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

export interface PilotRecordBlock extends ContentBlockMeta {
  type: "pilot-record";
  status: "incomplete" | "verified";
  partner: string;
  introduction?: string;
  facts: Array<{
    label: string;
    value?: string;
  }>;
  before?: {
    paragraphs: string[];
    observation?: {
      text: string;
      attribution: string;
    };
  };
  boundary: Array<{
    label: string;
    value?: string;
  }>;
  sharedPath?: string[];
  perspectives?: {
    learner: Array<{ label: string; value: string }>;
    educator: Array<{ label: string; value: string }>;
  };
  after?: {
    observed?: string;
    unresolved?: string;
    next?: string;
  };
  unresolvedFacts: string[];
  closing: string;
  action: {
    label: string;
    href: string;
  };
}

export interface PartnershipModelBlock extends ContentBlockMeta {
  type: "partnership-model";
  center: {
    label: string;
    statement: string;
    invitation: string;
    resolved: string;
  };
  roles: Array<{
    id: string;
    label: string;
    shortLabel: string;
    description: string;
    contribution: string;
    responsibility: string;
    dependency: string;
  }>;
  sharedQuestions: Array<{
    label: string;
    question: string;
  }>;
  closing: string;
  action: {
    label: string;
    href: string;
  };
}

export interface PartnershipFieldBlock extends ContentBlockMeta {
  type: "partnership-field";
  /** Five contribution bubbles — the vocabulary for the reinforcement paragraph below */
  contributions: Array<{
    id: string;
    label: string;
    description: string;
  }>;
  /** Passage that names the same contributions and shows how they reinforce each other.
   *  Structured as a list of paragraphs; each paragraph is a list of sentences, each
   *  sentence linked to one contribution via contributionId — hover/focus on a bubble
   *  highlights the matching sentence(s) and vice versa. */
  reinforcement: {
    heading: string;
    intro: string;
    paragraphs: Array<
      Array<{
        contributionId: string;
        text: string;
      }>
    >;
    closing: string;
  };
  closing: {
    heading: string;
    paragraphs: string[];
  };
  action: {
    label: string;
    href: string;
  };
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
  | StatementsBlock
  | PullQuoteBlock
  | FragmentsBlock
  | RosterBlock
  | CaseStudiesBlock
  | ProductTourBlock
  | ModelSystemBlock
  | RelationshipAtlasBlock
  | DiagramBlock
  | MediaBlock
  | TechnicalFactsBlock
  | ArtifactReferenceBlock
  | PilotRecordBlock
  | PartnershipModelBlock
  | PartnershipFieldBlock
  | LinkGroupBlock
  | ActionBlock;

export interface NodeContent {
  id: string;
  publicationStatus: PublicationStatus;
  layout?:
    | "access"
    | "activism"
    | "activism-case"
    | "compact"
    | "composition"
    | "convictions"
    | "editorial"
    | "index"
    | "origin"
    | "impact"
    | "atlas"
    | "frontiers"
    | "graph-essay"
    | "model-system"
    | "partnership-model"
    | "partnership-field"
    | "product-tour"
    | "pilot";
  kicker?: string;
  title?: string;
  lead?: string;
  sourceRefs?: string[];
  blocks: ContentBlock[];
}

export interface EditorialBrief {
  nodeId: string;
  status: "draft" | "approved";
  coreClaim: string;
  tension: string;
  intendedMemory: string;
  mustShow: string[];
  availableMaterial: string[];
  avoid: string[];
  sourceRefs: string[];
}

export type SourceAvailability =
  | "none"
  | "legacy-content"
  | "project-material"
  | "legacy-and-project";

export type CopyStatus =
  | "not-created"
  | "needs-revision"
  | "ready-for-review"
  | "approved";

export type WorkEstimate =
  | "light-revision"
  | "substantial-revision"
  | "new-assembly"
  | "factual-assembly"
  | "owner-facts-first"
  | "review"
  | "ready";

export type SupportingMaterialStatus =
  | "missing"
  | "candidate"
  | "blocked"
  | "available";

export interface SupportingMaterialNeed {
  kind:
    | "diagram"
    | "image"
    | "video"
    | "case"
    | "technical-facts"
    | "roster"
    | "relationship-directory"
    | "application"
    | "timeline";
  label: string;
  status: SupportingMaterialStatus;
}

export interface ContentSlot {
  nodeId: string;
  sourceAvailability: SourceAvailability;
  copyStatus: CopyStatus;
  workEstimate: WorkEstimate;
  statusNote: string;
  blockers: string[];
  supportingMaterial: SupportingMaterialNeed[];
}

export type SourceCandidateStatus =
  | "strong"
  | "partial"
  | "factual-only"
  | "proposal-only"
  | "verification-required";

export interface SourceCandidate {
  id: string;
  nodeId: string;
  title: string;
  provenance: string;
  status: SourceCandidateStatus;
  usefulFor: string;
  usefulMaterial: string[];
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
  briefs: EditorialBrief[];
  contentSlots: ContentSlot[];
  sourceCandidates: SourceCandidate[];
  contents: NodeContent[];
  artifacts: ContentArtifact[];
  relationships: ContentRelationship[];
}
