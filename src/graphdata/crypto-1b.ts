import { BackendGraphData } from "GraphManager/types";
const data: BackendGraphData = {
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
      id: "10",
      source: "Public-Key Cryptography",
      target: "RSA",
      value: 4,
      note: "any(algo)",
    },
    {
      id: "11",
      source: "Public-Key Cryptography",
      target: "ECC",
      value: 4,
      note: "any(algo)",
    },
    { id: "1", source: "RSA", target: "Prime Factoring", value: 9 },
    {
      id: "2",
      source: "Prime Factoring",
      target: "Integer Factoring",
      value: 7,
    },
    {
      id: "3",
      source: "Prime Factoring",
      target: "Integer Factoring",
      value: 7,
    },
    { id: "4", source: "ECC", target: "F2m", value: 9 },
    { id: "5", source: "F2m", target: "Prime Fields", value: 9 },
    { id: "6", source: "Prime Fields", target: "Finite Fields", value: 9 },
    { id: "7", source: "Prime Fields", target: "Prime Numbers", value: 9 },
    { id: "8", source: "Prime Fields", target: "Prime Factoring", value: 9 },
    { id: "9", source: "Finite Fields", target: "Field Theory", value: 9 },
  ],
};
export default data;
