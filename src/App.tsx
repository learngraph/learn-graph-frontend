import { BrowserRouter, Routes, Route /*, useLocation */ } from "react-router-dom";
// import { useEffect } from "react";

import { PostHogProvider } from "posthog-js/react";
import { POSTHOG_API_KEY, POSTHOG_HOST } from "./constants";
// import { UserDataContextProvider } from "./Context/UserDataContext";

import Navbar from "./pages/global/components/Navbar";
import Footer from "./pages/global/components/Footer";
import LandingPage from "./pages/landing/landing";

import "./pages/styles/navbar/Navbar.css";
import "./pages/styles/footer/footer.css";

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
  return <LandingPage />;
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
