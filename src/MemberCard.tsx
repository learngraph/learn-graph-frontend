import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Divider, useTheme} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Mail, Phone } from "@mui/icons-material";
import { useTranslation } from "react-i18next";


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
        maxWidth: 550,
        background: "linear-gradient(rgba(200, 200, 200, 0.4), rgba(150, 150, 150, 0.3))",
        padding: 5,
        margin: "30px auto",
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
          <LinkedInIcon sx={{ color: theme.palette.common.white, fontSize: "2rem" }} />
        </a>
        <a href={`mailto:${member.email}`}>
          <Mail sx={{ color:theme.palette.common.white, fontSize: "2rem" }} />
        </a>
        <a href={`tel:${member.phoneNumber}`}>
          <Phone sx={{ color: theme.palette.common.white, fontSize: "2rem" }} />
        </a>
      </Box>
      <Typography
        variant="body1"
        fontStyle="italic"
        sx={{ marginTop: 2, fontSize: "17px" ,color: theme.palette.common.white}}
      >
        "{member.quote}"
      </Typography>
      <Divider sx={{ marginTop: 2 }} />
      <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 2, color: theme.palette.common.white }}>
        {member.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.common.white }}>
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



  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="center"
      justifyContent="center"
     
      gap={4}
      flexWrap="wrap"
      width="100%"
    >
      {teamMembers.map((member, index) => (
        <TeamMemberCard key={index} member={member} />
      ))}
    </Box>
  );
};

export default TeamSlider;
