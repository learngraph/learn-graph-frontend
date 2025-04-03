import { useState, FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import { GetADemoCTA } from "@src/LandingPage";
import { useTranslation } from "react-i18next";

// --- Type Declarations ---
interface ChallengeBlock {
  icon: string;
  headline: string;
  text: string;
}

interface Insight {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface SolutionBlock {
  target: string;
  headline: string;
  imageUrl: string;
  keywords: string[];
  text: string;
  extraClass?: string;
}

interface CTA {
  symbol: string;
  headline: string;
  text: string;
  cta: string;
  onClick: () => void;
}

interface InsightStatProps {
  insight: Insight;
}

// --- Components ---
// InsightStat component: Expands inline from a circle into a square on hover/tap, displaying additional text.
const InsightStat: FC<InsightStatProps> = ({ insight }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 bg-blue-700 text-white ${
        isExpanded ? "w-64 h-64 rounded-2xl p-4" : "w-50 h-50 rounded-full"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="flex flex-col items-center justify-center text-center h-full">
        <div
          className={`text-2xl font-bold transition-all duration-300 ${
            isExpanded ? "mb-2" : "mt-34"
          }`}
        >
          {insight.title}
        </div>
        <div
          className={`text-sm transition-opacity duration-300 ${
            isExpanded ? "opacity-100" : "opacity-0"
          }`}
        >
          <p>{insight.description}</p>
          <a
            href={insight.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline mt-2 block"
          >
            {t("nonprofits.lm")}
          </a>
        </div>
      </div>
    </div>
  );
};

// Main component

export const NonProfit: FC = () => {
  //inside cause translation hook can"t be called outside
  const { t } = useTranslation();
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
      keywords: t("nonprofits.solution1.keywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("nonprofits.solution2.target"),
      headline: t("nonprofits.solution2.headline"),
      imageUrl: "/nonp3.png",
      text: t("nonprofits.solution2.text"),
      keywords: t("nonprofits.solution2.keywords", {
        returnObjects: true,
      }) as string[],
      extraClass: "object-top",
    },
    {
      target: t("nonprofits.solution3.target"),
      headline: t("nonprofits.solution3.headline"),
      imageUrl: "/institute2-min.png",
      text: t("nonprofits.solution3.text"),
      keywords: t("nonprofits.solution3.keywords", {
        returnObjects: true,
      }) as string[],
    },
  ];

  const ctaBlocks: CTA[] = [
    {
      symbol: "🚀",
      headline: t("nonprofits.cta.headline"),
      text: t("nonprofits.cta.text"),
      cta: t("nonprofits.cta.cta"),
      onClick: () => (window.location.href = "/contact"),
    },
  ];

  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <section className="py-12 bg-gray-900/60 text-white text-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  {t("nonprofits.heroHeadline")}
                </h1>
                <p className="text-xl mb-8">{t("nonprofits.heroText")}</p>
                <img
                  src="/nonp2.png"
                  alt={t("nonprofits.heroImageAlt")}
                  className="mx-auto my-8 rounded-lg shadow-lg max-w-100"
                />
              </div>
            </section>

            {/* Challenges Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/85 rounded-2xl">
                  {t("nonprofits.challengesTitle")}
                </h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                  {challengeBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-6 rounded-lg shadow-md text-center"
                    >
                      <div className="text-4xl mb-4">{block.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {block.headline}
                      </h3>
                      <p>{block.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Insights Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/85 rounded-2xl">
                  {t("nonprofits.insightsTitle")}
                </h2>
                <div className="flex flex-wrap justify-center gap-8 mb-4 bg-white/85 rounded-2xl p-4">
                  {researchInsights.map((insight) => (
                    <InsightStat key={insight.id} insight={insight} />
                  ))}
                </div>
                <p className="text-center text-lg italic bg-white/85 rounded-2xl p-2">
                  {t("nonprofits.insightsSummary")}
                </p>
              </div>
            </section>

            {/* Solutions Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/85 rounded-2xl">
                  {t("nonprofits.solutionsTitle")}
                </h2>
                <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
                  {solutionBlocks.map((block, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <img
                        src={block.imageUrl}
                        alt={block.target}
                        className={`w-full h-90 object-cover mb-4 rounded ${block.extraClass}`}
                      />
                      <h3 className="text-xl font-semibold mb-2">
                        {block.headline}
                      </h3>
                      <p className="mb-4">{block.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {block.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <GetADemoCTA blocks={ctaBlocks} />
          </>
        }
      />
    </div>
  );
};
