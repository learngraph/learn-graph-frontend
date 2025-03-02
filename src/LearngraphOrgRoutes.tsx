import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Imprint } from "./Imprint";
import { LandingPage } from "./LandingPage";
export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/über-uns" Component={About} />
      <Route path="/about" Component={About} />
      <Route path="/imprint" Component={Imprint} />
      <Route path="/impressum" Component={Imprint} />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};
