import { Box, Container, Typography, useTheme } from "@mui/material";
import { Href } from "@src/shared/Components";
import { Trans, useTranslation } from "react-i18next";

export default function MissionStatement() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container
      id="mission-statement"
      sx={{
        pt: { xs: 10, sm: 2 },
        pb: { xs: 10, sm: 10 },
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Centers the content horizontally
        gap: 4, // Adds spacing between the two boxes
        color: theme.palette.primary.contrastText,
        textAlign: "center",
      }}
    >
      {/* Box for the Image */}
      <Box
        sx={{
          width: { sm: "95%", md: "60%" }, // Adjust the width for better layout
          height: "350px", // Ensures the height of the box
          borderRadius: "10px",
          backgroundImage: `url(/missionst1.png)`,
          backgroundSize: "cover", // Ensures the image covers the box
          backgroundRepeat: "no-repeat", // Prevents tiling
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Box for the Text */}
      <Box
        sx={{
          width: { sm: "90%", md: "40%" }, // Matches the width with the image box
          textAlign: "center", // Centers the text inside the box
        }}
      >
        <Typography
          variant="h2"
          sx={{ color: theme.palette.primary.contrastText }}
        >
          {t("landing.missionStatementHeader")}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: theme.palette.primary.contrastText,
            textAlign: "justify",
            fontWeight: "bold",
          }}
        >
          <Trans
            i18nKey="landing.missionStatementText"
            components={{
              linktowhitepaper: (
                <Href href="https://drive.google.com/file/d/1_ZhbhKRd9Uh6hH1MC7ZTF5rPLxvTz4bB/view?usp=sharing" />
              ),
            }}
          />
        </Typography>
      </Box>
    </Container>
  );
}
