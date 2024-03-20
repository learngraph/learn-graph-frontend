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

const items = [
  {
    icon: <FlagRoundedIcon />,
    title: "Independence",
    description: "You are independent of educational institutions!",
  },
  {
    icon: <ConstructionRoundedIcon />,
    title: "Control",
    description:
      "You're in control of your learning path, and you can choose every step.",
  },
  {
    icon: <ThumbUpAltRoundedIcon />,
    title: "Availability",
    // TODO(skep): add branding to "Learngraph.org" string
    description: `Learngraph.org is available — you have an extremely low entry barrier!`,
  },
  {
    description: "No need for attendance, exams, fees!",
  },
  {
    description: "You control how much you learn, when, how fast.",
  },
  {
    // TODO(skep): "get started" should link to /howto page or some tutorial/introduction page
    description: "Anyone can sign up, and its easy to get started.",
  },
];

export default function Highlights() {
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
          <Typography variant="body1" sx={{ color: "grey.400" }}>
            Learngraph.org is not just another learning platform.
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
                  <Typography variant="body2" sx={{ color: "grey.400" }}>
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
