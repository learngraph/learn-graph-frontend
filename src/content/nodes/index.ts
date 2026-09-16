import { aboutContactArticle } from "./about/contact";
import { aboutNetworkArticle } from "./about/network";
import { aboutTeamArticle } from "./about/team";
import { aboutOriginArticle } from "./about/why-learngraph";
import { platformEvidenceArticle } from "./platform/evidence";
import { platformModelArticle } from "./platform/model";
import { platformPathsArticle } from "./platform/personal-paths";
import { platformSovereigntyArticle } from "./platform/sovereignty";
import type { NodeArticle } from "./types";
import { workProductsArticle } from "./work/build-the-offer";
import { workClarityArticle } from "./work/find-the-constraint";
import { workAutomationArticle } from "./work/reduce-manual-load";
import { workTogetherArticle } from "./work/work-together";

export type { NodeArticle, NodeArticleAction } from "./types";

export type LegacyTopicId =
  | "platform-model"
  | "platform-paths"
  | "platform-evidence"
  | "platform-sovereignty"
  | "work-clarity"
  | "work-automation"
  | "work-products"
  | "work-together"
  | "about-origin"
  | "about-team"
  | "about-network"
  | "about-contact";

export const articleByTopicId: Record<LegacyTopicId, NodeArticle> = {
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
};
