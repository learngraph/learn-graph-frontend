import {
  ChallengeBlock,
  ChallengesSection,
  Hotspot,
  HotspotImageOverlay,
  Insight,
  InsightsSection,
  SolutionBlock,
  SolutionsSection,
} from "@src/shared/Components";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/useI18nStub";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <section className="flex flex-col items-center text-center py-16 mt-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t("industry.header")}
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        {t("industry.subheader")}
      </p>
      <img
        src="/institute3-min.png"
        alt="LearnGraph market positioning: between scalable online courses and personal consulting"
        className="w-full max-w-lg mb-8 rounded-2xl"
      />
      <button
        onClick={() => navigate("/contact")}
        className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700"
      >
        {t("industry.pilot.applynow")}
      </button>
    </section>
  );
};

const TrustSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg text-gray-700 mb-4 font-medium">
          {t("industry.trust.header")}
        </p>
        <div className="flex justify-center items-center space-x-8">
          <img src="/partner/logo-egina.jpeg" alt="EGINA Logo" className="h-12" />
          <img src="/partner/logo-fetico.png" alt="FETICO Logo" className="h-12" />
          <img src="/partner/logo-upb.jpeg" alt="UPB Logo" className="h-12" />
          <img src="/partner/logo-iadt.png" alt="IADT Logo" className="h-12" />
        </div>
      </div>
    </section>
  );
};

const PilotSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto lg:px-30 px-4">
        <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left">
          <div className="lg:w-1/2 lg:pr-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {t("industry.pilot.header")}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              {t("industry.pilot.description")}
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700"
            >
              {t("industry.pilot.applynow")}
            </button>
          </div>

          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="pilot-timeline.webp"
              alt={t("industry.pilot.imgAltTimeline")}
              className="w-full max-w-md mx-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const EnterpriseContent: React.FC = () => {
  const { t } = useI18n();
  const challengeBlocks: ChallengeBlock[] = [
    {
      icon: "⚠️",
      headline: t("industry.challenge1.headline"),
      text: t("industry.challenge1.text"),
    },
    {
      icon: "📉",
      headline: t("industry.challenge2.headline"),
      text: t("industry.challenge2.text"),
    },
    {
      icon: "🧠",
      headline: t("industry.challenge5.headline"),
      text: t("industry.challenge5.text"),
    },
    {
      icon: "🔍",
      headline: t("industry.challenge4.headline"),
      text: t("industry.challenge4.text"),
    },
  ];
  const solutionBlocks: SolutionBlock[] = [
    {
      target: t("institutions.solution1.target"),
      headline: t("institutions.solution1.headline"),
      imageUrl: "/institute4-min.png",
      text: t("institutions.solution1.text"),
      keywords: [t("institutions.solution1.keywords")],
    },
    {
      target: t("institutions.solution2.target"),
      headline: t("institutions.solution2.headline"),
      imageUrl: "/intitute1-min.png",
      text: t("institutions.solution2.text"),
      keywords: [t("institutions.solution2.keywords")],
      extraClass: "object-top",
    },
    {
      target: t("institutions.solution3.target"),
      headline: t("institutions.solution3.headline"),
      imageUrl: "/institute2-min.png",
      text: t("institutions.solution3.text"),
      keywords: [t("institutions.solution3.keywords")],
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
  return (
    <div>
      <HeroSection />
      <ChallengesSection challengeBlocks={challengeBlocks} />
      <InsightsSection
        title={t("institutions.insightsTitle")}
        insights={researchInsights}
        summary={t("institutions.insightsSummary")}
      />
      <LearningNavigatorEnterpriseSection />
      <SolutionsSection
        title={t("institutions.solutionsTitle")}
        solutionBlocks={solutionBlocks}
      />
      <TrustSection />
      <PilotSection />
    </div>
  );
};

export const Enterprise = () => {
  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <EnterpriseContent />
    </div>
  );
};

const LearningNavigatorEnterpriseSection: FC = () => {
  const { t } = useI18n();
  const hotspots: Hotspot[] = [
    {
      id: 1,
      label: t("industry.navigator.enterGoal"),
      top: "21%",
      left: "2.5%",
    },
    {
      id: 2,
      label: t("industry.navigator.findYourself"),
      top: "85%",
      right: "41%",
    },
    {
      id: 3,
      label: t("industry.navigator.guidanceEveryStep"),
      bottom: "20%",
      left: "27%",
    },
    {
      id: 4,
      label: t("industry.navigator.findPeers"),
      bottom: "25%",
      right: "10%",
    },
    {
      id: 5,
      label: t("industry.navigator.travelSpeed"),
      bottom: "64%",
      right: "5.5%",
    },
  ];

  return (
    <HotspotImageOverlay
      imageSrc="/screenshot-all-in-one.png"
      imageAlt={t("industry.navigator.imageAlt")}
      title={t("industry.learningNavigatorTitle")}
      hotspots={hotspots}
    />
  );
};


