import type { NodeContent } from "../types";
import { aboutContent } from "./about";
import { accessContent } from "./about/access";
import { impactContent } from "./about/impact";
import { networkContent } from "./about/network";
import { originContent } from "./about/origin";
import { peopleContent } from "./about/people";
import { learngraphContent } from "./learngraph";
import { learningWithoutFrontiersContent } from "./collaborate/learning-without-frontiers";
import { platformContent } from "./platform";
import { inclusiveLearningContent } from "./platform/inclusive-learning";
import { modelContent } from "./platform/model";
import { sovereigntyContent } from "./platform/sovereignty";
import { usingLearnGraphContent } from "./platform/using-learngraph";

export const editorialContents = [
  learngraphContent,
  platformContent,
  usingLearnGraphContent,
  modelContent,
  sovereigntyContent,
  inclusiveLearningContent,
  learningWithoutFrontiersContent,
  aboutContent,
  originContent,
  peopleContent,
  accessContent,
  networkContent,
  impactContent,
] as const satisfies readonly NodeContent[];
