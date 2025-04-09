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
    <div className="text-2xl  font-bold text-blue-600 mb-2">{title}</div>
    <p className="text-gray-700">{description}</p>
  </div>
);

const sections: ImpactSection[] = [
  {
    id: "systems-change",
    title: "Impact Means Evolution",
    content: (
      <div>
        <p className="mb-4">
          True change challenges systems to adapt, rethink, and transform.
          LearnGraph builds the pathways, tools, and resilience to make that
          evolution possible.
        </p>
        <p>
          We are not here to lightly "improve" education or workforce
          development. We are here to rewire how systems respond to the future.
        </p>
      </div>
    ),
  },
  {
    id: "problem",
    title: "Why Systems Must Change",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ImpactStatBox
          title="85%"
          description="of employers globally report they can't find candidates with the right soft skills."
        />
        <ImpactStatBox
          title="70%"
          description="of students globally say their education system does not meet their individual needs."
        />
        <ImpactStatBox
          title="12%"
          description="of teachers feel 'satisfied' with their jobs, five times less than a decade ago."
        />
      </div>
    ),
  },
  {
    id: "impact-areas",
    title: "Our Systemic Impact Areas",
    content: (
      <ul className="list-disc ml-5 space-y-2">
        <li>
          <strong>Higher Education:</strong> Flexible curricula,
          cross-institutional collaboration, and personalized learner pathways.
        </li>
        <li>
          <strong>Workforce Reintegration:</strong> Aligning education with
          real-world skills and career paths.
        </li>
        <li>
          <strong>Policy & Standards Alignment:</strong> Driving
          interoperability across borders and credential systems.
        </li>
        <li>
          <strong>Community-Driven Educational Evolution:</strong> Dynamic,
          crowdsourced learning ecosystems.
        </li>
      </ul>
    ),
  },
  {
    id: "theory-of-change",
    title: "Our Theory of Change",
    content: (
      <div>
        <p className="mb-4 ">
          We disrupt rigid systems with learner-centered infrastructure. We
          support institutions and learners through reflection, peer
          scaffolding, and transparent progress tracking. We foster real
          evolution — making adaptation sustainable, human, and deeply
          transformative.
        </p>
        <p>Change is hard. Support structures matter.</p>
      </div>
    ),
  },
  {
    id: "proof",
    title: "Proof: Measuring System-Level Shifts",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ImpactStatBox
          title="Cross-Institutional"
          description="Collaborations initiated via LearnGraph pilots."
        />
        <ImpactStatBox
          title="Personalized Routes"
          description="Learning pathways built and successfully completed."
        />
        <ImpactStatBox
          title="70%+ Alignment"
          description="Between skills learned and real-world industry needs."
        />
        <ImpactStatBox
          title="Workforce Reintegration"
          description="Measured improvements in employment rates post-program【39†source】."
        />
      </div>
    ),
  },
  {
    id: "join",
    title: "Be a Catalyst for System Evolution",
    content: (
      <div>
        <p className="mb-4">
          Change is not coming. It is already here. You can choose to be
          overcome by change or actively shape it.
          {/*Institutions, employers, and individuals must evolve — or risk irrelevance.*/}
        </p>
        <p>Partner with us. Pilot with us. Grow with us.</p>
      </div>
    ),
  },
  {
    id: "closing",
    title: "A Final Reflection",
    content: (
      <div>
        <p>
          System evolution is challenging. It stretches, pulls, and reshapes
          what we know. It isn't painless — but in reflection, in community, and
          with courage, transformation becomes sustainable.
        </p>
        <p>
          LearnGraph exists to build the ecosystems where that future is not
          just possible — it is inevitable.
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
          <h1 className="text-5xl font-bold mb-4">Impact Means Evolution</h1>
          <p className="text-2xl">
            We build the pathways, structures, and ecosystems that make
            evolution sustainable.
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
          <h2 className="text-4xl font-bold mb-4">Ready to Create Change?</h2>
          <p className="text-lg mb-8">
            Be part of the evolution. Help build the structures that sustain
            real, lasting change.
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
            Our whitepaper outlines our impact plan, core hypotheses,
            measurement tools, collaboration frameworks, and links to our
            technical documentation.
          </p>
        </div>
      </section>
    </div>
  );
};

export const Impact = () => {
  return <NavigationWithContent content={<ImpactPage />} />;
};
