import { Box, Container, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

export default function Crowdsourcing() {
  const { t } = useTranslation();
  return (
    <Container
      id="crowdsourcing"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
          whiteSpace: "pre-line",
        }}
      >
        <Typography variant="h2">{t("landing.crowdsourcingHeader")}</Typography>
        <Typography variant="body1" paragraph>
          <Trans i18nKey="landing.crowdsourcingExplanation" />
        </Typography>
        <Typography variant="body1" paragraph>
          <Trans i18nKey="landing.crowdsourcingCallToAction" />
        </Typography>
      </Box>
    </Container>
  );
}
