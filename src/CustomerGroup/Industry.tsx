import { NavigationWithContent } from "@src/Navigation";
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col items-center text-center py-16 backdrop-blur-2xl mt-5">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Real Skills, Real Results — at Scale.
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        LearnGraph combines the personalization of consulting with the
        scalability of online learning — ensuring transfer, performance, and
        ROI.
      </p>
      {/* Placeholder for the market positioning image */}
      <img
        src="placeholder.jpg"
        alt="LearnGraph market positioning: between scalable online courses and personal consulting"
        className="w-full max-w-lg mb-8"
      />
      <button
        onClick={() => navigate("/contact")}
        className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700"
      >
        Start Your Pilot Journey
      </button>
    </section>
  );
};

const TrustSection: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <p className="text-lg text-gray-700 mb-4 font-medium">
          Trusted by leading universities, industry leaders, and European
          innovation programs.
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

const USPSection: React.FC = () => {
  const features = [
    {
      title: "Personalized Learning Journeys",
      description:
        "Visual, GPS-like pathways guide each employee toward acquiring the skills they need for job success.",
    },
    {
      title: "Collaborative & Project-Based Learning",
      description:
        "Active team-based projects ensure real-world skill transfer into your everyday work processes.",
    },
    {
      title: "Performance Dashboard",
      description:
        "Real-time insights on employee progress, technology adoption, retention, and collective achievements.",
    },
  ];

  return (
    <section className="mb-14">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 backdrop-blur-2xl w-full py-10">
          What Sets Us Apart
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="border rounded-lg p-6 shadow-sm backdrop-blur-2xl bg-black/10"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PilotSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Close Collaboration, Zero Setup Effort
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          Our pilot program delivers a tailor-made experience over 6–8 weeks.
          Experience seamless integration with minimal effort and immediate
          skill transfer.
        </p>
        {/* Placeholder timeline visual */}
        <img
          src="placeholder-timeline.jpg"
          alt="Pilot program timeline: 6-8 weeks"
          className="w-full max-w-md mx-auto mb-8"
        />
        <button
          onClick={() => navigate("/contact")}
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700"
        >
          Apply for a Pilot
        </button>
      </div>
    </section>
  );
};

const CaseStudySection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Case Study: Empowering Tech Adoption at Acme Manufacturing
        </h2>
        <div className="max-w-4xl mx-auto border rounded-lg p-8 shadow">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            The Challenge
          </h3>
          <p className="text-gray-600 mb-4">
            Acme Manufacturing struggled with low adoption of internal digital
            tools despite extensive training programs.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            The Solution
          </h3>
          <p className="text-gray-600 mb-4">
            They piloted LearnGraph, which provided personalized learning paths
            and project-based learning containers that integrated directly into
            employees’ daily routines.
          </p>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            The Outcome
          </h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>82% tool adoption across teams</li>
            <li>17% increase in team collaboration scores</li>
            <li>2× faster onboarding for new employees</li>
          </ul>
          <p className="text-gray-600 mt-4">
            Following the pilot, Acme Manufacturing extended LearnGraph
            deployment company-wide.
          </p>
        </div>
      </div>
    </section>
  );
};

export const IndustryPage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <TrustSection />
      <USPSection />
      <PilotSection />
      <CaseStudySection />
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
