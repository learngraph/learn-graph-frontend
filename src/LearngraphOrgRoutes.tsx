import { GraphManager } from "./GraphManager/GraphManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { HowToLearngraph } from "./HowToLearngraph";
import { LandingPage } from "./LandingPage";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/about" Component={About} />
      <Route path="/howto" Component={HowToLearngraph} />
      <Route path="/graph" element={<GraphManager isPlayground={false} />} />
      <Route
        path="/playground"
        element={<GraphManager isPlayground={true} />}
      />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};