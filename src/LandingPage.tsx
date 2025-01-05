// TODO(skep): translate this file!
import { Box, Container, Typography } from "@mui/material";
import { NavigationWithContent } from "./Navigation";
import Hero from "./LandingPage/Hero";
import MissionStatement from "./LandingPage/MissionStatement";
import Crowdsourcing from "./LandingPage/Crowdsourcing";
import FAQ from "./LandingPage/FAQ";
import PersonalizedExperience from "./LandingPage/Choices";


export const LandingPage = () => {
  return (
    <Box
      sx={{
        backgroundImage: `url(/LGBG2.png)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // Ensures the background image stays fixed during scroll
        backgroundPosition: 'center',
        minHeight: '100vh', // Ensures the background covers the viewport
      }}
    >

    <NavigationWithContent
      alwaysDisplayNavDrawer={true}
      content={
        <Box
          component="main"
          sx={{display:"flex", margin:"auto", flexDirection:"column",padding:"2% 0px"}}
        >
          <Hero />
          <PersonalizedExperience/>
          <Box id="main-page-content" sx={{display:"flex",
             flexDirection:"column",
             textAlign:"center"  }}
              >
                <Container sx={{display:"flex", flexDirection:"row"}}>
                <Crowdsourcing />
                <Box sx={{display:"flex", flexDirection:"column",marginLeft:"-10px"}}>
                <MissionStatement />
                <FAQ />
                </Box>
                </Container>
                <Container sx={{display:"flex", flexDirection:"column",marginBottom:"30px"}}>
                <Typography
                    component="h2"
                    variant="h4"
                    color="text.primary"
                    sx={{color:"white"}}
                  >
                    Impressum
                  </Typography>
                  <Typography color="text.primary" sx={{color:"white"}}>
                    Laurin Hagemann <br />
                    Rechenerstr. 2 <br />
                    44787, Bochum <p />
                  </Typography>
                  <Typography
                    component="h3"
                    variant="h4"
                    color="text.primary"
                    sx={{color:"white"}}
                  >
                    Kontakt
                  </Typography>
                  <Typography color="text.primary" sx={{color:"white"}}>
                    Tel.: +491631925215 <br />
                    E-Mail: contact@learngraph.org
                  </Typography>
                  </Container>
                        
          </Box>
        </Box>
      }
    />
  </Box>
  );
};
