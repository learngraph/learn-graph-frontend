import { alpha, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Href } from "@src/shared/Components";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const headerText = (
    <Typography
      component="h2"
      variant="h2"
      sx={{
        display: "flex",
        flexDirection: { xs: "column" },
        fontSize: { xs: "40px", sm: "60px" },
        alignSelf: "center",
        textAlign: "center",
        color: theme.palette.common.white,
        "& strong": {
          color: theme.palette.primary.light,
        },
      }}
    >
      <Trans i18nKey="landing.header" />
    </Typography>
  );

  return (
    <Box
      id="hero"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // Vertical for mobile, horizontal for larger screens
        justifyContent: "center", // Align left and right sections
        alignItems: "center", // Align items to the top
        width: "fit-content", // Shrink to fit content
        height: "fit-content", // Adjust height based on content
        margin: "auto", // Center the container
        padding: theme.spacing(2), // Add spacing inside the container
        gap: theme.spacing(2), // Space between left and right sections
      }}
    >
      {/* Text Content on the Left */}
      <Box
        sx={{
          width: { xs: "90%", sm: "35%" }, // Full width for mobile, 35% for larger screens
          display: "flex",
          flexDirection: "column",
          padding: "30px 20px", // Add some padding
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          sx={{
            color: "white",
            textAlign: "left", // Align text to the left
          }}
        >
          {headerText}
        </Typography>

        <Typography
          variant="body1"
          textAlign="justify"
          sx={{
            color: "white",
            fontWeight: "bold",
            fontSize: { xs: "13px", sm: "17px" },
            marginTop: theme.spacing(1), // Add spacing between text
          }}
        >
          <Trans
            i18nKey="landing.intro"
            components={{
              linktodiscord: (
                <Href
                  href="https://discord.gg/DatEV4kNp6"
                  style={{
                    color: "blue",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                />
              ),
            }}
          />
        </Typography>
      </Box>

      {/* Image Content on the Right */}
      <Box
        sx={{
          width: { xs: "90%", sm: "50%" }, // Takes 65% of the total width
          display: "flex",
          flexDirection: "column", // Stack image and text vertically
          alignItems: "center", // Center contents horizontally
          gap: theme.spacing(2),
        }}
      >
        {/* Image */}

        <Box
          id="image"
          sx={{
            opacity: "90%",
            width: "100%",
            maxWidth: "750px", // Limit maximum width
            aspectRatio: "12 / 9", // Maintain aspect ratio
            backgroundImage:
              theme.palette.mode === "light"
                ? 'url("/screenshot_learngraph.png")'
                : 'url("/screenshot_learngraph.png")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover", // Ensure the image scales proportionally
            backgroundPosition: "center", // Center the image
            borderRadius: "10px", // Rounded corners
            boxShadow:
              theme.palette.mode === "light"
                ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
            ":hover": {
              cursor: "pointer",
            },
          }}
        />

        {/* Hint and Button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row", // Align text and button horizontally
            alignItems: "center",
            justifyContent: "center", // Center the row
            gap: theme.spacing(1), // Add spacing between text and button
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: "white",
              fontSize: { xs: "13px", sm: "17px" },
            }}
          >
            {t("landing.hintClickImage")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
