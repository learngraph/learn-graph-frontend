import "@testing-library/jest-dom";
import { transformGraphDataToSigma } from "./sigmaTransformFunctions";
import { BackendGraphData } from "../types";

describe("transform GraphData", () => {
  it("should transform BackendGraphData to Graphology format", () => {
    // mock backendData
    const backendData: BackendGraphData = {
      nodes: [
        {
          id: "1",
          description: "Node 1",
          position: { x: 50, y: 100, z: 0 }, // Optional but provided here
          resources: "resource1", // Optional, but included here
        },
        {
          id: "2",
          description: "Node 2",
          position: { x: 150, y: 200, z: 0 }, // Optional but provided here
          resources: undefined, // Resources are optional, so can be undefined
        },
      ],
      links: [
        {
          id: "1",
          source: "1", // Refers to node with id '1'
          target: "2", // Refers to node with id '2'
          value: 10, // Will be halved in the graphology format
          note: "Example note", // Optional, not used in the transformation
        },
      ],
    };

    // expected Graphology format
    const expectedGraphologyData = {
      nodes: [
        {
          key: "1",
          attributes: {
            x: 50,
            y: 100,
            label: "Node 1",
            resources: "resource1",
            size: 10,
          },
        },
        {
          key: "2",
          attributes: {
            x: 150,
            y: 200,
            label: "Node 2",
            resources: undefined,
            size: 10,
          },
        },
      ],
      edges: [
        { key: "1", source: "1", target: "2", attributes: { size: 5 } }, // value/2 = 10/2 = 5
      ],
    };

    const result = transformGraphDataToSigma(backendData);

    // Step 4: Check if the output matches the expected result
    expect(result).toEqual(expectedGraphologyData);
  });
});
