import React from "react";
import { NavigationWithContent } from "./Navigation";
import { useNavigate } from "react-router-dom";

interface ImpactSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

const ImpactStatBox: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-white shadow-2xl rounded-2xl p-6 text-center">
    <div className="text-2xl font-bold text-blue-600 mb-2">{title}</div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const sections: ImpactSection[] = [
  {
    id: "hero",
    title: "From Chaos to Connection",
    content: (
      <div>
        <p className="mb-4">
          In a world overwhelmed by fragmentation and noise, something new is
          emerging. Across the chaos, communities of learners are building
          bridges, weaving new pathways of knowledge, resilience, and hope.
        </p>
        <p>
          LearnGraph supports this emergence — offering the digital soil where
          local hubs of learning, healing, and collaboration can take root and
          thrive.
        </p>
      </div>
    ),
  },
  {
    id: "meta-crisis",
    title: "The Meta-Crisis We Face",
    content: (
      <div>
        <p className="mb-4">
          We live amidst ecological collapse, political instability, fractured
          education systems, and a widespread crisis of meaning. Old structures
          can no longer meet the needs of a rapidly changing, interconnected
          world.
        </p>
        <p>
          Education, as it stands, is insufficient: disconnected from real-world
          complexity, rigid in structure, and neglectful of emotional resilience
          and relational skills.
        </p>
      </div>
    ),
  },
  {
    id: "need",
    title: "What the Future Demands",
    content: (
      <ul className="list-disc ml-5 space-y-2">
        <li>
          <strong>Whole-person development:</strong> Integrating intellect,
          emotion, and practical action.
        </li>
        <li>
          <strong>Self-governed learning:</strong> Learners shaping their own
          journeys, not institutions dictating them.
        </li>
        <li>
          <strong>Dynamic knowledge maps:</strong> Continuously evolving,
          adaptable learning structures.
        </li>
        <li>
          <strong>Community-centered education:</strong> Real transformation
          happens together, not alone.
        </li>
      </ul>
    ),
  },
  {
    id: "solution",
    title: "The LearnGraph Solution",
    content: (
      <div>
        <p className="mb-4">
          LearnGraph is a living, open-source map of global knowledge, refined
          through community contributions. But it's more than that: it supports
          the formation of learning containers — self-organized groups where
          whole-person learning can happen.
        </p>
        <p>
          Powered by dynamic learning paths, relational practices, and local
          action, LearnGraph transforms education into an emergent, regenerative
          force.
        </p>
      </div>
    ),
  },
  {
    id: "emergence",
    title: "From Containers to Hubs",
    content: (
      <div>
        <p className="mb-4">
          Across campuses, cities, and villages, small learning containers
          become vibrant hubs — centers of co-creation, resilience, and
          transformation.
        </p>
        <p>
          Each hub is unique. Each is self-governed. Together, they form a
          decentralized, living network of education for a new era.
        </p>
      </div>
    ),
  },
  {
    id: "impact-metrics",
    title: "Impact You Can Measure",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactStatBox
          title="85%"
          description="Employers say soft skills matter most — yet current education fails to teach them."
        />
        <ImpactStatBox
          title="70%"
          description="Students globally feel their education doesn't meet their individual needs."
        />
        <ImpactStatBox
          title="60%+"
          description="Retention improvement in learner-driven, peer-supported education models."
        />
      </div>
    ),
  },
  {
    id: "join",
    title: "Your Invitation",
    content: (
      <div>
        <p className="mb-4">
          Whether you are a learner, mentor, community builder, or institution —
          you can help weave the future of education.
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Start your journey:</strong> Follow a learning path. Form a
            container.
          </li>
          <li>
            <strong>Host a hub:</strong> Bring LearnGraph to your campus,
            community, or organization.
          </li>
          <li>
            <strong>Contribute knowledge:</strong> Help refine the global map of
            learning.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "impact-investors",
    title: "Partner With Us: Impact at Scale",
    content: (
      <div>
        <p className="mb-4">
          Strategic investment in LearnGraph isn't just funding a platform —
          it's nurturing a global movement of self-directed education,
          resilience, and community transformation.
        </p>
        <ul className="list-disc ml-5 space-y-2">
          <li>
            <strong>Scalable Model:</strong> Each local hub seeds further growth
            — one container can blossom into many.
          </li>
          <li>
            <strong>Open Infrastructure:</strong> Global access, modular
            expansion, and rapid community-driven evolution.
          </li>
          <li>
            <strong>Systems-Level Leverage:</strong> By shifting how education
            emerges, we catalyze change across workforce, governance, climate
            resilience, and wellbeing sectors.
          </li>
          <li>
            <strong>Radical Efficiency:</strong> Micro-grants, lightweight tech,
            and community ownership deliver disproportionate impact per dollar.
          </li>
          <li>
            <strong>Measurable Outcomes:</strong> Learner progression, hub
            proliferation, cross-sector collaborations, and verified skills
            acquisition.
          </li>
        </ul>
        <p className="mt-6">
          <strong>
            Your investment plants seeds that regenerate the very fabric of
            education, community, and planetary resilience.
          </strong>
        </p>
      </div>
    ),
  },
  {
    id: "final-vision",
    title: "Where We Are Going",
    content: (
      <div>
        <p className="mb-4">
          From scattered chaos, new gardens of learning are sprouting —
          LearnGraph Hubs of collaboration, love, and purpose.
        </p>
        <p>
          Wherever there is curiosity, there can be a hub. Wherever there is
          care, there can be a future.
        </p>
      </div>
    ),
  },
];

export const ImpactPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-16 bg-[url('/LGBG-light.webp')] bg-no-repeat bg-cover bg-fixed bg-center min-h-screen">
      <section
        className="relative bg-cover bg-center py-24 px-6"
        style={{ backgroundImage: "url('/images/hero-evolution.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative max-w-4xl mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">From Chaos to Connection</h1>
          <p className="text-2xl">
            We build the seeds, pathways, and ecosystems that let resilience,
            collaboration, and love emerge.
          </p>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="max-w-4xl mx-auto px-6 backdrop-blur-md rounded-2xl p-6"
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            {section.title}
          </h2>
          <div className="text-lg leading-relaxed text-gray-700">
            {section.content}
          </div>
        </section>
      ))}

      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Be Part of the Emergence?
          </h2>
          <p className="text-lg mb-8">
            Help build the hubs of tomorrow. Shape the ecosystems of resilience
            today.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl transition-colors"
              onClick={() => navigate("/contact")}
            >
              Get Involved
            </button>
            <a
              href="https://drive.google.com/file/d/1_ZhbhKRd9Uh6hH1MC7ZTF5rPLxvTz4bB/view"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-blue-600 text-blue-600 font-bold py-4 px-10 rounded-2xl transition-colors hover:bg-blue-600 hover:text-white"
            >
              Read Our Whitepaper
            </a>
          </div>
          <p className="text-sm text-gray-600 mt-6">
            Our whitepaper outlines our global impact vision, learning
            infrastructure models, and technical foundations.
          </p>
        </div>
      </section>
    </div>
  );
};

export const Impact = () => {
  return <NavigationWithContent content={<ImpactPage />} />;
};
