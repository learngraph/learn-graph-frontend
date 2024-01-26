import { GraphManager } from "./GraphManager/GraphManager";
import { Navigate, Route, Routes } from "react-router-dom";
import { About } from "./About";

export const LearngraphOrgRoutes = () => {
  return (
    <Routes>
      <Route path="/about" Component={About} />
      <Route path="/" Component={GraphManager} />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};
