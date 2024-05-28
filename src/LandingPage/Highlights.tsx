// TODO(skep): translate this file
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

const getItems = (t: TFunction<"translation", undefined>) => [
  {
    icon: <FlagRoundedIcon />,
    title: t("landing.highlights.independence"),
    description: t("landing.highlights.independentFromEducationalInstitutions"),
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: t("landing.highlights.control"),
    description: t("landing.highlights.controlOfYourLearningPath"),
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: t("landing.highlights.availability"),
    // TODO(skep): add branding to "Learngraph.org" string
    description: t("landing.highlights.accessibleLowEntryBarrier"),
  },
  {
    description: t("landing.highlights.noAttendanceExamsFees"),
  },
  {
    description: t("landing.highlights.youControlHowMuchWhenAndHow"),
  },
  {
    // TODO(skep): "get started" should link to /howto page or some tutorial/introduction page
    description: t("landing.highlights.openAndEasyStart"),
  },
];

export default function Highlights() {
  const { t } = useTranslation();
  const items = getItems(t);

  return (
    <Box
      id="highlights"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: "white",
        bgcolor: "#06090a",
      }}
    >
      <Container
        sx={{
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
          }}
        >
          <Typography component="h2" variant="h4">
            Highlights
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "grey.400", whiteSpace: "pre-line" }}
          >
            {"Learngraph.org is not just another learning platform.\n"}
          </Typography>
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: "100%",
                  border: "1px solid",
                  borderColor: "grey.800",
                  background: "transparent",
                  backgroundColor: "grey.900",
                }}
              >
                <Box sx={{ opacity: "50%" }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.400", whiteSpace: "pre-line" }}
                  >
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
