//TODO: Translation
import { ReactNode } from "react";
import {
  Box,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "mui-image";
import { NavigationWithContent } from "./Navigation";
import { Add, Edit } from "@mui/icons-material";
import { Href } from "./shared/Components";
import { useTranslation } from "react-i18next";

// New HowToSection Component
const HowToSection = (props: { children: ReactNode; reverse?: boolean }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMdUp
          ? props.reverse
            ? "row-reverse"
            : "row"
          : "column",
        alignItems: "center",
        gap: theme.spacing(2),
        py: theme.spacing(2),
      }}
    >
      {props.children}
    </Box>
  );
};

const HowToImage = (props: {
  src: string;
  alt: string;
  heightOverride?: string;
}) => {
  return (
    <Box sx={{ flex: 1, display: "flex", justifyContent: "center", py: 3 }}>
      <Image
        src={props.src}
        alt={props.alt}
        fit="contain"
        width={props.heightOverride ? "" : "100%"}
        height={props.heightOverride ?? ""}
      />
    </Box>
  );
};

const HowToTypography = (props: { children: ReactNode }) => {
  return (
    <Typography sx={{ flex: 1, maxWidth: "100ch" }}>
      {props.children}
    </Typography>
  );
};

const HowToTopic = (props: { children: ReactNode }) => {
  const theme = useTheme();
  return (
    <Typography
      sx={{
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(2),
      }}
      variant="h2"
    >
      {props.children}
    </Typography>
  );
};

export const HowToLearngraph = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <NavigationWithContent
      withSideNavigation={true}
      content={
        <Box
          sx={{
            width: "100%",
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          }}
        >
          <Container
            sx={{
              padding: theme.spacing(4),
            }}
            component="main"
          >
            <Typography sx={{ paddingBottom: theme.spacing(4) }} variant="h1">
            {t("howto.headline-how-to")}
            </Typography>

            <HowToTypography>
            {t("howto.headline-footerp1")}{" "}
              <Href href="/playground">{t("howto.headline-footerp2")}</Href>! {t("howto.headline-footerp3")}
            </HowToTypography>

            <HowToTopic>{t("howto.subh-1")}</HowToTopic>

            <HowToTypography>
            {t("howto.subh-1-footerp1")}{" "}
              <Href href="https://docs.google.com/document/d/1e2LL2_fKiKXA7GXQdTOYeCw3jpyc8GNxG0P9ehKcJ0Q/edit?usp=sharing">
              {t("howto.subh-1-footerp2")}
              </Href>
              !
            </HowToTypography>

            <HowToTopic>{t("howto.subh-2")}</HowToTopic>

            <HowToSection>
              <HowToImage
                src="HowTo-link.png"
                alt="Diagram showing multiplication depending on addition"
              />
              <HowToTypography>
              {t("howto.para-1")}
              </HowToTypography>
            </HowToSection>

            <HowToTopic>{t("howto.subh-3")}</HowToTopic>

            <HowToSection reverse>
              <HowToTypography>
                <ul>
                  <li>
                  {t("howto.para-3-bullet1")}<Edit fontSize="small" /> {t("howto.para-3-bullet2")}
                  </li>
                  <li>{t("howto.para-3-bullet3")}</li>
                  <li>
                  {t("howto.para-3-bullet4")}
                  </li>
                </ul>
                {t("howto.para-3-bullet6")}<Edit fontSize="small" /> {t("howto.para-3-bullet7")}{" "}
                <Add fontSize="small" /> {t("howto.para-3-bullet8")}&gt; {t("howto.para-3-bullet9")} <Add fontSize="small" />{" "}
                {t("howto.para-3-bullet10")}&gt; {t("howto.para-3-bullet11")}
              </HowToTypography>
              <HowToImage
                src="HowTo-interact.png"
                alt="Interaction example"
                heightOverride="20%"
              />
            </HowToSection>

            <HowToTopic>{t("howto.subh-4")}</HowToTopic>

            <HowToSection>
              <HowToImage
                src="HowTo-translation-de-en.png"
                alt="Translation example"
              />
              <HowToTypography>
              {t("howto.para-4")}
              </HowToTypography>
            </HowToSection>

            <HowToTopic>{t("howto.subh-5")}</HowToTopic>

            <HowToSection reverse>
              <HowToTypography>
              {t("howto.para-5")}
              </HowToTypography>
              <HowToImage src="HowTo-Toolbar.png" alt="Toolbar example" />
            </HowToSection>
          </Container>
        </Box>
      }
    />
  );
};
