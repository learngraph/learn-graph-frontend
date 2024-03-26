// TODO(skep): translate this file!
import { Box, Typography } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import Highlights from "./LandingPage/Highlights";
import MissionStatement from "./LandingPage/MissionStatement";
import Crowdsourcing from "./LandingPage/Crowdsourcing";

export const LandingPage = () => {
  return (
    <NavigationWithContent
      withSideNavigation={false}
      content={
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            padding: 3,
            backgroundColor: theme.palette.background.default,
          })}
        >
          <Hero />
          <Box id="main-page-content">
            <MissionStatement />
            <Crowdsourcing />
            <Highlights />
            <Typography variant="h2">FAQ</Typography>
            <Typography variant="h2">Contact / Story</Typography>
          </Box>
        </Box>
      }
    />
  );
};
