import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Mail, Phone } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@emotion/react";

interface TeamMember {
  imageSrc: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  quote: string;
  linkedInUrl: string;
}

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 700,
        padding: 5,
        margin: "auto",
        borderTop: "5px solid blue",
        borderRadius: 3,
        textAlign: "center",
        position: "relative",
      }}
    >
      <Box
        component="img"
        src={member.imageSrc}
        alt={member.name}
        sx={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: -80,
          left: "50%",
          transform: "translateX(-50%)",
          border: "4px solid white",
          boxShadow: 2,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          marginTop: 6,
        }}
      >
        <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon sx={{ color: "black", fontSize: "2rem" }} />
        </a>
        <a href={`mailto:${member.email}`}>
          <Mail sx={{ color: "black", fontSize: "2rem" }} />
        </a>
        <a href={`tel:${member.phoneNumber}`}>
          <Phone sx={{ color: "black", fontSize: "2rem" }} />
        </a>
      </Box>
      <Typography
        variant="body1"
        fontStyle="italic"
        sx={{ marginTop: 2, fontSize: "17px" }}
      >
        "{member.quote}"
      </Typography>
      <Divider sx={{ marginTop: 2 }} />
      <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2 }}>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {member.description}
      </Typography>
    </Paper>
  );
};

const TeamSlider = () => {
  const { t } = useTranslation(); // ✅ Now inside a component!

  const teamMembers: TeamMember[] = [
    {
      imageSrc: "team-laurin.png",
      name: "Laurin Hagemann",
      description: t("about.team-Laurin"),
      email: "help@learngraph.org",
      phoneNumber: "+491638692006",
      quote: t("about.quote-Laurin"),
      linkedInUrl: "https://www.linkedin.com/in/laurin-hagemann/",
    },
    {
      imageSrc: "team-namatama.jpg",
      name: "Namatama Theresa Katanekwa",
      description: t("about.team-Namatama"),
      email: "help@learngraph.org",
      phoneNumber: "+491638692006",
      quote: t("about.quote-Nama"),
      linkedInUrl:
        "https://www.linkedin.com/in/namatama-theresa-katanekwa-5697b3196/",
    },
    {
      imageSrc: "team-efecan.jpeg",
      name: "Efecan Köse",
      description: t("about.team-Efecan"),
      email: "help@learngraph.org",
      phoneNumber: "+491638692006",
      quote: t("about.quote-Efecan"),
      linkedInUrl: "https://www.linkedin.com/in/efecan-k%C3%B6se-3b45a432a/",
    },
    {
      imageSrc: "team-talal.jpg",
      name: "Muhammad Talal",
      description: t("about.team-Talal"),
      email: "muhammad.talal@learngraph.org",
      phoneNumber: "+491638692006",
      quote: t("about.quote-Talal"),
      linkedInUrl: "https://www.linkedin.com",
    },
  ];

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      width="100%"
      maxWidth="500px"
      margin="auto"
    >
      <IconButton
        sx={{ position: "absolute", left: -50, zIndex: 2 }}
        onClick={handlePrev}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <TeamMemberCard member={teamMembers[index]} />
      <IconButton
        sx={{ position: "absolute", right: -50, zIndex: 2 }}
        onClick={handleNext}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default TeamSlider;
