// TODO(skep): translate this file!
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import Footer from "./LandingPage/Footer";
import USPCTASection from "./LandingPage/CTABlock";
import InfoBlocks from "./LandingPage/InfoBlocks";
import YoutubeVideo from "./LandingPage/Video";

const uspCtaBlocksUnused = [
  // Foundation / Funders / NGOs
  {
    symbol: "💖",
    headline: "Fund What the Future Needs.",
    text: "LearnGraph blends AI, open access, and inner development to radically transform education from the inside out. We’re open-source, inclusive, and globally scalable.",
    cta: "Support the Mission",
    onClick: () => (window.location.href = "/support"),
  },
  {
    symbol: "🛠️",
    headline: "Build Human-Centered Systems at Scale.",
    text: "LearnGraph bridges technology, inner development, and social cohesion — a rare trifecta for sustainable impact.",
    cta: "Co-Design with Us",
    onClick: () => (window.location.href = "/collaborate"),
  },
  // Educators / Mentors
  {
    symbol: "🧑‍🏫",
    headline: "Anyone Can Be a Mentor. Really.",
    text: "With built-in guidance and peer-coaching structures, even non-professionals—like community leaders, caregivers, or alumni—can support powerful learning.",
    cta: "Become a Mentor",
    onClick: () => (window.location.href = "/mentor"),
  },
  {
    symbol: "📚",
    headline: "Transform Your Classroom, Not Your Career.",
    text: "Bring LearnGraph into your teaching without overhauling your syllabus. Support self-directed learners, reduce burnout, and increase engagement.",
    cta: "Try It in Your Class",
    onClick: () => (window.location.href = "/educators"),
  },
  // K-12 / Parents
  {
    symbol: "🧒",
    headline: "Learning That Follows Curiosity.",
    text: "Forget rigid curriculums. LearnGraph supports kids in exploring topics that matter to them, while still covering essentials through playful learning paths.",
    cta: "Explore for Schools",
    onClick: () => (window.location.href = "/k12"),
  },
  {
    symbol: "🌍",
    headline: "Education for Every Child, Everywhere.",
    text: "No internet? No problem. LearnGraph is mobile-first, works offline, and includes local translations and community-based support.",
    cta: "Bring It to Your Community",
    onClick: () => (window.location.href = "/access"),
  },
  // Workforce / HR
  {
    symbol: "🧾",
    headline: "From Degrees to Skills that Actually Matter.",
    text: "Micro-credentials reflect real capabilities and growth, not just attendance. Help your team grow in ways that are measurable and meaningful.",
    cta: "Add to Your HR Stack",
    onClick: () => (window.location.href = "/microcredentials"),
  },
  // Policy Makers / Ministries
  {
    symbol: "🏛️",
    headline: "Solve Dropout Without More Teachers.",
    text: "AI-supported peer learning solves one of the biggest bottlenecks in education systems: human capacity.",
    cta: "Request a Demo",
    onClick: () => (window.location.href = "/government"),
  },
  {
    symbol: "🗺️",
    headline: "A System that Grows With Your People.",
    text: "LearnGraph is modular, data-rich, and community-owned. It adapts to any region and evolves with your population.",
    cta: "Talk Strategy",
    onClick: () => (window.location.href = "/partnerships"),
  },
];

const infoBlocksUnused = [
  {
    target: "Schools & Parents",
    headline: "Kids don’t need pressure. They need purpose.",
    imageUrl: "kids-learning.png",
    keywords: [
      "curiosity",
      "empathy",
      "flexibility",
      "purpose",
      "inner development",
      "community",
      "exploration",
      "engagement",
    ],
  },
  {
    target: "Policy Makers & Ministries",
    headline:
      "Solve dropout, teacher shortages, and outdated systems — in one platform.",
    imageUrl: "/rural-minister-in-there-top.png",
    keywords: [
      "scalable",
      "cost-effective",
      "low-infrastructure",
      "national rollout",
      "AI-enabled",
      "future-proof",
      "education equity",
      "impact",
    ],
  },
  {
    target: "Universities & Educators",
    headline:
      "Finally, a system that supports every learner — without burning out faculty.",
    imageUrl: "/students-learning.png", // replace with your actual asset path
    keywords: [
      "adaptive learning",
      "dropout reduction",
      "scalable pedagogy",
      "AI guidance",
      "emotional safety",
      "micro-credentials",
      "learning analytics",
    ],
  },
];

const infoBlocks = [
  {
    target: "Companies & Adult Learners",
    headline: "Reskill, upskill, or just grow — without losing your mind.",
    imageUrl: "collaboration-hub.webp",
    keywords: [
      "upskilling",
      "resilience",
      "soft skills",
      "real-world impact",
      "career alignment",
      "flexible learning",
      "peer mentorship",
    ],
  },
  {
    target: "Independent Learners",
    headline: "No more guessing. You now have a GPS for your learning journey.",
    imageUrl: "/screenshot_learngraph.png",
    keywords: [
      "personalized",
      "goal-driven",
      "peer support",
      "learning map",
      "self-paced",
      "meaningful growth",
      "open access",
      "certification-ready",
    ],
  },
  {
    target: "Funders & Foundations",
    headline:
      "Invest in an education system that doesn’t just teach — it transforms.",
    imageUrl: "/rural-learning-map.webp",
    keywords: [
      "open-source",
      "inclusive",
      "transformational",
      "inner development",
      "tech-for-good",
      "high impact",
      "grassroots-led",
      "sustainable",
    ],
  },
];

export const LandingPage = () => {
  const uspCtaBlocks = [
    // HEI
    {
      symbol: "🎓",
      headline: "Reduce Dropout. Boost Engagement.",
      text: "LearnGraph helps your students stay on track with personalized learning paths, peer coaching, and emotional reflection — all built into a platform that works alongside your existing systems.",
      cta: "Learn More",
      onClick: () => (window.location.href = "/university"),
    },
    // Individual Learner
    {
      symbol: "🧭",
      headline: "Your Education, Your Way.",
      text: "Tired of one-size-fits-all learning? LearnGraph shows you exactly where you are, where you want to go, and how to get there — with smart guidance, real resources, and peer support.",
      cta: "Enroll in our Pilot",
      onClick: () => (window.location.href = "/join"),
    },
    // Workforce / HR
    {
      symbol: "💼",
      headline: "Upskill Without the Overwhelm.",
      text: "Whether it’s soft skills or digital tools, LearnGraph guides adult learners step-by-step with peer support and real-world relevance.",
      cta: "Use for Training",
      onClick: () => (window.location.href = "/upskill"),
    },
    // Funders / NGOs / Angels
    {
      symbol: "🌱",
      headline: "Open-Source, Mission-First, Impact-Obsessed.",
      text: "We don’t chase profit. We chase purpose. Your support goes directly into scaling impact across the Global South.",
      cta: "Become a Partner",
      onClick: () => (window.location.href = "/support"),
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
            <InfoBlocks headline="Why Choose LearnGraph." blocks={infoBlocks} />
            <MissionStatement />
          </>
        }
      />
      <Footer />
    </div>
  );
};
