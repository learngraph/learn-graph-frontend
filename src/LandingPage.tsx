// TODO(skep): translate this file!
import { Box, Container } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import Footer from "./LandingPage/Footer";
import PersonalizedExperience from "./LandingPage/Choices";

export const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/LGBG2.png)`, // Overlay + Image
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed", // Keeps the background fixed during scroll
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures the background covers the viewport
      }}
    >
      <NavigationWithContent
        alwaysDisplayNavDrawer={true}
        content={
          <Box
            component="main"
            sx={{
              display: "flex",
              margin: "auto",
              flexDirection: "column",
              padding: "0px 0px",
            }}
          >
            <Hero />
            <PersonalizedExperience />
            <Box
              id="main-page-content"
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <Container sx={{ display: "flex", flexDirection: "row" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "-10px",
                  }}
                >
                  <MissionStatement />
                </Box>
              </Container>
            </Box>
          </Box>
        }
      />
      <Footer />
    </Box>
  );
};
