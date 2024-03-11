import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { UserDataBackendContextProvider } from "./Context/UserDataBackendContext";
import { ConfigurableTheme } from "./Theme";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <UserDataContextProvider>
        <UserDataBackendContextProvider>
          <ConfigurableTheme>
            <LearngraphOrgRoutes />
          </ConfigurableTheme>
        </UserDataBackendContextProvider>
      </UserDataContextProvider>
    </BrowserRouter>
  );
};

export default App;
