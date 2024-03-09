import { styled, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ControllerRef } from "@src/GraphManager/GraphManager";
import LoginManager from "./LoginManager";
import { SearchCallback, SearchField } from "./Search";
import LocaleManager from "./LocaleManager";

const BarItems = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

export interface HeaderBarProps {
  search?: SearchBarProps;
}

export interface SearchBarProps {
  // userInputCallback is called with each key-stroke of the user, and always
  // given the full user-input. When "Enter" key is pressesd, the user-input
  // get's called with the user-input and an appended "\n"!
  userInputCallback: SearchCallback;
  controllerRef: ControllerRef;
}

export const LEARNGRAPH_HEADER_TEXT = "Learn Graph";

export const LearngraphLOGO = (props: any) => {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ ...props.sx }}
      {...props}
    >
      {LEARNGRAPH_HEADER_TEXT}
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
          {props.search ? (
            <BarItems sx={{ alignItems: "left" }}>
              <SearchField props={props.search!} />
            </BarItems>
          ) : null}
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
