import { BackendGraphData } from "GraphManager/types";
const data: BackendGraphData = {
  nodes: [
    { id: "Cryptography", description: "Cryptography", group: 1 },
    {
      id: "Public-Key Cryptography",
      description: "Public-Key Cryptography",
      group: 1,
    },
    { id: "RSA", description: "RSA", group: 1 },
    { id: "ECC", description: "ECC", group: 1 },
    { id: "Mathematics", description: "Mathematics", group: 2 },
    { id: "Abstract Algebra", description: "Abstract Algebra", group: 2 },
    { id: "Finite Fields", description: "Finite Fields", group: 2 },
    { id: "Number Theory", description: "Number Theory", group: 2 },
  ],
  links: [
    {
      id: "1",
      source: "Public-Key Cryptography",
      target: "RSA",
      value: 4,
      note: "any(algo)",
    },
    {
      id: "2",
      source: "Public-Key Cryptography",
      target: "ECC",
      value: 4,
      note: "any(algo)",
    },
    {
      id: "3",
      source: "Cryptography",
      target: "Public-Key Cryptography",
      value: 5,
      note: "questionable link",
    },
    {
      id: "4",
      source: "Cryptography",
      target: "Mathematics",
      value: 4,
      note: "questionable link",
    },
    {
      id: "5",
      source: "Mathematics",
      target: "Finite Fields",
      value: 2,
      note: "questionable link",
    },
    {
      id: "6",
      source: "Mathematics",
      target: "Abstract Algebra",
      value: 2,
      note: "questionable link",
    },
    { id: "7", source: "RSA", target: "Finite Fields", value: 9 },
    { id: "8", source: "RSA", target: "Number Theory", value: 7 },
    { id: "9", source: "Finite Fields", target: "Abstract Algebra", value: 2 },
    { id: "10", source: "ECC", target: "Number Theory", value: 9 },
  ],
};
export default data;
