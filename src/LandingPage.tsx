// TODO(skep): translate this file!
import { Box, Typography } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import Highlights from "./LandingPage/Highlights";

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
            backgroundColor: theme.palette.common.black,
          })}
        >
          <Hero />
          <Box id="mainPageContent">
            <Typography variant="h2">Mission Statement</Typography>
            <Typography variant="h2">How it works / Call to Action</Typography>
            {/*<Typography variant="h2">Benefits / USP</Typography>*/}
            <Highlights />
            <Typography variant="h2">FAQ</Typography>
            <Typography variant="h2">Contact / Story</Typography>
          </Box>
        </Box>
      }
    />
  );
};
