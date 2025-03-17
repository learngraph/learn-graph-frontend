import { alpha, Box, Container, Typography, useTheme } from "@mui/material";
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
        flexDirection: { xs: "column", sm: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center", // Centers the content horizontally
        gap: 4, // Adds spacing between the two boxes
        textAlign: "center",
      }}
    >
      {/* Box for the Image */}
      <Box
        sx={{
          width: { sm: "95%", md: "60%", xs: "90%" }, // Adjust the width for better layout
          height: { xs: "200px", sm: "350px" }, // Ensures the height of the box
          minWidth: "300px",
          minHeight: "200px",
          borderRadius: theme.spacing(4),
          backgroundImage: `url(/missionst1.png)`,
          backgroundSize: "cover", // Ensures the image covers the box
          backgroundRepeat: "no-repeat", // Prevents tiling
          backgroundPosition: "center",
          boxShadow:
            theme.palette.mode === "light"
              ? `0 0 12px 8px ${alpha("#9CCCFC", 0.7)}`
              : `0 0 24px 12px ${alpha("#033363", 0.7)}`,
        }}
      ></Box>

      {/* Box for the Text */}
      <Box
        sx={{
          width: { sm: "90%", md: "40%" }, // Matches the width with the image box
          textAlign: "center", // Centers the text inside the box
          backgroundColor: alpha(theme.palette.common.black, 0.7),
          borderRadius: theme.spacing(4),
          padding: theme.spacing(3),
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: theme.palette.common.white,
            fontSize: { xs: "40px", sm: "60px" },
          }}
        >
          {t("landing.missionStatementHeader")}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: theme.palette.common.white,
            textAlign: "justify",
            fontWeight: "bold",
            fontSize: { xs: "13px", sm: "17px" },
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

        {/* Podcast Alternative */}
        <Box sx={{ mt: theme.spacing(2) }}>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.common.white,
              fontWeight: "bold",
            }}
          >
            {t("landing.podcastAlternative")}
          </Typography>
          <audio
            controls
            style={{ width: "100%", marginTop: theme.spacing(1) }}
          >
            <source src="/mission-podcast.mp3" type="audio/mp3" />
            Your browser does not support the audio element.
          </audio>
        </Box>
      </Box>
    </Container>
  );
}
