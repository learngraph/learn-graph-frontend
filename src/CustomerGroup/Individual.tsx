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
      className={`relative flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 bg-blue-700 text-white ${
        isExpanded ? "w-64 h-64 rounded-2xl p-4" : "w-50 h-50 rounded-full"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded((prev) => !prev)}
    >
      <div className="flex flex-col items-center justify-center text-center h-full w-full">
        <div className="text-lg font-bold transition-all duration-300">
          {insight.title}
        </div>
        <div
          className={`text-sm text-center transition-opacity duration-300 mt-2 ${
            isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <p>{insight.description}</p>
          <a
            href={insight.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-200 underline mt-2 block"
          >
            {t("institutions.lm")}
          </a>
        </div>
      </div>
    </div>
  );
};

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

  const ctaBlocks: CTA[] = [
    {
      symbol: "🚀",
      headline: t("individual.cta.headline"),
      text: t("individual.cta.text"),
      cta: t("individual.cta.cta"),
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
                  {t("individual.heroHeadline")}
                </h1>
                <p className="text-xl mb-8">{t("individual.heroText")}</p>
                <img
                  src="/individual2-min.png"
                  alt={t("individual.heroImageAlt")}
                  className="mx-auto my-8 rounded-lg shadow-lg max-w-100"
                />
              </div>
            </section>

            {/* Challenges Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/85 rounded-2xl">
                  {t("individual.challengesTitle")}
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
                  {t("individual.insightsTitle")}
                </h2>
                <div className="flex flex-wrap justify-center gap-8 mb-4 bg-white/85 rounded-2xl p-4">
                  {researchInsights.map((insight) => (
                    <InsightStat key={insight.id} insight={insight} />
                  ))}
                </div>
                <p className="text-center text-lg italic bg-white/85 rounded-2xl p-2">
                  {t("individual.insightsSummary")}
                </p>
              </div>
            </section>

            {/* Solutions Section */}
            <section className="py-12">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/85 rounded-2xl">
                  {t("individual.solutionsTitle")}
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
