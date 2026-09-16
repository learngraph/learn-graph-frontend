import type { NodeContent } from "../../../content/graph";

export const networkContent = {
  id: "content-about-network",
  publicationStatus: "review",
  layout: "atlas",
  title: "What moves between us",
  blocks: [
    {
      type: "relationship-atlas",
      reviewNote:
        "Current editorial baseline. Public wording and relationship status remain subject to partner review.",
      relationships: [
        {
          name: "World Education Network",
          context: "Uganda",
          introduction:
            "World Education Network works with local schools and public institutions around ICT and access to education. The local relationships decide where technology can actually land; our shared work is to give learning enough structure to continue beyond one workshop, classroom or connection.",
          theirField: "local knowledge + access to schools",
          sharedWork: "digital learning structure + platform continuity",
          weight: "primary",
        },
        {
          name: "GFCCA",
          context: "Kenya",
          introduction:
            "GFCCA connects regenerative agriculture and ecosystem restoration with education rooted in the field. Here, practice is not supporting material added to a curriculum. It is where the knowledge begins. The shared task is to give that knowledge a structure that can travel without losing its origin.",
          theirField: "field practice + ecological knowledge",
          sharedWork: "curriculum structure + digital continuity",
          weight: "primary",
        },
        {
          name: "ITECH Hamburg",
          introduction:
            "ITECH works where classroom standards, workshop practice and employer expectations have to meet. The relationship tests whether one competence structure can connect those realities without flattening the differences between them.",
          theirField: "vocational education + employer reality",
          sharedWork: "competence structures + learning paths",
          weight: "primary",
        },
          {
            name: "AllDigital",
            introduction:
              "AllDigital works across digital inclusion and skills in Europe. The relationship tests how LearnGraph travels beyond one institution: through shared personas, project results and Bochum as a possible model region.",
            theirField: "digital inclusion + European reach",
            sharedWork: "educational infrastructure + shared project work",
          weight: "secondary",
        },
      ],
      europeanField: {
          heading: "Different institutions. Different angles.",
        introduction:
          "LearnGraph's European relationships cross higher education, vocational learning, research and the labour market. Some lead into concrete project work. Others provide scrutiny, specialist knowledge or a route into contexts the platform must understand.",
        organisations: [
          {
            name: "Universidad Nebrija",
            location: "Madrid, Spain",
            description:
              "An internationally oriented university connecting higher education with employability, industry and European research practice.",
          },
          {
            name: "FETICO",
            location: "Spain",
            description:
              "A major social partner and employment organisation bringing labour-market activation, placement and work transitions into the field.",
          },
          {
            name: "Aalto University",
            location: "Espoo, Finland",
            description:
              "A research university connecting science, art, business and entrepreneurship across disciplines.",
            quote:
              "Knowledge shared in a way that respects the learner's chosen journey.",
            attribution: "Patrik Maltusch · Chief Enterprise Architect",
          },
          {
            name: "Università di Roma Tor Vergata",
            location: "Rome, Italy",
            description:
              "A public university with expertise in digital education, e-learning governance and technology-supported learning innovation.",
          },
          {
            name: "EGInA",
            location: "Foligno, Italy",
            description:
              "An accredited VET organisation working across skill development, employability, ESCO mapping and micro-credentials.",
            quote:
              "People aren't passive users, they're involved and invested.",
            attribution: "Altheo Valentini · CEO & Founder",
          },
          {
            name: "UPB / POLITEHNICA București",
            location: "Bucharest, Romania",
            description:
              "A public university contributing research perspectives on digital learning barriers, personalisation, guidance and European interoperability.",
          },
        ],
      },
    },
  ],
} as const satisfies NodeContent;
