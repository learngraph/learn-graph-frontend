export interface Partner {
  id: number;
  name: string;
  website: string;
  logoUrl: string;
  problem: string;
  solution: string;
  learngraphRole: string;
}

export const partners: Partner[] = [
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
