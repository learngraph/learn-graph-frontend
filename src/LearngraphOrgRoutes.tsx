import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Imprint, TermsOfUse, PrivacyPolicy } from "./Imprint";
import { LandingPage } from "./LandingPage";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />
      <Route path="/über-uns" Component={About} />
      <Route path="/about" Component={About} />
      <Route path="/imprint" Component={Imprint} />
      <Route path="/impressum" Component={Imprint} />
      <Route path="/terms-of-use" Component={TermsOfUse} />
      <Route path="/privacy-policy" Component={PrivacyPolicy} />
      <Route
        path="*"
        element={<Navigate to="/" />} /*TODO: Add a "page not found" page */
      />
    </Routes>
  );
};
