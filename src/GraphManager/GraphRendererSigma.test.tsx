// import { useState } from "react";
// import { ForceGraphGraphData } from "./types";
// import { makeInitialGraphData } from "./utils";
// import { GraphologyGraph, transformForceToSigma } from "./GraphRendererSigma";
// import { render } from "@testing-library/react";
// import { SigmaContainer } from "@react-sigma/core";

// describe("correct graph loading", () => {
//   const [graph, setGraph] = useState<ForceGraphGraphData>(
//     makeInitialGraphData(),
//   );
//   it("should take the graph data and put it in the Graph", () => {
//     const convertedData = transformForceToSigma(graph);
//     render(
//       <SigmaContainer>
//         <GraphologyGraph graphData={convertedData} />
//       </SigmaContainer>,
//     );
//   });
// });
