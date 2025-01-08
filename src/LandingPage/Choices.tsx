import React, { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import EducationInstituteGraph from "./Graphics/EduInsStruc";
import LearnerGraph from "./Graphics/LearnerStru";
import FoundationGraph from "./Graphics/FlundationStru";
import BusinessGraph from "./Graphics/BussinessStru";
import "./Styles/ButtonStyles.css";

export default function PersonalizedExperience() {
  const theme = useTheme();

  const [activeOption, setActiveOption] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setActiveOption(activeOption === option ? null : option);
  };

  const handleSubOptionClick = (url: string) => {
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  const renderSubOptions = (option: string): { label: string; path: string }[] => {
    switch (option) {
      case "Education Institute":
        return [
          { label: "University", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "VHS", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "School (Primary Education)", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "Vocational Training Institution/Platform", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "A School District", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
        ];
      case "Learner":
        return [
          { label: "A Researcher", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "Looking for Vocational Training", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "A Student, Pupil", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
        ];
      case "Foundation":
        return [
          { label: "Looking to Support Developmental Spaces", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "Looking to Support Education of the Disadvantaged", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
        ];
      case "Business":
        return [
          { label: "An Education Project", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
          { label: "Looking for Up-Skilling / Transformation", path: "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing" },
        ];
      default:
        return [];
    }
  };

  const mainOptions = [
    { label: "Education Institute", component: <EducationInstituteGraph /> },
    { label: "Learner", component: <LearnerGraph /> },
    { label: "Foundation", component: <FoundationGraph /> },
    { label: "Business", component: <BusinessGraph /> },
  ];

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: theme.palette.text.primary,
        backdropFilter: "blur(1px)",
        width:"100%",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: 4,
          color: "rgb(73, 255, 56)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Personalize Your Experience
      </Typography>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          color: "black",
          textAlign: "center",
        }}
      >
        I am a/an
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          margin:"auto",
          transition: "all 1s ease",
          
        }}
      >
        {mainOptions.map((option, index) => (
          <Box
            key={option.label}
            sx={{
              display: activeOption && activeOption !== option.label ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              transform: activeOption === option.label ? "scale(1.2)" : "scale(1)",
              opacity: activeOption && activeOption !== option.label ? 0 : 1,
                "&:hover": {
                transform: "scale(1.2)",
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Hover effect
              },
            }}
            onClick={() => handleButtonClick(option.label)}
          >
            {option.component}
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {option.label}
            </Typography>
          </Box>
        ))}
      </Box>
      {activeOption && (
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            transition: "opacity 0.5s ease",
          }}
        >
          {renderSubOptions(activeOption).map((subOption) => (
            <Box
              key={subOption.label}
              sx={{
                width: "80%",
                padding: "10px",
                textAlign: "center",
                border: "2px solid rgb(255, 85, 0)",
                borderRadius: "14px",
                cursor: "pointer",
                color: "white",
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "rgba(255, 255, 255, 0.3)", // Hover effect
              },
              }}
              onClick={() => handleSubOptionClick(subOption.path)}
            >
              {subOption.label}
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
}
