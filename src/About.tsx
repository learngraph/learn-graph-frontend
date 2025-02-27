// TODO(skep): translate this file!
import { Box, Typography, Divider, useTheme, Paper} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import { Handshake} from "@mui/icons-material";
import Startingpoint from "./LandingPage/Startingpoint";
import TeamSlider from "./MemberCard";
import Footer from "./LandingPage/Footer";

// Updated TeamMember component with 'role' prop

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};

export const About = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
       <Box >
          <NavigationWithContent
        alwaysDisplayNavDrawer={true}
        content={
        <Box
          component="main"
          sx={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(/LGBG2.png)`, // Overlay + Image
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundAttachment: "fixed", // Keeps the background fixed during scroll
            backgroundPosition: "center",
            minHeight: "100vh", // Ensures the background covers the viewport
        
            flexGrow: 1,
            padding: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              margin: "40px auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding:"10px 10%",
                width: { sm: "95%", md: "50%", xs: "40%" },
              }}
            >
              <TypographyMaxWidth variant="h4" gutterBottom id="about"
              color={theme.palette.common.white}
              fontWeight="bold"
              >
                {t("about.headline-About-Us")}
              </TypographyMaxWidth>
              <Typography
                variant="body1"
                sx={{ 
                  textAlign: "justify",
                  width: "97%",
                  fontSize:theme.spacing(2),
                  fontWeight:"bold",

                 }}
                color={theme.palette.common.white}
              >
                {t("about.aboutLG-para")}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage: 'url("/Inno.png")',
                width: { sm: "95%", md: "60%", xs: "60%" }, // Adjust the width for better layout
                minWidth: "300px",
                minHeight: "400px",
                padding:"10px -10%",
                borderRadius: "10px",
                margin:"5px 5% 10px 10px",
                backgroundSize: "contain", // Ensures the image covers the box
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              flexDirection: { sm: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                width: { sm: "50%", md: "40%", xs: "40%" }, // Adjust the width for better layout
                height: { xs: "200px", sm: "450px" }, // Ensures the height of the box
                minWidth: "50%",
                minHeight: "200px",
                marginLeft: "-2%",
                padding: theme.spacing(2),
               
              }}
            >
              <Startingpoint/>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding:"10px 10%"
              }}
            >
              <TypographyMaxWidth variant="h4" gutterBottom id="about"
               color={theme.palette.common.white}
               fontWeight="bold"
              >
                {t("about.Storyh")}
              </TypographyMaxWidth>
              <TypographyMaxWidth paragraph 
               color={theme.palette.common.white}
               sx={{ 
                textAlign: "justify",
                width: "97%",
                fontSize:theme.spacing(2),
                fontWeight:"bold",

               }}
              >
                <Trans i18nKey="about.Storyp" />
              </TypographyMaxWidth>
            </Box>
          </Box>
          <Divider />

          <Box
            position="relative"
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              id="whoarewe"
              sx={{ marginTop: theme.spacing(4),
                fontWeight:"bold"
               }}
              color={theme.palette.common.white}
            >
              {t("about.Our-Team")}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              id="whoarewe"
              sx={{ 
                marginBottom: theme.spacing(10),
                fontWeight:"bold",
                fontSize:theme.spacing(2)


              }}
              color={theme.palette.common.white}
            >
              {t("about.Our-Team-text")}
            </Typography>
            {/* SwipeableDrawer */}

            <TeamSlider />

            {/* Right Arrow */}
          </Box>
          <Box
            position="relative"
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginTop: "60px" }} />
            <TypographyMaxWidth variant="h4" gutterBottom id="whoarewe"
            color="white"
            fontWeight="bold"
            >
              {t("about.headline-travel-group")}
              
            </TypographyMaxWidth>
            <Box
              sx={{
                marginTop: 9,
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  maxWidth: 550,
                  background: "linear-gradient(rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.3))",
                  padding: 4,
                  margin: "auto",
                  borderTop: "5px solid blue",
                  borderRadius: 3,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src="team-placeholder.png"
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    objectFit: "cover",
                    position: "absolute",
                    top: -80,
                    left: "50%",
                    transform: "translateX(-50%)",
                    border: "4px solid white",
                    boxShadow: 2,
                  }}
                />
                <Box
                  sx={{
                    paddingBottom: 5,
                    paddingTop: 4,
                  }}
                />
                <Typography
                  component="a"
                  href="mailto:jobs@learngraph.org"
                  sx={{ color: "blue", textDecoration: "underline" }}
                >
                  <Handshake
                    sx={{ color: theme.palette.common.white, height: "35px", width: "35px" }}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  fontStyle="italic"
                  sx={{ marginTop: 2, textAlign: "justify",color: theme.palette.common.white,}}
                >
                  {t("about.team-placeholder-description")}
                </Typography>
              </Paper>
            </Box>
          </Box>

          <Divider sx={{ margin: "20px 0" }} />
         
        </Box>
       
       
      }
      />
       <Box>
           <Footer/>
        </Box>
      </Box>
  );
};
