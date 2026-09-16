import type { NodeContent } from "../../../content/graph";
import { nodeContentSource } from "../../../content/graph/editorial/source";

export const modelContent = {
  id: "content-platform-model",
  publicationStatus: "review",
  layout: "model-system",
  title: "THE MODEL",
  lead: "One graph fragment. Its dependencies, resources and resolved routes left visible",
  sourceRefs: [
    `${nodeContentSource}/Platform/The model.docx`,
    "learngraph-monorepo/services/graph/seeding/0001_initial_topics.cypher",
    "learngraph-monorepo/services/resources/seeding/0001_initial_resources.sql",
    "learngraph-monorepo/services/graph/repository/get_path.cypher",
    "learngraph-monorepo/web/",
    "learngraph-monorepo/services/user/",
    "learngraph-monorepo/services/ingestion/",
  ],
  blocks: [
    {
      type: "model-system",
      truthStatus: "requires-verification",
      reviewNote:
        "The route behaviour and service boundaries are implementation-backed. Progress, recognition, privacy, security and deployment labels require owner verification before publication.",
      plate: {
        nodes: [
          {
            id: "knowledge-structure",
            name: "Knowledge structure",
            description:
              "Topics keep their dependencies, alternatives, resources and competence mappings in one shared structure. Journeys select from it without copying it",
          },
          {
            id: "journeys-tools",
            name: "Journeys & learning tools",
            description:
              "Journeys assemble connected topics around a learner's context and existing knowledge. The Zone keeps that route and its material together while learning",
          },
          {
            id: "people-roles",
            name: "People & roles",
            description:
              "People and roles are separate. The same person can learn, guide or contribute in different contexts, with tools and permissions changing accordingly",
          },
          {
            id: "progress-recognition",
            name: "Progress & recognition",
            description:
              "Progress is held at topic and competence level, not only as course completion. That state can inform later journeys and recognition",
          },
          {
            id: "groups-organisations",
            name: "Groups & organisations",
            description:
              "Cohorts bind people, roles and journeys within one learning context. Organisations coordinate those contexts and their permissions",
          },
          {
            id: "authoring-governance",
            name: "Authoring & governance",
            description:
              "The Studio turns knowledge into editable topics and relationships. Ingestion, review and publication remain distinct steps",
          },
          {
            id: "application-architecture",
            name: "Application architecture",
            description:
              "The web interface sits above separate graph, user and ingestion services. Each layer owns a different part of the product logic",
          },
          {
            id: "privacy-security",
            name: "Privacy & security",
            description:
              "Identity, role and scope determine visibility and editing rights. Personal, cohort, organisation and public contexts remain distinct",
          },
        ],
        relations: [
          {
            sourceId: "knowledge-structure",
            targetId: "journeys-tools",
            label: "RESOLVES INTO",
            reading:
              "A journey resolves a route without becoming the underlying graph",
          },
          {
            sourceId: "people-roles",
            targetId: "journeys-tools",
            label: "CHANGES AVAILABLE TOOLS",
            reading: "A person's role changes what they can see and do",
          },
          {
            sourceId: "journeys-tools",
            targetId: "progress-recognition",
            label: "CHANGES",
            reading: "Learning activity can change the state held for a person",
          },
          {
            sourceId: "groups-organisations",
            targetId: "people-roles",
            label: "SCOPES",
            reading: "A shared context assigns roles, people and permissions",
          },
          {
            sourceId: "authoring-governance",
            targetId: "knowledge-structure",
            label: "EXTENDS",
            reading:
              "Controlled authoring adds material to the shared structure",
          },
          {
            sourceId: "application-architecture",
            targetId: "knowledge-structure",
            label: "OPERATES",
            reading: "Application services operate on the shared structure",
          },
          {
            sourceId: "application-architecture",
            targetId: "groups-organisations",
            label: "SUPPORTS",
            reading:
              "Application services support bounded organisational contexts",
          },
          {
            sourceId: "application-architecture",
            targetId: "authoring-governance",
            label: "SUPPORTS",
            reading:
              "Application services support ingestion and authoring work",
          },
          {
            sourceId: "privacy-security",
            targetId: "people-roles",
            label: "GOVERNS",
            reading:
              "Identity and access rules bound what each role can inspect or change",
          },
          {
            sourceId: "privacy-security",
            targetId: "groups-organisations",
            label: "BOUNDS",
            reading:
              "Visibility and deployment boundaries apply to shared contexts",
          },
          {
            sourceId: "privacy-security",
            targetId: "application-architecture",
            label: "CONSTRAINS",
            reading:
              "Privacy and access boundaries constrain application behaviour",
          },
        ],
      },
    },
  ],
} as const satisfies NodeContent;
