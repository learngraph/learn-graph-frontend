// TODO(skep): translate this file
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Trans, useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { Href } from "@src/shared/Components";

interface qnaEntry {
  question: string;
  answer: string | any;
}

const getQnaEntries = (t: TFunction<"translation", undefined>): qnaEntry[] => [
  {
    question: t("landing.qnas.qLearnGraphFree"),
    answer: (
      <Trans
        i18nKey="landing.qnas.aFreeAndOSMoneyTbd"
        components={{
          linktogithub: <Href href="https://github.com/learngraph" />,
        }}
      />
    ),
  },
  {
    question: t("landing.qnas.qDiffToConventionalLearningPlatforms"),
    answer: t("landing.qnas.aNoContentHosting"),
  },
  {
    question: t("landing.qnas.qProjectVision"),
    answer: t("landing.qnas.aLearningEcosystem"),
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const { t } = useTranslation();
  const qnaEntries = getQnaEntries(t);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        width: { sm: "100%", md: "100%" },
        pb: { xs: 10, sm: 18 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        color="text.primary"
        sx={{color:"white"}}
      >
        FAQs
      </Typography>
      <Box sx={{ width: "90%" }}>
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
              <Typography component="h3" variant="subtitle2" sx={{ textAlign:"left"}} >
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
