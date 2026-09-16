import type { NodeContent } from "../types";
import { aboutContent } from "../../../nodes/about/content";
import { impactContent } from "../../../nodes/about/impact/content";
import { networkContent } from "../../../nodes/about/network/content";
import { originContent } from "../../../nodes/about/origin/content";
import { convictionsContent } from "../../../nodes/about/convictions/content";
import { peopleContent } from "../../../nodes/about/people/content";
import { servicesWorkbenchContent } from "../../../nodes/collaborate/services/content";
import { pilotLearnGraphContent } from "../../../nodes/collaborate/pilot/content";
import { implementationPartnershipsContent } from "../../../nodes/collaborate/implementation-partnerships/content";
import { learngraphContent } from "../../../nodes/content";
import { learningAccessContent } from "../../../nodes/learning-access/content";
import { accessContent } from "../../../nodes/learning-access/access/content";
import { learningWithoutFrontiersContent } from "../../../nodes/learning-access/learning-without-frontiers/content";
import { sovereigntyContent } from "../../../nodes/learning-access/sovereignty/content";
import { platformContent } from "../../../nodes/platform/content";
import { inclusiveLearningContent } from "../../../nodes/platform/inclusive-learning/content";
import { modelContent } from "../../../nodes/platform/model/content";
import { theGraphContent } from "../../../nodes/platform/the-graph/content";
import { usingLearnGraphContent } from "../../../nodes/platform/using-learngraph/content";

export const editorialContents = [
  learngraphContent,
  platformContent,
  usingLearnGraphContent,
  modelContent,
  theGraphContent,
  inclusiveLearningContent,
  learningAccessContent,
  accessContent,
  sovereigntyContent,
  learningWithoutFrontiersContent,
  servicesWorkbenchContent,
  pilotLearnGraphContent,
  implementationPartnershipsContent,
  aboutContent,
  originContent,
  convictionsContent,
  peopleContent,
  networkContent,
  impactContent,
] as const satisfies readonly NodeContent[];
