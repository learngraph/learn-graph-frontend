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
    { id: "Prime Factoring", description: "Prime Factoring", group: 2 },
    { id: "Integer Factoring", description: "Integer Factoring", group: 2 },
    { id: "F2m", description: "F2m", group: 2 },
    { id: "Prime Fields", description: "Prime Fields", group: 2 },
    { id: "Finite Fields", description: "Finite Fields", group: 2 },
    { id: "Field Theory", description: "Field Theory", group: 2 },
    { id: "Prime Numbers", description: "Prime Numbers", group: 2 },
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
    { source: "RSA", target: "Prime Factoring", value: 9 },
    { source: "Prime Factoring", target: "Integer Factoring", value: 7 },
    { source: "Prime Factoring", target: "Integer Factoring", value: 7 },
    { source: "ECC", target: "F2m", value: 9 },
    { source: "F2m", target: "Prime Fields", value: 9 },
    { source: "Prime Fields", target: "Finite Fields", value: 9 },
    { source: "Prime Fields", target: "Prime Numbers", value: 9 },
    { source: "Prime Fields", target: "Prime Factoring", value: 9 },
    { source: "Finite Fields", target: "Field Theory", value: 9 },
  ],
};
export default data;
