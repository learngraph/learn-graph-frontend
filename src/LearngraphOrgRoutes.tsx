import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Imprint, TermsOfUse, PrivacyPolicy } from "./Imprint";
import { LandingPage } from "./LandingPage";
import { CGUniversity } from "./CustomerGroup/University";
import { Individuals } from "./CustomerGroup/Individual";
import { Institutions } from "./CustomerGroup/Institution";
import { NonProfit } from "./CustomerGroup/Nonprofit";
import ComingSoon from "./CustomerGroup/ComingSoon";
import ContactUs from "./ContactUs";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />

      {/* Customer Groups */}
      <Route path="/university" Component={CGUniversity} />
      <Route path="/individual" Component={Individuals} />
      <Route path="/institution" Component={Institutions} />
      <Route path="/Nonprofit" Component={NonProfit} />
      <Route path="/policy" Component={ComingSoon} />
      <Route path="/industry" Component={ComingSoon} />
      <Route path="/ecosystem" Component={ComingSoon} />
      <Route path="/k-12" Component={ComingSoon} />
      <Route path="/contact" Component={ContactUs} />
      <Route path="/contact-us" Component={ContactUs} />

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
