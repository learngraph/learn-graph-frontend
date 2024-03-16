import { GraphManager } from "./GraphManager/GraphManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { LandingPage } from "./LandingPage";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/about" Component={About} />
      <Route path="/graph" Component={GraphManager} />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};
