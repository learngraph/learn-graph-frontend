import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { useUserDataContext } from "./Context/UserDataContext";
import { grey, orange } from "@mui/material/colors";
import { PaletteMode } from "@mui/material";

// TODO find out about how what things get affected bay what change in this definition

export const ConfigurableTheme = ({ children }: { children: ReactNode }) => {
  const { theme: userSelectedTheme } = useUserDataContext();
  const theme = createTheme(getDesignTokens(userSelectedTheme))
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};


const mainDark = "#ff9800"
const secondaryDark = '#ed9e28'
// const SoftBlue= '#647AD8' 
// const LightPeriwinkle ='#ADB4E7' // wikipedia link colors in dark mode 

// const mainLight = '#1976d2'

// see https://mui.com/material-ui/customization/dark-mode/
// What colors have been used/ defined so far?
// palette.info in Navigation.tsx
// palette.primary in Navigation PopUp and Hero
// palette.secondary in PopUp
// palette.background.default in About HowToLearngraph LandingPage Hero
// [...] search for theme.palette.

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    ? {
        // palette values for light mode
        primary: orange,
        secondary: {main: secondaryDark},
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

