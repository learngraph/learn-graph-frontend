import type { TopicId } from "../../pages/graph/graphModel";
import { aboutContactArticle } from "./about/contact";
import { aboutNetworkArticle } from "./about/network";
import { aboutTeamArticle } from "./about/team";
import { aboutOriginArticle } from "./about/why-learngraph";
import { platformEvidenceArticle } from "./platform/evidence";
import { platformModelArticle } from "./platform/model";
import { platformPathsArticle } from "./platform/personal-paths";
import { platformSovereigntyArticle } from "./platform/sovereignty";
import { researchContributeArticle } from "./research/contribute";
import { researchInteroperabilityArticle } from "./research/interoperability";
import { researchOpenArticle } from "./research/open-core";
import { researchFieldsArticle } from "./research/questions";
import type { NodeArticle } from "./types";
import { workProductsArticle } from "./work/build-the-offer";
import { workClarityArticle } from "./work/find-the-constraint";
import { workAutomationArticle } from "./work/reduce-manual-load";
import { workTogetherArticle } from "./work/work-together";

export type { NodeArticle, NodeArticleAction } from "./types";

export const articleByTopicId: Record<TopicId, NodeArticle> = {
  "platform-model": platformModelArticle,
  "platform-paths": platformPathsArticle,
  "platform-evidence": platformEvidenceArticle,
  "platform-sovereignty": platformSovereigntyArticle,
  "work-clarity": workClarityArticle,
  "work-automation": workAutomationArticle,
  "work-products": workProductsArticle,
  "work-together": workTogetherArticle,
  "about-origin": aboutOriginArticle,
  "about-team": aboutTeamArticle,
  "about-network": aboutNetworkArticle,
  "about-contact": aboutContactArticle,
  "research-fields": researchFieldsArticle,
  "research-open": researchOpenArticle,
  "research-interoperability": researchInteroperabilityArticle,
  "research-contribute": researchContributeArticle,
};
