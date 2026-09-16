import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import DirectionController from "@/i18n/DirectionController";
import CookieBanner from "@/pages/global/components/CookieBanner";
import ImprintPage from "@/pages/legal/Imprint";
import GraphWebsite from "@/pages/graph/GraphWebsite";

const GRAPH_PATH =
  /^\/(platform|who-gets-to-learn|collaborate|about)(?:\/[^/]+){0,2}$/;

function isGraphPath(pathname: string): boolean {
  return pathname === "/" || GRAPH_PATH.test(pathname);
}

const ScrollToTop = (): null => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (isGraphPath(pathname)) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <DirectionController />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<GraphWebsite />} />
            <Route
              path="/about/access"
              element={<Navigate to="/who-gets-to-learn/access" replace />}
            />
            <Route
              path="/collaborate/learning-without-frontiers"
              element={
                <Navigate
                  to="/who-gets-to-learn/learning-without-frontiers"
                  replace
                />
              }
            />
            <Route
              path="/platform/sovereignty"
              element={
                <Navigate
                  to="/who-gets-to-learn/learning-sovereignty"
                  replace
                />
              }
            />
            <Route
              path="/collaborate/find-the-constraint"
              element={<Navigate to="/collaborate/services" replace />}
            />
            <Route
              path="/collaborate/reduce-manual-load"
              element={<Navigate to="/collaborate/services" replace />}
            />
            <Route
              path="/collaborate/build-the-offer"
              element={<Navigate to="/collaborate/services" replace />}
            />
            <Route path="/:territorySlug" element={<GraphWebsite />} />
            <Route
              path="/:territorySlug/:topicSlug"
              element={<GraphWebsite />}
            />
            <Route
              path="/:territorySlug/:clusterSlug/:topicSlug"
              element={<GraphWebsite />}
            />
            <Route
              path="/service/*"
              element={<Navigate to="/collaborate/services" replace />}
            />
            <Route path="/learn/*" element={<Navigate to="/" replace />} />
            <Route
              path="/schools"
              element={<Navigate to="/about/impact" replace />}
            />
            <Route
              path="/labour-market"
              element={<Navigate to="/platform/inclusive-learning" replace />}
            />
            <Route
              path="/individual"
              element={<Navigate to="/platform/using-learngraph" replace />}
            />
            <Route
              path="/university"
              element={<Navigate to="/who-gets-to-learn/access" replace />}
            />
            <Route
              path="/enterprise"
              element={<Navigate to="/platform/inclusive-learning" replace />}
            />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/imprint" element={<ImprintPage />} />
            <Route path="/impressum" element={<ImprintPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <CookieBanner />
    </BrowserRouter>
  );
}
