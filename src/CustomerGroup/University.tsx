import { useState, FC } from "react";
import { NavigationWithContent } from "@src/Navigation";
import USPCTASection from "@src/LandingPage/CTABlock";

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

// --- Data Definitions ---
const challengeBlocks: ChallengeBlock[] = [
  {
    icon: "📉",
    headline: "Enhanced Retention",
    text: "Support students before subtle disengagement occurs by proactively addressing early warning signs. Optimize support to boost retention without casting blame.",
  },
  {
    icon: "🔗",
    headline: "Integrated Pathways",
    text: "Break down silos in your curriculum to connect interdisciplinary courses. Enable smoother transitions and enhanced academic mobility across departments.",
  },
  {
    icon: "📊",
    headline: "Data to Action",
    text: "Transform your existing data into actionable strategies. Convert insights into targeted interventions that support student success.",
  },
  {
    icon: "🌐",
    headline: "Seamless Interoperability",
    text: "Align your systems with European standards to create a unified ecosystem that recognizes learning achievements across borders.",
  },
];

const researchInsights: Insight[] = [
  {
    id: 1,
    title: "23% Graduation Increase",
    description:
      "Georgia State University used predictive analytics to target at-risk students, resulting in a 23% increase in graduation rates and a 5% decrease in the achievement gap.",
    link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention?utm_source=chatgpt.com",
  },
  {
    id: 2,
    title: "5% decreased achievement gap",
    description:
      "The University of Arizona's personalized interventions based on predictive analytics led to a 7% increase in retention rates and a 10% boost in graduation rates.",
    link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
  },
  {
    id: 3,
    title: "30% Retention Improvement",
    description:
      "Studies suggest that sophisticated learning analytics can improve student retention by up to 30%, demonstrating the power of technology in education.",
    link: "https://vorecol.com/blogs/blog-the-impact-of-aienhanced-learning-analytics-on-student-retention-and-engagement-metrics-188783",
  },
  {
    id: 4,
    title: "11% Reduced failure rates",
    description:
      "A meta-analysis shows active learning reduces failure rates from 32% to 21% and improves exam performance significantly, underscoring its benefits in STEM courses.",
    link: "https://pubmed.ncbi.nlm.nih.gov/24821756",
  },
];

const solutionBlocks: SolutionBlock[] = [
  {
    target: "Hybrid Learning Containers",
    headline: "Hybrid Learning Containers",
    imageUrl: "/learning-containers-static-w-plants.webp",
    keywords: [
      "Adaptive Spaces",
      "Digital & Physical Integration",
      "Interactive Learning",
      "Customizable Environments",
    ],
    text: "Our platform creates flexible, learner-centered spaces that blend digital and physical experiences. These containers can host interactive demos and multimedia content to support dynamic learning.",
  },
  {
    target: "Peer-Coaching & Mentorship",
    headline: "Peer-Coaching & Mentorship",
    imageUrl: "/coaching-circle-happy-faces.webp",
    keywords: [
      "Collaborative Learning",
      "Personalized Guidance",
      "Mentorship Networks",
      "Community Engagement",
    ],
    text: "We foster robust networks of peer coaches and mentors that provide personalized support. This community-based approach builds confidence and enhances academic outcomes.",
    extraClass: "object-top",
  },
  {
    target: "Interoperability & Open-Source",
    headline: "Interoperability & Open-Source Infrastructure",
    imageUrl: "/university-standards-mobility-innovation-seamless.webp",
    keywords: [
      "European Standards",
      "Seamless Integration",
      "Cross-Border Mobility",
      "Sustainable Innovation",
    ],
    text: "LearnGraph aligns with the European Learning Model (ELM) and ESCO Skills & Competencies, enabling seamless recognition of academic progress across institutions with a scalable, open-source framework.",
  },
];

const ctaBlocks: CTA[] = [
  {
    symbol: "🚀",
    headline: "Experience the Future of Education",
    text: "Discover how our innovative, data-driven platform transforms insights into actionable strategies that enhance student success and institutional growth.",
    cta: "Request a Demo",
    onClick: () => (window.location.href = "/contact"),
  },
];

// --- Components ---
// InsightStat component: Expands inline from a circle into a square on hover/tap, displaying additional text.
const InsightStat: FC<InsightStatProps> = ({ insight }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div
      className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 bg-blue-600 text-white ${
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
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};

// Main component
export const CGUniversity: FC = () => {
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            {/* Hero Section */}
            <section className="py-12 bg-gray-900/60 text-white text-center">
              <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                  Empower Your Institution with Data-Driven Insights
                </h1>
                <p className="text-xl mb-8">
                  Transform your educational ecosystem with personalized
                  analytics, hybrid learning solutions, and seamless
                  interoperability.
                </p>
                <img
                  src="/ai-ecosystem-for-edu.webp"
                  alt="Digital Ecosystem for Education"
                  className="mx-auto my-8 rounded-lg shadow-lg max-w-100"
                />
              </div>
            </section>

            {/* Challenges Section */}
            <section className="py-12 bg-white">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                  Institutional Challenges
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
                <h2 className="text-3xl font-bold text-center mb-8 bg-white/70 rounded-2xl">
                  Turning Insights into Action
                </h2>
                <div className="flex flex-wrap justify-center gap-8 mb-4 bg-white/70 rounded-2xl p-4">
                  {researchInsights.map((insight) => (
                    <InsightStat key={insight.id} insight={insight} />
                  ))}
                </div>
                <p className="text-center text-lg italic">
                  Collectively, these insights demonstrate that data-driven
                  interventions and active learning strategies can significantly
                  enhance student retention, reduce failure rates, and boost
                  graduation outcomes.
                </p>
              </div>
            </section>

            {/* Solutions Section */}
            <section className="py-12 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                  What LearnGraph Provides
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
            <section className="py-12 bg-blue-600 text-white text-center">
              <div className="container mx-auto px-4">
                <USPCTASection blocks={ctaBlocks} />
              </div>
            </section>
          </>
        }
      />
    </div>
  );
};
