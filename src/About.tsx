// TODO(skep): translate this file!
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Link as MuiLink,
  Toolbar,
  AppBar,
  Drawer,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {
  LEARNGRAPH_HEADER_TEXT,
  LearngraphLOGO,
} from "./GraphManager/Header/HeaderBar";
import { ReactNode, useState } from "react";
import LocaleManager from "./GraphManager/Header/LocaleManager";
import LoginManager from "./GraphManager/Header/LoginManager";

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};
const Href = (props: any) => {
  return <MuiLink {...props} target="_blank" rel="noopener noreferrer" />;
};

interface ListItemConfig {
  sectionID: string;
  buttonText: string;
}

const DisplayOnlyOnSmallScreen = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        display: { xs: "block", sm: "none" },
      }}
    >
      {children}
    </Box>
  );
};

const DisplayOnlyOnLargeScreen = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx: SxProps<Theme>;
}) => {
  return (
    <Box
      sx={{
        flexShrink: 0,
        display: { xs: "none", sm: "block" },
        height: "100vh",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export const About = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const menuPalette = theme.palette.info;
  const scrollToSectionID = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`no element '${sectionId}' found`);
    }
  };
  const goToAboutSection = (sectionId: string) => {
    setIsDrawerOpen(false);
    navigate(`/about#${sectionId}`);
    scrollToSectionID(sectionId);
  };
  const ListItemSectionLink = (conf: ListItemConfig) => {
    return (
      <ListItemButton
        component={Link}
        to={`/about#${conf.sectionID}`}
        sx={{ paddingLeft: 2 }}
        onClick={() => goToAboutSection(conf.sectionID)}
      >
        <ListItemText primary={`${conf.buttonText}`} />
      </ListItemButton>
    );
  };
  const ListItemSubSectionLink = (conf: ListItemConfig) => {
    return (
      <ListItemButton
        sx={{
          fontSize: "smaller",
          borderLeft: `1px solid ${menuPalette.contrastText}`,
        }}
      >
        <ListItemSectionLink {...conf} />
      </ListItemButton>
    );
  };
  const ListItemGlobalLink = (conf: {
    globalPath: string;
    buttonText: string;
  }) => {
    return (
      <ListItemButton
        component={Link}
        to={`/${conf.globalPath}`}
        sx={{ paddingLeft: 2 }}
      >
        <ListItemText primary={`${conf.buttonText}`} />
      </ListItemButton>
    );
  };
  const menuColors = {
    background: menuPalette.main,
    color: menuPalette.contrastText,
  };
  const navigationList = (
    <List>
      <ListItemGlobalLink globalPath="" buttonText={LEARNGRAPH_HEADER_TEXT} />
      <Divider sx={{ margin: "20px 0" }} />
      <ListItemSectionLink sectionID={"about"} buttonText={"About"} />
      <List sx={{ paddingLeft: 2 }}>
        <ListItemSubSectionLink
          sectionID={"gettinginvolved"}
          buttonText={"Getting Involved!"}
        />
      </List>
      <Divider sx={{ margin: "20px 0" }} />
      <DisplayOnlyOnSmallScreen>
        <Typography variant="overline">Settings</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 1,
            gap: 1,
          }}
        >
          <ListItemButton component={LocaleManager} />
          <ListItemButton component={LoginManager} />{" "}
          {/* FIXME(skep): alignment only works for LocaleManager, but not for LoginManager ¯\_(ツ)_/¯ */}
        </Box>
      </DisplayOnlyOnSmallScreen>
    </List>
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <DisplayOnlyOnSmallScreen>
              <Button
                sx={menuColors}
                variant="contained"
                startIcon={<MenuIcon />}
                onClick={() => setIsDrawerOpen(true)}
              />
              <Drawer
                anchor="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
              >
                {navigationList}
              </Drawer>
            </DisplayOnlyOnSmallScreen>
            <LearngraphLOGO
              onClick={() => navigate("/")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex" }}>
        <DisplayOnlyOnLargeScreen sx={{ ...menuColors }}>
          {navigationList}
        </DisplayOnlyOnLargeScreen>
        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          <TypographyMaxWidth variant="h4" gutterBottom id="about">
            About Us
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Our mission: Free education for everyone.
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Education goes beyond learning resources &mdash; learning requires
            to find a path through the map of knowledge of humankind. This map
            is the learngraph.
          </TypographyMaxWidth>

          <Divider sx={{ margin: "20px 0" }} />
          <TypographyMaxWidth variant="h5" gutterBottom id="gettinginvolved">
            Getting Involved!
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Join our{" "}
            <Href href="https://discord.gg/DatEV4kNp6">discord server</Href>!
          </TypographyMaxWidth>
        </Box>
      </Box>
    </>
  );
};
