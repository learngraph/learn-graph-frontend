import { GraphData } from "GraphManager/types";
const data: GraphData = {
  nodes: [
    {
      id: "Public-Key Cryptography",
      description: "Public-Key Cryptography",
      group: 1,
    },
    { id: "RSA", description: "RSA", group: 1 },
    { id: "ECC", description: "ECC", group: 1 },
    { id: "Abstract Algebra", description: "Abstract Algebra", group: 2 },
    { id: "Finite Fields", description: "Finite Fields", group: 2 },
    { id: "Number Theory", description: "Number Theory", group: 2 },
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
    { source: "RSA", target: "Finite Fields", value: 9 },
    { source: "RSA", target: "Number Theory", value: 7 },
    { source: "Finite Fields", target: "Abstract Algebra", value: 2 },
    { source: "ECC", target: "Number Theory", value: 9 },
  ],
};
export default data;
