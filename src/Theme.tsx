import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { ReactNode } from "react";
import { useUserDataContext } from "./Context/UserDataContext";

export const ConfigurableTheme = ({ children }: { children: ReactNode }) => {
  const { theme: userSelectedTheme } = useUserDataContext();
  const theme = createTheme({
    palette: {
      mode: userSelectedTheme,
      warning: {
        main: "rgba(255,7,58,1.00)",
        contrastText: "#fff", // You may need to adjust the contrast text color
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
