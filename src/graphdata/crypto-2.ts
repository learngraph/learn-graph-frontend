import { GraphData } from "GraphManager/types";
const data: GraphData = {
  nodes: [
    { id: "Cryptography", group: 1 },
    { id: "Public-Key Cryptography", group: 1 },
    { id: "RSA", group: 1 },
    { id: "ECC", group: 1 },
    { id: "Mathematics", group: 2 },
    { id: "Abstract Algebra", group: 2 },
    { id: "Finite Fields", group: 2 },
    { id: "Number Theory", group: 2 },
  ],
  links: [
    {
      source: "Public-Key Cryptography",
      target: "RSA",
      value: 4,
      note: "any(algo)",
    },
    {
      source: "Public-Key Cryptography",
      target: "ECC",
      value: 4,
      note: "any(algo)",
    },
    {
      source: "Cryptography",
      target: "Public-Key Cryptography",
      value: 5,
      note: "questionable link",
    },
    {
      source: "Cryptography",
      target: "Mathematics",
      value: 4,
      note: "questionable link",
    },
    {
      source: "Mathematics",
      target: "Finite Fields",
      value: 2,
      note: "questionable link",
    },
    {
      source: "Mathematics",
      target: "Abstract Algebra",
      value: 2,
      note: "questionable link",
    },
    { source: "RSA", target: "Finite Fields", value: 9 },
    { source: "RSA", target: "Number Theory", value: 7 },
    { source: "Finite Fields", target: "Abstract Algebra", value: 2 },
    { source: "ECC", target: "Number Theory", value: 9 },
  ],
};
export default data;
