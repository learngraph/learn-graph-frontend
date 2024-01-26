import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginManager from "./LoginManager";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SearchCallback, SearchField } from "./Search";
import LocaleManager from "./LocaleManager";

const BarItems = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

export interface HeaderBarProps {
  userInputCallback: SearchCallback;
}

export const LearngraphLOGO = (props: any) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ ...props.sx }}
      {...props}
    >
      Learn Graph
    </Typography>
  );
};

export default function HeaderBar(props: HeaderBarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ paddingY: isSmallScreen ? 2 : 0 }}>
          <LearngraphLOGO sx={{ display: { xs: "none", sm: "block" } }} />
          <BarItems sx={{ alignItems: "left" }}>
            <SearchField props={props} />
          </BarItems>
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* Note: This Box pushes other bar-items to the right */}
          <BarItems sx={{ alignItems: "right" }}>
            <LocaleManager />
            <LoginManager />
          </BarItems>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
