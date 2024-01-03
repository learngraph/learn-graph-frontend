import { GraphManager } from "./GraphManager/GraphManager";
import { GraphDataContextProvider } from "./GraphDataContext";
import { UserDataContextProvider } from "./UserDataContext";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./Theme";

export const App = () => {
  return (
    <>
      <UserDataContextProvider>
        <GraphDataContextProvider>
          <ThemeProvider theme={theme}>
            <GraphManager />
          </ThemeProvider>
        </GraphDataContextProvider>
      </UserDataContextProvider>
    </>
  );
};

export default App;
