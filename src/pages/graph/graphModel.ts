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

export interface GraphAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface Topic {
  id: TopicId;
  territory: TerritoryId;
  label: string;
  relation: string;
  eyebrow: string;
  title: string;
  lead: string;
  body: string[];
  action?: GraphAction;
  connections?: Array<{
    id: TopicId;
    relation: string;
  }>;
}

export interface Territory {
  id: TerritoryId;
  label: string;
  statement: string;
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
    label: "Platform",
    statement: "See how LearnGraph turns goals, abilities, and evidence into navigable paths.",
    topics: [
      "platform-model",
      "platform-paths",
      "platform-evidence",
      "platform-sovereignty",
    ],
  },
  work: {
    id: "work",
    label: "Work with us",
    statement: "Bring a blocked process, a learning challenge, or a product that needs structure.",
    topics: ["work-clarity", "work-automation", "work-products", "work-together"],
  },
  about: {
    id: "about",
    label: "About",
    statement: "Understand the people, intent, and relationships behind LearnGraph.",
    topics: ["about-origin", "about-team", "about-network", "about-contact"],
  },
  research: {
    id: "research",
    label: "Research / Open Source",
    statement: "Inspect the ideas, infrastructure, and open work beneath the product.",
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
    label: "The model",
    relation: "gives structure to",
    eyebrow: "Platform · The model",
    title: "Learning becomes navigable when its relationships become visible.",
    lead: "LearnGraph connects people, abilities, goals, learning material, and opportunities in one shared model.",
    body: [
      "A catalogue can tell you what exists. A graph can show what relates to you, what comes next, and why.",
      "That shared structure gives learners orientation while allowing schools, employers, and public partners to work with the same competence language.",
    ],
    action: {
      label: "Enter the platform",
      href: "https://app.learngraph.org",
      external: true,
    },
    connections: [
      { id: "research-interoperability", relation: "is made portable by" },
      { id: "platform-sovereignty", relation: "remains accountable through" },
    ],
  },
  "platform-paths": {
    id: "platform-paths",
    territory: "platform",
    label: "Personal paths",
    relation: "turns goals into",
    eyebrow: "Platform · Personal paths",
    title: "A path begins with where you are—not with a generic course catalogue.",
    lead: "Goals and existing abilities define a personal route through relevant learning and practice.",
    body: [
      "The path stays legible: learners can understand the destination, the gaps, and the reason each step belongs.",
      "As evidence grows, the map changes with the person rather than forcing everyone through the same sequence.",
    ],
    connections: [
      { id: "platform-evidence", relation: "becomes credible through" },
      { id: "research-fields", relation: "is informed by" },
    ],
  },
  "platform-evidence": {
    id: "platform-evidence",
    territory: "platform",
    label: "Evidence",
    relation: "makes progress visible through",
    eyebrow: "Platform · Evidence",
    title: "Progress should be demonstrated, not inferred from attendance.",
    lead: "Projects, feedback, and demonstrated abilities create evidence that learners and institutions can inspect.",
    body: [
      "Evidence connects learning to practice without reducing people to scores or opaque analytics.",
      "It also gives partners a common basis for recognising growth across school, work, and changing contexts.",
    ],
    connections: [
      { id: "about-network", relation: "gains context from" },
      { id: "work-together", relation: "can be tested through" },
    ],
  },
  "platform-sovereignty": {
    id: "platform-sovereignty",
    territory: "platform",
    label: "Sovereignty",
    relation: "keeps control with",
    eyebrow: "Platform · Sovereignty",
    title: "The infrastructure should remain inspectable, deployable, and yours.",
    lead: "An open core, self-hosting options, and deliberate integrations protect institutional independence.",
    body: [
      "Sensitive education and labour-market data can stay where policy and responsibility require.",
      "Openness creates real exit options and lets procurement, security, and educators inspect what enters production.",
    ],
    connections: [
      { id: "research-open", relation: "is implemented through" },
      { id: "research-interoperability", relation: "depends on" },
    ],
  },
  "work-clarity": {
    id: "work-clarity",
    territory: "work",
    label: "Find the constraint",
    relation: "starts by",
    eyebrow: "Work with us · Process clarity",
    title: "Before building, make the real constraint visible.",
    lead: "We map one critical process, surface hidden dependencies, and define the first realistic move.",
    body: [
      "This creates a shared picture across operations, product, and technology before an organisation commits to a transformation programme.",
      "Readiness, ownership, security, and regulatory questions enter the work from the beginning.",
    ],
    action: { label: "Start a conversation", href: "mailto:contact@learngraph.org" },
    connections: [{ id: "platform-model", relation: "uses the same structural thinking as" }],
  },
  "work-automation": {
    id: "work-automation",
    territory: "work",
    label: "Reduce manual load",
    relation: "can continue by",
    eyebrow: "Work with us · Structured automation",
    title: "Automation should remove pressure without creating a new black box.",
    lead: "We connect process analysis, architecture, data, and adoption to build automation that fits daily work.",
    body: [
      "The aim is not a collection of disconnected AI pilots. It is less manual load, stronger knowledge retention, and an operating model people can trust.",
      "Governance and rollout discipline remain part of delivery rather than becoming a late compliance exercise.",
    ],
    action: { label: "Discuss a process", href: "mailto:contact@learngraph.org" },
  },
  "work-products": {
    id: "work-products",
    territory: "work",
    label: "Build the offer",
    relation: "becomes tangible when we",
    eyebrow: "Work with us · Product and service development",
    title: "Design, architecture, and validation need to move together.",
    lead: "We sharpen the problem, define a viable first version, and carry it from proposition into implementation.",
    body: [
      "A focused first release should create real user value without becoming a technical dead end.",
      "Interfaces, governance, and secure integration are treated as part of the product—not invisible work postponed until scale.",
    ],
    action: { label: "Bring us an idea", href: "mailto:contact@learngraph.org" },
    connections: [{ id: "about-team", relation: "is carried by" }],
  },
  "work-together": {
    id: "work-together",
    territory: "work",
    label: "Work together",
    relation: "creates value when we",
    eyebrow: "Work with us · Collaboration",
    title: "Start with one consequential problem—not a transformation theatre programme.",
    lead: "We work with institutions, public services, employers, and technical partners where complexity needs to become actionable.",
    body: [
      "A first engagement can be a focused sprint, a pilot, or a concrete product increment. Its job is to create evidence for the next decision.",
      "The collaboration should leave stronger structures and capabilities behind, not dependence on a permanent external team.",
    ],
    action: { label: "Work with LearnGraph", href: "mailto:contact@learngraph.org" },
    connections: [
      { id: "about-network", relation: "grows through" },
      { id: "platform-evidence", relation: "should produce" },
    ],
  },
  "about-origin": {
    id: "about-origin",
    territory: "about",
    label: "Why LearnGraph",
    relation: "exists because",
    eyebrow: "About · Origin",
    title: "People deserve orientation without surrendering agency.",
    lead: "LearnGraph began with a simple tension: learning systems organise content well, but rarely organise it around the person.",
    body: [
      "The project exists to make learning paths understandable, adaptable, and connected to real opportunity.",
      "Its graph is not a visual metaphor placed on top. It is the structure through which those relationships can remain visible.",
    ],
    connections: [{ id: "platform-model", relation: "became concrete as" }],
  },
  "about-team": {
    id: "about-team",
    territory: "about",
    label: "The team",
    relation: "is built by",
    eyebrow: "About · Team",
    title: "Product thinking, architecture, education, and implementation belong in one room.",
    lead: "LearnGraph brings together experience from software, complex infrastructure, learning, and public-interest collaboration.",
    body: [
      "The team works across the boundary between concept and delivery: understanding the system, building the product, and helping it survive contact with reality.",
      "That combination matters most where trust, interoperability, and responsibility cannot be added later.",
    ],
    connections: [
      { id: "work-products", relation: "delivers" },
      { id: "research-fields", relation: "investigates" },
    ],
  },
  "about-network": {
    id: "about-network",
    territory: "about",
    label: "The network",
    relation: "grows with",
    eyebrow: "About · Partners",
    title: "A shared graph only becomes useful through shared work.",
    lead: "Schools, researchers, public institutions, employers, and technology partners give the model its real contexts.",
    body: [
      "Partnerships are not a logo cabinet. They are where vocabulary is challenged, pilots become measurable, and infrastructure becomes interoperable.",
      "Cases and evidence therefore belong beside the claims they strengthen throughout this environment.",
    ],
    connections: [
      { id: "work-together", relation: "is extended through" },
      { id: "platform-evidence", relation: "creates" },
    ],
  },
  "about-contact": {
    id: "about-contact",
    territory: "about",
    label: "Contact",
    relation: "can be reached through",
    eyebrow: "About · Contact",
    title: "Bring us the thing that is difficult to make visible.",
    lead: "A learning challenge, a blocked process, a research question, or a collaboration that needs a shared structure is enough to begin.",
    body: [
      "Write directly. You do not need to translate the situation into a polished brief first.",
    ],
    action: { label: "contact@learngraph.org", href: "mailto:contact@learngraph.org" },
  },
  "research-fields": {
    id: "research-fields",
    territory: "research",
    label: "Questions",
    relation: "investigates",
    eyebrow: "Research · Questions",
    title: "How can learning remain personal while its evidence remains portable?",
    lead: "Our work sits across knowledge graphs, competence semantics, adaptive pathways, trustworthy AI, and human agency.",
    body: [
      "These questions are technical and social at the same time. A useful system must model relationships precisely without pretending a person can be reduced to a model.",
      "Research becomes valuable here when it changes what the product can explain, protect, or enable.",
    ],
    connections: [
      { id: "platform-paths", relation: "shapes" },
      { id: "about-network", relation: "is grounded with" },
    ],
  },
  "research-open": {
    id: "research-open",
    territory: "research",
    label: "Open core",
    relation: "makes inspectable",
    eyebrow: "Research / Open Source · Open core",
    title: "Infrastructure that affects opportunity should be inspectable.",
    lead: "Open components make assumptions visible and give institutions meaningful control over deployment and change.",
    body: [
      "This is not openness as a slogan. It supports auditability, adaptation, procurement confidence, and credible exit options.",
      "The public layer will connect repositories and documentation here as the open surface grows.",
    ],
    connections: [{ id: "platform-sovereignty", relation: "protects" }],
  },
  "research-interoperability": {
    id: "research-interoperability",
    territory: "research",
    label: "Interoperability",
    relation: "connects through",
    eyebrow: "Research / Open Source · Interoperability",
    title: "Learning crosses systems. Its meaning must be able to cross with it.",
    lead: "Shared semantics and deliberate interfaces let schools, employers, tools, and public infrastructure collaborate without becoming one platform.",
    body: [
      "Interoperability is what turns a local learning graph into portable understanding rather than another isolated profile.",
      "It also limits lock-in: each organisation can retain its responsibilities while participating in a shared model.",
    ],
    connections: [
      { id: "platform-model", relation: "makes portable" },
      { id: "platform-sovereignty", relation: "supports" },
    ],
  },
  "research-contribute": {
    id: "research-contribute",
    territory: "research",
    label: "Contribute",
    relation: "invites others to",
    eyebrow: "Research / Open Source · Collaboration",
    title: "Useful openness creates places where other people can change the work.",
    lead: "We are shaping the public repositories, documentation, and research collaborations around LearnGraph.",
    body: [
      "If you are working on competence models, knowledge infrastructure, education, or trustworthy learning technology, we would like to hear what should connect.",
    ],
    action: { label: "Open a conversation", href: "mailto:contact@learngraph.org" },
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
