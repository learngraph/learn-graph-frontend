# Content intake board

Status: working inventory for the content-assembly phase. It records availability, not quality or publication approval.

## What the states mean

- **Needs revision** — relevant legacy or project material exists, but no complete article is approved unchanged.
- **Not created** — source material exists, but this exact node needs a new assembly.
- **Ready for review** — Lea has supplied a complete candidate article for architectural and editorial review.
- **Approved** — the candidate has passed content, truth, and publication review.

Source availability and copy status are separate. Having rich sources does not mean having an article.

## Current count

- 17 topic slots in the full architecture
- 13 launch-visible topic slots
- 14 articles need revision
- 3 articles have not been created for their new architectural job
- 0 legacy articles are approved unchanged
- 0 articles are currently approved for publication

## Platform

| Node              | Source availability       | Copy state     | Main blocker                                     | Additional material                         |
| ----------------- | ------------------------- | -------------- | ------------------------------------------------ | ------------------------------------------- |
| The model         | Legacy + project material | Needs revision | Current entities and relationships               | Model diagram missing                       |
| Personal paths    | Legacy + project material | Needs revision | Current path behaviour                           | Product walkthrough missing                 |
| Learning evidence | Legacy + project material | Needs revision | Evidence mechanism truth                         | Lifecycle diagram blocked; cases unverified |
| Sovereignty       | Legacy + project material | Needs revision | Licensing, deployment, data, API, and exit facts | Verified technical facts blocked            |

## Collaborate

### Transformation services

| Node                | Source availability | Copy state     | Main blocker                                     | Additional material                          |
| ------------------- | ------------------- | -------------- | ------------------------------------------------ | -------------------------------------------- |
| Find the constraint | Legacy content      | Needs revision | Deliverable boundary and attributable experience | Diagnostic diagram missing; case blocked     |
| Reduce manual load  | Legacy content      | Needs revision | Scope and outcome claims                         | Implementation diagram missing; case blocked |
| Build the offer     | Legacy content      | Needs revision | Public label provisional; no publishable case    | Delivery sequence missing; case blocked      |

### LearnGraph partnerships

| Node                        | Source availability       | Copy state  | Main blocker                                         | Additional material                                                       |
| --------------------------- | ------------------------- | ----------- | ---------------------------------------------------- | ------------------------------------------------------------------------- |
| Pilot LearnGraph            | Legacy + project material | Not created | Completed pilots must remain separate from proposals | Pilot diagram missing; Protected Learning Maps is a candidate application |
| Implementation partnerships | Legacy + project material | Not created | Actively sought partnership types                    | Role diagram missing; verified example blocked                            |

## About

| Node                             | Source availability       | Copy state     | Main blocker                                              | Additional material                                  |
| -------------------------------- | ------------------------- | -------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| Why LearnGraph                   | Legacy + project material | Needs revision | None before editorial review                              | One useful visual contrast still missing             |
| Founding commitment — label open | Project material          | Not created    | Public label and exact framing                            | Protected Learning Maps is a candidate application   |
| People                           | Legacy content            | Needs revision | Current roles, attribution, and consent                   | Approved roster blocked                              |
| Network                          | Legacy content            | Needs revision | Verified relationship type and permission for every entry | Relationship directory blocked; ITECH is a candidate |

## Research / Open Source — reserved and hidden

| Node               | Source availability       | Copy state     | Main blocker                                          | Additional material                   |
| ------------------ | ------------------------- | -------------- | ----------------------------------------------------- | ------------------------------------- |
| Open core          | Legacy content            | Needs revision | Open boundary, license intent, and artifacts          | Verified technical facts blocked      |
| Interoperability   | Legacy + project material | Needs revision | Public APIs, schemas, exports, or demonstrations      | Inspectable model blocked             |
| Research questions | Legacy + project material | Needs revision | Owners, methods, status, and publishable outputs      | Research output blocked               |
| Contribute         | Legacy content            | Needs revision | Governance, licensing, review capacity, and authority | Supported contribution routes blocked |

These four slots remain in the architecture so their truth can be resolved. They must not appear in launch navigation while the root is reserved.

## Suggested writing order

The order is based on independence from unresolved product claims, not on graph position:

1. **About / Why LearnGraph** — strong source base, no technical owner gate, and best suited to establishing the site's actual voice.
2. **About / Founding commitment** — source-rich and important, but the public label can remain open while the article clarifies its own job.
3. **Platform / The model** — strong source base; flag exact entity or capability claims for product review.
4. **Collaborate / transformation services** — work one offer at a time once its real delivery boundary is confirmed.
5. **Personal paths, Learning evidence, and Sovereignty** — wait for the relevant product or owner facts.
6. **People and Network** — factual assembly rather than editorial article writing.
7. **Research / Open Source** — wait behind its publication gate.

This order is advisory. Lea can submit any node when a stronger piece is ready.

## Intake workflow

For each submission:

1. Lea names the canonical node and supplies the candidate article or content blocks.
2. The candidate enters **Ready for review**; it does not enter production.
3. Codex evaluates its distinct job, memorable idea, overlap, unsupported claims, rhythm, and best content form.
4. Lea revises externally when needed.
5. Only an explicitly approved candidate becomes typed `NodeContent` and may later become publishable.

Placeholder states are editorial tooling. The publication validator must prevent a topic from becoming publishable until its copy state is **Approved**.
