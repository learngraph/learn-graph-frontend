import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";
import { Imprint, TermsOfUse, PrivacyPolicy } from "./Imprint";
import { LandingPage } from "./LandingPage";
import { Impact } from "./Impact";
import {
  University,
  PartnerSuccessStory as UniversityPartnerSuccessStory,
} from "./CustomerGroup/University";
import ComingSoon from "./CustomerGroup/ComingSoon";
import ContactUs from "./ContactUs";
import { NationPolicyJourney } from "./CustomerGroup/NationPolicy";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/" Component={LandingPage} />

      {/* Customer Groups */}
      <Route path="/university" Component={University} />
      <Route
        path="/university/success-story/:partnerName"
        element={<UniversityPartnerSuccessStory />}
      />
      <Route path="/nations" Component={NationPolicyJourney} />
      <Route path="/industry" Component={ComingSoon} />
      <Route path="/ecosystem" Component={ComingSoon} />
      <Route path="/k-12" Component={ComingSoon} />
      <Route path="/contact" Component={ContactUs} />
      <Route path="/contact-us" Component={ContactUs} />

      {/* About Us */}
      <Route path="/impact" Component={Impact} />
      <Route path="/wirkung" Component={Impact} />
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
