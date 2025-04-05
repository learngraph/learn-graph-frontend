import { FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import { useTranslation } from "react-i18next";
import {
  ChallengeBlock,
  ChallengesSection,
  CTA,
  CTASection,
  HeroSection,
  Insight,
  InsightsSection,
  SolutionBlock,
  SolutionsSection,
} from "@src/shared/Components";
import { useNavigate } from "react-router-dom";

// --- Components ---

const CGUniversityContent: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // --- Data Definitions ---
  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "📉",
      headline: t("university.challenge1.headline"),
      text: t("university.challenge1.text"),
    },
    {
      icon: "🔗",
      headline: t("university.challenge2.headline"),
      text: t("university.challenge2.text"),
    },
    {
      icon: "📊",
      headline: t("university.challenge3.headline"),
      text: t("university.challenge3.text"),
    },
    {
      icon: "🌐",
      headline: t("university.challenge4.headline"),
      text: t("university.challenge4.text"),
    },
  ];

  const researchInsights: Insight[] = [
    {
      id: 1,
      title: t("university.insight1.title"),
      description: t("university.insight1.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention?utm_source=chatgpt.com",
    },
    {
      id: 2,
      title: t("university.insight2.title"),
      description: t("university.insight2.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
    },
    {
      id: 3,
      title: t("university.insight3.title"),
      description: t("university.insight3.description"),
      link: "https://vorecol.com/blogs/blog-the-impact-of-aienhanced-learning-analytics-on-student-retention-and-engagement-metrics-188783",
    },
    {
      id: 4,
      title: t("university.insight4.title"),
      description: t("university.insight4.description"),
      link: "https://pubmed.ncbi.nlm.nih.gov/24821756",
    },
  ];

  const solutionBlocks: SolutionBlock[] = [
    {
      target: t("university.solution1.target"),
      headline: t("university.solution1.headline"),
      imageUrl: "/learning-containers-static-w-plants.webp",
      text: t("university.solution1.text"),
      keywords: t("university.solution1.keywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("university.solution2.target"),
      headline: t("university.solution2.headline"),
      imageUrl: "/coaching-circle-happy-faces.webp",
      text: t("university.solution2.text"),
      keywords: t("university.solution2.keywords", {
        returnObjects: true,
      }) as string[],
      extraClass: "object-top",
    },
    {
      target: t("university.solution3.target"),
      headline: t("university.solution3.headline"),
      imageUrl: "/university-standards-mobility-innovation-seamless.webp",
      text: t("university.solution3.text"),
      keywords: t("university.solution3.keywords", {
        returnObjects: true,
      }) as string[],
    },
  ];

  const ctaBlocks: CTA[] = [
    {
      symbol: "🚀",
      headline: t("university.cta.headline"),
      text: t("university.cta.text"),
      cta: t("university.cta.cta"),
      onClick: () => navigate("/contact"),
    },
  ];

  return (
    <>
      <HeroSection
        headline={t("university.heroHeadline")}
        text={t("university.heroText")}
        imageUrl="/ai-ecosystem-for-edu.webp"
        imageAlt={t("university.heroImageAlt")}
      />
      <ChallengesSection challengeBlocks={challengeBlocks} />
      <InsightsSection
        title={t("university.insightsTitle")}
        insights={researchInsights}
        summary={t("university.insightsSummary")}
      />
      <SolutionsSection
        title={t("university.solutionsTitle")}
        solutionBlocks={solutionBlocks}
      />
      <CTASection ctaBlocks={ctaBlocks} />
    </>
  );
};

export const CGUniversity = () => {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      {/*<div className="bg-gradient-to-br from-gray-200 to-gray-100 min-h-screen">*/}
      <NavigationWithContent content={<CGUniversityContent />} />
    </div>
  );
};
