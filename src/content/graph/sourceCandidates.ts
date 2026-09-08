import type { SourceCandidate } from "./types";

const presentation =
  "Project Presentation · LG Project Presentation - ALL PAGES - mid.docx";
const legacyDigest = "Legacy review · Websiste legacy content .docx";

export const sourceCandidates = [
  {
    id: "source-using-learngraph-product-tour",
    nodeId: "platform-using-learngraph",
    title: "Using LearnGraph · product-tour working brief",
    provenance: "Owner and editorial working session · 8 September 2026",
    status: "partial",
    usefulFor:
      "The shared product route, role signals, operating areas, and required interface captures.",
    usefulMaterial: [
      "Atlas, Zone, and Skill Library form the shared learner-facing route.",
      "Cohort and organisation tools extend the same environment for guided and institutional work.",
      "Studio provides a distinct route for public graph contribution.",
      "All workflow statements still require comparison with the operational product before publication.",
    ],
  },
  {
    id: "source-model-living-map",
    nodeId: "platform-model",
    title: "A Living Map for Learning",
    provenance: `${presentation} · section 04`,
    status: "strong",
    usefulFor:
      "The reason a graph changes orientation rather than merely presentation.",
    usefulMaterial: [
      "Knowledge is connected: topics open into topics and skills depend on other skills.",
      "Resources can answer visible gaps while progress remains part of a wider structure.",
      "People can connect concepts, material, routes, and contexts without freezing one universal map.",
    ],
  },
  {
    id: "source-model-current-draft",
    nodeId: "platform-model",
    title: "Current graph-site draft",
    provenance: "src/content/nodes/platform/model.ts",
    status: "partial",
    usefulFor:
      "A compact catalogue-versus-graph contrast; not reusable as a finished article.",
    usefulMaterial: [
      "A catalogue shows what exists; the useful graph question is what relates, what comes next, and why.",
      "A shared competence structure can create common ground across learners and institutions.",
    ],
  },
  {
    id: "source-paths-movement",
    nodeId: "platform-model",
    title: "From Map to Movement",
    provenance: `${presentation} · section 05`,
    status: "strong",
    usefulFor:
      "Human movement through the graph without automated-prescription language.",
    usefulMaterial: [
      "A visible next step can become common ground between learners, mentors, and groups.",
      "The graph supports human judgment rather than replacing it.",
      "Movement should remain understandable instead of becoming an opaque recommendation.",
    ],
  },
  {
    id: "source-paths-beyond-score",
    nodeId: "platform-sovereignty",
    title: "Beyond the Score",
    provenance: `${presentation} · section 02`,
    status: "strong",
    usefulFor:
      "Starting position, visible gaps, and progress that cannot be reduced to one score.",
    usefulMaterial: [
      "A learner needs orientation toward a goal, not merely a record of completion.",
      "Foundations and gaps become useful when their relationship to possible movement is visible.",
    ],
  },
  {
    id: "source-evidence-beyond-score",
    nodeId: "platform-sovereignty",
    title: "Beyond the Score",
    provenance: `${presentation} · section 02`,
    status: "strong",
    usefulFor:
      "The argument for visible work and capability beyond attendance or scoring.",
    usefulMaterial: [
      "Progress should remain connected to the work, practice, and judgment through which it became visible.",
      "A score can record a result while losing the context that makes the result useful.",
    ],
  },
  {
    id: "source-evidence-vocational",
    nodeId: "platform-inclusive-learning",
    title: "Vocational learning and workplace evidence",
    provenance: `${legacyDigest} · vocational school / workplace sections`,
    status: "partial",
    usefulFor:
      "Concrete contexts in which artifacts, feedback, and demonstrated ability matter.",
    usefulMaterial: [
      "School standards, workshop practice, and company expectations need one inspectable competence context.",
      "Work and artifacts can attach to competence nodes so feedback and transitions retain context.",
    ],
  },
  {
    id: "source-sovereignty-independence",
    nodeId: "platform-sovereignty",
    title: "Independence and open-core direction",
    provenance: `${legacyDigest} · open core / institutional independence synthesis`,
    status: "verification-required",
    usefulFor:
      "Questions of inspectability, deployment choice, portability, and exit.",
    usefulMaterial: [
      "Institutional control requires more than access to an interface.",
      "Inspectability, data location, integration, and credible exit are the useful dimensions to test.",
      "The legacy source states capabilities that must be confirmed before reuse.",
    ],
  },
  {
    id: "source-sovereignty-protected-context",
    nodeId: "platform-sovereignty",
    title: "Protected-context requirements",
    provenance:
      "Afghan Women Project · v1_06 access-safety model and v1_03 project response",
    status: "proposal-only",
    usefulFor:
      "Showing why control and visibility choices matter in a concrete proposed context.",
    usefulMaterial: [
      "The proposal requires controlled access and private, pseudonymous, anonymised, or restricted visibility options.",
      "Connectivity, translation, onboarding, data handling, and trusted local roles are part of the operating system—not side notes.",
      "These are requirements of a proposal, not proof of implemented capability.",
    ],
  },
  {
    id: "source-constraint-service",
    nodeId: "collaborate-find-constraint",
    title: "Process clarity offer",
    provenance:
      "Legacy service page · service.hero, service.pressure, service.offers.clarity",
    status: "strong",
    usefulFor:
      "The real problem pattern, engagement focus, and intended outputs.",
    usefulMaterial: [
      "Begin with one critical process rather than an undefined transformation programme.",
      "Map manual friction, person-bound knowledge, hidden dependencies, ownership, data gaps, security, and regulatory constraints.",
      "The useful output is a shared picture, priorities, and a realistic first intervention.",
    ],
  },
  {
    id: "source-constraint-experience",
    nodeId: "collaborate-find-constraint",
    title: "Energy / critical-infrastructure experience",
    provenance: "Legacy inventory · LEG-SRV-005",
    status: "verification-required",
    usefulFor:
      "A possible experience note about dependency mapping and shared ownership.",
    usefulMaterial: [
      "The source mentions smart-metering or cloud-migration work, workshops, dependencies, and migration coordination.",
      "Client, date, team role, scope, deliverables, and measurable outcome are missing.",
    ],
  },
  {
    id: "source-automation-service",
    nodeId: "collaborate-reduce-manual-load",
    title: "Structured automation offer",
    provenance:
      "Legacy service page · service.pressure, service.compliance, service.offers.automation",
    status: "strong",
    usefulFor:
      "Pressure patterns and the distinction between useful automation and another opaque system.",
    usefulMaterial: [
      "Candidate pressure includes inboxes, handovers, repetitive decisions, overloaded teams, and fragile knowledge transfer.",
      "Automation has to fit existing systems, routines, governance, readiness, and rollout.",
      "The source contains intended outcomes, but no verified workload reduction or production case.",
    ],
  },
  {
    id: "source-automation-current-draft",
    nodeId: "collaborate-reduce-manual-load",
    title: "Current graph-site draft",
    provenance: "src/content/nodes/work/reduce-manual-load.ts",
    status: "partial",
    usefulFor:
      "A compressed statement of the offer; claims still require verification.",
    usefulMaterial: [
      "The reusable idea is reducing repetitive work without introducing an unowned black box.",
      "Treat the file as a fragment, not a ready article.",
    ],
  },
  {
    id: "source-offer-service",
    nodeId: "collaborate-build-offer",
    title: "Product and service development offer",
    provenance:
      "Legacy service page · service.pressure.cards.four and service.offers.product",
    status: "strong",
    usefulFor:
      "The situation, working sequence, and intended outputs behind the provisional node label.",
    usefulMaterial: [
      "The idea exists, but problem, audience, scope, implementation, and market fit do not yet form one path.",
      "The work connects proposition, MVP scope, design, architecture, validation, interfaces, governance, and integration.",
      "No client case currently substantiates the offer.",
    ],
  },
  {
    id: "source-offer-current-draft",
    nodeId: "collaborate-build-offer",
    title: "Current graph-site draft",
    provenance: "src/content/nodes/work/build-the-offer.ts",
    status: "partial",
    usefulFor:
      "Testing whether the current public label matches the actual engagement.",
    usefulMaterial: [
      "The current fragment connects design, architecture, validation, and a focused first release.",
      "It does not yet distinguish this work from general development or strategy consulting.",
    ],
  },
  {
    id: "source-pilots-applications",
    nodeId: "collaborate-pilot-learngraph",
    title: "Vocational and public-system application material",
    provenance: `${legacyDigest} · schools, labour-market, and pilot sections`,
    status: "strong",
    usefulFor:
      "Contexts and requirements from which a bounded pilot pattern can be assembled.",
    usefulMaterial: [
      "Vocational contexts connect curricula, workshop practice, company expectations, trainers, learners, and evidence.",
      "Labour-market contexts need shared competence semantics, visible gaps, adviser and employer workflows, and evaluation before scale.",
      "The sources describe applications, not successful deployments.",
    ],
  },
  {
    id: "source-pilots-protected-map",
    nodeId: "collaborate-pilot-learngraph",
    title: "Protected Learning Maps",
    provenance: "Afghan Women Project · documents 02–13",
    status: "proposal-only",
    usefulFor: "A detailed example of how context changes pilot design.",
    usefulMaterial: [
      "The proposal combines trusted access, facilitated groups, curated routes, artistic work, mentors, peer exchange, and protected documentation.",
      "It proposes a three- to four-month phased cycle with documentation and participant or facilitator reflection.",
      "Cohort, partners, delivery conditions, budget, and all outcomes remain unconfirmed.",
    ],
  },
  {
    id: "source-partnerships-role-model",
    nodeId: "collaborate-implementation-partnerships",
    title: "Implementation role pattern",
    provenance:
      "Afghan Women Project · partnership, implementation, pilot-phase, and pilot-scope documents",
    status: "proposal-only",
    usefulFor:
      "A concrete division of partner, LearnGraph, facilitator, mentor, and funder roles.",
    usefulMaterial: [
      "Partners contribute access, context, and safety knowledge; LearnGraph contributes digital structure and project capacity.",
      "Facilitators and mentors support learning and creative work; funding covers coordination, adaptation, access, documentation, and evaluation.",
      "This is a designed partnership model, not delivery history.",
    ],
  },
  {
    id: "source-partnerships-invitation",
    nodeId: "collaborate-implementation-partnerships",
    title: "Join the Map",
    provenance: `${presentation} · sections 08–09`,
    status: "partial",
    usefulFor: "High-level foundation and educational-partner invitation.",
    usefulMaterial: [
      "The presentation invites support for pilots, contextual adaptation, continuity, safety, and trust.",
      "It does not yet define selection, decision rights, responsibilities, or distinct partnership pathways.",
    ],
  },
  {
    id: "source-learning-without-frontiers-draft",
    nodeId: "collaborate-learning-without-frontiers",
    title: "Learning Without Frontiers · editorial draft 01",
    provenance: "Owner-provided website copy · 7 September 2026",
    status: "strong",
    usefulFor:
      "The complete public argument and its current Afghanistan field example.",
    usefulMaterial: [
      "Four distinct access conditions: money, language, absent institutions, and political restriction.",
      "A teacher in Afghanistan is currently using LearnGraph for language learning with women whose access to education is severely restricted.",
      "The collaboration invitation addresses educators, foundations, cultural institutions, and grassroots organisations.",
    ],
  },
  {
    id: "source-origin-current-draft",
    nodeId: "about-origin",
    title: "Before there was a graph",
    provenance: "Desktop/LG Website/NODE CONTENT/About/Origin.docx",
    status: "strong",
    usefulFor: "The human opening of the origin chapter.",
    usefulMaterial: [
      "The project began through a loose constellation rather than a polished founding narrative.",
      "The opening names developers, students, educators, activists, and people already working on access to learning.",
    ],
  },
  {
    id: "source-origin-milestone-brief",
    nodeId: "about-origin",
    title: "Milestone collection brief",
    provenance: "Desktop/LG Website/NODE CONTENT/About/Origin.docx",
    status: "partial",
    usefulFor:
      "Finding four to six moments when the meaning or reach of LearnGraph changed.",
    usefulMaterial: [
      "Collect what happened, roughly when, who was involved, why it mattered, and any artifact that can be shown.",
      "Release dates belong only when they changed what became possible for people.",
    ],
  },
  {
    id: "source-commitment-unequal-conditions",
    nodeId: "about-access",
    title: "Learning Access Under Unequal Conditions",
    provenance: `${presentation} · Where Potential Gets Buried and section 08`,
    status: "strong",
    usefulFor:
      "The reason this chapter exists and the conditions it must name concretely.",
    usefulMaterial: [
      "Direction is part of access; resources alone do not create usable opportunity.",
      "The material names interrupted education, poverty, migration, language barriers, unsafe contexts, and restrictions on who may learn.",
      "These are founding positions, not claims of achieved impact.",
    ],
  },
  {
    id: "source-commitment-protected-map",
    nodeId: "about-access",
    title: "Protected Learning Maps project material",
    provenance:
      "Afghan Women Project · project response, programme design, and access-safety model",
    status: "proposal-only",
    usefulFor:
      "Turning commitment into operational questions without presenting a manifesto.",
    usefulMaterial: [
      "The proposal makes safety, trusted access, facilitation, cultural context, translation, connectivity, and visibility part of programme design.",
      "It shows the kind of work this commitment may lead toward while remaining explicitly proposed.",
    ],
  },
  {
    id: "source-people-roster",
    nodeId: "about-people",
    title: "Legacy ten-person roster",
    provenance:
      "src/pages/landing/LandingTeamSection.tsx and src/i18n/locales/en.json",
    status: "factual-only",
    usefulFor: "Names, legacy roles, and candidate first-person material.",
    usefulMaterial: [
      "Ten people are currently represented with roles and value-oriented quotations.",
      "Every name, spelling, role, contribution, quotation, and publication consent requires confirmation.",
      "The preferred final unit is factual: name, role, contribution, and optionally one approved sentence in the person's own voice.",
    ],
  },
  {
    id: "source-network-roster",
    nodeId: "about-network",
    title: "Legacy organisation roster",
    provenance:
      "src/pages/landing/partnersData.ts and landing partner components",
    status: "factual-only",
    usefulFor: "Candidate names and links for a relationship-typed directory.",
    usefulMaterial: [
      "The site lists ITECH, Win4SMEs CoVE, All Digital, EGINA, POLITEHNICA București, FETICO, and Nebrija.",
      "Names and logos establish neither current relationship nor endorsement.",
      "The legacy figures of 20 institutions, 200 learners, and 8 countries have no usable provenance.",
    ],
  },
  {
    id: "source-impact-itech-case",
    nodeId: "about-impact",
    title: "ITECH case candidate",
    provenance: "Deployed legacy website successStories.itech content object",
    status: "strong",
    usefulFor:
      "A vocational-learning case connecting visible paths across school, workshop, and employer contexts.",
    usefulMaterial: [
      "The complete legacy narrative and three attributed teacher quotations are available.",
      "The case centres on visible learning paths, less repeated baseline orientation, more mentoring time, and competence evidence beyond grades.",
    ],
  },
  {
    id: "source-impact-optimum-case",
    nodeId: "about-impact",
    title: "Bildungszentrum Optimum case candidate",
    provenance:
      "https://learngraph.org/schools/success-stories/bildungszentrum-optimum",
    status: "strong",
    usefulFor:
      "A tutoring case about visible starting points, differentiated next steps, continuity, and reduced manual sorting.",
    usefulMaterial: [
      "The complete legacy narrative, fourth-grade example, and three attributed quotations are available.",
      "The case centres on systematic personalisation, follow-up, continuity, and protecting educator time for human support.",
    ],
  },
  {
    id: "source-open-core-direction",
    nodeId: "research-open-core",
    title: "Join the Map — open-core direction",
    provenance: `${presentation} · section 09`,
    status: "verification-required",
    usefulFor:
      "The intended openness principle, not a current license statement.",
    usefulMaterial: [
      "The core is described as something that should remain freely accessible as it grows.",
      "This is direction; it does not define what is open today, under which license, or with what support.",
    ],
  },
  {
    id: "source-interoperability-travel",
    nodeId: "research-interoperability",
    title: "Knowledge That Travels and Returns",
    provenance: `${presentation} · section 07`,
    status: "strong",
    usefulFor:
      "The social reason for portable, locally adaptable learning structures.",
    usefulMaterial: [
      "Paths and solutions should be able to travel, adapt, and leave shared memory without making communities identical.",
      "The thought is strong; it is not technical evidence of APIs, schemas, or exports.",
    ],
  },
  {
    id: "source-research-question-field",
    nodeId: "research-questions",
    title: "Question field across the project presentation",
    provenance: `${presentation} · sections 02, 05, 07–08`,
    status: "partial",
    usefulFor: "Candidate research questions, not findings.",
    usefulMaterial: [
      "The material raises questions about orientation, visible gaps, evidence beyond scores, human judgment, adaptable community knowledge, unequal access, privacy, and support under restriction.",
      "No owner, method, status, or publishable output is currently attached.",
    ],
  },
  {
    id: "source-contribute-conventions",
    nodeId: "research-contribute",
    title: "Repository contribution conventions",
    provenance: "Frontend repository · README and contribution files",
    status: "verification-required",
    usefulFor:
      "A possible technical contribution route if the team confirms it is actively supported.",
    usefulMaterial: [
      "Contribution mechanics exist in the repository.",
      "That does not prove that external contributions are invited, governable, or supportable today.",
    ],
  },
] as const satisfies readonly SourceCandidate[];
