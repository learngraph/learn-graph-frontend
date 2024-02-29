import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./Context/UserDataContext";
import { UserDataBackendContextProvider } from "./Context/UserDataBackendContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <UserDataContextProvider>
        <UserDataBackendContextProvider>
          <ThemeProvider theme={theme}>
            <LearngraphOrgRoutes />
          </ThemeProvider>
        </UserDataBackendContextProvider>
      </UserDataContextProvider>
    </BrowserRouter>
  );
};

export default App;
