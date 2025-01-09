import { Box, Container, Typography, useTheme } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

export default function Crowdsourcing() {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Container
      id="crowdsourcing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
          textAlign: { sm: "left", md: "center" },
          whiteSpace: "pre-line",
        }}
      >
        <Typography variant="h2" sx={{ color: "white" }}>
          {t("landing.crowdsourcingHeader")}
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: theme.palette.primary.contrastText,
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          <Trans i18nKey="landing.crowdsourcingExplanation" />
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{
            color: theme.palette.primary.contrastText,
            textAlign: "left",
            fontWeight: "bold",
          }}
        >
          <Trans i18nKey="landing.crowdsourcingCallToAction" />
        </Typography>
      </Box>
    </Container>
  );
}
