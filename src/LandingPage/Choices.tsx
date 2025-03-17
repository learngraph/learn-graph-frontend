import { useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import EducationInstituteGraph from "./Graphics/EduInsStruc";
import LearnerGraph from "./Graphics/LearnerStru";
import FoundationGraph from "./Graphics/FlundationStru";
import BusinessGraph from "./Graphics/BussinessStru";
import { ArrowBack } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import "./Styles/ButtonStyles.css";

export default function PersonalizedExperience() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);
  const [activeOption, setActiveOption] = useState<string | null>(null);

  const handleButtonClick = (option: string) => {
    setActiveOption(activeOption === option ? null : option);
  };

  const handleArrowClick = () => {
    setActiveOption(null); // Reset active option
  };

  const handleSubOptionClick = (url: string) => {
    window.open(url, "_blank"); // Opens the link in a new tab
  };

  const EDU_INSTITUTE_PITCH =
    "https://drive.google.com/file/d/12SuoMcRlDZXLiwckVivs99sI5_m3wvMN/view";
  const LEARNING_PLATFORM_PITCH =
    "https://docs.google.com/document/d/1DklXZCpAmaBateIyE7Jt25D8n8aRsbvTDLIFqaGCFUA/edit?usp=sharing";
  const NON_PROFIT_PITCH =
    "https://docs.google.com/document/d/17MH24VA5NNUEjeNJJlN-wWQ7EKB8lplIQVDOJs9cyzE/edit?usp=sharing";
  const UP_SKILLING_PITCH =
    "https://docs.google.com/document/d/1xPWnLTym_kgKpvWXplb983c1HJiNyVoE96sf-KgZTAU/edit?usp=sharing";
  const PERSONALIZED_EDUCATION_PITCH =
    "https://docs.google.com/document/d/1xPWnLTym_kgKpvWXplb983c1HJiNyVoE96sf-KgZTAU/edit?usp=sharing";
  const DELIBERATELY_DEVELOPMENTAL_SPACES_PITCH =
    "https://drive.google.com/file/d/1_ZhbhKRd9Uh6hH1MC7ZTF5rPLxvTz4bB/view?usp=sharing";
  const PUBLISHING_COMPANY_PITCH =
    "https://docs.google.com/document/d/1-LM7SL13OlEJAUo-XmgXfUvXS5r3mm3nGr4iSU8zRUY/edit?usp=sharing";
  const POLITICAL_EDU_PITCH =
    "https://docs.google.com/document/d/1Ik3TinEIBwSYe8YOMXJWASLcAwFTnagXlRxWKuMN8iM/edit?usp=sharing";

  const renderSubOptions = (
    option: string,
  ): { label: string; path: string }[] => {
    switch (option) {
      case t("choices.firsttype"):
        return [
          {
            label: "University",
            path: EDU_INSTITUTE_PITCH,
          },
          {
            label: "Vocational Education & Training",
            path: EDU_INSTITUTE_PITCH,
          },
          {
            label: "Learning-Platform",
            path: LEARNING_PLATFORM_PITCH,
          },
          {
            label: "K-12",
            path: EDU_INSTITUTE_PITCH,
          },
        ];
      case t("choices.secondtype"):
        return [
          {
            label: "Looking for Vocational Training",
            path: PERSONALIZED_EDUCATION_PITCH,
          },
          {
            label: "A Researcher",
            path: PERSONALIZED_EDUCATION_PITCH,
          },
          {
            label: "A Student, Pupil",
            path: PERSONALIZED_EDUCATION_PITCH,
          },
        ];
      case t("choices.thirdtype"):
        return [
          {
            label: "Looking to Support Education of the Disadvantaged",
            path: NON_PROFIT_PITCH,
          },
          {
            label: "Looking to Support Developmental Spaces",
            path: DELIBERATELY_DEVELOPMENTAL_SPACES_PITCH,
          },
          {
            label: "Political Actor",
            path: POLITICAL_EDU_PITCH,
          },
        ];
      case t("choices.fourthtype"):
        return [
          {
            label: "Learning-Platform",
            path: LEARNING_PLATFORM_PITCH,
          },
          {
            label: "Publishing Company",
            path: PUBLISHING_COMPANY_PITCH,
          },
          {
            label: "Looking for Up-Skilling",
            path: UP_SKILLING_PITCH,
          },
          {
            label: "Non-Profit Education Project",
            path: NON_PROFIT_PITCH,
          },
        ];
      default:
        return [];
    }
  };

  const mainOptions = [
    { label: t("choices.firsttype"), component: <EducationInstituteGraph /> },
    { label: t("choices.secondtype"), component: <LearnerGraph /> },
    { label: t("choices.thirdtype"), component: <FoundationGraph /> },
    { label: t("choices.fourthtype"), component: <BusinessGraph /> },
  ];

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "auto",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: alpha(theme.palette.common.black, 0.5),
          borderRadius: theme.spacing(4),
          width: { xs: "100%", sm: "70%", md: "50%" },
          marginBottom: theme.spacing(2),
        }}
      >
        <Typography
          variant="h3"
          sx={{
            margin: theme.spacing(4),
            color: theme.palette.common.white,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: { xs: "36px", sm: "60px" },
          }}
        >
          {t("choices.headline-Choices")}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            marginBottom: { xs: theme.spacing(1.2), sm: theme.spacing(4) },
            textAlign: "center",
            color: theme.palette.primary.light,
            fontSize: { xs: "28px", sm: "45px" },
          }}
        >
          {t("choices.subheading")}
        </Typography>
      </Box>
      {activeOption && (
        <Box
          sx={{
            position: "relative",
            left: { xs: "-50%", sm: "-30%" },
            cursor: "pointer", // Pointer cursor for interactivity
          }}
          onClick={handleArrowClick} // Handle click to reset activeOption
        >
          <ArrowBack sx={{ color: "white", fontSize: "30px" }} />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          transition: "all 1s ease",
          gap: theme.spacing(2),
        }}
      >
        {mainOptions.map((option) => (
          <Box
            key={option.label}
            sx={{
              position: "relative",
              display:
                activeOption && activeOption !== option.label ? "none" : "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              transition: "transform 0.5s ease, opacity 0.5s ease",
              transform:
                activeOption === option.label ? "scale(1.2)" : "scale(1)",
              opacity: activeOption && activeOption !== option.label ? 0 : 1,
              backgroundColor: alpha(theme.palette.common.white, 0.2),
              borderRadius: theme.spacing(4),
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: alpha(theme.palette.common.white, 0.4),
              },
            }}
            onClick={() => handleButtonClick(option.label)}
            onMouseEnter={() => setHoveredOption(option.label)}
            onMouseLeave={() => setHoveredOption(null)}
          >
            {option.component}
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                marginBottom: theme.spacing(2),
              }}
            >
              {option.label}
            </Typography>
            {hoveredOption === option.label && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  backgroundColor: alpha(theme.palette.common.black, 0.8),
                  padding: theme.spacing(1),
                  borderRadius: theme.spacing(1),
                  zIndex: 10,
                  mt: 1,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "120px",
                }}
              >
                {activeOption === option.label && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: theme.spacing(1),
                    }}
                  >
                    <ArrowBack
                      sx={{
                        fontSize: "16px",
                        color: "white",
                        mr: theme.spacing(0.5),
                      }}
                    />
                    <Typography variant="caption" sx={{ color: "white" }}>
                      {t("choices.back")}
                    </Typography>
                  </Box>
                )}
                {!activeOption &&
                  renderSubOptions(option.label).map((subOption) => (
                    <Typography
                      key={subOption.label}
                      variant="caption"
                      sx={{
                        color: "white",
                        display: "block",
                        mb: 0.5,
                        textAlign: "left",
                      }}
                    >
                      {subOption.label}
                    </Typography>
                  ))}
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {activeOption && (
        <Box
          sx={{
            marginTop: theme.spacing(6),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: theme.spacing(2),
            transition: "opacity 0.5s ease",
          }}
        >
          {renderSubOptions(activeOption).map((subOption) => (
            <Box
              key={subOption.label}
              sx={{
                width: "80%",
                padding: theme.spacing(1.25),
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
