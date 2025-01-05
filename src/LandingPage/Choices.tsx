import { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "./Styles/ButtonStyles.css"; // Importing CSS file

export default function PersonalizedExperience() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setActiveOption(activeOption === option ? null : option);
  };
  const handleSubOptionClick = (path: string) => {
    navigate(path);
  };

  const renderSubOptions = (option: string): { label: string; path: string }[] => {
    switch (option) {
      case "Education Institute":
        return [
          { label: "University", path: "/EducationIns" },
          { label: "VHS", path: "/EducationIns" },
          { label: "School (Primary Education)", path: "/EducationIns" },
          { label: "Vocational Training Institution/Platform", path: "/EducationIns" },
          { label: "A School District", path: "/EducationIns" },
        ];
      case "Learner":
        return [
          { label: "A Researcher", path: "/Learner" },
          { label: "Looking for Vocational Training", path: "/Learner" },
          { label: "A Student, Pupil", path: "/Learner" },
        ];
      case "Foundation":
        return [
          { label: "Looking to Support Developmental Spaces", path: "/Foundation" },
          { label: "Looking to Support Education of the Disadvantaged", path: "/Foundation" },
        ];
      case "Business":
        return [
          { label: "An Education Project", path: "/Bussiness" },
          { label: "Looking for Up-Skilling / Transformation", path: "/Bussiness" },
        ];
      default:
        return [];
    }
  };

  const mainOptions: string[] = [
    "Education Institute",
    "Learner",
    "Foundation",
    "Business",
  ];

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centers the content vertically
        color: theme.palette.text.primary,
        backdropFilter: "blur(1px)", // Blurred background
        backgroundColor: "rgba(255, 255, 255, 0.2)", // Semi-transparent background
      }}
    >
      <Typography
        variant="h3"
        sx={{
          marginBottom: 4,
          color: "rgb(73, 255, 56)",
          fontWeight:"bold",
          textAlign: "center", // Center-aligns the text
        }}
      >
        Personalize Your Experience
      </Typography>
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          color: "black",
          textAlign: "center", // Center-aligns the text
        }}
      >
       I am a/an
      </Typography>
      {mainOptions.map((option) => (
        <Box
          key={option}
          sx={{
            marginBottom: 2,
            width: "100%",
            display: "flex",
            flexDirection: "column", // Ensures sub-buttons render below the parent
            alignItems: "center", // Centers all content in this box
          }}
        >
          <Button
            className="custom-button"
            onClick={() => handleButtonClick(option)}
          >
            {option}
          </Button>
          {activeOption === option && (
            <Box  sx={{
                marginTop: 2,
                width:"90%",
                padding:"10px",
                display: "flex",
                flexDirection: "column", // Ensures child buttons stack vertically
                alignItems: "center", // Centers child buttons
                gap: 1, // Adds space between the child buttons
              }}>
               {renderSubOptions(option).map((subOption) => (
                <Button
                  key={subOption.label}
                  className="custom-button"
                  onClick={() => handleSubOptionClick(subOption.path)}
                  sx={{
                    marginLeft:"50px",
                    width: "80%",
                  }}
                >
                  {subOption.label}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Container>
  );
}
