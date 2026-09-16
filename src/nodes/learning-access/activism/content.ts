import type { NodeContent } from "../../../content/graph";

const suppliedSource =
  "Activism page copy and screenshots supplied by Lea · 16 September 2026";

export const activismContent = {
  id: "content-learning-access-activism",
  publicationStatus: "review",
  layout: "activism",
  title: "We act for the wellbeing of all",
  lead: "We donate because their success matters",
  sourceRefs: [suppliedSource],
  blocks: [
    {
      type: "statements",
      truthStatus: "principle",
      sourceRefs: [suppliedSource],
      items: [
        {
          label: "Ecosystem",
          text: "We help your work grow: beside funds or tools we bring structure and steady accompaniment so courage on the ground turns into lasting capability. The aim is more agency for the people and communities carrying the work, not growing dependence on us",
        },
        {
          label: "Potential",
          text: "We support where there is potential for impact. Join our community to find out what impact means for us and how we evaluate it",
        },
        {
          label: "Presence",
          text: "We stay close to the people doing the work. A workshop alone rarely shifts outcomes. Ongoing presence, honest feedback, and solving problems together do",
        },
      ],
    },
  ],
} as const satisfies NodeContent;

export const gfccaContent = {
  id: "content-activism-gfcca",
  publicationStatus: "review",
  layout: "activism-case",
  kicker: "Kenya · regenerative learning",
  title: "GFCCA and the Global Nature First School",
  sourceRefs: [suppliedSource, "https://gfcc-africa.org/"],
  blocks: [
    {
      type: "action",
      label: "Visit GFCCA website",
      href: "https://gfcc-africa.org/",
      external: true,
    },
    {
      type: "prose",
      kicker: "What they do",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      paragraphs: [
        "GFCCA trains smallholders in Western Kenya on demonstration farms and reforestation plots: agroforestry, soil fertility, biodiversity care, and food security under climate stress. With partners they anchor the Global Nature First School so interns learn composting, nursery work, and agroforestry installation beside Kenyan peers and farmers through hands-on daily practice",
      ],
    },
    {
      type: "prose",
      kicker: "Why it matters",
      truthStatus: "principle",
      sourceRefs: [suppliedSource],
      paragraphs: [
        "Carbon and hunger land first on people who work the soil. GFCCA keeps climate theory and hands in the earth together: head, heart, and hand stay one loop so restoration grows with the learner",
      ],
    },
    {
      type: "key-points",
      kicker: "How LearnGraph helps",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      reviewNote:
        "Confirm calls, payment, product role, current status, and GFCCA publication permission before public release",
      items: [
        "We helped GFCCA enter Erasmus-oriented calls through our partner network. They gain a straight bridge to EU funding we open together",
        "When GFCCA stood at the edge of insolvency, we sent the cash we still had as a startup. Small stack, sharp moment",
        "LearnGraph is the infrastructure layer for scaling: learner journeys, mentors, restoration evidence, and credentials tied to trees, soil, and lived outcomes, now and as they grow",
      ],
    },
  ],
} as const satisfies NodeContent;

export const afghanistanActivismContent = {
  id: "content-activism-afghanistan",
  publicationStatus: "review",
  layout: "activism-case",
  kicker: "Afghanistan · education under pressure",
  title: "German learning with women in Afghanistan",
  lead: "A quiet learning space, phone-first, low bandwidth",
  sourceRefs: [suppliedSource],
  blocks: [
    {
      type: "prose",
      kicker: "What they do",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      paragraphs: [
        "Women in Afghanistan study German for visas, exams, and work. Classes meet learners where life already is, with WhatsApp first, weak bandwidth, and high discipline. Grammar, structure, writing drills, and paths are held by tutors across distance",
      ],
    },
    {
      type: "prose",
      kicker: "Why it matters",
      truthStatus: "principle",
      sourceRefs: [suppliedSource],
      paragraphs: [
        "When schools and streets are unsafe, exclusion becomes concrete: no language, no paper, no next step. The program answers with presence: structured learning that respects how women actually connect day to day",
      ],
    },
    {
      type: "key-points",
      kicker: "How LearnGraph helps",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      reviewNote:
        "Confirm transfers, current product use, safety implications, participant consent, and overlap with Learning Without Frontiers before public release",
      items: [
        "We wire transfers directly for internet bills so remote lessons stay possible. The money is only for connectivity",
        "LearnGraph is becoming the operating layer for volunteer mentors and teachers: materials, rhythm, and accountability across borders. The work is already underway",
        "We keep trimming the product so it stays fast on thin lines and frightening days, because dignity is also latency and clarity",
      ],
    },
  ],
} as const satisfies NodeContent;

export const worldEduCareContent = {
  id: "content-activism-world-educare-network",
  publicationStatus: "review",
  layout: "activism-case",
  kicker: "Uganda · community of care",
  title: "World EduCare Network",
  sourceRefs: [suppliedSource],
  blocks: [
    {
      type: "prose",
      kicker: "What they do",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      paragraphs: [
        "World EduCare Network, led by Joseph Okino, works through schools, ICT clubs, WASH and enterprise clubs, a vocational centre for youth and women including teenage mothers, and rural hubs across Northern and Eastern Uganda. When COVID broke private teachers, Joseph moved small grants so adults could return to their classrooms and households could breathe",
      ],
    },
    {
      type: "prose",
      kicker: "Why it matters",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      reviewNote: "Confirm the quotation and permission with Joseph Okino",
      paragraphs: [
        "Joseph's line stays at the centre: “I like so much to give.” WENET connects teachers, students, equipment, and networks so everyday care can turn into lasting support",
      ],
    },
    {
      type: "key-points",
      kicker: "How LearnGraph helps",
      truthStatus: "requires-verification",
      sourceRefs: [suppliedSource],
      reviewNote:
        "Confirm donations, present platform access, German partners, curriculum work, current status, and WENET publication permission before public release",
      items: [
        "Donations from us bought computers and paid internet bills so staff and learners could actually reach the network they were promised",
        "We offer the platform to WENET at no cost so Ugandan schools can plug into strong materials and peer mentoring from our German partner institutions across borders",
        "We share curriculum work, co-developing and reusing learning routes across Ugandan partner schools to build shared momentum",
      ],
    },
  ],
} as const satisfies NodeContent;
