import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          gap: 2,
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            component="h1"
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column" },
              alignSelf: "center",
              textAlign: "center",
            }}
          >
            {t("landing.header")}&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                color: (theme) =>
                  theme.palette.mode === "light"
                    ? "primary.main"
                    : "primary.light",
              }}
            >
              {t("landing.headerHighlight")}.
            </Typography>
          </Typography>
          <Typography
            variant="body1"
            textAlign="center"
            color="text.secondary"
            sx={{ whiteSpace: "pre-line" }}
          >
            {t("landing.intro")}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Link to="/graph">
            <Box
              id="image"
              sx={(theme) => ({
                mt: { xs: 8, sm: 10 },
                alignSelf: "center",
                height: { xs: 200, sm: 700 },
                width: "100%",
                backgroundImage:
                  theme.palette.mode === "light"
                    ? 'url("/public/screenshot_learngraph.png")'
                    : 'url("/public/screenshot_learngraph.png")',
                backgroundSize: "cover",
                borderRadius: "10px",
                outline: "1px solid",
                outlineColor:
                  theme.palette.mode === "light"
                    ? alpha("#BFCCD9", 0.5)
                    : alpha("#9CCCFC", 0.1),
                boxShadow:
                  theme.palette.mode === "light"
                    ? `0 0 12px 8px ${alpha("#9CCCFC", 0.2)}`
                    : `0 0 24px 12px ${alpha("#033363", 0.2)}`,
              })}
            />
          </Link>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            alignItems={"center"}
            sx={{
              width: { xs: "100%", sm: "auto" },
            }}
          >
            <Typography variant="body1">
              {t("landing.hintClickImage")}
            </Typography>
            <Button
              onClick={() => navigate("/graph")}
              variant="contained"
              color="primary"
            >
              {t("landing.buttonGoToGraph")}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
