import { GraphManager } from "./GraphManager/GraphManager";
import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link as MuiLink,
  Toolbar,
  AppBar,
} from "@mui/material";
import {LearngraphLOGO} from "./GraphManager/components/HeaderBar";

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};
const Href = (props: any) => {
  return <MuiLink {...props} target="_blank" rel="noopener noreferrer" />;
};

const About = () => {
  const navigate = useNavigate();
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
  const ListItemSectionLink = (conf: {
    sectionID: string;
    buttonText: string;
  }) => {
    return (
      <ListItem
        component={Link}
        to={`/about#${conf.sectionID}`}
        button
        sx={{ pl: 2 }}
        onClick={() => goToAboutSection(conf.sectionID)}
      >
        <ListItemText primary={`${conf.buttonText}`} />
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
        sx={{ pl: 2 }}
      >
        <ListItemText primary={`${conf.buttonText}`} />
      </ListItem>
    );
  };
  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <LearngraphLOGO />
      </Toolbar>
    </AppBar>
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          display: { xs: "none", sm: "none" /*"block"*/ }, // XXX(skep): disabled, since layout is not correct :(
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <List>
          <ListItemGlobalLink globalPath="" buttonText="Learn Graph" />
          <ListItemSectionLink sectionID={"about"} buttonText={"About"} />
          <List>
            <ListItemSectionLink
              sectionID={"gettinginvolved"}
              buttonText={"Getting Involved!"}
            />
          </List>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

        <TypographyMaxWidth variant="h4" gutterBottom id="about">
          About Us
        </TypographyMaxWidth>
        <TypographyMaxWidth paragraph>Our mission..</TypographyMaxWidth>

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

export const LearngraphOrg = () => {
  return (
    <Routes>
      <Route path="/about" Component={About} />
      <Route path="/" Component={GraphManager} />
      <Route
        path="*"
        element={
          <Navigate to="/" /> /*TODO(skep): should add "page not found"-page*/
        }
      />
    </Routes>
  );
};
