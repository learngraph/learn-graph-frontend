import { ApolloProvider } from "@apollo/client";
import { GraphDataContextProvider } from "./GraphDataContext";
//import {ThemeProvider} from "@emotion/react";
//import { createTheme } from '@mui/material/styles';

import { GraphManagerContainer } from "./GraphManager/GraphManagerContainer";
import { client } from "./rpc/link";

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
      <ApolloProvider client={client}>
        <GraphDataContextProvider>
          <GraphManagerContainer />
        </GraphDataContextProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
