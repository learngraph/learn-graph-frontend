import type { NodeContent } from "../types";
import { aboutContent } from "./about";
import { impactContent } from "./about/impact";
import { networkContent } from "./about/network";
import { originContent } from "./about/origin";
import { peopleContent } from "./about/people";
import { servicesWorkbenchContent } from "./collaborate/services";
import { learngraphContent } from "./learngraph";
import { learningAccessContent } from "./learning-access";
import { accessContent } from "./learning-access/access";
import { learningWithoutFrontiersContent } from "./learning-access/learning-without-frontiers";
import { sovereigntyContent } from "./learning-access/sovereignty";
import { platformContent } from "./platform";
import { inclusiveLearningContent } from "./platform/inclusive-learning";
import { modelContent } from "./platform/model";
import { usingLearnGraphContent } from "./platform/using-learngraph";

export const editorialContents = [
  learngraphContent,
  platformContent,
  usingLearnGraphContent,
  modelContent,
  inclusiveLearningContent,
  learningAccessContent,
  accessContent,
  sovereigntyContent,
  learningWithoutFrontiersContent,
  servicesWorkbenchContent,
  aboutContent,
  originContent,
  peopleContent,
  networkContent,
  impactContent,
] as const satisfies readonly NodeContent[];
