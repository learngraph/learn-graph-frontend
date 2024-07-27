import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { useUserDataContext } from "./Context/UserDataContext";
// import { Palette } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

// TODO find out about how what things get affected bay what change in this definition

export const ConfigurableTheme = ({ children }: { children: ReactNode }) => {
  const { theme: userSelectedTheme } = useUserDataContext();
  const theme = createTheme(getDesignTokens(userSelectedTheme))
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};


const mainLight = '#1976d2'
const mainDark = "#ff9800"

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    ? {
        // palette values for light mode
        primary: {main: mainLight},
        //divider: grey[100],
        text: {
          //primary: grey[900],
          //secondary: grey[800],
        },
      }
    : {
        // palette values for dark mode
        primary: {main: mainDark},
        //divider: deepOrange[700],
        // background: {
        //   default: deepOrange[900],
        //   paper: deepOrange[900],
        // },
        text: {
          primary: '#fff',
          secondary: grey[500],
        },
      }),
      warning: {
        main: "rgba(255,7,58,1.00)",
        contrastText: "#fff", // You may need to adjust the contrast text color
      },
  }
})


// const theme = createTheme({
//   palette: {
//     mode: userSelectedTheme,
//     primary: {
//       main: userSelectedTheme === "dark" ? mainDark: mainLight}, //this retains the mui default for light mode but changes it for dark mode 
//     // secondary: {
//     //   main: 
//     // }
//   },
//   typography: {
//     fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//     fontSize: 14, //default value
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           //borderRadius: 8, // Example customization: rounded corners for buttons
//         },
//       },
//     },
//   },
// });