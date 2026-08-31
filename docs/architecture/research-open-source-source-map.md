# Research / Open Source — factual source map

Status: source analysis for architecture work. This is not final copy, a final node list, or a topology decision.

## Scope and evidence rules

The reviewed material suggests four possible subject areas: open core, interoperability, research questions, and contribution. Their conceptual coherence is stronger than their current public evidence.

This map distinguishes:

- **inspectable artifact** — something present in the reviewed repository or explicitly linked by it
- **experience claim** — past work described in site copy but lacking sufficient project provenance
- **product claim** — a statement about current capability that needs technical verification
- **intent/roadmap** — future public repositories, documentation, collaboration, or capability
- **research question** — a legitimate inquiry, not evidence that research has been conducted or published

No territory should be padded with aspirational nodes. “Open source” and “research” should only be used as broadly as artifacts and public work allow.

## Current inspectable baseline

The local frontend checkout provides a modest, concrete baseline:

- a configured Git remote at `https://github.com/learngraph/learn-graph-frontend`
- a working frontend codebase with graph content, tests, development instructions, and a pull-request workflow in `README.md`
- a repository-level `LICENSE` containing Creative Commons Attribution-NonCommercial 4.0 terms
- contributor instructions covering conventional commits, formatting/linting, tests, pull requests, and review
- current frontend implementations of the four Research topics, but only as short editorial scaffolds

Important limitation: the remote URL was observed in the local checkout, but public reachability, repository visibility, branch state, and correspondence with the deployed product were not independently verified in this pass.

Important licensing caution: CC BY-NC 4.0 permits sharing and adaptation only for noncommercial purposes. That restriction means the repository license should not automatically be described as an OSI-style open-source software license. The owner must define what “open core” covers, which code or content the license applies to, and whether another software license exists elsewhere.

No papers, preprints, datasets, formal research methods, research partner outputs, technical specifications, API documentation, public roadmap, contribution governance, or linked backend repository were found in the reviewed source set.

## 1. Open core

### Source-backed substance

- Legacy landing and school/labour-market material repeatedly promises an inspectable, hostable, extendable, or self-hostable core; institutional deployment control; integrations; data location control; and exit options. **Status: product claims requiring technical and commercial verification.**
- Project Presentation `Join the Map` says the core should remain freely accessible as it grows. **Status: intent/business-model direction, not a precise license or capability statement.**
- The current `research/open-core.ts` says public repositories and documentation will be connected “as the open surface grows.” **Status: explicit roadmap language.**
- The local frontend repository, its README, contribution workflow, and license are inspectable artifacts. They establish that at least this frontend checkout has shareable code/material and contribution conventions; they do not establish the scope of the LearnGraph core, current self-hostability, backend openness, or production deployability.

### Current public artifacts/evidence to verify

- candidate repository: `https://github.com/learngraph/learn-graph-frontend`
- frontend `README.md`
- repository `LICENSE` (CC BY-NC 4.0 text)
- frontend source and tests

These should be linked publicly only after verifying accessibility, ownership, license applicability, and whether this repository is meant to represent the open core.

### Possible content forms

- artifact index with repository, documentation, release, license, and maintainership metadata
- precise “what is open / what is not” scope table
- deployment diagram and self-hosting guide only when tested
- release/status notes with dates
- principles article linked to technical evidence rather than standing alone

### Cases or evidence that could support it

- a reproducible independent deployment or documented institutional installation
- an external contribution merged through the public workflow
- release artifacts, packages, container images, or a working local stack with versioned instructions
- procurement/security review artifacts that can be shared

No such completed case is established by the reviewed materials.

### Meaningful cross-links

- Platform / sovereignty — user and institutional control as the reason
- Research / contribution — how outside changes enter the work
- Research / interoperability — interfaces and portability
- Collaborate / implementation — deployment support, clearly separated from code licensing

### Duplicate risks

- repeating sovereignty copy without defining the open artifact
- treating “inspectable,” “self-hostable,” “free,” “open core,” and “open source” as synonyms
- implying that the frontend repository proves the backend, data model, infrastructure, or entire product is open
- presenting a noncommercial Creative Commons license as a conventional open-source software license
- describing roadmap documentation as already published

### Owner verification

- exact open-core boundary: frontend, backend, schema, data model, APIs, deployment tooling, content, or some combination
- repository visibility and canonical URLs
- intended software/content licenses and whether `LICENSE` currently applies correctly
- commercial-use rights, contribution licensing, trademarks, patents, and third-party code/content
- current self-hosting path, supported deployment modes, release/version policy, and security maintenance
- which “free for individuals,” “no ads/paywalls/extraction,” and exit-option promises remain true

### Gaps

- no explicit open-core scope
- no verified open-source software license
- no linked releases, backend, API docs, self-hosting guide, architecture decision records, security policy, or support boundary
- no evidence yet of independent deployment or external contribution

## 2. Interoperability

### Source-backed substance

- Platform and legacy sources consistently describe shared competence semantics across schools, learners, employers, advisers, and institutions; integration with identity, LMS, HR, placement, and existing operational systems; and portability that avoids isolated profiles. **Status: a mix of conceptual model and product claims.**
- The current `research/interoperability.ts` states that shared semantics and deliberate interfaces allow organizations to collaborate without becoming one platform. **Status: architectural intent; no technical specification is linked.**
- Legacy service proof says the team's background includes architecture and interoperability work in fragmented ecosystems, including European-scale digital infrastructure. **Status: experience claim with no named project, role, date, output, or permission.**
- `partnersData.ts` makes partner-specific claims about MoU support, ESCO alignment, interoperable credentials, and cross-border mobility. **Status: hidden, unpublished, uncited narratives requiring partner verification.**
- “Knowledge That Travels and Returns” in the Project Presentation provides a strong social concept of locally adaptable, reusable paths. **Status: design principle/vision, not technical portability evidence.**

### Current public artifacts/evidence to verify

- no schema, ontology, API specification, data export, standards mapping, connector catalog, or conformance test was found
- the frontend code demonstrates navigation and editorial graph relationships, but it should not be used as evidence of semantic or system interoperability
- partner links and logos provide relationship leads, not evidence of implemented integration

### Possible content forms

- technical concept page paired with inspectable schemas and interface documentation
- standards/semantic mapping table with version and status
- architecture diagram showing boundaries, data flows, and organizational responsibility
- integration case with source/target systems, scope, method, and verified result
- portable-data demonstration or conformance test

### Cases or evidence that could support it

- a verified Win4SMEs/CoVE output, MoU role, or technical artifact
- a named European digital-infrastructure project with the responsible team's exact contribution
- a working LMS/HR/identity/placement integration
- an ESCO or credential mapping with inspectable implementation
- evidence that a learning path or record was exported, imported, adapted, or reused across contexts

None is sufficiently established in the reviewed corpus.

### Meaningful cross-links

- Platform / model — the semantics being moved or shared
- Platform / sovereignty — portability and exit options
- Platform / evidence — evidence format and provenance
- About / network — collaborators responsible for real integration work
- Collaborate / pilots — bounded contexts in which interoperability can be tested

### Duplicate risks

- turning every legacy mention of APIs or integrations into a separate claim
- conflating semantic interoperability, technical APIs, organizational coordination, credential portability, and reusable learning content
- using consortium participation as proof of implementation
- restating “knowledge travels” as if it describes a completed data exchange

### Owner verification

- actual data model, APIs, supported imports/exports, identity integration, and current connectors
- standards and vocabularies currently used or evaluated, including any ESCO relationship
- named projects, roles, dates, artifacts, and permissions behind European interoperability experience
- whether credential, learner-record, and cross-border mobility claims are current capabilities, prototypes, proposals, or partner ambitions
- data governance, provenance, consent, and deletion responsibilities across systems

### Gaps

- no public specification or demonstrator
- no boundary between semantic, technical, organizational, and governance interoperability
- no versioned standards position
- no evidenced portability or integration case

## 3. Research questions

### Source-backed substance

- The current `research/questions.ts` names knowledge graphs, competence semantics, adaptive pathways, trustworthy AI, and human agency, centered on the question of personal learning with portable evidence. **Status: research agenda scaffold.**
- Project Presentation material raises substantive questions about orientation, visible gaps, evidence beyond scores, human judgment, adaptable community knowledge, unequal access, privacy, and support under restricted conditions. **Status: conceptual and application questions, not completed research.**
- The Afghan proposal includes a planned evaluation through documentation, participant feedback, facilitator reflection, and usability/quality of created learning structures. **Status: proposal methodology at a high level; the project scope and implementation remain unconfirmed.**
- Legacy education/labour-market sources add questions about supportive versus surveillance analytics, opaque scoring, shared semantics, and institutional trust. **Status: problem framing.**

### Current public artifacts/evidence to verify

- no paper, preprint, research protocol, ethics process, dataset, evaluation report, experiment, bibliography tied to LearnGraph findings, or public research collaboration was found
- the Afghan proposal bibliography names UNESCO, UN Women, and the Goethe-Institut Afghanistan Cultural Fund as context sources but does not provide full citations or establish original LearnGraph research
- the Project Presentation is an internal conceptual source, not a research publication

### Possible content forms

- a small, dated research agenda with explicit question status
- working notes or essays clearly labelled as positions/hypotheses
- methods and evaluation plans for specific pilots
- publications/artifacts index once outputs exist
- research collaboration briefs with named questions, partners, methods, ethics, and outputs

### Candidate question clusters

- How can orientation and next-step guidance remain understandable and contestable?
- How can evidence remain granular and portable without reducing a person to a score or profile?
- How should a learning graph represent uncertainty, context, prior knowledge, and changing goals?
- What should remain private, pseudonymous, local, or participant-controlled in sensitive contexts?
- How can paths be reused across communities without erasing local meaning?
- What forms of evaluation can distinguish visible activity from useful progress?

These are candidate inquiries derived from the sources, not claims that formal research programs already exist.

### Cases or evidence that could support it

- a completed, ethically reviewed pilot with documented method and findings
- product research or usability studies with publishable protocols and limitations
- research partner outputs from named institutions
- open datasets or synthetic test suites where participant privacy permits

No completed evidence set is established by the reviewed sources.

### Meaningful cross-links

- Platform / personal paths and evidence — product questions
- Platform / sovereignty — privacy, agency, and contestability
- About / learning access — sensitive-context and unequal-access questions
- About / network — research partners and field contexts
- Research / contribution — ways others can inspect or challenge the work

### Duplicate risks

- calling product principles “research findings”
- listing fashionable fields without a concrete question, method, owner, or artifact
- presenting expected pilot outcomes as results
- treating contextual reports on Afghanistan as LearnGraph research
- converting broad social commitments into causal product claims

### Owner verification

- which questions are actively being investigated, by whom, since when, and through what method
- whether any institutional research relationships or unpublished results exist and can be named
- ethics, consent, safeguarding, data handling, and publication rules for human-participant work
- criteria for calling a piece “research,” “evaluation,” “design inquiry,” or “position”
- whether trustworthy AI is an implemented research stream or only a concern in current framing

### Gaps

- no research ownership, methodology, dates, outputs, citations, or publication channel
- no ethics/review framework
- no distinction yet between product discovery, pilot evaluation, academic research, and public-interest inquiry
- no negative findings, limitations, or falsifiable hypotheses

## 4. Contribution

### Source-backed substance

- The frontend `README.md` provides a concrete developer workflow: conventional commits, formatting/linting, tests, pull requests, review, and squash/merge. **Status: inspectable contribution instructions for this frontend checkout.**
- The current `research/contribute.ts` says public repositories, documentation, and research collaborations are being shaped and invites contact by email. **Status: roadmap plus general invitation.**
- Project Presentation `Join the Map` invites foundations and educational partners to support pilots and shape the map. **Status: partnership/funding invitation, not necessarily open-source contribution.**
- The Afghan proposal defines implementation roles among partners, LearnGraph, facilitators, and mentors. **Status: proposed project collaboration model.**

### Current public artifacts/evidence to verify

- candidate GitHub repository and README contribution workflow
- test/lint/format commands and PR-review conventions
- general contact email in the current graph node

The reviewed sources do not show issue templates, a code of conduct, contributor license agreement, governance, maintainer list, roadmap, good-first issues, documentation contribution route, research submission route, or community support channel.

### Possible content forms

- contribution gateway split by code, documentation/content, research, standards, translation, and project collaboration
- repository-specific contributor guide with prerequisites and review expectations
- governance/maintainer page and decision process
- scoped open questions or issues linked to artifacts
- code of conduct, security reporting route, and licensing explanation

### Cases or evidence that could support it

- accepted external pull requests or documented co-development
- attributed community-created maps, translations, schemas, documentation, or research outputs
- a partner contribution with clear authorship and licensing

No such external contribution case is established by the reviewed source set.

### Meaningful cross-links

- Research / open core — repositories, licensing, releases
- Research / interoperability — standards and connector work
- Research / questions — active inquiries seeking collaboration
- About / people — maintainers and authors
- About / network — institutional collaborators
- Collaborate — paid projects and pilots, kept distinct from community contribution

### Duplicate risks

- using one generic email invitation for code, research, funding, partnerships, and support
- describing a standard PR workflow as an active open-source community
- mixing commercial engagement with contribution governance
- inviting contributions without explaining license, ownership, review, safety, or decision authority

### Owner verification

- whether outside pull requests are currently accepted and for which repositories
- maintainers, review authority, response expectations, and supported contribution types
- contribution license/CLA/DCO position and compatibility with the repository license
- code of conduct, security disclosure, participant safety, and moderation processes
- whether non-code learning maps/content can be contributed, under which rights and review model
- canonical route for research collaboration versus implementation partnerships

### Gaps

- no public governance or maintainer map
- no contribution licensing model
- no onboarding path beyond developer setup
- no documented non-code or research contribution workflow
- no community evidence or contribution history in the reviewed sources

## Publication threshold by subject

This is a source-quality threshold, not a topology recommendation:

| Subject            | What is supportable from reviewed material                                                                   | What would overstate the evidence                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| Open core          | A frontend checkout, license text, and contributor workflow exist; broader open-core scope is being defined. | The entire platform is open source, self-hostable, independently deployable, or free of lock-in.    |
| Interoperability   | Shared semantics and system boundaries are a consistent design goal; relevant experience is claimed.         | Standards conformance, working integrations, portable credentials, or proven cross-system exchange. |
| Research questions | A coherent set of technical/social questions and proposed evaluation concerns exists.                        | A research program with findings, publications, validated methods, or demonstrated impact.          |
| Contribution       | The frontend README describes a PR workflow and the current node invites conversation.                       | An active contributor community, mature governance, or open participation across the product.       |

## Cross-cutting verification queue

Before Research / Open Source material becomes final copy, owners should resolve:

- canonical repositories, public reachability, release state, and correspondence with the deployed product
- open-core scope and appropriate software/content licensing
- current self-hosting, deployment, integration, export, and portability capabilities
- public artifacts behind interoperability and European-infrastructure experience claims
- active research questions, owners, methods, ethics, partners, and outputs
- contribution scope, governance, maintainers, licensing, safety, and response routes

## Provenance consulted

- `docs/legacy-content-inventory.md`
- `docs/graph-topology-pressure-test.md`
- `source-material/raw/Websiste legacy content .docx`
- `source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx`
- all documents in `source-material/raw/Afghan Women Project/`, especially why LearnGraph, program design, access/safety, expected results, sustainability, partnership/implementation, pilot phases, scope, and bibliography
- `src/pages/graph/graphModel.ts`
- `src/content/nodes/research/*`
- `src/content/nodes/platform/sovereignty.ts`
- `src/pages/landing/partnersData.ts`
- `src/i18n/locales/en.json`
- `README.md`
- repository-level `LICENSE`
- local Git remote configuration
