import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";
import { PostHogProvider } from "posthog-js/react";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./constants";

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
          <LearngraphOrgRoutes />
        </UserDataContextProvider>
      </BrowserRouter>
    </PostHogProvider>
  );
};

export default App;
