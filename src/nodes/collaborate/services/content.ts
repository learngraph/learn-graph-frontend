import type { NodeContent } from "../../../content/graph";

export const servicesWorkbenchContent = {
  id: "content-collaborate-services-workbench",
  publicationStatus: "review",
  layout: "editorial",
  kicker: "Workshop structure · Not publication copy",
  title: "Make every proposed service answer the same questions",
  lead: "The workshop is not deciding which skills the team has. It is deciding which pieces of work an outside person can understand, request and receive",
  blocks: [
    {
      type: "statements",
      items: [
        {
          label: "Who calls",
          text: "Name the person or organisation with the problem. Not everybody who might theoretically benefit.",
        },
        {
          label: "What happened",
          text: "Describe the situation that makes them look for help now.",
        },
        {
          label: "What we do",
          text: "Describe the actual work. No umbrella language and no list of team capabilities.",
        },
        {
          label: "What they receive",
          text: "Name the deliverable, changed condition or usable result at the end.",
        },
        {
          label: "What proves it",
          text: "Attach real experience, a case, an artifact or a person who can stand behind the offer.",
        },
        {
          label: "How close to LearnGraph",
          text: "Mark it as LearnGraph core, adjacent work or independent team expertise.",
        },
      ],
    },
    {
      type: "pull-quote",
      text: "If two cards solve the same problem for the same person, they are one offer until proven otherwise.",
    },
  ],
} as const satisfies NodeContent;
