import { Container, Typography } from "@mui/material";

export default function BusinessPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4">Business Page</Typography>
    </Container>
  );
}
