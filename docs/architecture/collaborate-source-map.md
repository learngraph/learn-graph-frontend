# Collaborate territory source map

Status: factual source map for architecture review. This is not final copy, a settled sitemap, or a decision about whether the two source families belong under one root or two.

## Scope and truth boundary

The reviewed material supports two distinct kinds of collaboration:

1. **Transformation services** — process clarity, structured automation, and product or service development for organisations with operational or technical pressure.
2. **LearnGraph application and partnership work** — education pilots, foundation-supported work, context-specific or protected learning, and implementation with trusted partners.

They share delivery principles, but they answer different visitor questions. Transformation services ask, “Can this team help us improve or build an organisational process or offer?” Application and partnership work asks, “Can we implement LearnGraph in a real learning context together?” The source map keeps them separate so that architecture review can test their relationship without pre-deciding root status.

The Afghan cultural-education material describes a **proposed pilot**. It is useful evidence of application design and partnership requirements, but it is never evidence of an implemented pilot, achieved outcomes, confirmed participants, or a confirmed partner.

## Source register

| Source                                                                           | What it contributes                                                                                                                                                     | Reliability boundary                                                                                                                    |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `src/content/nodes/work/*.ts` and `src/pages/graph/graphModel.ts`                | Current four-topic Collaborate scaffold: Find the constraint, Reduce manual load, Build the offer, Work together; current cross-links                                   | Published prototype structure, not an approved content architecture                                                                     |
| `src/pages/service/ServicePage.tsx` and `src/i18n/locales/en.json` (`service.*`) | Detailed service positioning, pressure patterns, three offers, working principles, two experience claims, contact action                                                | Current legacy marketing copy; capability, outcome, compliance, and experience claims need owner verification                           |
| `docs/legacy-content-inventory.md`                                               | Normalised inventory IDs `LEG-SRV-*`, education/labour-market application material, duplication analysis, verification cautions                                         | Editorial inventory and migration hypotheses, not independent evidence                                                                  |
| `source-material/raw/Websiste legacy content .docx`                              | Sol's distilled legacy review; service reorganisation; summaries of ITECH and Bildungszentrum Optimum case material; enterprise/workplace-learning ideas                | Secondary summary. Original case sources, permissions, dates, and evidence are not present in the reviewed corpus                       |
| Project Presentation, `LG Project Presentation - ALL PAGES - mid.docx`           | LearnGraph purpose, product concept, unequal-access commitment, proposed foundation and educational collaboration                                                       | Strategic narrative. Statements about current use/feedback require substantiation; invitations and applications are not achieved impact |
| Afghan Women Project documents, especially sections 02–13                        | Proposed protected pilot conditions, programme design, partner roles, safety/access model, implementation phases, outputs, evaluation, sustainability, and budget logic | Proposal-stage material with explicit placeholders and unconfirmed scope. Must be labelled proposed/application design                  |
| Legacy education and labour-market pages and landing tiles                       | Vocational learning, shared competence structures, regional pilots, employer/adviser workflows, staged evaluation                                                       | Use-case propositions; symbolic “stats” and placeholder cases are not evidence                                                          |
| `src/pages/landing/partnersData.ts` and partner roster                           | Named organisations and hidden partner narratives                                                                                                                       | Relationship status, role descriptions, permissions, and currentness require verification; a logo or alignment statement is not a case  |

## Source-family overview

| Source family                            | Distinct visitor need                                                                               | Material already present                                                                                                              | Main architectural pressure                                                                                                                                 |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transformation services                  | Diagnose a blocked process, reduce operational load, or turn an offer into an implementable product | Three developed legacy offers, a shared delivery stance, current concise node articles, two experience claims                         | The three service topics are coherent; `Work together` repeats their introduction and is too broad to carry education/foundation partnerships as well       |
| LearnGraph applications and partnerships | Apply LearnGraph with an education, public, community, or foundation partner in a real context      | Vocational and labour-market use cases, ITECH/Optimum case summaries, foundation invitation, detailed proposed protected-pilot design | This family needs an honest home and typed application/pilot artifacts; it should not be squeezed into a generic contact node or repeated as audience pages |

## A. Transformation services

### A1. Process clarity / find the constraint

**Communicative purpose**

Show how a focused engagement makes one consequential workflow, its dependencies, ownership, constraints, and first viable intervention visible.

**Source provenance**

- `LEG-SRV-001`, `LEG-SRV-002`, and `LEG-SRV-007`
- `service.hero`, `service.pressure`, and `service.offers.clarity`
- current `src/content/nodes/work/find-the-constraint.ts`
- energy/critical-infrastructure experience claim in `LEG-SRV-005` as possible support

**Existing factual substance**

- Start with one critical process rather than an undefined transformation programme.
- Map the real workflow and surface manual friction, person-bound knowledge, hidden dependencies, ownership questions, data gaps, security issues, and regulatory constraints.
- Align business, operations, and technology around a shared picture.
- Produce priorities and a realistic next-step roadmap.

**Possible content forms**

- concise service explainer
- input/activity/output diagram for a focused diagnostic engagement
- example deliverables list
- attached case or anonymised experience note, if substantiated
- contact/action block outside the editorial substance

**Cases or evidence**

- The smart-metering/cloud-migration narrative may support dependency mapping, workshops, and shared ownership, but it currently lacks client, date, team role, baseline, deliverables, and measurable outcome.
- No verified Process-Clarity-Sprint case exists in the reviewed corpus.

**Meaningful cross-links**

- Platform / the model: both use structural mapping, but one maps organisational work and the other maps knowledge and capability.
- Transformation / structured automation: clarity can identify an automation candidate; it does not imply automation is always the result.
- About / team or capabilities: supports who can do the work, if the experience is verified.
- Research / interoperability or Platform / sovereignty only where a diagnosed process actually involves those concerns.

**Duplication to resolve**

- Hero, pressure cards, offer details, current node article, and contact copy all repeat the “find the bottleneck and first step” idea.
- Governance and security wording repeats across every offer; it should be a shared working principle, not duplicated proof.

**Owner verification**

- whether Process-Clarity-Sprint is an active, productised offer and what it actually includes
- typical duration, participants, deliverables, and boundary between diagnosis and implementation
- whether “event-storming inspired workshops” is accurate and useful to publish
- permission and factual detail for the energy/critical-infrastructure experience

**Gaps**

- one concrete example of the before/after decision created by the work
- clear engagement scope and what the client must provide
- evidence that the stated outputs have been delivered in this form

### A2. Structured automation / reduce manual load

**Communicative purpose**

Explain how process analysis, architecture, data, integration, governance, and adoption can reduce repetitive work without creating another opaque or fragile system.

**Source provenance**

- `LEG-SRV-002`, `LEG-SRV-003`, `LEG-SRV-005`, and `LEG-SRV-008`
- `service.pressure.cards.one–three`, `service.compliance`, and `service.offers.automation`
- current `src/content/nodes/work/reduce-manual-load.ts`
- uploaded legacy summary's enterprise/workplace-learning ideas are adjacent where operational knowledge is person-bound, but are not themselves automation proof

**Existing factual substance**

- Candidate pressure includes manual steps, inboxes, handovers, repetitive decisions, overloaded teams, and fragile knowledge transfer.
- The proposed approach prioritises automation opportunities and fits them into existing systems and routines.
- Intended outputs include a prioritised automation path, workflows/integrations/digital support, workload reduction, operational stability, and knowledge retention.
- Governance, security, readiness, and rollout are described as part of delivery.

**Possible content forms**

- service explainer with a “good fit / not a good fit” distinction
- workflow-before/workflow-after diagram
- implementation pattern or checklist
- verified operational case
- technical integration artifact where publishable

**Cases or evidence**

- The energy/critical-infrastructure narrative is the only candidate operational support in the corpus. Its current wording describes contribution and perceived movement, not measured automation outcomes.
- No named automation implementation, quantified workload change, or production artifact is present.

**Meaningful cross-links**

- Process clarity: establishes the process and priority before implementation.
- Product/service development: some automation becomes a durable internal product; not all does.
- Platform / sovereignty and Research / interoperability: relevant to control, interfaces, and integration, but should not be copied into the service topic.
- Enterprise/workplace-learning application: operational knowledge and learning-in-work may intersect, but training content should remain distinct from automation delivery.

**Duplication to resolve**

- Manual load and person-bound knowledge appear in pressure cards, offer summary, outputs, current node article, and energy experience claim.
- “Not disconnected AI pilots” and anti-black-box language overlap the territory introduction and wider LearnGraph principles.

**Owner verification**

- whether “AI automation” is intentionally narrower than general workflow automation
- current delivery capability for “digital co-workers,” integrations, and production rollout
- what security, governance, and regulatory work is actually included
- any measurable outcomes and permissions from prior work

**Gaps**

- specific implementation example and system context
- boundaries around data, model, infrastructure, maintenance, and client ownership
- evidence for workload, stability, or knowledge-retention outcomes

### A3. Product and service development / build the offer

**Communicative purpose**

Describe an engagement that turns an insufficiently defined service or product idea into a coherent proposition, viable first version, technical foundation, and validation path.

**Source provenance**

- `LEG-SRV-002` and `LEG-SRV-009`
- `service.pressure.cards.four` and `service.offers.product`
- current `src/content/nodes/work/build-the-offer.ts`
- `LEG-ORP-001` only as broad evidence that platform work and transformation work were once framed as complementary; it is not a service case

**Existing factual substance**

- Candidate situation: idea exists, but problem, audience, scope, implementation, and market fit do not yet form one path.
- Intended work connects value proposition, MVP scope, design, architecture, validation, interfaces, governance, and secure integration.
- Intended outputs are a clearer proposition, a first valuable version, and a basis for rollout and iteration.

**Possible content forms**

- concise service explainer
- discovery-to-first-release sequence
- sample decision artifacts or MVP boundary diagram
- verified build case with role and outcome

**Cases or evidence**

- No specific client product/service-development case is present in the reviewed sources.
- LearnGraph's own first release might demonstrate product capability only if the team's roles, scope, current release, and evidence are documented; it should not silently stand in for client-service proof.

**Meaningful cross-links**

- About / team or capabilities: delivery credibility.
- Platform: LearnGraph can be an organisational product example, not the definition of this service.
- Process clarity: can precede product definition when the offer depends on an unclear operating process.
- Research / interoperability: relevant where ecosystem integration is part of the product.

**Duplication to resolve**

- “Design, architecture, and validation move together” repeats between legacy offer detail and the current node.
- The generic `Work together` article repeats “focused first release/pilot/product increment” without distinguishing this offer from other engagements.

**Owner verification**

- whether implementation is included or the service stops at definition/architecture
- what “first product or service version” means in practice
- representative cases, client permissions, and team roles
- whether market validation is a current capability and how it is performed

**Gaps**

- concrete engagement phases, outputs, and handover/ownership model
- any demonstrated product or service case
- distinction from general software development or strategy consulting

### A4. Shared transformation delivery principles — likely cluster-level material

The sources repeatedly describe the following as common across the three offers:

- start with operating reality and the people closest to the work
- connect process understanding, architecture, implementation, and adoption
- include readiness, governance, security, interfaces, and regulatory constraints early
- leave stronger structures and capabilities rather than permanent external dependence

This material can orient the service cluster without requiring a fourth article. The current `work-together.ts` combines these principles with audiences and engagement formats, then also functions as a generic partnership invitation. That is the central duplication problem in the current scaffold.

Claims naming the EU AI Act, NIS2, or ISO 27001 alignment require current specialist review and precise wording. Consideration of a standard or regulation is not certification, compliance, or legal assurance.

## B. LearnGraph application and partnership work

This source family is not a fourth transformation offer. It describes how LearnGraph might be applied, adapted, facilitated, evaluated, and sustained with partners in particular learning contexts.

### B1. Education and public-system pilots

**Communicative purpose**

Show how LearnGraph can be tested with education, training, employment, or regional partners through a bounded implementation that produces evidence before scaling.

**Source provenance**

- `LEG-LRN-003`, `LEG-LRN-004`, `LEG-LRN-008`, and `LEG-LRN-009`
- `LEG-SCH-001–005` and `LEG-LAB-001–004`
- vocational, labour-market, and pilot material in `Websiste legacy content .docx`
- Project Presentation sections 06, 08, and 09 for current-product and partnership framing

**Existing factual substance**

- Vocational contexts need a shared structure across curricula, workshop practice, company expectations, learners, trainers, and evidence.
- Labour-market contexts need shared competence semantics, visible gaps, adviser/employer workflows, and evaluation before broad rollout.
- Useful implementation language includes bounded regional or educational pilots, local partners, phased learning, evaluation, and adaptation.
- Existing audience pages describe applications; they do not establish successful deployments.

**Possible content forms**

- application overview rather than another audience sales page
- pilot-pattern diagram: context definition → map/configuration → participant/facilitator use → evaluation → decision
- attached use-context cards for vocational learning and labour-market systems
- verified case artifacts, videos, and evidence blocks

**Cases or evidence**

- ITECH is present as partner, promotional narrative, video context, and “coming soon” case placeholder. The uploaded summary refers to richer case material, but the original case copy and its evidence are not in the reviewed files.
- Bildungszentrum Optimum appears only through a secondary distilled summary, with a coherent case thesis but no original source, permission, date, scope, or results record.
- Labour-market regional pilots are propositions; no implemented pilot evidence is present.
- The legacy scale figures and symbolic outcome markers must not be used as pilot evidence without provenance.

**Meaningful cross-links**

- Platform / model, personal paths, and evidence: explain the product mechanics used in the application.
- Platform / sovereignty and Research / interoperability: matter where institutional control and existing-system integration are required.
- About / network: identifies relationships, but must not substitute for cases.
- About / learning access or commitment: explains why some applications matter.

**Duplication to resolve**

- Vocational and labour-market ideas are repeated across landing tiles, dedicated audience pages, benefit markers, and offer cards.
- Product mechanics should live under Platform and be referenced from applications rather than rewritten for each sector.
- “Pilot” is used both as a delivery format and as anticipated proof; these must be kept distinct.

**Owner verification**

- current ITECH relationship, activities, video status, quotes, observed outcomes, and publishing permission
- existence and publishability of the Optimum case source
- any completed education or labour-market pilots, with scope, dates, roles, participants, and evaluation
- whether the platform currently supports the institutional capabilities implied by each use case

**Gaps**

- a canonical pilot offer or implementation pattern with clear boundaries
- verified pilot evidence and evaluation criteria
- rules for when a sector becomes an artifact, a topic, or merely an example

### B2. Protected or context-specific learning implementation

**Communicative purpose**

Demonstrate how a LearnGraph implementation would need to combine technical structure, facilitation, cultural trust, controlled visibility, access support, and evaluation when open participation is unsafe or unrealistic.

**Source provenance**

- Afghan pilot documents 02–13, especially Project Response, Program Design, Access and Safety Model, Partnership and Implementation, Pilot Phases, and Pilot Scope
- Project Presentation section 08, “Learning Access Under Unequal Conditions”
- Project Presentation section 09, “Join the Map”

**Truth status: proposed application**

The reviewed documents propose “Protected Learning Maps” for Afghan women working as artists, learners, and cultural practitioners under restricted conditions. The proposal describes:

- trusted partner access rather than open recruitment
- small facilitated groups and curated learning routes
- artistic tasks, resources, mentor input, peer exchange, and protected documentation
- private, internal, pseudonymous, anonymised, or restricted visibility options
- possible connectivity, data, translation, onboarding, and participation support
- coordinated roles for partner access, technical adaptation, facilitation, participant support, documentation, and review
- a proposed three- to four-month, three-phase cycle
- proposed outputs and an evaluation approach based on documentation, participant feedback, facilitator reflection, and usability of created learning structures

The same documents leave cohort size, duration, partner structure, access support, roles, and budget to be confirmed. None of the proposed outputs or outcomes can be presented as achieved.

**Possible content forms**

- clearly labelled application concept or proposed-pilot artifact
- protected-implementation pattern showing roles and safety decisions
- proposal download or short project brief, if publication is appropriate
- future case only after implementation and consent-sensitive evaluation

**Cases or evidence**

- The Afghan material is not a case or proof. It is detailed design evidence that the team has considered implementation conditions.
- UNESCO, UN Women, and Goethe-Institut references in the proposal support context conditions, not LearnGraph outcomes.

**Meaningful cross-links**

- About / learning access or commitment: ethical purpose and the claim that direction is part of access.
- Platform / sovereignty: only if protected access, visibility, deployment, and data-control capabilities are technically current and documented.
- Platform / personal paths and evidence: product concepts used in the proposed programme.
- About / network: trusted implementation relationships, once confirmed and publishable.

**Duplication to resolve**

- The Project Presentation states the mission and foundation invitation at a high level; the Afghan proposal supplies implementation detail. The former should not duplicate the latter.
- Safety, privacy, and protected participation overlap sovereignty language but are socio-technical programme requirements, not merely platform features.

**Owner verification**

- proposal status, intended funder/audience, and whether any partner has been approached or confirmed
- security, privacy, access-control, pseudonymity, and data-handling capabilities available now
- safeguarding, consent, threat modelling, incident responsibility, and publication boundaries
- who provides facilitation, translation, mentoring, cultural expertise, and participant support
- whether geographic and participant descriptions can be published without creating risk

**Gaps**

- confirmed partner and safeguarding owner
- technical security model and operational threat assessment
- consent and data-governance plan
- confirmed cohort, duration, delivery team, budget, and evaluation baseline
- accessibility and low-connectivity evidence

### B3. Foundation and implementation partnership pathway

**Communicative purpose**

Explain what a foundation, educational organisation, community network, facilitator, or technical implementation partner could contribute to a LearnGraph application—and what LearnGraph contributes in return.

**Source provenance**

- Project Presentation sections 08 and 09
- Afghan pilot documents 07, 10, 12, and 13
- partner roster and hidden narratives in `partnersData.ts`
- current `work-together.ts`, which names institutions, public services, employers, and technical partners but does not define roles

**Existing factual substance**

- The presentation invites foundations and educational partners to support pilots, context adaptation, and conditions for access, continuity, safety, and trust.
- The Afghan proposal defines a role pattern: partners provide access/context/safety knowledge; LearnGraph provides digital structure and project capacity; facilitators and mentors support learning and creative work; funding supports coordination, adaptation, programme work, access, documentation, and evaluation.
- Existing partner records provide possible network context, but their exact relationships cannot be inferred from logos or hidden promotional prose.

**Possible content forms**

- partnership model or role diagram
- “ways to collaborate” overview with distinct partner roles
- pilot-readiness checklist
- brief for funders or implementation partners
- verified network profiles linked as context, not generic proof

**Cases or evidence**

- No foundation-funded implementation is evidenced in the reviewed corpus.
- Named partner relationships require verification before being used to demonstrate the partnership model.
- The Afghan budget and implementation logic are proposal design, not delivery history.

**Meaningful cross-links**

- About / network for verified organisations and relationships.
- About / learning access or commitment for purpose.
- Relevant application artifact for the actual context.
- Research / contribute only where contribution means open technical or knowledge work; a funding or implementation partnership is not automatically open-source contribution.

**Duplication to resolve**

- Generic “join/work together” invitations occur in the Project Presentation, current Collaborate node, partner roster, schedule-call CTAs, and service contact section.
- Contact is a utility action. Partner roles and collaboration models are editorial content.

**Owner verification**

- which partner types LearnGraph actively seeks now
- what LearnGraph can commit in product, project, facilitation, and evaluation capacity
- whether funding, implementation, research, content, and technical partnership are distinct pathways
- current relationship type and approval for every named organisation

**Gaps**

- selection/readiness criteria and an accountable intake process
- explicit responsibilities, decision rights, safeguarding, ownership, and exit conditions
- examples of successful partner implementation
- distinction between paid engagement, grant-funded pilot, research collaboration, and open contribution

## Artifact and evidence ledger

| Candidate artifact                                                 | Source status                                                                                  | Can currently substantiate                                                                           | Must not imply                                                                                        | Required before publication as evidence                                                       |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Energy/critical-infrastructure experience                          | Anonymised legacy claim                                                                        | Possible team experience with dependency mapping, architecture workshops, and migration coordination | Quantified automation success, client endorsement, or a complete case                                 | client/context permission, dates, team role, scope, outputs, outcomes                         |
| European-scale interoperability/governance experience              | Broad legacy claim                                                                             | Possible background in fragmented ecosystem architecture                                             | A named project, LearnGraph deployment, or measured outcome                                           | projects, roles, dates, publishable artifacts, precise claims                                 |
| ITECH                                                              | Partner record, promotional fragments, video context, placeholder case, secondary case summary | Possible vocational-learning relationship and case candidate                                         | A completed/evaluated LearnGraph success without proof                                                | relationship status, original case material, quotes, dates, activities, outcomes, permissions |
| Bildungszentrum Optimum                                            | Secondary summary only                                                                         | A coherent proposed case thesis about structured personalisation and follow-up                       | Any factual implementation or result                                                                  | original source, identity/relationship, scope, observations, permissions                      |
| Labour-market/regional pilot                                       | Repeated proposition                                                                           | Application pattern and desired evaluation-before-scale principle                                    | A completed regional pilot                                                                            | named implementation and evaluation evidence                                                  |
| Afghan Protected Learning Maps                                     | Detailed proposal with placeholders                                                            | Application design, partner-role logic, proposed programme and evaluation                            | implementation, confirmed partner, participant results, safety performance, or achieved social impact | confirmed status, partner/safeguarding model, delivery records, consent-sensitive evaluation  |
| Partner roster                                                     | Public logo/name/link plus hidden narratives                                                   | Network context after currentness verification                                                       | Customer status, implementation success, endorsement, or case proof                                   | relationship labels, approval, accurate contribution descriptions                             |
| Project Presentation statement that release is used/tested/refined | Strategic narrative                                                                            | Possible current product activity                                                                    | Scale, quality, outcomes, or partner adoption                                                         | usage context, date, evidence source, permission if users/partners are identifiable           |

## Cross-cluster relationships worth preserving

These relationships change understanding and therefore merit explicit modelling:

- **Process clarity can precede an education pilot**, because a partner context, workflow, roles, and constraints must be understood before implementation.
- **Product/service development can support technical adaptation**, but a protected learning programme also requires facilitation, trust, and safeguarding outside product delivery.
- **Structured automation and protected learning are not natural siblings** beyond shared delivery disciplines; they should not be merged into one generic “innovation” topic.
- **Applications use Platform concepts**—model, personal paths, evidence, sovereignty—but should link to those explanations rather than duplicate them.
- **Cases support the exact claim they evidence** and may attach to more than one topic; they do not need a detached case-study territory.
- **Network relationships provide context, not proof**. A partner logo should never inherit claims from an application or case without an evidenced relationship.

## Duplication and homeless-material map

| Material                        | Current duplication/problem                                                                                                    | Source-map treatment                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `Work together`                 | Mixes service principle, audience list, sprint/pilot/product formats, evidence promise, network growth, and contact invitation | Split into shared transformation principles, partnership model, application/pilot artifacts, and utility CTA        |
| Governance/security/compliance  | Repeated in territory intro and all three offers; overlaps sovereignty                                                         | One verified shared service principle; technical product detail links to Platform; legal claims reviewed separately |
| Vocational learning             | Repeated across landing tile, schools page, partner narrative, ITECH placeholder/case summary                                  | One application context plus verified ITECH artifact when available                                                 |
| Labour-market pilots            | Repeated across landing tile, route, benefit markers, offer cards                                                              | One application context; retain “evaluate before scale” as a principle, not evidence                                |
| Enterprise/upskilling           | Orphaned route meaning and uploaded summary, with overlap across product and services                                          | Hold as an application candidate; do not create a topic until distinct content and evidence exist                   |
| Learning access/foundation work | Strong in Project Presentation and proposal but absent from current graph                                                      | Map as commitment cross-link plus partnership/application material; keep proposed impact labelled                   |
| Contact and schedule-call       | Repeated across offers, audience pages, footer, and current nodes                                                              | Utility outside the editorial graph                                                                                 |

## Owner-verification queue

### Transformation services

- active offer names, scope, duration, delivery model, and current capacity
- whether service delivery includes implementation, maintenance, facilitation, or only definition/architecture
- client cases, permissions, dates, roles, deliverables, and outcomes
- exact meaning of AI Act, NIS2, ISO 27001-aligned, security, compliance, and governance statements
- current integration, automation, and production capabilities

### Applications and partnerships

- completed versus proposed pilots and applications
- ITECH and Bildungszentrum Optimum source material and publication rights
- all named partner relationships and their correct labels
- current foundation/pilot appetite, capacity, and funding model
- Afghan proposal status, confirmed roles, safeguarding, technical safety, data handling, and publication risk
- current product capabilities needed for institutional, protected, pseudonymous, or low-connectivity use

## Content gaps that block architecture confidence

1. No verified evidence set currently distinguishes team experience, LearnGraph deployments, cases, pilots, and partner affiliations.
2. The transformation offers lack concrete scope and proof even though their conceptual boundaries are clear.
3. The application/partnership family has rich rationale and proposed implementation design but little verified completed-work evidence.
4. The current content model cannot express application, proposal, case, diagram, video, evidence, and verification status as distinct artifact types.
5. There is no canonical description of the partnership lifecycle: qualification, context definition, roles, implementation, facilitation, evaluation, continuation, and exit.
6. The boundary between LearnGraph product work and the team's broader transformation services is not yet stated explicitly.

## Architecture conclusions supported by the sources

- Three transformation topics are already distinct and source-supported: **process clarity**, **structured automation**, and **product/service development**.
- Their common working principles are likely cluster-level orientation, not necessarily another topic.
- Education/foundation/application work is a separate source family with at least three recurring needs: bounded pilots, context-specific/protected implementation, and explicit partner roles.
- Applications should reuse Platform explanations and attach cases/evidence rather than recreate audience pages.
- The Afghan material is valuable as a proposed application and partnership design. Its honesty depends on proposal labelling and explicit unknowns.
- `Work together` cannot remain the undifferentiated container for both source families.
- The source map does **not** determine whether these families become visible clusters under Collaborate or separate root territories. That remains an owner and root-status audit decision.
