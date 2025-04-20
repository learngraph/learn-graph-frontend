import { FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import USPCTASectionWithIcons from "@src/LandingPage/CTABlock2";
import { useTranslation } from "react-i18next";
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

// Main component

export const Individuals: FC = () => {
  //inside cause translation hook can"t be called outside
  const { t } = useTranslation();
  // --- Data Definitions ---
  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "📦", // Feels like a one-size-fits-all box
      headline: t("individual.challenge1.headline"), // "Too Generic"
      text: t("individual.challenge1.text"),
    },
    {
      icon: "😩", // Represents fatigue, low motivation
      headline: t("individual.challenge2.headline"), // "Hard to Stay Motivated"
      text: t("individual.challenge2.text"),
    },
    {
      icon: "📚", // Piles of info — classic overload symbol
      headline: t("individual.challenge3.headline"), // "Information Overload"
      text: t("individual.challenge3.text"),
    },
    {
      icon: "🧍", // One person standing alone
      headline: t("individual.challenge4.headline"), // "Learning Alone"
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
      keywords: t("individual.solution1.keywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("individual.solution2.target"),
      headline: t("individual.solution2.headline"),
      imageUrl: "/individual5-min.png",
      text: t("individual.solution2.text"),
      keywords: t("individual.solution2.keywords", {
        returnObjects: true,
      }) as string[],
      extraClass: "object-top",
    },
    {
      target: t("individual.solution3.target"),
      headline: t("individual.solution3.headline"),
      imageUrl: "/individual4-min.png",
      text: t("individual.solution3.text"),
      keywords: t("individual.solution3.keywords", {
        returnObjects: true,
      }) as string[],
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
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <HeroSection
              headline={t("individual.heroHeadline")}
              text={t("individual.heroText")}
              imageUrl="/individual2-min.png"
              imageAlt={t("individual.heroImageAlt")}
            />

            {/* Challenges Section */}
            <ChallengesSection challengeBlocks={challengeBlocks} />

            {/* Insights Section */}
            <InsightsSection
              title={t("individual.insightsTitle")}
              insights={researchInsights}
              summary={t("individual.insightsSummary")}
            />

            {/* Solutions Section */}
            <LearningNavigatorIndividualLearnerSection />
            <SolutionsSection
              title={t("individual.solutionsTitle")}
              solutionBlocks={solutionBlocks}
            />
            {/* CTA Section */}
            <USPCTASectionWithIcons blocks={ctaBlocksWithIcons} />
          </>
        }
      />
    </div>
  );
};

const LearningNavigatorIndividualLearnerSection: FC = () => {
  const { t } = useTranslation();
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
