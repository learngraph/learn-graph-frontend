import { BrowserRouter, useLocation } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";
import { PostHogProvider } from "posthog-js/react";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./constants";
import { useEffect } from "react";

// Ensure that useNavigation().navigate('/target') reaches the top of the target page.
const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
};

export const App = () => {
  if (!POSTHOG_API_KEY) {
    console.error("missing POSTHOG_API_KEY environemnt variable");
  }
  if (!POSTHOG_HOST) {
    console.error("missing POSTHOG_HOST environemnt variable");
  }
  return (
    <PostHogProvider
      apiKey={POSTHOG_API_KEY || ""}
      options={{
        api_host: POSTHOG_HOST,
        autocapture: true,
        capture_pageview: true,
      }}
    >
      <BrowserRouter>
        <UserDataContextProvider>
          <ScrollToTop />
          <LearngraphOrgRoutes />
        </UserDataContextProvider>
      </BrowserRouter>
    </PostHogProvider>
  );
};

export default App;
