import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing/landing";
import UniversityPage from "./pages/customerGroups/UniversityPage";
import IndividualPage from "./pages/customerGroups/IndividualPage";
import EnterprisePage from "./pages/customerGroups/EnterprisePage";

/*
// Enable later if/when multiple routes exist
const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};
*/


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/university" element={<UniversityPage />} />
        <Route path="/individual" element={<IndividualPage />} />
        <Route path="/enterprise" element={<EnterprisePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}


// export const App = () => {
//   if (!POSTHOG_API_KEY) {
//     console.warn("POSTHOG_API_KEY missing");
//   }
//   if (!POSTHOG_HOST) {
//     console.warn("POSTHOG_HOST missing");
//   }

//   return (
//     <PostHogProvider
//       apiKey={POSTHOG_API_KEY || ""}
//       options={{
//         api_host: POSTHOG_HOST,
//         autocapture: true,
//         capture_pageview: true,
//       }}
//     >
//       <BrowserRouter>
//         {/* <ScrollToTop /> */}

//         {/* <UserDataContextProvider> */}
//         <Navbar />

//         <Routes>
//           <Route path="/" element={<LandingPage />} />
//         </Routes>

//         <Footer />
//         {/* </UserDataContextProvider> */}
//       </BrowserRouter>
//     </PostHogProvider>
//   );
// };

// export default App;
