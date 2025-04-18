import { FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import { useTranslation } from "react-i18next";
import {
  ChallengeBlock,
  ChallengesSection,
  HeroSection,
  Insight,
  CTA,
  CTASection,
  InsightsSection,
  SolutionBlock,
  SolutionsSection,
} from "@src/shared/Components";

export const Institutions: FC = () => {
  //inside cause translation hook can"t be called outside
  const { t } = useTranslation();
  // --- Data Definitions ---
  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "📦", // One-size-fits-all training
      headline: t("institutions.challenge1.headline"),
      text: t("institutions.challenge1.text"),
    },
    {
      icon: "📉", // Low engagement, high dropout
      headline: t("institututions.challenge2.headline"),
      text: t("institutions.challenge2.text"),
    },
    {
      icon: "📊", // Hard to track ROI
      headline: t("institutions.challenge3.headline"),
      text: t("institutions.challenge3.text"),
    },
    {
      icon: "⚙️", // Too much setup, not enough value
      headline: t("institutions.challenge4.headline"),
      text: t("institutions.challenge4.text"),
    },
  ];

  const researchInsights: Insight[] = [
    {
      id: 1,
      title: t("institutions.insight1.title"),
      description: t("institutions.insight1.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention?utm_source=chatgpt.com",
    },
    {
      id: 2,
      title: t("institutions.insight2.title"),
      description: t("institutions.insight2.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
    },
    {
      id: 3,
      title: t("institutions.insight3.title"),
      description: t("institutions.insight3.description"),
      link: "https://vorecol.com/blogs/blog-the-impact-of-aienhanced-learning-analytics-on-student-retention-and-engagement-metrics-188783",
    },
    {
      id: 4,
      title: t("institutions.insight4.title"),
      description: t("institutions.insight4.description"),
      link: "https://pubmed.ncbi.nlm.nih.gov/24821756",
    },
  ];

  const solutionBlocks: SolutionBlock[] = [
    {
      target: t("institutions.solution1.target"),
      headline: t("institutions.solution1.headline"),
      imageUrl: "/institute4-min.png",
      text: t("institutions.solution1.text"),
      keywords: t("institutions.solution1.keywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("institutions.solution2.target"),
      headline: t("institutions.solution2.headline"),
      imageUrl: "/intitute1-min.png",
      text: t("institutions.solution2.text"),
      keywords: t("institutions.solution2.keywords", {
        returnObjects: true,
      }) as string[],
      extraClass: "object-top",
    },
    {
      target: t("institutions.solution3.target"),
      headline: t("institutions.solution3.headline"),
      imageUrl: "/institute2-min.png",
      text: t("institutions.solution3.text"),
      keywords: t("institutions.solution3.keywords", {
        returnObjects: true,
      }) as string[],
    },
  ];

  const ctaBlocks: CTA[] = [
    {
      symbol: "🚀",
      headline: t("institutions.cta.headline"),
      text: t("institutions.cta.text"),
      cta: t("institutions.cta.cta"),
      onClick: () => (window.location.href = "/contact"),
    },
  ];

  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <HeroSection
              headline={t("institutions.heroHeadline")}
              text={t("institutions.heroText")}
              imageUrl="/institute3-min.png"
              imageAlt={t("institutions.heroImageAlt")}
            />

            {/* Challenges Section */}
            <ChallengesSection challengeBlocks={challengeBlocks} />

            {/* Insights Section */}
            <InsightsSection
              title={t("institutions.insightsTitle")}
              insights={researchInsights}
              summary={t("institutions.insightsSummary")}
            />

            {/* Solutions Section */}

            <SolutionsSection
              title={t("institutions.solutionsTitle")}
              solutionBlocks={solutionBlocks}
            />

            {/* CTA Section */}
            <CTASection ctaBlocks={ctaBlocks} />
          </>
        }
      />
    </div>
  );
};
