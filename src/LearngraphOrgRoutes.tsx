import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Imprint, TermsOfUse, PrivacyPolicy } from "./Imprint";
import { LandingPage } from "./LandingPage";
import { CGUniversity } from "./CustomerGroup/University";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />

      {/* Customer Groups */}
      <Route path="/universities" Component={CGUniversity} />
      <Route path="/university" Component={CGUniversity} />

      {/* About Us */}
      <Route path="/über-uns" Component={About} />
      <Route path="/about" Component={About} />

      {/* Bureaucracy */}
      <Route path="/imprint" Component={Imprint} />
      <Route path="/impressum" Component={Imprint} />

      <Route path="/terms-of-use" Component={TermsOfUse} />
      <Route path="/privacy-policy" Component={PrivacyPolicy} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
