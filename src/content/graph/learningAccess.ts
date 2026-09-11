import type { EditorialBrief } from "./types";

const platformCopySource = "Desktop/LG Website/NODE CONTENT/Platform";
const projectPresentation =
  "source-material/raw/Project Presentation - midi version/LG Project Presentation - ALL PAGES  - mid.docx";

export const learningAccessBriefs = [
  {
    nodeId: "learning-access-sovereignty",
    status: "draft",
    coreClaim:
      "A learner's position should remain granular and useful as their context changes.",
    tension:
      "Broad labels and course completion flatten uneven knowledge and strand it inside one programme.",
    intendedMemory:
      "Learning can outlive the course without averaging the learner into a score.",
    mustShow: [
      "Granular differences",
      "Changing goals and circumstances",
      "What persists today versus what remains direction",
      "What remains under the learner's control",
    ],
    availableMaterial: ["Learning Sovereignty editorial baseline"],
    avoid: [
      "Infrastructure-sovereignty claims",
      "Cross-institution portability presented without verification",
    ],
    sourceRefs: [
      `${platformCopySource}/Learning Sovereignty.docx`,
      projectPresentation,
    ],
  },
] as const satisfies readonly EditorialBrief[];
