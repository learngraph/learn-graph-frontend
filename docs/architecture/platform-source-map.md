# Platform territory — factual source map

Status: source-grounded architecture input, not approved topology or website copy.  
Scope: Platform only. This document records what the source corpus can support, where it overlaps, and what requires owner verification.

## Evidence labels used here

- **Current capability (stated):** described by LearnGraph's own current materials as available in the first release. This is still an owner-authored claim unless an inspectable product or artifact is attached.
- **Principle:** a design, ethical, or organisational position. A principle is not proof that a feature exists or an outcome occurred.
- **Proposed application:** a use case, pilot, or intended implementation. It must not be written as completed delivery or achieved impact.
- **Evidence candidate:** a case, demonstration, metric, artifact, or observed result that might support a claim after provenance, permission, and currentness are verified.
- **Unsupported/verification required:** the corpus makes the claim but does not provide enough evidence to publish it as fact.

No independent product audit, case report, research result, or outcome dataset appears in the reviewed corpus. “Evidence” below therefore means a candidate attachment, not automatically publication-ready proof.

## Current candidate set

The current graph defines four Platform topics in `src/pages/graph/graphModel.ts`:

| Current ID / route                               | Label          | Precise communicative purpose                                                                                                                                                              | Current status                                                                                                                                                               |
| ------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `platform-model` / `/platform/model`             | The model      | Explain the underlying shared graph: what it relates, why relations create orientation, and how different participants can work against the same competence/knowledge structure.           | Strong candidate. It is the territory's conceptual and product-mechanics foundation.                                                                                         |
| `platform-paths` / `/platform/personal-paths`    | Personal paths | Explain what the shared model does for a person: reveal position, goals, gaps, relevant next steps, practice, support, and changing progress without imposing one generic sequence.        | Strong candidate. It is the clearest learner-facing consequence of the model.                                                                                                |
| `platform-evidence` / `/platform/evidence`       | Evidence       | Explain how learning activity and demonstrated ability become visible, inspectable, and useful for guidance and recognition; also host proof of Platform claims when real artifacts exist. | Strong need, ambiguous scope. It currently mixes “evidence as a product concept” with “evidence that LearnGraph works”; those meanings must be separated inside the content. |
| `platform-sovereignty` / `/platform/sovereignty` | Sovereignty    | Explain the conditions under which an institution or community retains meaningful control: inspectability, deployment choice, data location, integration, portability, and exit options.   | Strong candidate, but the most verification-sensitive because present copy states technical capabilities and assurances.                                                     |

This map does not decide that four is the final count. The reviewed sources do not yet justify adding a separate Platform node for vocational education, labour markets, enterprise/workplace learning, foundations, or protected learning. Those are currently better treated as applications attached to the concepts they demonstrate.

## Candidate 1: The model

### Communicative purpose

Give a concrete answer to “what is LearnGraph?” The topic should distinguish a connected learning model from a catalogue, LMS skin, score, or isolated profile. It needs to explain the entities and relations involved—knowledge/topics, skills or competences, people, goals, resources, learning activity, evidence, support, and opportunities—without claiming every possible relation is already implemented.

### Existing current node copy

Source: `src/content/nodes/platform/model.ts`.

> **Learning becomes navigable when its relationships become visible.**
>
> LearnGraph connects people, abilities, goals, learning material, and opportunities in one shared model.
>
> A catalogue can tell you what exists. A graph can show what relates to you, what comes next, and why.
>
> That shared structure gives learners orientation while allowing schools, employers, and public partners to work with the same competence language.

The current node also provides an external “Enter the platform” action to `https://app.learngraph.org`.

### Source ideas and provenance

| Classification                        | Source idea                                                                                                                                                                                                                  | Exact provenance                                                                                                                                                                                                                                                                                                                                                                                                                         | Architectural use / caution                                                                                                                                             |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Principle                             | Learning needs orientation, connection, support, and a continuing path; the graph makes relations, growth, gaps, and next steps visible.                                                                                     | `source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx`, sections **01 A Broader Idea of Education** and **02 Beyond the Score**.                                                                                                                                                                                                                                                      | Strong conceptual explanation. Do not turn “gives learning a map” into proof of product completeness.                                                                   |
| Principle                             | Knowledge is connected; topics open into topics, skills depend on skills, resources answer gaps, and progress sits in a wider structure. People can connect concepts, material, routes, and contexts.                        | Project Presentation, **04 A Living Map for Learning**.                                                                                                                                                                                                                                                                                                                                                                                  | Best source for describing why graph structure matters and why maps should remain adaptable.                                                                            |
| Current capability (stated)           | The first release lets users enter a graph, search connected topics, explore knowledge, follow guidance, build structures, manage skills, and host cohorts; educators and organisations can shape maps and create resources. | Project Presentation, **06 Inside LearnGraph**.                                                                                                                                                                                                                                                                                                                                                                                          | This is the strongest capability inventory, but each verb needs confirmation against the current release before publication.                                            |
| Principle                             | The graph supports human judgment rather than replacing it; learners, mentors, and groups can use a visible next step as common ground.                                                                                      | Project Presentation, **05 From Map to Movement**.                                                                                                                                                                                                                                                                                                                                                                                       | Defines the human role and guards against automated-prescription language.                                                                                              |
| Principle / future-facing application | Paths and solutions can travel, be adapted, and leave shared memory without making communities identical.                                                                                                                    | Project Presentation, **07 Knowledge That Travels and Returns**.                                                                                                                                                                                                                                                                                                                                                                         | Deepens model and interoperability. It is a principle/promise unless concrete reuse is demonstrated.                                                                    |
| Application framing                   | School standards, workshop practice, company expectations, work artifacts, feedback, exams, and transitions can share one navigable competence structure.                                                                    | `source-material/raw/Websiste legacy content .docx`, **Landing Page GROW Section → Vocational school → workplace** (paragraphs 2–16) and **Legacy route: /schools** (paragraphs 131–147).                                                                                                                                                                                                                                                | Useful vocational application of the model, not a separate capability claim or automatic node.                                                                          |
| Application framing                   | Learners, advisers, employers, and public programmes can use shared competence semantics and visible gap logic rather than profiles or keywords alone.                                                                       | Website legacy summary, **Matching & public programmes** (paragraphs 21–39) and **Labour market & region** (paragraphs 192–218).                                                                                                                                                                                                                                                                                                         | Useful labour-market application; regional pilots belong primarily under Collaborate.                                                                                   |
| Proposed application                  | A protected project space could organise learning routes, artistic tasks, resources, mentor input, and documentation for small trusted groups.                                                                               | `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_03_project-response.docx`; `_v1_04_why-learngraph.docx`; `_v1_05_program-design.docx`.                                                                                                                                                                                                                                                                   | Demonstrates how the model could organise a sensitive guided cycle. The documents explicitly say “proposes” and “pilot”; do not describe it as implemented or achieved. |
| Legacy product proposition            | Vocational, labour-market, and individual pages repeat one shared model, skill-gap visibility, and navigable paths.                                                                                                          | `src/i18n/locales/en.json`: `landing.TargetGroupsSection.tiles.*`, `landing.TileSection.tiles.institutions`, `landing.TileSection.tiles.upskill`, `landing.TileContentProject.institutions.*`, `landing.TileContentProject.upskill.*`, `schools.hero.*`, `labourMarket.hero.*`, `labourMarket.offerings.matching.*`; inventoried as LEG-LRN-003/004/008/009, LEG-SCH-001–004, and LEG-LAB-001–004 in `docs/legacy-content-inventory.md`. | Consolidate the mechanics once; applications can supply examples without repeating the same platform explanation.                                                       |

### Possible content forms

- A concise editorial explanation plus a labeled relationship diagram showing the model's actual current entities and edges.
- A product walkthrough or annotated screenshots tied to confirmed current functions.
- One compact “same structure, different contexts” example strip: vocational learning, labour-market matching, and a protected guided programme, with the last clearly labeled proposed.
- A glossary or inspectable schema only if terminology is stable enough to publish.

### Cases / evidence that could attach

- **Generic platform walkthrough video** (`src/pages/customerGroups/IndividualPage.tsx`, YouTube ID `oNN0OTMstzM`; LEG-IND-002): possible current-capability demonstration after content, ownership, accessibility, and version are checked.
- **German vocational walkthrough** (`src/pages/customerGroups/SchoolsPage.tsx`, YouTube ID `bcNzNqi_vVg`; LEG-SCH-002): possible model-in-context demonstration after the same checks.
- **ITECH**: `src/pages/landing/partnersData.ts` says LearnGraph co-develops practice-oriented graphs, while the legacy summary describes visible paths across school/work/company. This could become a case, but the public `/schools` surface only says “Coming soon”; relationship, contribution, observations, and permission must be substantiated.
- **Bildungszentrum Optimum**: the legacy summary describes a case about visible starting points, next steps, materials, continuity, and reduced sorting overhead (`Websiste legacy content .docx`, paragraphs 165–190). It could illustrate the model in tutoring, but the reviewed corpus contains only the summary, not the underlying case source or verified outcomes.
- **Afghan protected-learning pilot**: useful as a proposed application card, never as evidence of current adoption or results.

### Genuine cross-links

- **Personal paths:** the model supplies the relations from which an individual route can be generated or shaped.
- **Evidence:** evidence is attached to nodes/skills and updates what the map can show.
- **Sovereignty:** a shared model only remains accountable if its operation, data, and assumptions can be inspected and controlled.
- **Research / Open Source → Interoperability:** shared meaning must be portable across systems and organisations; current graph relation: the model “is made portable by” interoperability.
- **About → Why LearnGraph:** the access/orientation principle explains why the model exists.
- **Collaborate → application/pilots:** contexts shape and test the model; this is delivery, not a second explanation of product mechanics.

### Duplicate / overlap risks

- “Shared competence language,” “visible relations,” “visible gaps,” and “orientation” recur across every audience page. Repeating them by sector would recreate the legacy architecture.
- The model can absorb Personal paths if described too broadly; keep this node focused on shared structure and the Personal paths node focused on the individual's experience.
- “Knowledge that travels” overlaps interoperability and sovereignty. Platform should explain the value; Research / Open Source should carry actual standards, interfaces, repositories, or technical detail.
- Evidence nodes are part of the model, but the editorial Evidence topic has a distinct job. Avoid using “evidence” ambiguously.

### Claims requiring owner verification

- Which entities and relationships exist in the current production data model.
- Whether users can currently search connected topics, follow guidance, build structures, manage skills, create resources, and host cohorts, and for which roles.
- Whether “same competence language” across schools, employers, and public partners reflects deployed capability, a modeling approach, or intended interoperability.
- Whether graph updates, gap identification, recommendations, or next-step guidance are manual, rule-based, AI-assisted, or not yet present.
- The current state and public availability of `app.learngraph.org` and the suitability of “Enter the platform.”

### Content gaps

- No verified, current product schema or feature matrix.
- No screenshot set or walkthrough known to match the current release.
- No concrete worked example tracing one goal through dependencies, resources, evidence, and next steps.
- No definition of who may author, edit, validate, or govern a shared map.
- No explanation of how conflicting competence vocabularies or map changes are handled.

## Candidate 2: Personal paths

### Communicative purpose

Show how a connected model becomes personal orientation rather than a prescribed generic track. The topic should answer: how does a person locate themselves, understand a goal, see relevant gaps, choose or question a next step, connect learning to practice, receive human support, and retain agency as the map changes?

### Existing current node copy

Source: `src/content/nodes/platform/personal-paths.ts`.

> **A path begins with where you are—not with a generic course catalogue.**
>
> Goals and existing abilities define a personal route through relevant learning and practice.
>
> The path stays legible: learners can understand the destination, the gaps, and the reason each step belongs.
>
> As evidence grows, the map changes with the person rather than forcing everyone through the same sequence.

### Source ideas and provenance

| Classification              | Source idea                                                                                                                                                                                 | Exact provenance                                                                                                                                                                                                                                                  | Architectural use / caution                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Principle                   | A visible path shows position, missing foundations, a relevant resource, where mentor support belongs, and a next step; the graph does not replace human judgment.                          | Project Presentation, **05 From Map to Movement**.                                                                                                                                                                                                                | Strongest concise account of the learner experience.                                                                                                      |
| Principle                   | Direction is part of access; without it, people repeat, avoid, choose too early, or stop. Difficulty can be read as a place where the map needs more detail rather than the end of ability. | Project Presentation, **03 Where Potential Gets Buried**.                                                                                                                                                                                                         | Strong human rationale. Avoid implying that software alone removes structural barriers.                                                                   |
| Principle                   | A learning path should grow from real questions, contexts, and use rather than arrive as a fixed track from above.                                                                          | Project Presentation, **04 A Living Map for Learning**.                                                                                                                                                                                                           | Supports agency and adaptable pathways.                                                                                                                   |
| Current capability (stated) | Learners can orient themselves, understand progress, manage skills, and move through guidance.                                                                                              | Project Presentation, **06 Inside LearnGraph**.                                                                                                                                                                                                                   | Verify each function and how personalization actually occurs.                                                                                             |
| Legacy proposition          | Prior knowledge and a goal/role/project shape the route; learners see next steps and reasons; peers, mentors, practice, feedback, and evidence remain visible.                              | Website legacy summary, **Personal learning paths** (paragraphs 40–57) and **Individual learners** (paragraphs 219–236); `en.json`: `landing.TileContentProject.forge.*`, `individual.hero.*`, `individual.offerings.*`; LEG-LRN-005/010 and LEG-IND-001/003/005. | Rich source cluster, but mostly proposition copy rather than demonstrated behavior.                                                                       |
| Workplace application       | Learning should attach to real tasks/projects, visible competences and gaps, transfer to daily work, and operational knowledge rather than course completion alone.                         | Website legacy summary, **Enterprise / up-skilling** (paragraphs 238–267).                                                                                                                                                                                        | Possible later workplace-learning application; not enough justification for a separate node yet.                                                          |
| Proposed application        | Small groups follow curated routes combining artistic practice, resources, mentors, peer exchange, feedback, and documentation, with adaptable visibility and practical access support.     | Afghan pilot `_v1_03_project-response.docx`, `_v1_05_program-design.docx`, and `_v1_06_access-safety-model.docx`.                                                                                                                                                 | Shows that “personal” can include facilitated and protected group pathways. It is proposed programme design, not a completed product behavior or outcome. |

### Possible content forms

- A short editorial narrative paired with one transparent worked path (“where I am → goal → gap → option → practice → evidence → revised path”).
- A product interaction sequence or current walkthrough video after verification.
- A contrast block: fixed course sequence versus adaptable, legible route—without implying automatic AI personalization if it is not present.
- A small application set showing individual, vocational, workplace, and protected-group contexts without duplicating full audience pages.

### Cases / evidence that could attach

- **Generic platform walkthrough** (YouTube `oNN0OTMstzM`) if it actually demonstrates a personal route in the current product.
- **ITECH case candidate** for visible learning paths, portfolio/transition, and reduced repeated orientation work (`Websiste legacy content .docx`, paragraphs 148–164). All observations and quotes require verification.
- **Bildungszentrum Optimum case candidate** for differentiated starting points, next steps, continuity, and human mentoring (paragraphs 165–190). The summary's “effect” language must not be published without underlying evidence.
- **Afghan pilot** as a proposed protected-path application; expected results in `_v1_08_exprected-results.docx` are expectations, not outcomes.

### Genuine cross-links

- **The model:** supplies the knowledge and competence relationships a path traverses.
- **Evidence:** current graph relation says Personal paths “becomes credible through” Evidence; activity and demonstrated ability can change what is visible.
- **Research → Questions:** personalization, agency, and portable evidence are research questions rather than settled facts.
- **About → learning access/commitment (working architectural candidate):** direction, safety, and support are part of access under unequal conditions.
- **Collaborate → pilots/educational partnerships:** real contexts determine facilitation, safety, access support, and programme design.

### Duplicate / overlap risks

- Legacy individual copy repeats “personal path,” orientation, relevance, peers, and practice in hero, challenges, offer cards, and GROW modal. It should become one canonical explanation.
- “Visible gaps” also belongs in the model and Evidence. Here it matters only as part of the person's legible decision path.
- Mentoring and peer learning are human/programme structures, not necessarily platform features.
- Personal paths must not quietly become an “AI recommendation” claim; the sources do not specify the mechanism.

### Claims requiring owner verification

- How the system represents prior knowledge, goals, roles, projects, gaps, progress, and next steps today.
- Whether paths adapt automatically, are authored by educators, are chosen by learners, or combine those approaches.
- Whether learners can see why a step was suggested and revise/question a path.
- Whether peer, mentor, feedback, cohort, and portfolio functions exist in the current release.
- Whether any personalization, retention, motivation, or learning-outcome claims have valid supporting studies. The legacy `80%` and `+30%` figures in `individual.stats.*` are uncited and should not migrate.

### Content gaps

- No current end-to-end learner example.
- No clear description of who creates or approves a path.
- No accessibility, language, low-connectivity, or device behavior documented for the platform itself.
- No account of learner consent, visibility, correction, or control over inferred gaps.
- No evidence connecting the personal-path experience to measured outcomes.

## Candidate 3: Evidence

### Communicative purpose

Explain two related but distinct things:

1. **Evidence in the learning model:** what can count as evidence of learning or ability, how it attaches to competences/paths, who can inspect or interpret it, and how it informs support without reducing a person to a score.
2. **Evidence for LearnGraph's claims:** cases, demonstrations, artifacts, observations, and measured outcomes that substantiate the Platform story.

These should be visibly separated within the topic. Otherwise the site risks using a claim about evidence-aware learning as if it were evidence that LearnGraph itself is effective.

### Existing current node copy

Source: `src/content/nodes/platform/evidence.ts`.

> **Progress should be demonstrated, not inferred from attendance.**
>
> Projects, feedback, and demonstrated abilities create evidence that learners and institutions can inspect.
>
> Evidence connects learning to practice without reducing people to scores or opaque analytics.
>
> It also gives partners a common basis for recognising growth across school, work, and changing contexts.

### Source ideas and provenance

| Classification                  | Source idea                                                                                                                                                                                                                                     | Exact provenance                                                                                                                                                                                                            | Architectural use / caution                                                                                              |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Principle                       | Grades, certificates, averages, and completed modules flatten the shape of understanding; visible strengths and gaps create a better ground for support.                                                                                        | Project Presentation, **02 Beyond the Score**.                                                                                                                                                                              | Defines why richer evidence matters; not a validation study.                                                             |
| Principle                       | Projects, artifacts, feedback, exams, and transitions can connect to competence nodes; evidence and progress update a person's map.                                                                                                             | Website legacy summary, **Vocational school → workplace** (paragraphs 2–16) and **Personal learning paths** (40–57).                                                                                                        | Useful candidate evidence types; current implementation must be verified.                                                |
| Current capability (stated)     | Users can understand progress and manage skills; the first release is being used, tested, questioned, and refined through real feedback.                                                                                                        | Project Presentation, **06 Inside LearnGraph**.                                                                                                                                                                             | “Real feedback” needs context, method, dates, and publishable artifacts before it serves as evidence.                    |
| Application framing             | Traceability for exams and quality should avoid surveillance-style or opaque analytics; qualifications alone can miss informal ability; competency gaps can guide matching and development.                                                     | `en.json`: `schools.challenges.evidence.*`, `schools.stats.learners.*`, `labourMarket.challenges.invisible.*`, `labourMarket.challenges.trust.*`, `labourMarket.offerings.matching.*`; LEG-SCH-003/004 and LEG-LAB-001–004. | Supports an anti-reduction principle and several applications. Do not imply formal recognition or regulatory acceptance. |
| Proposed application            | Project documentation, participant feedback, facilitator reflection, and the quality/usability of learning structures are proposed evaluation inputs; expected outputs include routes, tasks, mentor input, reflections, and creative outcomes. | Afghan pilot `_v1_08_exprected-results.docx`; related programme design in `_v1_05_program-design.docx`.                                                                                                                     | This is an evaluation plan and expected result set, not evidence of achieved results.                                    |
| Principle / proposed future use | Documented progress and work samples may help learners recognise skills and use evidence when future openings arise.                                                                                                                            | Afghan pilot `_v1_08_exprected-results.docx` and `_v1_09_sustainability.docx`.                                                                                                                                              | Use “could/may,” not “does”; recognition by external institutions is not demonstrated.                                   |

### Possible content forms

- A clear split layout: “Evidence inside a learning path” and “Evidence behind our claims.”
- An evidence-object diagram showing candidate types and their relationship to a competence, goal, author, reviewer, context, and date—only after the actual model is confirmed.
- A case/evidence rail attached to the claims it substantiates rather than a detached logo or metric wall.
- A product demo showing how one artifact changes a visible path.
- A compact evidence-standard statement: source, context, date, permission, observation versus inference, and limits.

### Cases / evidence that could attach

- **ITECH** could support claims about visible learning paths, orientation, mentoring time, competence evidence, and transitions, but the repository currently exposes only a partner narrative, promotional mention, “coming soon” card, and summary. It is not publication-ready evidence.
- **Bildungszentrum Optimum** could support differentiated learning and continuity claims, but only the summary is present. Baseline, participants, observation method, dates, product role, and outcomes are absent.
- **Current walkthrough videos** could demonstrate behavior but not learning impact. Verify versions and content first.
- **Usage figures** (`20 institutions`, `200 learners`, `8 countries` in `en.json` → `landing.CustomerGroupStatsBar.stats.*`; LEG-LRN-006) could become dated network/adoption evidence after definition, date, source, and permission are established. “∞ paths” is positioning, not evidence.
- **Partner narratives** in `src/pages/landing/partnersData.ts` are evidence leads, not evidence. They include strong claims such as co-development, MoU support, AI-driven skill mapping, interoperable credentials, real-time analytics, and employability impact that require partner and owner substantiation.
- **Afghan pilot** is not a case. It may later produce evidence if implemented and evaluated under its proposed design.

### Genuine cross-links

- **Personal paths:** evidence may update the visible path and make progress interpretable.
- **The model:** evidence needs defined relations to skills, activities, people, contexts, and reviewers.
- **Sovereignty:** evidence can be sensitive personal data; control, visibility, retention, and deployment matter.
- **Collaborate → pilots:** current graph says Evidence “can be tested through” Work together. A pilot should generate decision-quality evidence, not just a testimonial.
- **About → Network:** partners provide contexts and potential evidence, but affiliation must remain distinct from product outcome proof.
- **Research → Questions / Interoperability:** portable evidence, shared semantics, recognition, and non-reductive modeling remain open technical/social questions.

### Duplicate / overlap risks

- “Visible progress,” “visible gaps,” “supportive analytics,” “traceability,” and “recognition” appear throughout model, paths, school, labour-market, and pilot material. This topic needs a precise evidence vocabulary rather than repeating benefits.
- Partner logos, participation counts, testimonials, product demonstrations, and outcomes are different evidence classes and must not be presented interchangeably.
- The legacy pages render qualitative propositions as “stats.” Visual form must not upgrade a proposition into proof.
- “Recognising growth across contexts” overlaps interoperability; recognition is an institutional/social act, while portability is a technical/semantic condition.

### Claims requiring owner verification

- Which evidence objects exist in the current product and which are planned.
- Who creates, verifies, disputes, corrects, and can view evidence.
- Whether evidence changes paths or gap calculations today and by what mechanism.
- Whether portfolios, exams, feedback, work artifacts, credentials, or external records are supported.
- Whether any claims of adoption, improvement, reduced work, recognition, transfer, or matching have traceable data and publication permission.
- Exact status of ITECH and Bildungszentrum Optimum work, including quotes, dates, scope, and observed effects.
- Whether the product makes any analytics, AI, or automated scoring decisions.

### Content gaps

- No documented evidence model, governance model, or example record.
- No current case report with method, baseline, observations, limitations, and owner approval.
- No dated and defined adoption metrics.
- No explanation of assessment validity, contestability, privacy, retention, or bias.
- No demonstrated route from LearnGraph evidence to external recognition, credentials, employment, or further study.

## Candidate 4: Sovereignty

### Communicative purpose

Explain what meaningful control over learning infrastructure entails and which parts LearnGraph can actually support now. Separate durable principles—inspectability, autonomy, proportional data use, portability, exit—from concrete deployability, hosting, integration, security, compliance, and business-model claims.

### Existing current node copy

Source: `src/content/nodes/platform/sovereignty.ts`.

> **The infrastructure should remain inspectable, deployable, and yours.**
>
> An open core, self-hosting options, and deliberate integrations protect institutional independence.
>
> Sensitive education and labour-market data can stay where policy and responsibility require.
>
> Openness creates real exit options and lets procurement, security, and educators inspect what enters production.

### Source ideas and provenance

| Classification                    | Source idea                                                                                                                                                                 | Exact provenance                                                                                                                                                                                | Architectural use / caution                                                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Principle                         | Institutional adoption should not require dependence on opaque SaaS; the desired qualities are sovereignty, inspectability, deployability, and exit options.                | Website legacy summary, **Open core / independence / sovereignty** (paragraphs 58–82).                                                                                                          | Strong framing. The same section explicitly queues capability and security claims for verification.                       |
| Unsupported/verification required | Self-hosting, institutional-policy deployment, identity/LMS/HR integration, inspectable core, data-location control, and no mandatory SaaS dependency.                      | `en.json`: `landing.TileSection.tiles.mission.*`, `landing.TileContentProject.mission.*`, `landing.LandingSustainability.items.*`; LEG-LRN-011/012.                                             | These are current public promises in legacy copy, not substantiated technical documentation.                              |
| Principle                         | Infrastructure affecting opportunity should be inspectable; openness can support auditability, adaptation, procurement confidence, and exit.                                | `src/content/nodes/research/open-core.ts`.                                                                                                                                                      | Natural technical cross-link. Publication still requires actual open artifacts.                                           |
| Principle                         | Shared semantics and interfaces should allow collaboration without forcing every organisation into one platform; interoperability limits lock-in.                           | `src/content/nodes/research/interoperability.ts`.                                                                                                                                               | Sovereignty depends on portability, but do not duplicate the technical explanation.                                       |
| Application requirement           | School, labour-market, and public-sector copy calls for LMS/identity/tool integration, policy-compatible deployment, dignity/privacy, and sign-off by security/procurement. | `en.json`: `schools.stats.integration/open.*`, `labourMarket.challenges.efficiency/trust.*`, `labourMarket.stats.hosting.*`, `labourMarket.offerings.stack.*`; LEG-SCH-004 and LEG-LAB-002–004. | Treat as institutional requirements and propositions until actual compatibility is documented.                            |
| Principle                         | Technology should expand community agency without trading away dignity or independence.                                                                                     | `en.json`: `home.mission`, `home.subline`, `home.platform.*`; inventoried as LEG-ORP-001.                                                                                                       | Useful mission-level rationale; avoid turning collective agency into a technical feature claim.                           |
| Proposed application requirement  | Trusted access, small groups, adaptable visibility, private/internal/pseudonymous/anonymised work, and restricted outputs are part of a proposed protected-learning design. | Afghan pilot `_v1_03_project-response.docx` and `_v1_06_access-safety-model.docx`.                                                                                                              | Shows why control and visibility matter. It does not show that the platform currently implements all listed safety modes. |

### Possible content forms

- A claims matrix with four explicit columns: principle, available now, configurable/deployment-dependent, and planned.
- A deployment/data-boundary diagram based on the actual architecture.
- Links to repositories, licenses, documentation, security/process materials, APIs, export formats, and supported integrations.
- A procurement-oriented FAQ that avoids blanket “secure/compliant” claims.
- A sensitive-context vignette framed as design requirements, not implementation proof.

### Cases / evidence that could attach

- **Public repositories and license files** once the exact open-core surface is identified; these are the strongest possible evidence for inspectability.
- **Deployment documentation or a real self-hosted installation** after owner confirmation.
- **Integration artifacts** for actual LMS, identity, HR, credential, or public systems; partner narratives alone are insufficient.
- **Partner/project architecture examples** only with concrete role and provenance. The legacy service claim of European-scale interoperability (LEG-SRV-006) needs named substantiation.
- **Afghan pilot** can illustrate sovereignty and visibility requirements only as a proposed application unless implemented platform controls can be shown.

### Genuine cross-links

- **Research / Open Source → Open core:** the current graph says Sovereignty “is implemented through” Open core. This link should lead to actual repositories/licensing/documentation, not another values paragraph.
- **Research / Open Source → Interoperability:** current graph relation says Sovereignty “depends on” interoperability; portability and exit require usable formats/interfaces.
- **The model:** inspectability includes the model's assumptions, vocabulary, and governance, not only source code.
- **Evidence:** learning evidence can be sensitive; sovereignty determines custody, access, retention, correction, and export.
- **About → learning access/commitment:** safety and dignity explain why control matters in unequal or restricted contexts.
- **Collaborate:** deployment, governance, and integration work belong with a concrete engagement when they are services rather than platform defaults.

### Duplicate / overlap risks

- Open core belongs conceptually here and technically under Research / Open Source. Platform should explain the institutional consequence; the technical territory must show the artifact.
- Interoperability is a condition of sovereignty but deserves its own technical detail only if real interfaces/standards exist.
- Privacy, security, compliance, data residency, self-hosting, and sovereignty are not synonyms. Avoid bundling them into an unqualified “independent & secure” promise.
- Safety requirements from the Afghan proposal must not be mistaken for currently implemented privacy controls.
- Service governance/compliance copy (LEG-SRV-003) describes delivery practice and should not silently become a product certification claim.

### Claims requiring owner verification

- Exact open-core components, repositories, licenses, and release status.
- Whether self-hosting is supported now; deployment prerequisites, responsibilities, updates, and operational limits.
- Available data-hosting regions or on-premise options; what “data can stay where policy requires” means technically and contractually.
- Actual identity, LMS, HR, credential, export/import, and API integrations.
- Data controller/processor roles; visibility, retention, deletion, export, and audit behavior.
- Security controls, reviews, certifications, incident processes, and any use of AI/third-party services.
- Whether “free for individuals,” “no ads,” “no paywalls,” “no extraction,” and exit guarantees remain current commitments.
- Whether private, pseudonymous, anonymised, and restricted-output modes exist in the product or only in proposed programme operations.

### Content gaps

- No public technical architecture or deployment boundary.
- No repository/license inventory or definition of “open core.”
- No supported-integration matrix or portability/export specification.
- No security, privacy, data-governance, or threat-model evidence in the reviewed corpus.
- No distinction between software capability, hosting arrangement, contractual commitment, and facilitator practice.

## Cross-topic attachment map

| Source unit                                                     |      Model | Personal paths |   Evidence | Sovereignty | Primary classification                        |
| --------------------------------------------------------------- | ---------: | -------------: | ---------: | ----------: | --------------------------------------------- |
| Project Presentation: **02 Beyond the Score**                   | Supporting |     Supporting |    Primary |           — | Principle                                     |
| Project Presentation: **04 A Living Map for Learning**          |    Primary |     Supporting |          — |           — | Principle                                     |
| Project Presentation: **05 From Map to Movement**               | Supporting |        Primary | Supporting |           — | Principle                                     |
| Project Presentation: **06 Inside LearnGraph**                  |    Primary |     Supporting | Supporting |           — | Current capabilities, stated but to verify    |
| Project Presentation: **07 Knowledge That Travels and Returns** |    Primary |     Supporting | Supporting |  Supporting | Principle / future-facing promise             |
| Legacy vocational cluster                                       |    Primary |     Supporting |    Primary |  Supporting | Application framing + case leads              |
| Legacy labour-market cluster                                    |    Primary |     Supporting |    Primary |  Supporting | Application framing                           |
| Legacy individual cluster                                       | Supporting |        Primary | Supporting |           — | Product proposition                           |
| Legacy enterprise/up-skilling cluster                           | Supporting |        Primary | Supporting |  Supporting | Application framing                           |
| ITECH                                                           | Supporting |     Supporting |    Primary |           — | Evidence candidate; not yet substantiated     |
| Bildungszentrum Optimum                                         | Supporting |        Primary |    Primary |           — | Evidence candidate; underlying source absent  |
| Afghan protected-learning pilot                                 |    Primary |        Primary | Supporting |  Supporting | Proposed application only                     |
| Generic and vocational videos                                   | Supporting |        Primary |    Primary |           — | Demonstration candidates; currentness unknown |
| Partner narratives                                              | Supporting |     Supporting |    Primary |  Supporting | Evidence leads; promotional and uncited       |

## Territory-wide duplicate and boundary risks

1. **Applications becoming nodes by legacy inertia.** Schools, labour markets, individuals, enterprise, and foundations repeat the same mechanics in audience packaging. Keep applications attachable unless one develops a distinct body of content and evidence.
2. **Evidence as concept versus proof.** The editorial structure must distinguish learning evidence from evidence supporting LearnGraph's claims.
3. **Principles presented as capabilities.** Human agency, living maps, knowledge reuse, dignity, openness, and sovereignty are strong principles. They do not prove that a product function or outcome exists.
4. **Proposals presented as cases.** The Afghan documents consistently describe a proposed pilot, expected results, and adaptable design. They must stay future/conditional.
5. **Partner status presented as outcome proof.** Logos, MoUs, alignment, or participation do not prove implementation or impact.
6. **Technical qualities collapsed into one promise.** Open source, open core, inspectability, self-hosting, security, privacy, interoperability, data residency, compliance, portability, and exit each require separate truth conditions.
7. **Model and paths collapsing together.** The model explains shared structure; Personal paths explains the person's legible journey through it.
8. **Fixed paragraph-only presentation.** `src/content/nodes/types.ts` currently permits only eyebrow, title, lead, body paragraphs, and an optional action. The source needs diagrams, demos, cases, evidence blocks, links, and verification-aware labels. This is an architecture observation, not a request to change code in this pass.

## Consolidated owner-verification queue

Before Platform copy is approved, the owner should provide or confirm:

- a current feature/role matrix and one representative end-to-end product path;
- the actual graph entities, relationships, authorship, governance, and personalization mechanism;
- the evidence object model, visibility/consent rules, and relationship to progress or recommendations;
- the open-core definition, repositories, licenses, deployment options, portability, and supported integrations;
- the current privacy/security/data-location position and any externally reviewable artifacts;
- current app availability and whether both embedded videos still represent the release;
- dated definitions and sources for any adoption figures;
- ITECH and Bildungszentrum Optimum case source packs, permissions, quotes, dates, scope, observations, and limitations;
- verification or removal of every strong partner-role statement in `partnersData.ts`;
- explicit confirmation that the Afghan pilot remains proposed, or implementation evidence if its status changes;
- which current business-model commitments remain true: free individual access, no ads, no paywalls, no extraction, self-hosting, and exit options.

## Source files reviewed

- `docs/legacy-content-inventory.md`
- `docs/graph-topology-pressure-test.md`
- `src/pages/graph/graphModel.ts`
- `src/pages/graph/GraphWebsite.tsx`
- `src/content/nodes/types.ts`
- `src/content/nodes/index.ts`
- `src/content/nodes/platform/model.ts`
- `src/content/nodes/platform/personal-paths.ts`
- `src/content/nodes/platform/evidence.ts`
- `src/content/nodes/platform/sovereignty.ts`
- Relevant current cross-link copy in `src/content/nodes/research/open-core.ts`, `research/interoperability.ts`, `research/questions.ts`, `work/work-together.ts`, and `about/network.ts`
- `src/i18n/locales/en.json`
- Relevant legacy implementation in `src/pages/customerGroups/SchoolsPage.tsx`, `IndividualPage.tsx`, and `src/pages/landing/partnersData.ts`
- `source-material/raw/Websiste legacy content .docx`
- `source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_03_project-response.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_04_why-learngraph.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_05_program-design.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_06_access-safety-model.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_08_exprected-results.docx`
- `source-material/raw/Afghan Women Project/LG_Afghan-Cultural-Education-Pilot_v1_09_sustainability.docx`
