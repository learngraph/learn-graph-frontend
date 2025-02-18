// TODO(skep): translate this file!
import { Box, Typography, Divider, useTheme, Paper } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import { Handshake } from "@mui/icons-material";
import TeamSlider from "./MemberCard";

// Updated TeamMember component with 'role' prop

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};

export const About = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <NavigationWithContent
      withSideNavigation={true}
      content={
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            flexGrow: 1,
            padding: 3,
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              display: "flex",
              flexDirection: { sm: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: { sm: "95%", md: "50%", xs: "40%" },
              }}
            >
              <TypographyMaxWidth variant="h4" gutterBottom id="about">
                {t("about.headline-About-Us")}
              </TypographyMaxWidth>
              <Typography
                variant="body1"
                sx={{ textAlign: "justify", width: "97%" }}
              >
                {t("about.aboutLG-para")}
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundImage: 'url("/Inno.png")',
                width: { sm: "95%", md: "60%", xs: "60%" }, // Adjust the width for better layout
                height: { xs: "200px", sm: "450px" }, // Ensures the height of the box
                minWidth: "300px",
                minHeight: "200px",
                padding: theme.spacing(-10),
                borderRadius: "10px",
                backgroundSize: "contain", // Ensures the image covers the box
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundPosition: "center",
              }}
            ></Box>
          </Box>
          <Divider />
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              display: "flex",
              flexDirection: { sm: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                backgroundImage: 'url("/start.png")',
                width: { sm: "95%", md: "40%", xs: "40%" }, // Adjust the width for better layout
                height: { xs: "200px", sm: "450px" }, // Ensures the height of the box
                minWidth: "300px",
                minHeight: "200px",
                marginLeft: "-2%",
                padding: theme.spacing(-20),
                backgroundSize: "contain", // Ensures the image covers the box
                backgroundRepeat: "no-repeat", // Prevents tiling
                backgroundPosition: "center",
              }}
            ></Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <TypographyMaxWidth variant="h4" gutterBottom id="about">
                {t("about.Storyh")}
              </TypographyMaxWidth>
              <TypographyMaxWidth paragraph>
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
              sx={{ marginTop: theme.spacing(4) }}
            >
              {t("about.Our-Team")}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              id="whoarewe"
              sx={{ marginBottom: "100px" }}
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
            <TypographyMaxWidth variant="h4" gutterBottom id="whoarewe">
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
                  maxWidth: 440,
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
                    sx={{ color: "black", height: "35px", width: "35px" }}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  fontStyle="italic"
                  sx={{ marginTop: 2, textAlign: "justify" }}
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
  );
};
