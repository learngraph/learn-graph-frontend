import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface qnaEntry {
  question: string;
  answer: string;
}
const qnaEntries: qnaEntry[] = [
  {
    question: "Is the Learn Graph free?",
    answer:
      "Yes, it's free! The project and how it is financed are still in development. We might add premium features in the future, but the core functionality will always be free.",
  },
  {
    question:
      "How is the Learn Graph different from conventional learning platfoms?",
    answer:
      "We do not host content ourselves, instead we focus on the connections between knowledge. We aim to be a platform that points you in the right directions and enables you to find the knowledge you're looking for on other websites.",
  },
  {
    question:
      "I've found which topics i want to learn about, where do i find good learning content?",
    answer:
      "We plan to add a feature which enables crowdsourcing learning resources as well. Come back soon to see it!",
  },
  {
    question: "Whats your vision with this project?",
    answer:
      "We plan to build a full learning ecosystem based on the internet. We believe that education and cooperation are the keys to a better world.",
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: "100%" }}>
        {qnaEntries.map(({ question, answer }, index) => (
          <Accordion
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}d-content`}
              id={`panel${index + 1}d-header`}
            >
              <Typography component="h3" variant="subtitle2">
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: "100%", md: "70%" } }}
              >
                {answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}
