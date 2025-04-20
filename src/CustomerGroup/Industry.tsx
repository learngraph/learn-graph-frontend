import { NavigationWithContent } from "@src/Navigation";
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
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center text-center py-16 mt-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {t("industry.header")}
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        {t("industry.subheader")}
      </p>
      {/* Placeholder for the market positioning image */}
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
  const { t } = useTranslation();
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg text-gray-700 mb-4 font-medium">
          {t("industry.trust.header")}
        </p>
        {/* Logos carousel can be a flex row of image placeholders */}
        <div className="flex justify-center items-center space-x-8">
          <img
            src="placeholder-logo1.jpg"
            alt="Partner 1 Logo"
            className="h-12"
          />
          <img
            src="placeholder-logo2.jpg"
            alt="Partner 2 Logo"
            className="h-12"
          />
          <img
            src="placeholder-logo3.jpg"
            alt="Partner 3 Logo"
            className="h-12"
          />
        </div>
      </div>
    </section>
  );
};

const PilotSection: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {t("industry.pilot.header")}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          {t("industry.pilot.description")}
        </p>
        {/* Placeholder timeline visual */}
        <img
          src="placeholder-timeline.jpg"
          alt={t("industry.pilot.imgAltTimeline")}
          className="w-full max-w-md mx-auto mb-8"
        />
        <button
          onClick={() => navigate("/contact")}
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700"
        >
          {t("industry.pilot.applynow")}
        </button>
      </div>
    </section>
  );
};

//const CaseStudySection: React.FC = () => {
//  return (
//    <section className="py-16 bg-white">
//      <div className="container mx-auto px-4">
//        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//          Case Study: Empowering Tech Adoption at Acme Manufacturing
//        </h2>
//        <div className="max-w-4xl mx-auto border rounded-lg p-8 shadow">
//          <h3 className="text-xl font-semibold mb-2 text-gray-800">
//            The Challenge
//          </h3>
//          <p className="text-gray-600 mb-4">
//            Acme Manufacturing struggled with low adoption of internal digital
//            tools despite extensive training programs.
//          </p>
//          <h3 className="text-xl font-semibold mb-2 text-gray-800">
//            The Solution
//          </h3>
//          <p className="text-gray-600 mb-4">
//            They piloted LearnGraph, which provided personalized learning paths
//            and project-based learning containers that integrated directly into
//            employees’ daily routines.
//          </p>
//          <h3 className="text-xl font-semibold mb-2 text-gray-800">
//            The Outcome
//          </h3>
//          <ul className="list-disc list-inside text-gray-600">
//            <li>82% tool adoption across teams</li>
//            <li>17% increase in team collaboration scores</li>
//            <li>2× faster onboarding for new employees</li>
//          </ul>
//          <p className="text-gray-600 mt-4">
//            Following the pilot, Acme Manufacturing extended LearnGraph
//            deployment company-wide.
//          </p>
//        </div>
//      </div>
//    </section>
//  );
//};

export const IndustryPage: React.FC = () => {
  const { t } = useTranslation();
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
      <LearningNavigatorIndustrySection />
      <SolutionsSection
        title={t("institutions.solutionsTitle")}
        solutionBlocks={solutionBlocks}
      />
      <TrustSection />
      <PilotSection />
      {/*<CaseStudySection />*/}
    </div>
  );
};

export const Industry = () => {
  return (
    <div className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <NavigationWithContent content={<IndustryPage />} />
    </div>
  );
};

const LearningNavigatorIndustrySection: FC = () => {
  const { t } = useTranslation();
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
