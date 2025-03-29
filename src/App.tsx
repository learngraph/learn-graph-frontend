import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { ConfigurableTheme } from "./Theme";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";
import { PostHogProvider } from "posthog-js/react";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./constants.ts";

export const App = () => {
  return (
    <PostHogProvider
      apiKey={POSTHOG_API_KEY}
      options={{
        api_host: POSTHOG_HOST,
        autocapture: true,
        capture_pageview: true,
      }}
    >
      <BrowserRouter>
        <UserDataContextProvider>
          <ConfigurableTheme>
            <LearngraphOrgRoutes />
          </ConfigurableTheme>
        </UserDataContextProvider>
      </BrowserRouter>
    </PostHogProvider>
  );
};

export default App;
