// TODO(skep): translate this file!
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Toolbar,
  AppBar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import {
  LEARNGRAPH_HEADER_TEXT,
  LearngraphLOGO,
} from "./GraphManager/Header/HeaderBar";

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
    navigate(`/about#${sectionId}`);
    scrollToSectionID(sectionId);
  };
  const ListItemSectionLink = (conf: ListItemConfig) => {
    return (
      <ListItem
        component={Link}
        to={`/about#${conf.sectionID}`}
        button
        sx={{ paddingLeft: 2 }}
        onClick={() => goToAboutSection(conf.sectionID)}
      >
        <ListItemText primary={`${conf.buttonText}`} />
      </ListItem>
    );
  };
  const ListItemSubSectionLink = (conf: ListItemConfig) => {
    return (
      <ListItem
        sx={{
          fontSize: "smaller",
          borderLeft: `1px solid ${menuPalette.contrastText}`,
        }}
      >
        <ListItemSectionLink {...conf} />
      </ListItem>
    );
  };
  const ListItemGlobalLink = (conf: {
    globalPath: string;
    buttonText: string;
  }) => {
    return (
      <ListItem
        component={Link}
        to={`/${conf.globalPath}`}
        button
        sx={{ paddingLeft: 2 }}
      >
        <ListItemText primary={`${conf.buttonText}`} />
      </ListItem>
    );
  };
  const menuColors = {
    background: menuPalette.main,
    color: menuPalette.contrastText,
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Box
              sx={{
                flexShrink: 0,
                display: { xs: "block", sm: "none" },
              }}
            >
              <Button
                sx={menuColors}
                variant="contained"
                startIcon={<MenuIcon />}
              />
            </Box>
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
        <Box
          sx={{
            flexShrink: 0,
            display: { xs: "none", sm: "block" },
            height: "100vh",
            ...menuColors,
          }}
        >
          <List>
            <ListItemGlobalLink
              globalPath=""
              buttonText={LEARNGRAPH_HEADER_TEXT}
            />
            <ListItemSectionLink sectionID={"about"} buttonText={"About"} />
            <List sx={{ paddingLeft: 2 }}>
              <ListItemSubSectionLink
                sectionID={"gettinginvolved"}
                buttonText={"Getting Involved!"}
              />
            </List>
          </List>
        </Box>
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
