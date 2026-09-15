import type { NodeContent } from "../../../content/graph";

export const convictionsContent = {
  id: "content-about-convictions",
  publicationStatus: "review",
  layout: "convictions",
  kicker: "The premise",
  title: "Learn without permission",
  lead: "Wealth, location and institutional access still decide too much about who gets to learn, who gets to continue and who gets shut out.",
  sourceRefs: [
    "src/i18n/locales/en.json · home mission and human-centred positioning",
    "docs/legacy-content-inventory.md · LEG-ORP-001 and human-centred / anti-black-box synthesis",
  ],
  blocks: [
    {
      type: "prose",
      truthStatus: "principle",
      paragraphs: [
        "That is a system problem, not a lack of material.",
        "Learning should not require the right postcode, the right bank account or the right gatekeeper.",
        "LearnGraph is built around the opposite demand: access belongs in the structure, not at the gate.",
      ],
    },
    {
      type: "pull-quote",
      truthStatus: "principle",
      text: "Awareness over conformity",
    },
    {
      type: "prose",
      kicker: "Knowledge should travel",
      truthStatus: "principle",
      paragraphs: [
        "Knowledge starts somewhere.",
        "In a classroom. A workshop. A field. A lab. A conversation. Years of somebody figuring something out.",
        "Then it moves.",
        "It gets taught, translated, questioned, combined, corrected, adapted and passed on.",
        "Sometimes it crosses a country. Sometimes a language. Sometimes only one desk.",
        "And when it returns, it should return richer than it left.",
        "LearnGraph gives that movement a structure: knowledge can connect, grow, branch and become useful somewhere else.",
      ],
    },
    {
      type: "prose",
      kicker: "Information is not direction",
      truthStatus: "principle",
      // The final two paragraphs ("A pile…" and "LearnGraph is built…") both
      // carry conclusion weight — conclusionFrom marks where that treatment begins.
      conclusionFrom: 3,
      paragraphs: [
        "The internet already gave us more material than any learner could finish in a lifetime.",
        "That was not the end of the problem.",
        "A thousand resources still leave a learner without direction: where to start, what connects, what is already known, and what comes next.",
        "A pile of information is not a path through it.",
        "LearnGraph is built to make that path visible.",
      ],
    },
  ],
} as const satisfies NodeContent;
