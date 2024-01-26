import { BrowserRouter } from "react-router-dom";
import { GraphDataContextProvider } from "./GraphDataContext";
import { UserDataContextProvider } from "./UserDataContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme";
import { LearngraphOrgRoutes } from "./LearngraphOrgRoutes";

export const App = () => {
  return (
    <BrowserRouter>
      <UserDataContextProvider>
        <GraphDataContextProvider>
          <ThemeProvider theme={theme}>
            <LearngraphOrgRoutes />
          </ThemeProvider>
        </GraphDataContextProvider>
      </UserDataContextProvider>
    </BrowserRouter>
  );
};

export default App;
