import { NavigationWithContent } from "@src/Navigation";
import React, { useEffect, useRef, useState } from "react";
import "@src/CustomerGroup/NationPolicy.css"; // Only global styles, not custom animations

// --- FadeInSection Component ---
// This component uses the IntersectionObserver API to apply a fade-in transition
const FadeInSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
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
      className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"} ${className}`}
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

// --- Sample Data for Each Journey ---
// Learner Journey with curiosity-driven headlines and custom content.
const learnerJourneySteps: JourneyStepData[] = [
  {
    curiousHeadline: "What sparks your journey?",
    content: (
      <p>
        Discover your inner purpose and see how your personal goals can be transformed into a clear, actionable learning path.
      </p>
    ),
  },
  {
    curiousHeadline: "Mapping the Unseen",
    content: (
      <div>
        <p>
          Experience an interactive map that adapts to your interests, guiding you from abstract knowledge to industry-relevant skills.
        </p>
        <img
          src="/images/google-maps-learning.jpg"
          alt="Interactive learning map"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "Who Will Join You?",
    content: (
      <div>
        <p>
          Join groups with complementary skills, collaborate with peers, and engage in dynamic learning sessions—all tailored to your journey.
        </p>
        <video
          src="/videos/dynamic-matching.gif"
          controls
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "From Vision to Reality?",
    content: (
      <div>
        <p>
          Bridge the gap between abstract concepts and real-world application with hands-on projects that bring your learning to life.
        </p>
        <img
          src="/images/vision-to-reality.gif"
          alt="Vision to reality animation"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "What Will You Receive?",
    content: (
      <div>
        <p>
          Embrace the joy of connection and discover opportunities to share, learn, and grow alongside like-minded individuals.
        </p>
        <img
          src="/images/emotional-connection.jpg"
          alt="Emotional connection"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
];

// Nation Journey with curiosity-driven headlines and varied custom content.
const nationJourneySteps: JourneyStepData[] = [
  {
    curiousHeadline: "Can a nation dream?",
    content: (
      <p>
        Imagine a system where national aspirations are captured and transformed into strategic, data-driven educational pathways.
      </p>
    ),
  },
  {
    curiousHeadline: "Turning Vision into Strategy?",
    content: (
      <div>
        <p>
          Connect the vision of a nation with concrete educational strategies that empower institutions and enhance learning outcomes.
        </p>
        <img
          src="/images/strategic-planning.jpg"
          alt="Strategic planning"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "Data that Drives Change?",
    content: (
      <div>
        <p>
          Utilize a digital framework that seamlessly integrates schools, universities, and public organizations to create measurable impact.
        </p>
        <img
          src="/images/data-driven.gif"
          alt="Data driven animation"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "Empowering Through Connection?",
    content: (
      <div>
        <p>
          Foster scalable reforms by connecting education institutions directly with their learners through personalized pathways.
        </p>
        <video
          src="/videos/institution-empowerment.mp4"
          controls
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
      </div>
    ),
  },
  {
    curiousHeadline: "Building a Brighter Tomorrow?",
    content: (
      <div>
        <p>
          Engage policymakers and industry leaders to create an ecosystem that unites public vision with tangible educational achievements.
        </p>
        <img
          src="/images/inspirational.jpg"
          alt="Inspiration for tomorrow"
          className="w-full h-auto mt-2 rounded-md shadow-md"
        />
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
        Where individual dreams meet national progress—and every connection creates transformative impact.
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
            Embark on the Adventure
          </h2>
          <p className="mt-4 text-xl text-white/90 max-w-2xl text-center">
            Discover our the potential within.
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
      <div className="mt-2">
        {step.content}
      </div>
    </div>
  );
};

// --- Journey Separator Component ---
// A fun separator between steps wrapped in FadeInSection.
const JourneySeparator: React.FC = () => {
  return (
    <FadeInSection>
      <div className="my-4 flex justify-center">
        <img
          src="/images/footsteps.png"
          alt="Separator footsteps"
          className="w-12 h-auto"
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
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{title}</h2>
      {steps.map((step, index) => (
        <div key={index}>
          <JourneyStep step={step} index={index} />
          {index < steps.length - 1 && <JourneySeparator />}
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
  return (
    <FadeInSection>
      <div className="w-full py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            LearnGraph: Connecting Intentions, Shaping Futures
          </h2>
          <p className="text-lg sm:text-xl">
            Join us in creating an educational future where every intention sparks a journey, every path leads to real-world impact, and every connection builds a stronger nation.
          </p>
        </div>
      </div>
    </FadeInSection>
  );
};

// --- Main Journey Page Component ---
export const CGNationPolicyJourney: React.FC = () => {
  return (
    <NavigationWithContent content={<NationPolicyJourneyPage />} />
  );
};

const NationPolicyJourneyPage: React.FC = () => {
  // Mobile view: state to toggle between learner and nation journeys.
  const [selectedJourney, setSelectedJourney] = useState<"learner" | "nation">("learner");

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
            <JourneySection title="A Learner's Journey" steps={learnerJourneySteps} />
          </div>
          <div className="w-1/2">
            <JourneySection title="A Nation's Journey" steps={nationJourneySteps} />
          </div>
        </div>

        {/* Mobile View: Show journey content and toggle buttons */}
        <div className="md:hidden">
          <MobileToggleButtons selectedJourney={selectedJourney} setSelectedJourney={setSelectedJourney} />
          <div className="mt-16">
            {selectedJourney === "learner" ? (
              <JourneySection title="A Learner's Journey" steps={learnerJourneySteps} />
            ) : (
              <JourneySection title="A Nation's Journey" steps={nationJourneySteps} />
            )}
          </div>
        </div>
      </div>
      <UnifyingVision />
    </div>
  );
};
