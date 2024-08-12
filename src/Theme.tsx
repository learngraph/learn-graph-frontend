import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { useUserDataContext } from "./Context/UserDataContext";
import { PaletteMode } from "@mui/material";
import './index.css'


// TODO find out about how what things get affected bay what change in this definition

export const ConfigurableTheme = ({ children }: { children: ReactNode }) => {
  const { theme: userSelectedTheme } = useUserDataContext();
  const theme = createTheme(getDesignTokens(userSelectedTheme))
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};


const getDesignTokens = (mode: PaletteMode) => ({
  palette: {  
    mode,
    warning: {
      main: "rgba(255,7,58,1.00)",
      contrastText: "#fff", // You may need to adjust the contrast text color
    },
  },
  link: 
    mode === 'light' ? '' : 'custom-link', // defined in index.css 
})

