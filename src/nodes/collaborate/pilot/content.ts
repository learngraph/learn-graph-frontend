import type { NodeContent, PilotRecordBlock } from "../../../content/graph";

export const itechPilotData = {
  type: "pilot-record",
  status: "incomplete",
  partner: "ITECH Hamburg",
  facts: [
    { label: "Date" },
    { label: "Participants" },
    { label: "Duration" },
    { label: "LearnGraph areas used" },
  ],
  boundary: [
    { label: "Group" },
    { label: "Material" },
    { label: "Roles" },
    { label: "Platform" },
    { label: "Period" },
  ],
  unresolvedFacts: [
    "Whether the ITECH activity was formally a pilot, test, classroom use, or another kind of implementation",
    "Dates and duration",
    "Participant roles and approximate numbers",
    "The concrete problem or question tested",
    "The learning material, curriculum, or competence structure used",
    "The LearnGraph areas and functions used",
    "What educators prepared and did",
    "What learners saw and did",
    "What remained connected across sessions",
    "Direct observations during or after use",
    "What remained difficult or could not be judged",
    "What happened afterward",
    "Permission to name ITECH and publish the case framing",
    "Approval and provenance for any quotation",
    "Publishable screenshots, learning maps, tasks, video, notes, or feedback records",
  ],
  closing:
    "A pilot does not reproduce ITECH somewhere else. Its scope comes from the learning environment already there: the people involved, the material they use and the part of their work that needs to be tested.",
  action: {
    label: "Discuss a pilot",
    href: "mailto:contact@learngraph.org",
  },
  truthStatus: "requires-verification",
  sourceRefs: [
    "src/nodes/about/impact/content.ts · ITECH case candidate",
    "ITECH video candidate · https://www.youtube.com/watch?v=bcNzNqi_vVg",
  ],
  reviewNote:
    "The frame is implemented before the ITECH fact record is complete. Missing values are visible only in development.",
} as const satisfies PilotRecordBlock;

export const pilotLearnGraphContent = {
  id: "content-collaborate-pilot-learngraph",
  publicationStatus: "review",
  layout: "pilot",
  title: "Pilot LearnGraph",
  lead: "A pilot uses LearnGraph with a defined group, their actual learning material and a limited part of the platform. It shows what the system changes in practice, and what it does not",
  blocks: [itechPilotData],
} as const satisfies NodeContent;
