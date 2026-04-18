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
    name: "ITECH Berufliche Schule (Hamburg)",
    website: "https://www.itech-bs14.de/",
    logoUrl: "/partner/logo-itech.png",
    problem:
      "Dual vocational learning needs a shared map across classroom, workshop, and company.",
    solution:
      "Structure competence paths that trainers, learners, and partners can navigate together.",
    learngraphRole:
      "LearnGraph co-develops practice-oriented graphs rooted in Berufsschule reality.",
  },
  {
    id: 2,
    name: "Center of Vocational Excellence Projekt (Win4SMEs)",
    website: "https://win4smes.eu/",
    logoUrl: "/partner/logo-win4smes.png",
    problem:
      "SMEs and vocational ecosystems need aligned tools for skills visibility and collaboration.",
    solution:
      "European CoVE networks link policy, training, and employers on shared competence logic.",
    learngraphRole:
      "LearnGraph supports the MoU with interoperable learning and matching infrastructure.",
  },
  {
    id: 3,
    name: "All Digital",
    website: "https://all-digital.org/",
    logoUrl: "/partner/logo-alldigital.png",
    problem:
      "Digital inclusion and competence development must reach learners across Europe at scale.",
    solution:
      "Pan-European networks coordinate training, advocacy, and open digital literacy pathways.",
    learngraphRole:
      "LearnGraph aligns with All Digital’s mission for accessible, human-centered learning systems.",
  },
  {
    id: 4,
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
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
];
