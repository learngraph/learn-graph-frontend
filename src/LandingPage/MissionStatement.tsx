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
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
          whiteSpace: "pre-line",
        }}
      >
        <Typography variant="h2">
          {t("landing.missionStatementHeader")}
        </Typography>
        <Typography variant="body1" paragraph>
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
