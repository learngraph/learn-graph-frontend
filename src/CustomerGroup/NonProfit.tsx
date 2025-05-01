import { FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  ChallengeBlock,
  ChallengesSection,
  HeroSection,
  Insight,
  InsightsSection,
  SolutionBlock,
  SolutionsSection,
} from "@src/shared/Components";

// --- Components ---

// Main component

export const NonProfit: FC = () => {
  //inside cause translation hook can"t be called outside
  const { t } = useTranslation();
  const navigate = useNavigate();
  // --- Data Definitions ---
  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "🧑‍🏫👥", // High teacher-student ratio
      headline: t("nonprofits.challenge1.headline"),
      text: t("nonprofits.challenge1.text"),
    },
    {
      icon: "📴", // No internet, no access
      headline: t("nonprofits.challenge2.headline"),
      text: t("nonprofits.challenge2.text"),
    },
    {
      icon: "😓", // Volunteer burnout
      headline: t("nonprofits.challenge3.headline"),
      text: t("nonprofits.challenge3.text"),
    },
    {
      icon: "📏", // No way to measure impact
      headline: t("nonprofits.challenge4.headline"),
      text: t("nonprofits.challenge4.text"),
    },
  ];

  const researchInsights: Insight[] = [
    {
      id: 1,
      title: t("nonprofits.insight1.title"),
      description: t("nonprofits.insight1.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention?utm_source=chatgpt.com",
    },
    {
      id: 2,
      title: t("nonprofits.insight2.title"),
      description: t("nonprofits.insight2.description"),
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
    },
    {
      id: 3,
      title: t("nonprofits.insight3.title"),
      description: t("nonprofits.insight3.description"),
      link: "https://vorecol.com/blogs/blog-the-impact-of-aienhanced-learning-analytics-on-student-retention-and-engagement-metrics-188783",
    },
    {
      id: 4,
      title: t("nonprofits.insight4.title"),
      description: t("nonprofits.insight4.description"),
      link: "https://pubmed.ncbi.nlm.nih.gov/24821756",
    },
  ];

  const solutionBlocks: SolutionBlock[] = [
    {
      target: t("nonprofits.solution1.target"),
      headline: t("nonprofits.solution1.headline"),
      imageUrl: "/nonp.png",
      text: t("nonprofits.solution1.text"),
      keywords: (t("nonprofits.solution1.keywords", { returnObjects: true }) ||
        []) as string[],
    },
    {
      target: t("nonprofits.solution2.target"),
      headline: t("nonprofits.solution2.headline"),
      imageUrl: "/nonp3.png",
      text: t("nonprofits.solution2.text"),
      keywords: (t("nonprofits.solution2.keywords", { returnObjects: true }) ||
        []) as string[],
      extraClass: "object-top",
    },
    {
      target: t("nonprofits.solution3.target"),
      headline: t("nonprofits.solution3.headline"),
      imageUrl: "/institute2-min.png",
      text: t("nonprofits.solution3.text"),
      keywords: (t("nonprofits.solution3.keywords", { returnObjects: true }) ||
        []) as string[],
    },
  ];

  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <HeroSection
              headline={t("nonprofits.heroHeadline")}
              text={t("nonprofits.heroText")}
              imageUrl="/nonp2.png"
              imageAlt={t("nonprofits.heroImageAlt")}
            />

            {/* Challenges Section */}
            <ChallengesSection challengeBlocks={challengeBlocks} />

            {/* Insights Section */}
            <InsightsSection
              title={t("nonprofits.insightsTitle")}
              insights={researchInsights}
              summary={t("nonprofits.insightsSummary")}
            />

            {/* Solutions Section */}

            <SolutionsSection
              title={t("nonprofits.solutionsTitle")}
              solutionBlocks={solutionBlocks}
            />
            {/* CTA Section */}
            <section className="bg-gray-100 py-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">
                  {t("impact.cta.title")}
                </h2>
                <p className="text-lg mb-8">{t("impact.cta.subtitle")}</p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                  <button
                    type="button"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-colors"
                    onClick={() => navigate("/contact")}
                  >
                    {t("impact.cta.buttons.getInvolved")}
                  </button>
                  <button
                    type="button"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-2xl transition-colors"
                    onClick={() => navigate("/contact")}
                  >
                    {t("impact.cta.buttons.investInImpact")}
                  </button>
                  <a
                    href="https://drive.google.com/file/d/1_ZhbhKRd9Uh6hH1MC7ZTF5rPLxvTz4bB/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-2xl transition-colors hover:bg-blue-600 hover:text-white"
                  >
                    {t("impact.cta.buttons.readWhitepaper")}
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-6">
                  {t("impact.cta.footer")}
                </p>
              </div>
            </section>
          </>
        }
      />
    </div>
  );
};
