import { Trans, useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import { Handshake } from "@mui/icons-material";
import TeamSlider from "./MemberCard";
//import { useNavigate } from "react-router-dom";
//import { USPFeatureCard } from "./LandingPage/CTABlock";
import YoutubeVideo from "./LandingPage/Video";

//const WhatAreWeDoingThisFor: React.FC = () => {
//  const navigate = useNavigate();
//  const cards: USPFeatureCard[] = [
//    {
//      symbol: "🎓",
//      headline: "Personalized & Dynamic Learning",
//      text: "LearnGraph redefines education like a 'Google Maps for Education' by offering personalized learning journeys, reducing dropout rates, and bridging the gap between academic paths and real-world employment.",
//      cta: "Learn More About Education",
//      onClick: () => navigate("/contact"),
//    },
//    {
//      symbol: "🌍",
//      headline: "Lifelong Learning & Inclusion",
//      text: "Beyond the classroom, LearnGraph supports lifelong learning and workforce reintegration, empowering marginalized communities with adaptive, affordable education and community-driven growth.",
//      cta: "Explore Societal Benefits",
//      onClick: () => navigate("/contact"),
//    },
//    {
//      symbol: "🧘",
//      headline: "Whole-Person Education",
//      text: "Integrating mindful, human-centered practices with flexible, modular design, LearnGraph nurtures intellectual, emotional, and practical growth while respecting diverse cultures and learning traditions.",
//      cta: "Get in Touch",
//      onClick: () => navigate("/contact"),
//    },
//    {
//      symbol: "👾",
//      headline: "AI-Driven Knowledge Mapping",
//      text: "Leveraging an evolving ontology and advanced AI-driven clustering, LearnGraph creates interconnected skill graphs and automates quality assurance, linking to systems like OpenCreds and micro-credentials.",
//      cta: "See Tech Innovations",
//      onClick: () => navigate("/contact"),
//    },
//  ];
//  return (
//    <div className="mx-auto px-4 py-8">
//      <div className="flex flex-wrap justify-center gap-6 p-1">
//        {cards.map((card, index) => (
//          <div
//            key={index}
//            className="flex flex-col items-start p-6 border rounded-lg shadow hover:shadow-lg transition duration-200  backdrop-blur-2xl max-w-sm sm:w-[calc(50%-1.5rem)] lg:w-[calc(33%-1.5rem)] xl:w-[calc(25%-1.5rem)] hover:scale-105 bg-white/20"
//          >
//            <h3 className="mt-4 text-2xl font-bold text-white">
//              {card.symbol} {card.headline}
//            </h3>
//            <p className="mt-2 text-gray-200">{card.text}</p>
//          </div>
//        ))}
//      </div>
//    </div>
//  );
//};

const LongTermVision: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-8 max-w-prose">
      <div className="relative p-8 bg-gradient-to-r from-green-700 to-green-900 text-white rounded-2xl shadow-lg border-l-8 border-r-8 border-green-500">
        <h2 className="text-3xl font-bold mb-4">
          {t("about.longTermVision.header")}
        </h2>
        <div className="space-y-4">
          <p className="text-lg">
            <span className="font-semibold">
              {t("about.longTermVision.vision1.title")}
            </span>{" "}
            {t("about.longTermVision.vision1.description")}
          </p>
          <p className="text-lg">
            <span className="font-semibold">
              {t("about.longTermVision.vision2.title")}
            </span>{" "}
            {t("about.longTermVision.vision2.description")}
          </p>
          <p className="text-lg">
            <span className="font-semibold">
              {t("about.longTermVision.vision3.title")}
            </span>{" "}
            {t("about.longTermVision.vision3.description")}
          </p>
        </div>
        <blockquote className="mt-6 border-l-4 border-r-4 border-green-400 rounded-2xl pl-4 italic text-lg">
          {t("about.longTermVision.quote")}
        </blockquote>
      </div>
    </div>
  );
};

const SectionHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white/20 backdrop-blur-2xl rounded-2xl shadow-md w-full p-6 mb-15">
      {children}
    </div>
  );
};

const OriginStory = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex lg:flex-row flex-col xs:flex-row justify-center items-center my-10 mx-10 gap-6 px-4">
        <div className="flex-1 bg-black/50 p-6 rounded-xl backdrop-blur-md max-w-prose">
          <h1
            className="text-3xl font-bold text-white mb-4 max-w-prose"
            id="about"
          >
            {t("about.Storyh")}
          </h1>
          <p className="text-white text-justify font-semibold text-base max-w-prose">
            <Trans i18nKey="about.Storyp" />
          </p>
        </div>
        <div className="opacity-90 w-[80%] lg:w-[40%] aspect-video bg-no-repeat bg-cover bg-center rounded-2xl shadow-[0_0_12px_8px_rgba(156,204,252,0.7)] dark:shadow-[0_0_24px_12px_rgba(3,51,99,0.7)] bg-[url('/Inno.png')]"></div>
      </div>
    </>
  );
};

export const About = () => {
  return (
    <div>
      <NavigationWithContent
        content={
          <main
            className="min-h-screen flex flex-col bg-fixed bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/LGBG2.png)",
            }}
          >
            <div className="mt-18"></div>
            <OriginStory />
            <YoutubeVideo videoID="LMtT8bnv8cA" />
            {/*<WhatAreWeDoingThisFor />*/}
            <LongTermVision />
            <TeamSection />
            <JoinUsSection />
          </main>
        }
      />
    </div>
  );
};

const JoinUsSection = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center my-16 px-4">
      <SectionHeader>
        <h2
          className="text-3xl font-bold text-white text-center"
          id="travelgroup"
        >
          {t("about.headline-travel-group")}
        </h2>
      </SectionHeader>

      <div className="max-w-[550px] bg-gradient-to-b from-gray-300/40 to-gray-400/30 p-5 my-8 mx-auto border-t-4 border-blue-500 rounded-2xl text-center relative backdrop-blur-lg">
        <img
          src="team-placeholder.png"
          alt="Team Placeholder"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full object-cover border-4 border-white shadow-md"
        />

        <div className="mt-20">
          <a
            href="mailto:jobs@learngraph.org"
            className="inline-flex items-center justify-center"
          >
            <Handshake className="text-white scale-170 hover:scale-300" />
          </a>
          <p className="text-white italic mt-4 text-justify">
            <Trans
              i18nKey="about.team-placeholder-description"
              components={{
                discord: (
                  <a
                    href="https://discord.gg/DatEV4kNp6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  />
                ),
                email: (
                  <a href="mailto:jobs@learngraph.org" className="underline" />
                ),
              }}
            />
          </p>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  const { t } = useTranslation();
  return (
    <section className="flex flex-col items-center px-4">
      <SectionHeader>
        <h2
          className="text-3xl font-bold text-white text-center"
          id="travelgroup"
        >
          {t("about.Our-Team")}
        </h2>
        <p className="text-white text-center font-semibold">
          {t("about.Our-Team-text")}
        </p>
      </SectionHeader>

      <TeamSlider />
    </section>
  );
};
