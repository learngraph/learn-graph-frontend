import type { NodeArticle } from "../types";

export const workProductsArticle = {
  eyebrow: "Work with us · Product and service development",
  title: "Design, architecture, and validation need to move together.",
  lead: "We sharpen the problem, define a viable first version, and carry it from proposition into implementation.",
  body: [
    "A focused first release should create real user value without becoming a technical dead end.",
    "Interfaces, governance, and secure integration are treated as part of the product—not invisible work postponed until scale.",
  ],
  action: { label: "Bring us an idea", href: "mailto:contact@learngraph.org" },
} satisfies NodeArticle;
