import { useNavigate } from "react-router-dom";
import { NavigationWithContent } from "./Navigation";
import { useTranslation } from "react-i18next";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import USPCTASection, { USPFeatureCard } from "./LandingPage/CTABlock";
import InfoBlocks from "./LandingPage/InfoBlocks";
import YoutubeVideo from "./LandingPage/Video";

export const LandingPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Define the USP CTA blocks inline with their respective onClick handlers.
  const uspCtaBlocks: USPFeatureCard[] = [
    {
      symbol: "🎓",
      headline: t("LandingPage.uspBlocks.reduceDropoutHeadline"),
      text: t("LandingPage.uspBlocks.reduceDropoutText"),
      cta: t("LandingPage.uspBlocks.reduceDropoutCTA"),
      onClick: () => navigate("/university"),
    },
    {
      symbol: "🧭",
      headline: t("LandingPage.uspBlocks.yourWayHeadline"),
      text: t("LandingPage.uspBlocks.yourWayText"),
      cta: t("LandingPage.uspBlocks.yourWayCTA"),
      onClick: () => navigate("/individual"),
    },
    {
      symbol: "💼",
      headline: t("LandingPage.uspBlocks.upskillHeadline"),
      text: t("LandingPage.uspBlocks.upskillText"),
      cta: t("LandingPage.uspBlocks.upskillCTA"),
      onClick: () => navigate("/institution"),
    },
    {
      symbol: "🌱",
      headline: t("LandingPage.uspBlocks.openSourceHeadline"),
      text: t("LandingPage.uspBlocks.openSourceText"),
      cta: t("LandingPage.uspBlocks.openSourceCTA"),
      onClick: () => navigate("/Nonprofit"),
    },
  ];

  const finalCTA: USPFeatureCard[] = [
    {
      symbol: "🚀",
      headline: t("LandingPage.uspBlocks.finalCTAHeadline"),
      text: t("LandingPage.uspBlocks.finalCTAText"),
      cta: t("LandingPage.uspBlocks.finalCTACTA"),
      onClick: () => navigate("/contact"),
    },
  ];

  const infoBlocks = [
    {
      target: t("LandingPage.infoBlocks.companiesTarget"),
      headline: t("LandingPage.infoBlocks.companiesHeadline"),
      imageUrl: "collaboration-hub.webp",
      keywords: t("LandingPage.infoBlocks.companiesKeywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("LandingPage.infoBlocks.independentTarget"),
      headline: t("LandingPage.infoBlocks.independentHeadline"),
      imageUrl: "/screenshot_learngraph.png",
      keywords: t("LandingPage.infoBlocks.independentKeywords", {
        returnObjects: true,
      }) as string[],
    },
    {
      target: t("LandingPage.infoBlocks.fundersTarget"),
      headline: t("LandingPage.infoBlocks.fundersHeadline"),
      imageUrl: "/rural-learning-map.webp",
      keywords: t("LandingPage.infoBlocks.fundersKeywords", {
        returnObjects: true,
      }) as string[],
    },
  ];
  return (
    <div className="bg-[linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url('/LGBG2.png')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent
        content={
          <>
            <Hero />
            <USPCTASection blocks={uspCtaBlocks} />
            <YoutubeVideo videoID="cHv1LGXfJRU" />
            <InfoBlocks headline={t("LandingPage.wcl")} blocks={infoBlocks} />
            <MissionStatement />
            <GetADemoCTA blocks={finalCTA} />
          </>
        }
      />
    </div>
  );
};

export const GetADemoCTA = ({ blocks }: { blocks: USPFeatureCard[] }) => {
  return (
    <section className="py-12 bg-blue-800/80 text-white text-center">
      <div className="container mx-auto px-4">
        <USPCTASection blocks={blocks} />
      </div>
    </section>
  );
};

export default LandingPage;

//const uspCtaBlocksUnused = [
//  // Foundation / Funders / NGOs
//  {
//    symbol: "💖",
//    headline: "Fund What the Future Needs.",
//    text: "LearnGraph blends AI, open access, and inner development to radically transform education from the inside out. We’re open-source, inclusive, and globally scalable.",
//    cta: "Support the Mission",
//    onClick: () => navigate("/support"),
//  },
//  {
//    symbol: "🛠️",
//    headline: "Build Human-Centered Systems at Scale.",
//    text: "LearnGraph bridges technology, inner development, and social cohesion — a rare trifecta for sustainable impact.",
//    cta: "Co-Design with Us",
//    onClick: () => navigate("/collaborate"),
//  },
//  // Educators / Mentors
//  {
//    symbol: "🧑‍🏫",
//    headline: "Anyone Can Be a Mentor. Really.",
//    text: "With built-in guidance and peer-coaching structures, even non-professionals—like community leaders, caregivers, or alumni—can support powerful learning.",
//    cta: "Become a Mentor",
//    onClick: () => navigate("/mentor"),
//  },
//  {
//    symbol: "📚",
//    headline: "Transform Your Classroom, Not Your Career.",
//    text: "Bring LearnGraph into your teaching without overhauling your syllabus. Support self-directed learners, reduce burnout, and increase engagement.",
//    cta: "Try It in Your Class",
//    onClick: () => navigate("/educators"),
//  },
//  // K-12 / Parents
//  {
//    symbol: "🧒",
//    headline: "Learning That Follows Curiosity.",
//    text: "Forget rigid curriculums. LearnGraph supports kids in exploring topics that matter to them, while still covering essentials through playful learning paths.",
//    cta: "Explore for Schools",
//    onClick: () => navigate("/k12"),
//  },
//  {
//    symbol: "🌍",
//    headline: "Education for Every Child, Everywhere.",
//    text: "No internet? No problem. LearnGraph is mobile-first, works offline, and includes local translations and community-based support.",
//    cta: "Bring It to Your Community",
//    onClick: () => navigate("/access"),
//  },
//  // Workforce / HR
//  {
//    symbol: "🧾",
//    headline: "From Degrees to Skills that Actually Matter.",
//    text: "Micro-credentials reflect real capabilities and growth, not just attendance. Help your team grow in ways that are measurable and meaningful.",
//    cta: "Add to Your HR Stack",
//    onClick: () => navigate("/microcredentials"),
//  },
//  // Policy Makers / Ministries
//  {
//    symbol: "🏛️",
//    headline: "Solve Dropout Without More Teachers.",
//    text: "AI-supported peer learning solves one of the biggest bottlenecks in education systems: human capacity.",
//    cta: "Request a Demo",
//    onClick: () => navigate("/government"),
//  },
//  {
//    symbol: "🗺️",
//    headline: "A System that Grows With Your People.",
//    text: "LearnGraph is modular, data-rich, and community-owned. It adapts to any region and evolves with your population.",
//    cta: "Talk Strategy",
//    onClick: () => navigate("/partnerships"),
//  },
//];

//const infoBlocksUnused = [
//  {
//    target: "Schools & Parents",
//    headline: "Kids don’t need pressure. They need purpose.",
//    imageUrl: "kids-learning.png",
//    keywords: [
//      "curiosity",
//      "empathy",
//      "flexibility",
//      "purpose",
//      "inner development",
//      "community",
//      "exploration",
//      "engagement",
//    ],
//  },
//  {
//    target: "Policy Makers & Ministries",
//    headline:
//      "Solve dropout, teacher shortages, and outdated systems — in one platform.",
//    imageUrl: "/rural-minister-in-there-top.png",
//    keywords: [
//      "scalable",
//      "cost-effective",
//      "low-infrastructure",
//      "national rollout",
//      "AI-enabled",
//      "future-proof",
//      "education equity",
//      "impact",
//    ],
//  },
//  {
//    target: "Universities & Educators",
//    headline:
//      "Finally, a system that supports every learner — without burning out faculty.",
//    imageUrl: "/students-learning.png", // replace with your actual asset path
//    keywords: [
//      "adaptive learning",
//      "dropout reduction",
//      "scalable pedagogy",
//      "AI guidance",
//      "emotional safety",
//      "micro-credentials",
//      "learning analytics",
//    ],
//  },
//];
