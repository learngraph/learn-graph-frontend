import { NavigationWithContent } from "@src/Navigation";
import React, { useEffect, useRef, useState } from "react";
import "@src/CustomerGroup/NationPolicy.css"; // Only global styles, not custom animations
import { CTA, CTASection } from "@src/shared/Components";
import { useNavigate } from "react-router-dom";
/*
Our concept centers on guiding the reader on an emotionally resonant, interactive journey that bridges personal aspiration with national transformation. The idea is to engage both individual learners and policy influencers by inviting them to pause and ponder at each step:

Emotional Engagement through Inquiry:
Each block begins with thought-provoking questions that ask the reader to reflect on big ideas—their own learning journey or the collective dreams of a nation. These questions are designed to stir curiosity and open a mental space for possibility.

Immersive Multimedia Experience:
After the questions, we introduce carefully selected media elements—whether evocative images, dynamic videos, or interactive animations—that visually symbolize and deepen the connection to the concept. For instance, a stunning wide-angle shot or a morphing infographic transforms abstract ideas into tangible, sensory experiences.

Vision-Crystallizing Affirmations:
Each block then crystallizes the explored theme in a bold, succinct statement that affirms the reader’s emerging vision. These statements are crafted to inspire confidence and create a "yes, yes, yes" effect, reinforcing that the journey from dream to strategy is not only necessary but achievable.

A Seamless Narrative Flow:
The journey is meticulously structured so that each step naturally builds on the previous one—from the spark of an idea to strategic planning, data-driven insight, and finally, to the empowerment of connections that pave the way for a better future. A subtle separator (like footsteps) visually cues the progression, symbolizing the steady steps in a transformative process.

The Ultimate Vision:
Overall, our emotional idea is to serve as a steward that transforms lofty aspirations into actionable change. While we provide the inspiration and the tools to see potential, the reader is encouraged to take these insights and craft their own roadmap for progress. In this journey, the platform becomes an enabler—a mirror reflecting what is possible when dreams are met with data, collaboration, and bold strategy.

In essence, we’re inviting the reader to embark on a transformative exploration—a journey where every question sparks curiosity, every visual element deepens the connection, and every affirming statement propels them forward, building a future where personal ambition and national progress are one and the same.
*/

// --- FadeInSection Component ---
// This component uses the IntersectionObserver API to apply a fade-in transition
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}
const FadeInSection: React.FC<FadeInProps> = ({
  children,
  className = "",
  duration = 3000,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    if (domRef.current) {
      observer.observe(domRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-opacity duration-${duration} ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
};

// --- Data Types ---
// Each journey step now uses a React element for full flexibility.
type JourneyStepData = {
  curiousHeadline: string;
  content: React.ReactNode;
};

// A simple Question component to set apart each question visually.
const Question: React.FC<{ texts: string[] }> = ({ texts }) => (
  <>
    {texts.map((text, index) => (
      <div
        key={index}
        className="my-2 p-2 rounded-2xl font-semibold text-white border-l-4 border-r-4 border-gray-500 backdrop-blur-2xl pl-4"
      >
        {text}
      </div>
    ))}
  </>
);

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}
const Image: React.FC<ImageProps> = ({ src, alt, className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-auto mt-2 rounded-2xl shadow-2xl ${className}`}
  />
);

interface VideoProps {
  src: string;
  className?: string;
  controls?: boolean;
}
const Video: React.FC<VideoProps> = ({
  src,
  className = "",
  controls = true,
}) => (
  <video
    src={src}
    controls={controls}
    className={`w-full h-auto mt-2 rounded-2xl shadow-2xl ${className}`}
  />
);

// Learner Journey Steps
const learnerJourneySteps: JourneyStepData[] = [
  {
    curiousHeadline: "What sparks your journey?",
    content: (
      <div>
        <Question texts={["What ignites your passion for learning?"]} />
        <Image
          src="/glowing-spark.png"
          alt="Glowing spark representing passion"
        />
        <p>
          <em>
            "Every learner's spark lights the way to personal discovery and
            transformation."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Mapping the Unseen",
    content: (
      <div>
        <Question
          texts={[
            "How can you navigate the vast landscape of knowledge to find your unique path?",
          ]}
        />
        <Image src="/trail.webp" alt="Interactive learning map" />
        <p>
          <em>
            "Chart your unique course and transform complexity into clarity."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Who Will Join You?",
    content: (
      <div>
        <Question
          texts={["How can strong connections amplify your learning journey?"]}
        />
        <Image
          src="woman-waiting-for-collab.png"
          alt="Waiting for collaboration"
        />
        <p>
          <em>
            "Collaboration turns individual potential into collective strength."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "From Vision to Reality?",
    content: (
      <div>
        <Question
          texts={[
            "What steps turn your dreams into achievements to be proud of?",
          ]}
        />
        <Image
          src="/cityscape-night-alone.png"
          alt="Bridging vision with action"
        />
        <p>
          <em>
            "Bridging dreams with action transforms aspirations into
            accomplishment."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "What Will You Receive?",
    content: (
      <div>
        <Question
          texts={[
            "How will deep connections and meaningful work enrich your journey?",
          ]}
        />
        <Image src="/happy-reunion-network.png" alt="Rewarding connections" />
        <p>
          <em>
            "Embrace the rewards of growth, connection, and personal
            fulfillment."
          </em>
        </p>
      </div>
    ),
  },
];

// Nation Journey Steps
const nationJourneySteps: JourneyStepData[] = [
  {
    curiousHeadline: "Can a nation dream?",
    content: (
      <div>
        <Question
          texts={[
            "Can the aspirations of millions be the first step toward transformative change?",
          ]}
        />
        <Image src="/crowd-against-sunset.png" alt="Nation dreaming" />
        <p>
          <em>
            "A nation that dares to dream ignites the spark of transformation,
            lighting the way for progress."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Turning Vision into Strategy.",
    content: (
      <div>
        <Question
          texts={[
            "How can we harness the collective dream and turn it into a roadmap for progress?",
            "What strategic steps are necessary to convert aspirations into real outcomes?",
          ]}
        />
        <Image src="/nation-blueprint.png" alt="Blueprint for strategy" />
        <p>
          <em>
            "By channeling collective vision into actionable strategies, we lay
            the foundation for a future built on purpose and precision."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Data that Drives Change",
    content: (
      <div>
        <Question
          texts={[
            "What truths lie hidden within numbers?",
            "Could data be the catalyst that unlocks boundless potential?",
          ]}
        />
        <Image src="/images/data-placeholder.gif" alt="Data driving change" />
        <p>
          <em>
            "Imagine you could track education success by measuring the
            learners' value in industry—a direct link from anonymized
            individuals to economic outcome as a success metric."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Empowering Through Connection.",
    content: (
      <div>
        <Question
          texts={[
            "What magic happens when diverse strengths unite?",
            "How do strong connections empower institutions and communities alike?",
          ]}
        />
        <Video src="/videos/connection-placeholder.mp4" />
        <p>
          <em>
            "Imagine for every problem you can find the source in data—as a
            location, a social environment, and interaction; dive into it,
            experience it, and engage all stakeholders for immediate
            improvement."
          </em>
        </p>
      </div>
    ),
  },
  {
    curiousHeadline: "Building a Brighter Tomorrow.",
    content: (
      <div>
        <Question
          texts={[
            "How will today's bold steps shape the future?",
            "What legacy do we want to leave for the next generation?",
          ]}
        />
        <Image src="/seeling-growing-tree.png" alt="Brighter tomorrow" />
        <p>
          <em>
            "Together, we transform dreams and data into a flourishing reality,
            forging a future where every step creates lasting impact."
          </em>
        </p>
      </div>
    ),
  },
];

// --- Journey Header Component ---
// Now with a refined backdrop using a gradient.
const JourneyHeader: React.FC = () => {
  return (
    <header className="py-12 text-center bg-gradient-to-r from-indigo-700 to-purple-700 backdrop-blur-md rounded-2xl shadow-lg mx-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-white p-6">
        Welcome to the LearnGraph Ecosystem
      </h1>
      <p className="mt-2 text-lg sm:text-xl text-white/80 p-6">
        Where individual dreams meet national progress—and every connection
        creates transformative impact.
      </p>
    </header>
  );
};

// --- Call to Adventure Component ---
// Wrapped in FadeInSection to fade in as it comes into view.
const CallToAdventure: React.FC = () => {
  return (
    <FadeInSection>
      <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Background image layer (optional if needed) */}
        <div className="absolute inset-0 bg-[url('/forest-path-daylight.webp')] bg-cover bg-center rounded-2xl my-12" />
        {/* Text container with enhanced contrast */}
        <div className="relative z-10 p-6 bg-black/70 backdrop-blur-md rounded-xl">
          <h2 className="text-4xl sm:text-5xl font-bold text-white">
            Where are the seeds of the future?
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl text-center">
            Discover the potential within.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
};

// --- Journey Step Component ---
// Always open – no toggle behavior.
const JourneyStep: React.FC<{ step: JourneyStepData; index: number }> = ({
  step,
  index,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold">{`${index + 1}. ${step.curiousHeadline}`}</h3>
      <div className="mt-2">{step.content}</div>
    </div>
  );
};

// --- Journey Separator Component ---
// A fun separator between steps wrapped in FadeInSection.
const JourneySeparator = ({ index }: { index: number }) => {
  const footstepsImages = [
    "footsteps-city-sunset.png",
    "footsteps-snow1.png",
    "footsteps-sand1.png",
    "footsteps-along-path.png",
  ];
  const footstepsImage = footstepsImages[index % footstepsImages.length];
  return (
    <FadeInSection>
      <div className="my-4 flex justify-center">
        <img
          src={`/${footstepsImage}`}
          alt="Separator footsteps"
          className="w-32 h-auto rounded-2xl"
        />
      </div>
    </FadeInSection>
  );
};

// --- Journey Section Component ---
// Renders a title and a list of JourneyStep components with separators.
const JourneySection: React.FC<{
  title: string;
  steps: JourneyStepData[];
}> = ({ title, steps }) => {
  return (
    <section className="p-6 bg-black/20 backdrop-blur-md rounded-2xl shadow-lg my-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        {title}
      </h2>
      {steps.map((step, index) => (
        <div key={index}>
          <JourneyStep step={step} index={index} />
          {index < steps.length - 1 && <JourneySeparator index={index} />}
        </div>
      ))}
    </section>
  );
};

// --- Mobile Toggle Buttons Component ---
// Visible only when the journey content is in view.
const MobileToggleButtons: React.FC<{
  selectedJourney: "learner" | "nation";
  setSelectedJourney: (journey: "learner" | "nation") => void;
}> = ({ selectedJourney, setSelectedJourney }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md py-2 flex justify-center gap-4 px-4">
      <button
        onClick={() => setSelectedJourney("learner")}
        className={`px-4 py-2 rounded shadow-md transition-colors duration-300 ${
          selectedJourney === "learner"
            ? "bg-indigo-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        A Learner's Journey
      </button>
      <button
        onClick={() => setSelectedJourney("nation")}
        className={`px-4 py-2 rounded shadow-md transition-colors duration-300 ${
          selectedJourney === "nation"
            ? "bg-indigo-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        A Nation's Journey
      </button>
    </div>
  );
};

// --- Unifying Vision Component ---
// Wrapped in FadeInSection for a plain fade in effect.
const UnifyingVision: React.FC = () => {
  const navigate = useNavigate();
  const ctaBlocks: CTA[] = [
    {
      symbol: "🌱",
      headline: "Take the first step now.",
      text: "For all the people you want to support.",
      cta: "Get in touch.",
      onClick: () => navigate("/contact"),
    },
  ];

  return (
    <FadeInSection duration={1500}>
      <div className="w-full py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Open Infrastructure for a Learning Planet
          </h2>
          <p className="text-lg sm:text-xl">
            Join us in creating an educational future where every intention
            sparks a journey, every path leads to real-world impact, and every
            connection builds a stronger nation.
            <p />
            Empowering nations to build inclusive, adaptive, and skill-driven
            education systems — from basic literacy to workforce readiness.
            Open, scalable, and aligned with the Sustainable Development Goals.
          </p>
        </div>
        <CTASection
          ctaBlocks={ctaBlocks}
          buttonColor="bg-gradient-to-r from-indigo-600 to-purple-600"
          bgColor="bg-white"
          textColor="text-black"
        />
      </div>
    </FadeInSection>
  );
};

// --- Main Journey Page Component ---
export const NationPolicyJourney: React.FC = () => {
  const useJourney = true;
  if (useJourney) {
    return <NavigationWithContent content={<NationPolicyJourneyPage />} />;
  } else {
    return (
      <NavigationWithContent content={<InfrastructureCapacityBuilding />} />
    );
  }
};

const NationPolicyJourneyPage: React.FC = () => {
  // Mobile view: state to toggle between learner and nation journeys.
  const [selectedJourney, setSelectedJourney] = useState<"learner" | "nation">(
    "learner",
  );

  return (
    <div
      className="bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="container mx-auto px-4 py-22">
        <JourneyHeader />
        <CallToAdventure />

        {/* Desktop View: Show both journeys side by side */}
        <div className="hidden md:flex gap-8">
          <div className="w-1/2">
            <JourneySection
              title="A Learner's Journey"
              steps={learnerJourneySteps}
            />
          </div>
          <div className="w-1/2">
            <JourneySection
              title="A Nation's Journey"
              steps={nationJourneySteps}
            />
          </div>
        </div>

        {/* Mobile View: Show journey content and toggle buttons */}
        <div className="md:hidden">
          <MobileToggleButtons
            selectedJourney={selectedJourney}
            setSelectedJourney={setSelectedJourney}
          />
          <div className="mt-16">
            {selectedJourney === "learner" ? (
              <JourneySection
                title="A Learner's Journey"
                steps={learnerJourneySteps}
              />
            ) : (
              <JourneySection
                title="A Nation's Journey"
                steps={nationJourneySteps}
              />
            )}
          </div>
        </div>
      </div>
      <UnifyingVision />
    </div>
  );
};

function InfrastructureCapacityBuilding() {
  return (
    <div
      className="text-gray-900 font-sans bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      {/* Hero Section */}
      <div className="backdrop-blur-2xl rounded-2xl mt-12">
        <section className="px-6 py-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            LearnGraph: Infrastructure for Capacity Building
          </h1>
          <p className="text-lg">
            Empowering nations to build inclusive, adaptive, and skill-driven
            education systems. Seamlessly aligned with national development
            goals and global Sustainable Development Goals (SDGs).
          </p>
        </section>
      </div>

      {/* Why Education Infrastructure Matters */}
      <div className="bg-gray-100 ">
        <section className="py-12 px-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Why Education Infrastructure Matters
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>300+ million young people</strong> risk missing essential
              skills for the future of work.
            </li>
            <li>
              Traditional systems are often{" "}
              <strong>fragmented, rigid, and inaccessible</strong> for rural and
              underserved communities.
            </li>
            <li>
              <strong>Global goals</strong> like SDG 4 (Quality Education) and
              SDG 8 (Decent Work) call for{" "}
              <strong>
                flexible, scalable, and inclusive education solutions
              </strong>
              .
            </li>
          </ul>
          <p className="mt-4">
            LearnGraph bridges this critical gap — offering an open, adaptive
            digital foundation for national education and workforce strategies.
          </p>
        </section>
      </div>

      {/* Our Role */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="backdrop-blur-2xl rounded-2xl p-12">
          <h2 className="text-2xl font-semibold mb-6">
            Our Role: Backbone for National Development
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Expand access to quality education in underserved regions</li>
            <li>Support lifelong learning and workforce reintegration</li>
            <li>
              Reduce the cost and complexity of scaling educational access
            </li>
            <li>Deliver skill-aligned, personalized learning paths</li>
            <li>Strengthen national SDG reporting and impact measurement</li>
          </ul>
          <blockquote className="mt-6 italic border-l-4 border-blue-500 pl-4">
            “From literacy programs to AI skills training, LearnGraph enables
            flexible, localized solutions that accelerate national progress.”
          </blockquote>
        </div>
      </section>

      {/* How It Works */}
      <div className="bg-gray-100 ">
        <section className="py-12 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-6">How LearnGraph Works</h2>
          <div className="space-y-4">
            <p>
              <strong>Inputs:</strong>
              <p />
              - Government Policy
              <br />
              - NGO Initiatives
              <br />
              - Open Educational Resources (OER)
              <br />
            </p>
            <div className="animate-bounce text-2xl">↓</div>
            <p>
              <strong>LearnGraph Layer:</strong>
              <br />
              - Dynamic Knowledge Ontology
              <br />
              - Personalized Learning Pathways
              <br />
              - Skill Mapping (aligned with ESCO, ELM frameworks)
              <br />- Offline-first access options
            </p>
            <div className="animate-bounce text-2xl">↓</div>
            <p>
              <strong>Outputs:</strong>
              <br />
              - Increased Workforce Readiness
              <br />
              - Improved Educational Access Metrics
              <br />
              - Accelerated Rural Inclusion
              <br />- Enhanced SDG Goal Reporting
            </p>
          </div>
        </section>
      </div>

      {/* Designed for Impact */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <div className="rounded-2xl backdrop-blur-2xl p-12">
          <h2 className="text-2xl font-semibold mb-6">
            Designed for Impact, Built for Scale
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-bold mb-2">
                Open-Source, Transparent, Modular
              </h3>
              <ul className="list-disc list-inside">
                <li>Fully customizable for national and local needs</li>
                <li>Freely extensible with open governance principles</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">
                Aligned with Global Frameworks
              </h3>
              <ul className="list-disc list-inside">
                <li>ESCO, ELM, SDG 4, 8, 10, 17 indicators</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Proven Flexibility</h3>
              <ul className="list-disc list-inside">
                <li>
                  Usable in universities, rural hubs, refugee contexts, and
                  workforce programs
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-50 py-12 px-6 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Our Invitation</h2>
        <p className="mb-4">
          LearnGraph is ready to power your education and workforce initiatives.
        </p>
        <ul className="list-none mb-6">
          <li>Governments building national skills infrastructures</li>
          <li>NGOs scaling rural education initiatives</li>
          <li>Development agencies accelerating SDG impact</li>
        </ul>
        <p className="mb-6">
          Let's build resilient, inclusive learning ecosystems — together.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700">
            Request a Partnership Brief
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100">
            Download Full Whitepaper
          </button>
          <button className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-100">
            Contact Our Development Team
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        LearnGraph.org | Open Infrastructure for a Learning Planet
      </footer>
    </div>
  );
}
