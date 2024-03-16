// TODO(skep): translate this file!
import { Box } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";


export const LandingPage = () => {
  return (
    <NavigationWithContent
      withSideNavigation={false}
      content={
        <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
          <Hero />
        </Box>
      }
    />
  );
};
