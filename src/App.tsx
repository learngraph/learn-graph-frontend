import { BrowserRouter as Router } from "react-router-dom";
import { GraphDataContextProvider } from "./GraphDataContext";
import { UserDataContextProvider } from "./UserDataContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme";
import { LearngraphOrg } from "./LearngraphOrg";

export const App = () => {
  return (
    <Router>
      <UserDataContextProvider>
        <GraphDataContextProvider>
          <ThemeProvider theme={theme}>
            <LearngraphOrg />
          </ThemeProvider>
        </GraphDataContextProvider>
      </UserDataContextProvider>
    </Router>
  );
};

export default App;
