import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { useUserDataContext } from "./Context/UserDataContext";

const mainLight = '#1976d2'
const mainDark = "#ff9800"
// TODO find out about how what things get affected bay what change in this definition

export const ConfigurableTheme = ({ children }: { children: ReactNode }) => {
  const { theme: userSelectedTheme } = useUserDataContext();
  const theme = createTheme({
    palette: {
      mode: userSelectedTheme,
      warning: {
        main: "rgba(255,7,58,1.00)",
        contrastText: "#fff", // You may need to adjust the contrast text color
      },
      primary: {
        main: userSelectedTheme === "dark" ? mainDark: mainLight}, //this retains the mui default for light mode but changes it for dark mode 
      // secondary: {
      //   main: 
      // }
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14, //default value
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            //borderRadius: 8, // Example customization: rounded corners for buttons
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
