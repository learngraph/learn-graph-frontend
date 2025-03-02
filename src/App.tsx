import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { ConfigurableTheme } from "./Theme";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <UserDataContextProvider>
        <ConfigurableTheme>
          <LearngraphOrgRoutes />
        </ConfigurableTheme>
      </UserDataContextProvider>
    </BrowserRouter>
  );
};

export default App;
