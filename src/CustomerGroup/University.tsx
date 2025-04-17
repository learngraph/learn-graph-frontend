import { FC, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";

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
      link: "https://www.gofurther.com/blog/using-predictive-analytics-to-improve-student-retention",
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
      <LearningNavigatorSection />
      <SolutionsSection
        title={t("university.solutionsTitle")}
        solutionBlocks={solutionBlocks}
      />
      <PartnersSection />
      <CTASection ctaBlocks={ctaBlocks} />
    </>
  );
};

export const University = () => {
  // inside the bg-[...]
  // linear-gradient(rgba(0,0,0,0.9),rgba(0,0,0,0.1)),
  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      {/*<div className="bg-gradient-to-br from-gray-200 to-gray-100 min-h-screen">*/}
      <NavigationWithContent content={<CGUniversityContent />} />
    </div>
  );
};

//
// Partner Sections
//

export interface Partner {
  id: number;
  name: string;
  website: string;
  logoUrl: string;
  // Fields for success story display:
  problem: string;
  solution: string;
  learngraphRole: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "Universitatea Nationala de Stiinta si Tehnologie POLITEHNICA Bucuresti",
    website: "https://www.upb.ro",
    logoUrl: "/partner/logo-upb.jpeg",
    problem:
      "Traditional curricula and fragmented course structures cause student disengagement.",
    solution:
      "Implement adaptive, learner-centered approaches to align courses and enhance retention.",
    learngraphRole:
      "LearnGraph maps dynamic learning pathways that bridge traditional gaps.",
  },
  {
    id: 2,
    name: "CONFEDERACION SINDICAL INDEPENDIENTE - FETICO",
    website: "https://www.fetico.es",
    logoUrl: "/partner/logo-fetico.png",
    problem:
      "Traditional workforce training struggles to address modern labor challenges.",
    solution:
      "Implement peer-based learning structures integrated with career guidance.",
    learngraphRole:
      "LearnGraph supports lifelong learning by connecting skills with real-world opportunities.",
  },
  {
    id: 3,
    name: "Universitas Nebrissensis SA (Nebrija)",
    website: "https://www.nebrija.com",
    logoUrl: "/partner/logo-nebrija.png",
    problem:
      "Theoretical learning not fully aligned with industry demands, limiting student employability.",
    solution:
      "Adopt active collaboration with businesses and project-based approaches to link theory with practical application.",
    learngraphRole:
      "LearnGraph offers real-time skill mapping and dynamic analytics to boost employability and real-world readiness.",
  },
  {
    id: 4,
    name: "DUN LAOGHAIRE INSTITUTE OF ART, DESIGN & TECHNOLOGY (IADT)",
    website: "https://www.iadt.ie",
    logoUrl: "/partner/logo-iadt.png",
    problem:
      "Creative and cultural education often lack integration with fast-evolving digital technologies and interdisciplinary skill sets.",
    solution:
      "Embrace cross-disciplinary innovation and design-led methods to graduate future-ready students in the cultural-creative sector.",
    learngraphRole:
      "LearnGraph highlights creative-tech synergies and helps learners chart customized paths in design, media, and technology.",
  },
  {
    id: 5,
    name: "European Grants International Academy SRL (EGINA)",
    website: "https://www.egina.eu",
    logoUrl: "/partner/logo-egina.jpeg",
    problem:
      "Fragmented digital education and limited micro-credential frameworks restrict inclusive workforce development across Europe.",
    solution:
      "Co-develop ESCO-aligned e-learning programs, bridging skill gaps with recognized digital and green competencies.",
    learngraphRole:
      "LearnGraph provides AI-driven skill mapping and interoperable credentials for accessible, cross-border learner mobility.",
  },
];

const PartnersSection: FC = () => {
  const navigate = useNavigate();

  const handleClick = (partnerName: string): void => {
    navigate(`/university/success-story/${encodeURIComponent(partnerName)}`);
  };

  return (
    <section className="py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Meet our Partners
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="relative group border rounded-2xl bg-white drop-shadow-2xl p-4 cursor-pointer hover:shadow-lg transition-transform hover:scale-105 duration-500"
            onClick={() => handleClick(partner.name)}
            title="Read Success Story"
          >
            <img
              src={partner.logoUrl}
              alt={`${partner.name} logo`}
              className="mb-4 w-full h-32 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
            <div className="flex justify-between items-center">
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Website
              </a>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick(partner.name);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded group-hover:bg-blue-700"
              >
                Read Success Story
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export interface PartnerSuccessData {
  name: string;
  logoUrl: string;
  problem: string;
  solution: string;
  learngraphRole: string;
}

const partnerSuccessStories: PartnerSuccessData[] = [
  {
    name: "Universitatea Nationala de Stiinta si Tehnologie POLITEHNICA Bucuresti",
    logoUrl: "/partner/logo-upb.jpeg",
    problem:
      "UPB recognizes the challenge of a traditional, static curriculum that can limit personalized learning and affect student retention. Despite a strong record of over 80 EU-financed projects and a robust research portal, the university sees a need to dynamically align teaching methods with real-time data to support its diverse learner community.",
    solution:
      "UPB is actively rethinking its course delivery by planning an AI-powered adaptive learning platform. This initiative will integrate real-time KPI tracking and data analytics to continuously refine curricular content. Early projections suggest that this approach could yield a 15% boost in student engagement and a 10% reduction in dropout rates within the first academic term.",
    learngraphRole:
      "In the upcoming phase, LearnGraph is planned as a strategic partner to provide a comprehensive dashboard that visualizes course dependencies and tracks individual learner progress. UPB trusts LearnGraph’s advanced analytics to identify curricular gaps and facilitate timely adjustments, thereby enhancing the university’s adaptive learning ecosystem. ",
  },
  {
    name: "CONFEDERACION SINDICAL INDEPENDIENTE - FETICO",
    logoUrl: "/partner/logo-fetico.png",
    problem:
      "FETICO faces the modern challenge of updating traditional workforce training methods to meet the rapidly evolving demands of the digital age. With over 83,000 members across 500 companies, the union is eager to transform its approach to employee upskilling and career guidance.",
    solution:
      "FETICO is launching a comprehensive reformation of its training programs by integrating peer-to-peer learning and digital micro-credentialing. Preliminary planning indicates that the new model could improve job placement success and digital skill recognition by as much as 15–20% within a year, ensuring that their workforce remains agile and competitive.",
    learngraphRole:
      "LearnGraph is set to play a pivotal role by providing an AI-driven framework that maps individual competencies against European standards (such as ESCO and DigComp). FETICO trusts that with LearnGraph’s planned analytics and real-time feedback loops, its training interventions will become even more targeted and effective. ",
  },
  {
    name: "Universitas Nebrissensis SA (Nebrija)",
    logoUrl: "/partner/logo-nebrija.png",
    problem:
      "Nebrija is well known for its academic excellence, yet it faces the challenge of ensuring that theoretical knowledge seamlessly translates into practical, industry-ready skills. With its campuses spread across Spain and a network of over 14,000 internship opportunities, the institution is keen to further enhance employability outcomes.",
    solution:
      "The university is actively reforming its curriculum by embedding project-based learning and real-world case studies into its educational framework. By leveraging its specialized research groups, Nebrija is already making strides in this direction—with planned initiatives expected to raise graduate employability by approximately 12% and further stimulate international exchange programs.",
    learngraphRole:
      "LearnGraph is envisioned as a key enabler in this process. The platform will provide a dynamic mapping of knowledge dependencies and personalized learning trajectories, allowing Nebrija to continuously optimize its curriculum. The institution trusts LearnGraph’s data-driven insights to build upon its current successes and drive further innovation in teaching and learning. ",
  },
  {
    name: "DUN LAOGHAIRE INSTITUTE OF ART, DESIGN & TECHNOLOGY (IADT)",
    logoUrl: "/partner/logo-iadt.png",
    problem:
      "IADT has long been a leader in creative and cultural education, yet the integration of digital innovation with traditional creative disciplines remains a challenge. The institution is dedicated to boosting student outcomes through enhanced digital and interdisciplinary approaches while maintaining its cultural strengths.",
    solution:
      "IADT is proactively designing a digital transformation strategy that combines on-site learning containers, personalized mentorship programs, and continuous performance tracking. This planned initiative is anticipated to improve student engagement by nearly 18% and reduce dropout rates by about 12%, all while strengthening interdisciplinary collaboration and supporting gender equality initiatives.",
    learngraphRole:
      "The planned integration of LearnGraph is expected to further these efforts by mapping the intersections between digital tools and creative disciplines. IADT trusts that LearnGraph’s upcoming analytics will help visualize complex interdependencies and drive personalized, data-informed learning pathways that extend the institution’s current digital transformation journey. ",
  },
  {
    name: "European Grants International Academy SRL (EGINA)",
    logoUrl: "/partner/logo-egina.jpeg",
    problem:
      "EGInA has been at the forefront of vocational training and digital education but now faces the challenge of consistently aligning its skill development programs with rapidly changing industry standards. The institution acknowledges that ensuring universal recognition of digital competencies is crucial for workforce integration.",
    solution:
      "EGInA is reengineering its training modules by incorporating AR/VR-enhanced sessions and AI-driven assessments into its curriculum. Planned upgrades are expected to boost digital skills recognition by roughly 25% and improve alignment with industry benchmarks, thereby enhancing vocational outcomes and establishing a more robust micro-credentialing system.",
    learngraphRole:
      "LearnGraph is slated to support EGInA’s transformation by providing an AI-powered, interoperable framework for precise skill mapping and real-time performance monitoring. EGInA trusts that partnering with LearnGraph will build upon its existing achievements and set new standards for vocational training across Europe.",
  },
];

export const PartnerSuccessStory: FC = () => {
  const { partnerName } = useParams<{ partnerName: string }>();
  const navigate = useNavigate();

  const decodedName = decodeURIComponent(partnerName || "").toLowerCase();
  const story = partnerSuccessStories.find(
    (p) => p.name.toLowerCase() === decodedName,
  );

  if (!story) {
    return <div className="p-4">No success story found for this partner.</div>;
  }

  return (
    <div className="p-6 bg-[url('/LGBG-light.webp')]">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-white bg-blue-800 underline p-4 border rounded-2xl shadow-md hover:scale-105 hover:shadow-2xl backdrop-blur-md"
      >
        Back
      </button>
      <div className="border p-4 rounded-2xl shadow-2xl max-w-prose mx-auto backdrop-blur-2xl bg-white/20">
        <img
          src={story.logoUrl}
          alt={`${story.name} logo`}
          className="w-full h-40 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{story.name}</h1>
        <p className="mb-2">
          <strong>Problem:</strong> {story.problem}
        </p>
        <p className="mb-2">
          <strong>Solution:</strong> {story.solution}
        </p>
        <p className="mb-2">
          <strong>LearnGraph Role:</strong> {story.learngraphRole}
        </p>
      </div>
    </div>
  );
};

const LearningNavigatorSection: FC = () => {
  const { t } = useTranslation();
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Define your hotspots (percentages or px based on your design)
  const hotspots = [
    {
      id: 1,
      label: t("university.navigator.enterGoal"),
      top: "21%",
      left: "2.5%",
    },
    {
      id: 2,
      label: t("university.navigator.findYourself"),
      top: "90%",
      right: "40%",
    },
    {
      id: 3,
      label: t("university.navigator.guidanceEveryStep"),
      bottom: "20%",
      left: "27%",
    },
    {
      id: 4,
      label: t("university.navigator.findPeers"),
      bottom: "25%",
      right: "10%",
    },
    {
      id: 5,
      label: t("university.navigator.travelSpeed"),
      bottom: "54%",
      right: "5.5%",
    },
  ];

  return (
    <section className="py-12 px-4  backdrop-blur-xs bg-black/10">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
        {t("university.learningNavigatorTitle")}
      </h2>

      <div className="relative mx-auto max-w-4xl">
        {/* Screenshot */}
        <img
          src="/screenshot-all-in-one.png"
          alt={t(
            "university.navigator.imageAlt",
            "Learning Path Navigator screenshot",
          )}
          className="w-full rounded-2xl shadow-2xl shadow-black"
        />

        {/* Desktop arrows + labels */}
        <div className="hidden md:block">
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute flex items-center space-x-2"
              style={{
                top: spot.top,
                bottom: spot.bottom,
                left: spot.left,
                right: spot.right,
              }}
            >
              {/* Upward‑pointing arrow */}
              <svg
                className="w-6 h-6 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* This path draws an arrow pointing up */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19V5m0 0l-7 7m7-7l7 7"
                />
              </svg>

              {/* Label beneath the arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[200px] text-center backdrop-blur-2xl bg-blue-600 text-white text-lg px-3 py-1 rounded-2xl shadow-2xl">
                {spot.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile hotspots */}
        <div className="md:hidden">
          {hotspots.map((spot) => (
            <button
              key={spot.id}
              className="absolute bg-blue-600 text-xl border-2 border-black/20 text-white rounded-full w-10 h-10 flex items-center justify-center"
              style={{
                top: spot.top,
                bottom: spot.bottom,
                left: spot.left,
                right: spot.right,
              }}
              onClick={() => setActiveHotspot(spot.id)}
            >
              ?
            </button>
          ))}

          {/* Fullscreen modal */}
          {activeHotspot && (
            <div
              className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50"
              onClick={() => setActiveHotspot(null)}
            >
              <div className="bg-blue-600 text-white rounded-2xl overflow-hidden max-w-prose mx-auto">
                <div className="p-4">
                  <p className="text-lg font-semibold">
                    {hotspots.find((h) => h.id === activeHotspot)?.label}
                  </p>
                  <img
                    src="/navigator-screenshot.png"
                    alt=""
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
