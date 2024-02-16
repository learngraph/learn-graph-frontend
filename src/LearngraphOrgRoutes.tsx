import { GraphManager } from "./GraphManager/GraphManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { HowToLearngraph } from "./HowToLearngraph";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/about" Component={About} />
      <Route path="/" Component={GraphManager} />
      <Route path="/howto" Component={HowToLearngraph} />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};
