import type { NodeContent } from "../../types";

export const usingLearnGraphContent = {
  id: "content-platform-using-learngraph",
  publicationStatus: "review",
  layout: "product-tour",
  lead: "Spaces for finding, shaping & following learning. Working with groups, running programmes & contributing knowledge to the public graph",
  sourceRefs: ["Owner and editorial working session · 8 September 2026"],
  blocks: [
    {
      type: "product-tour",
      truthStatus: "requires-verification",
      reviewNote:
        "Replace capture slots with current product media and verify every workflow before publication.",
      roleSummaries: [
        {
          role: "Learner",
          introduction:
            "Find a place to begin, shape a journey & carry what you learn forward",
          destinations: [
            { name: "Atlas", job: "find or create journeys" },
            { name: "Zone", job: "follow connected learning paths" },
            { name: "Skill Library", job: "see what carries forward" },
          ],
        },
        {
          role: "Educator & Mentor",
          introduction:
            "Shape learning around a group, follow progress & step in where guidance matters",
          destinations: [
            {
              name: "Cohort Manager",
              job: "organise learners, define roles and keep progress in view",
            },
            {
              name: "Cohort Editor",
              job: "shape the journey, its structure and material",
            },
            {
              name: "Zone",
              job: "follow the learning process and mentor in context",
            },
          ],
        },
        {
          role: "Organisation",
          introduction:
            "Coordinate people, programmes & shared learning structures",
          destinations: [
            {
              name: "Cohort Control",
              job: "keep learners, roles, material and progress in view",
            },
            {
              name: "Organisation Manager",
              job: "certification, personalised interface and analytics",
            },
            {
              name: "Infrastructure",
              job: "connect LearnGraph with surrounding systems",
            },
          ],
        },
        {
          role: "Contributor",
          introduction:
            "Turn subject knowledge into a graph other people can use & extend",
          destinations: [
            { name: "Studio", job: "create or extend a learning graph" },
            { name: "Public graph", job: "publish it for others to use" },
          ],
        },
      ],
      crossCutting: {
        afterChapterId: "shared-route",
        label: "Across the learning environment",
        introduction:
          "These controls affect the learning environment itself rather than belonging to one role",
        items: [
          {
            name: "Languages",
            job: "move learning material between languages",
          },
          {
            name: "Presentation modes",
            job: "change how material is presented",
          },
          {
            name: "Focus controls",
            job: "adjust how the learning environment behaves",
          },
          {
            name: "Neurodiversity",
            job: "support different ways of reading, focusing and navigating",
          },
        ],
      },
      chapters: [
        {
          id: "shared-route",
          label: "One shared route",
          layout: "route",
          stages: [
            {
              id: "atlas",
              name: "Atlas",
              roles: ["Learn", "Guide"],
              description:
                "Browse the public graph for educational content, open existing journeys and collect them in a personal library. A journey can also begin with an individual goal or be adapted before learning starts.",
              actions: ["Browse", "Collect", "Generate", "Adapt"],
              captureLabel: "Atlas interface",
            },
            {
              id: "zone",
              name: "Zone",
              roles: ["Learn", "Guide"],
              description:
                "The Zone is the focused learning area. A journey opens as connected topics and resources, with prerequisites, alternative routes and movement between journeys kept in view.",
              actions: ["Follow", "Branch", "Switch", "Continue"],
              captureLabel: "Zone movement",
            },
            {
              id: "skill-library",
              name: "Skill Library",
              roles: ["Learn", "Guide"],
              description:
                "Progress returns to a granular view of skills and competences rather than ending at a course-completion label.",
              actions: ["Inspect", "Connect", "Carry forward"],
              captureLabel: "Skill Library interface",
            },
          ],
        },
        {
          id: "working-together",
          label: "Working with others",
          layout: "system",
          stages: [
            {
              id: "cohorts",
              name: "Cohorts",
              roles: ["Guide", "Organise"],
              description:
                "Create a cohort, invite people and assign roles. Journeys can be created or adapted around the group while educators and mentors follow progress and respond where guidance matters.",
              actions: ["Create", "Invite", "Assign", "Mentor"],
              captureLabel: "Cohort workspace",
            },
            {
              id: "organisation",
              name: "Organisation",
              roles: ["Organise"],
              description:
                "Manage people, permissions, cohorts and shared learning structures in one environment. Recognition, insights and connections to surrounding systems sit around that structure.",
              actions: ["People", "Learning", "Recognition", "Infrastructure"],
              captureLabel: "Organisation workspace",
            },
          ],
        },
        {
          id: "public-contribution",
          label: "Public contribution",
          layout: "studio",
          stages: [
            {
              id: "studio",
              name: "Studio",
              roles: ["Contribute"],
              description:
                "The Studio is a public graph editor for turning knowledge into structured learning. Create a new path, elaborate an existing graph and publish the result back into the public network.",
              actions: ["Structure", "Elaborate", "Publish"],
              captureLabel: "Studio interface",
            },
          ],
        },
      ],
    },
  ],
} as const satisfies NodeContent;
