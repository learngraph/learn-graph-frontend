import { Box, Typography } from "@mui/material";
import { FaLinkedin, FaInstagram, FaDiscord } from "react-icons/fa";
import Logo from "@src/logo";
export default function Footer() {
  const handleIconClick = (url: string) => {
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  return (
    <Box
      sx={{
        backgroundColor: "#28343e",
        color: "white",
        textAlign: "center",
        padding: "30px 10px 30px 10px",
        fontFamily: "Orbitron, sans-serif",
      }}
    >
      {/* Project Name */}
      <Logo />
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Orbitron, sans-serif",
          fontWeight: "bold",
          marginBottom: "10px",
          padding:"10px 0px"
        }}
      >
        LEARNGRAPH
      </Typography>

      {/* Social Media Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          padding:"15px 0px",
          marginBottom: "10px",
        }}
      >
        {/* LinkedIn Icon */}
        <FaLinkedin
          size={30}
          style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() =>
            handleIconClick("https://www.linkedin.com/company/learngraph")
          }
        />
        {/* Instagram Icon */}
        <FaInstagram
          size={30}
          style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() =>
            handleIconClick(
              "https://www.instagram.com/learngraph_org/?igsh=ZXNjeTRtYjNyOGd0",
            )
          }
        />
        {/* Discord Icon */}
        <FaDiscord
          size={30}
          style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onClick={() =>
            handleIconClick("https://discord.com/invite/DatEV4kNp6")
          }
        />
      </Box>

      {/* Contact Information */}
      <Box>
        <Typography variant="body2" sx={{ marginBottom: "5px" }}>
          Laurin Hagemann Oskar-Hoffmannstr. 134 44789, Bochum
        </Typography>
        <Typography
          variant="body2"
          component="a"
          href="mailto:contact@learngraph.org"
          sx={{
            color: "white",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          contact@learngraph.org
        </Typography>
      </Box>
     
    </Box>
  );
}
