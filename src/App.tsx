import { BrowserRouter } from "react-router-dom";
import { UserDataContextProvider } from "./UserDataContext";
import { UserDataBackendContextProvider } from "./UserDataBackendContext";
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
