import { FC } from "react";
import USPCTASectionWithIcons from "@src/LandingPage/CTABlock2";
import {
  ChallengeBlock,
  ChallengesSection,
  HeroSection,
  Hotspot,
  HotspotImageOverlay,
  Insight,
  InsightsSection,
  SolutionBlock,
  SolutionsSection,
} from "@src/shared/Components";
import { useI18n } from "../i18n/useI18nStub";

// Main component

export const Individuals: FC = () => {
  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <IndividualsContent />
    </div>
  );
};

export const IndividualsContent: FC = () => {
  const { t } = useI18n();

  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "📦",
      headline: t("individual.challenge1.headline"),
      text: t("individual.challenge1.text"),
    },
    {
      icon: "😩",
      headline: t("individual.challenge2.headline"),
      text: t("individual.challenge2.text"),
    },
    {
      icon: "📚",
      headline: t("individual.challenge3.headline"),
      text: t("individual.challenge3.text"),
    },
    {
      icon: "🧍",
      headline: t("individual.challenge4.headline"),
      text: t("individual.challenge4.text"),
    },
  ];

  const researchInsights: Insight[] = [
    {
      id: 1,
      title: t("individual.insight1.title"),
      description: t("individual.insight1.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention?utm_source=chatgpt.com",
    },
    {
      id: 2,
      title: t("individual.insight2.title"),
      description: t("individual.insight2.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
    },
    {
      id: 3,
      title: t("individual.insight3.title"),
      description: t("individual.insight3.description"),
      link: "https://vorecol.com/blogs/blog-the-impact-of-aienhanced-learning-analytics-on-student-retention-and-engagement-metrics-188783",
    },
    {
      id: 4,
      title: t("individual.insight4.title"),
      description: t("individual.insight4.description"),
      link: "https://pubmed.ncbi.nlm.nih.gov/24821756",
    },
  ];

  const solutionBlocks: SolutionBlock[] = [
    {
      target: t("individual.solution1.target"),
      headline: t("individual.solution1.headline"),
      imageUrl: "/individual1-min.png",
      text: t("individual.solution1.text"),
      keywords: [t("individual.solution1.keywords")],
    },
    {
      target: t("individual.solution2.target"),
      headline: t("individual.solution2.headline"),
      imageUrl: "/individual5-min.png",
      text: t("individual.solution2.text"),
      keywords: [t("individual.solution2.keywords")],
      extraClass: "object-top",
    },
    {
      target: t("individual.solution3.target"),
      headline: t("individual.solution3.headline"),
      imageUrl: "/individual4-min.png",
      text: t("individual.solution3.text"),
      keywords: [t("individual.solution3.keywords")],
    },
  ];

  const ctaBlocksWithIcons = [
    {
      symbol: "🚀",
      headline: t("individual.cta.headline"),
      text: t("individual.cta.text"),
    },
  ];

  return (
    <>
      <HeroSection
        headline={t("individual.heroHeadline")}
        text={t("individual.heroText")}
        imageUrl="/individual2-min.png"
        imageAlt={t("individual.heroImageAlt")}
      />
      <ChallengesSection challengeBlocks={challengeBlocks} />
      <InsightsSection
        title={t("individual.insightsTitle")}
        insights={researchInsights}
        summary={t("individual.insightsSummary")}
      />
      <LearningNavigatorIndividualLearnerSection />
      <SolutionsSection
        title={t("individual.solutionsTitle")}
        solutionBlocks={solutionBlocks}
      />
      <USPCTASectionWithIcons blocks={ctaBlocksWithIcons} />
    </>
  );
};

const LearningNavigatorIndividualLearnerSection: FC = () => {
  const { t } = useI18n();
  const hotspots: Hotspot[] = [
    {
      id: 1,
      label: t("individual.navigator.enterGoal"),
      top: "21%",
      left: "2.5%",
    },
    {
      id: 2,
      label: t("individual.navigator.findYourself"),
      top: "85%",
      right: "41%",
    },
    {
      id: 3,
      label: t("individual.navigator.guidanceEveryStep"),
      bottom: "20%",
      left: "27%",
    },
    {
      id: 4,
      label: t("individual.navigator.findPeers"),
      bottom: "25%",
      right: "10%",
    },
    {
      id: 5,
      label: t("individual.navigator.travelSpeed"),
      bottom: "64%",
      right: "5.5%",
    },
  ];

  return (
    <HotspotImageOverlay
      imageSrc="/screenshot-all-in-one.png"
      imageAlt={t("individual.navigator.imageAlt")}
      title={t("individual.learningNavigatorTitle")}
      hotspots={hotspots}
    />
  );
};
