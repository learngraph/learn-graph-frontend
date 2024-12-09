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
        alignSelf: "center",
        textAlign: "center",
        color:"white",
        "& strong": {
          color:"#0bfc03"},
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
    flexDirection: "row",
    justifyContent: "center", // Align left and right sections
    alignItems: "center", // Align items to the top
    width: "fit-content", // Shrink to fit content
    height: "fit-content", // Adjust height based on content
    margin: "auto", // Center the container
    padding: "20px", // Add spacing inside the container
   
    gap: "20px", // Space between left and right sections
  }}
>
  {/* Text Content on the Left */}
  <Box
    sx={{
      width: "35%", // Takes 35% of the total width
      display: "flex",
      
      flexDirection: "column",
      padding: "30px 20px", // Add some padding
      backdropFilter: "blur(1px)", // Blurred background
      backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      borderRadius: "10px", // Rounded corners
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
        marginTop: "10px", // Add spacing between text
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
      width: "50%", // Takes 65% of the total width
      display: "flex",
      flexDirection: "column", // Stack image and text vertically
      alignItems: "center", // Center contents horizontally
      gap: "20px", 
    }}
  >
    {/* Image */}
   
    <Box
      id="image"
      sx={{
        opacity:"90%",
        width: "100%",
        maxWidth: "750px", // Limit maximum width
        aspectRatio: "12 / 9", // Maintain aspect ratio
        backgroundImage:
          theme.palette.mode === "light"
            ? 'url("/GraphSC1.PNG")'
            : 'url("/GraphSC1.PNG")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // Ensure the image scales proportionally
        backgroundPosition: "center", // Center the image
        borderRadius: "10px", // Rounded corners
        boxShadow:
          theme.palette.mode === "light"
            ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
            : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
      }}
    />
  
    {/* Hint and Button */}
    <Box
      sx={{
        display: "flex",
        flexDirection: "row", // Align text and button horizontally
        alignItems: "center",
        justifyContent: "center", // Center the row
        gap: "10px", // Add spacing between text and button
      }}
    >
      <Typography variant="body1" sx={{ color: "white" }}>
        {t("landing.hintClickImage")}
      </Typography>
      <Button
        onClick={() => navigate("/graph")}
        variant="contained"
        sx={{
          background: "none",
          border: "0.5px solid gray",
          font: "caption",
        }}
      >
        {t("landing.buttonGoToGraph")}
      </Button>
    </Box>
  </Box>
</Box>

  );  
}
