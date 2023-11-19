import { GraphManagerContainer } from "./GraphManager/GraphManagerContainer";
import { GraphDataContextProvider } from "./GraphDataContext";
import { UserDataContextProvider } from "./UserDataContext";
//import {ThemeProvider} from "@emotion/react";
//import { createTheme } from '@mui/material/styles';

//const theme = createTheme({
//  palette: {
//    mode: 'dark',
//  },
//});

export const App = () => {
  //<ThemeProvider theme={theme}>
  //</ThemeProvider>
  return (
    <>
      <UserDataContextProvider>
        <GraphDataContextProvider>
          <GraphManagerContainer />
        </GraphDataContextProvider>
      </UserDataContextProvider>
    </>
  );
};

export default App;
