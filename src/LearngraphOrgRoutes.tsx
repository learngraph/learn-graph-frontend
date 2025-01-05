import { GraphManager } from "./GraphManager/GraphManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { HowToLearngraph } from "./HowToLearngraph";
import { LandingPage } from "./LandingPage";
import EducationInstitutePage from "./ExpBoosterPages/EducationInstitute";
import LearnerPage from "./ExpBoosterPages/Learner";
import FoundationPage from "./ExpBoosterPages/Foundation";
import BusinessPage from "./ExpBoosterPages/Bussiness";
export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/about" Component={About} />
      <Route path="/howto" Component={HowToLearngraph} />
      <Route path="/EducationIns" Component={EducationInstitutePage} />
      <Route path="/Foundation" Component={FoundationPage} />
      <Route path="/Learner" Component={LearnerPage} />
      <Route path="/Bussiness" Component={BusinessPage} />
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
