// TODO(skep): translate this file!
import { Box } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import Crowdsourcing from "./LandingPage/Crowdsourcing";
import FAQ from "./LandingPage/FAQ";

export const LandingPage = () => {
  return (
    <NavigationWithContent
      alwaysDisplayNavDrawer={true}
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
            <FAQ />
          </Box>
        </Box>
      }
    />
  );
};
