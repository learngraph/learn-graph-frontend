// TODO(skep): translate this file!
import { Box, Container } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import Footer from "./LandingPage/Footer";
import PersonalizedExperience from "./LandingPage/Choices";
import USPCTASection from "./LandingPage/CTABlock";

export const LandingPage = () => {
  const uspCtaBlocks = [
    // HEI
    {
      symbol: "🎓",
      headline: "Reduce Dropout. Boost Engagement.",
      text: "LearnGraph helps your students stay on track with personalized learning paths, peer coaching, and emotional reflection — all built into a platform that works alongside your existing systems.",
      cta: "Book a Pilot",
      onClick: () => window.location.href = "/contact?type=hei"
    },
    // Individual Learner
    {
      symbol: "🧭",
      headline: "Your Education, Your Way.",
      text: "Tired of one-size-fits-all learning? LearnGraph shows you exactly where you are, where you want to go, and how to get there — with smart guidance, real resources, and peer support.",
      cta: "Start for Free",
      onClick: () => window.location.href = "/join"
    },
    // Foundation / Funder
    {
      symbol: "💖",
      headline: "Fund What the Future Needs.",
      text: "LearnGraph blends AI, open access, and inner development to radically transform education from the inside out. We’re open-source, inclusive, and globally scalable.",
      cta: "Support the Mission",
      onClick: () => window.location.href = "/support"
    },
    // Educators / Mentors
    {
      symbol: "🧑‍🏫",
      headline: "Anyone Can Be a Mentor. Really.",
      text: "With built-in guidance and peer-coaching structures, even non-professionals—like community leaders, caregivers, or alumni—can support powerful learning.",
      cta: "Become a Mentor",
      onClick: () => window.location.href = "/mentor"
    },
    {
      symbol: "📚",
      headline: "Transform Your Classroom, Not Your Career.",
      text: "Bring LearnGraph into your teaching without overhauling your syllabus. Support self-directed learners, reduce burnout, and increase engagement.",
      cta: "Try It in Your Class",
      onClick: () => window.location.href = "/educators"
    },
    // K-12 / Parents
    {
      symbol: "🧒",
      headline: "Learning That Follows Curiosity.",
      text: "Forget rigid curriculums. LearnGraph supports kids in exploring topics that matter to them, while still covering essentials through playful learning paths.",
      cta: "Explore for Schools",
      onClick: () => window.location.href = "/k12"
    },
    {
      symbol: "🌍",
      headline: "Education for Every Child, Everywhere.",
      text: "No internet? No problem. LearnGraph is mobile-first, works offline, and includes Bengali translations and community-based support.",
      cta: "Bring It to Your Community",
      onClick: () => window.location.href = "/access"
    },
    // Workforce / HR
    {
      symbol: "💼",
      headline: "Upskill Without the Overwhelm.",
      text: "Whether it’s soft skills or digital tools, LearnGraph guides adult learners step-by-step with peer support and real-world relevance.",
      cta: "Use for Training",
      onClick: () => window.location.href = "/upskill"
    },
    {
      symbol: "🧾",
      headline: "From Degrees to Skills that Actually Matter.",
      text: "Micro-credentials reflect real capabilities and growth, not just attendance. Help your team grow in ways that are measurable and meaningful.",
      cta: "Add to Your HR Stack",
      onClick: () => window.location.href = "/microcredentials"
    },
    // Policy Makers / Ministries
    {
      symbol: "🏛️",
      headline: "Solve Dropout Without More Teachers.",
      text: "AI-supported peer learning solves one of the biggest bottlenecks in education systems: human capacity.",
      cta: "Request a Demo",
      onClick: () => window.location.href = "/government"
    },
    {
      symbol: "🗺️",
      headline: "A System that Grows With Your People.",
      text: "LearnGraph is modular, data-rich, and community-owned. It adapts to any region and evolves with your population.",
      cta: "Talk Strategy",
      onClick: () => window.location.href = "/partnerships"
    },
    // Funders / NGOs
    {
      symbol: "🛠️",
      headline: "Build Human-Centered Systems at Scale.",
      text: "LearnGraph bridges technology, inner development, and social cohesion — a rare trifecta for sustainable impact.",
      cta: "Co-Design with Us",
      onClick: () => window.location.href = "/collaborate"
    },
    {
      symbol: "🌱",
      headline: "Open-Source, Mission-First, Impact-Obsessed.",
      text: "We don’t chase profit. We chase purpose. Your support goes directly into scaling impact across the Global South.",
      cta: "Become a Partner",
      onClick: () => window.location.href = "/support"
    }
  ];

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/LGBG2.png)`, // Overlay + Image
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Keeps the background fixed during scroll
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures the background covers the viewport
      }}
    >
      <NavigationWithContent
        alwaysDisplayNavDrawer={true}
        content={
          <Box
            component="main"
            sx={{
              display: "flex",
              margin: "auto",
              flexDirection: "column",
              padding: "0px 0px",
            }}
          >
            <Hero />
            <USPCTASection blocks={uspCtaBlocks} />
            <PersonalizedExperience />
            <Box
              id="main-page-content"
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-10px",
                  }}
                >
                  <MissionStatement />
                </Box>
              </Container>
            </Box>
          </Box>
        }
      />
      <Footer />
    </Box>
  );
};
