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
              How to LearnGraph
            </Typography>

            <HowToTypography>
              Try the interface{" "}
              <Href href="/playground">in our Playground</Href>! All data you
              insert is only saved locally in your browser.
            </HowToTypography>

            <HowToTopic>Content Guidelines</HowToTopic>

            <HowToTypography>
              Are you unsure what topics are appropriate? See our{" "}
              <Href href="https://docs.google.com/document/d/1e2LL2_fKiKXA7GXQdTOYeCw3jpyc8GNxG0P9ehKcJ0Q/edit?usp=sharing">
                Content Guidelines here
              </Href>
              !
            </HowToTypography>

            <HowToTopic>Interface</HowToTopic>

            <HowToSection>
              <HowToImage
                src="HowTo-link.png"
                alt="Diagram showing multiplication depending on addition"
              />
              <HowToTypography>
                The LearnGraph is a map of learning dependencies. In this image,
                you can see that in order to understand multiplication, you need
                to learn about addition. There is no way around learning
                addition first, so the connection between them is strong. The
                arrow always points you towards the things you have to learn to
                understand a given topic. Clicking on a topic reveals learning
                resources and information about the most important learning
                dependencies.
              </HowToTypography>
            </HowToSection>

            <HowToTopic>Interact with the LearnGraph</HowToTopic>

            <HowToSection reverse>
              <HowToTypography>
                <ul>
                  <li>
                    Click the <Edit fontSize="small" /> icon to switch between
                    edit and view-only mode.
                  </li>
                  <li>Search for subjects using the search bar.</li>
                  <li>
                    Click on any topic (in edit mode) to reveal learning
                    resources.
                  </li>
                </ul>
                The <Edit fontSize="small" /> icon lets you switch between edit
                and read-only mode. Move the subject toward its prerequisite
                knowledge to create a new link. Alternatively, use the{" "}
                <Add fontSize="small" /> icon &gt; "New dependency" dialogue.
                Select an existing link to vote on the strength of the
                connection. To add a new topic, use the <Add fontSize="small" />{" "}
                icon &gt; "New subject" dialogue.
              </HowToTypography>
              <HowToImage
                src="HowTo-interact.png"
                alt="Interaction example"
                heightOverride="20%"
              />
            </HowToSection>

            <HowToTopic>Translations</HowToTopic>

            <HowToSection>
              <HowToImage
                src="HowTo-translation-de-en.png"
                alt="Translation example"
              />
              <HowToTypography>
                You may find some subjects in a different language than your
                selected one. They are marked by the corresponding country flag.
                You can translate subjects to your selected language by editing
                the subject and removing the flag icon. To insert a translation
                in a different language than your currently selected one, first
                change your language settings and then proceed with the
                translation.
              </HowToTypography>
            </HowToSection>

            <HowToTopic>[Coming Soon!] The Merge Zoom</HowToTopic>

            <HowToSection reverse>
              <HowToTypography>
                Some topics are more connected than others. These might be more
                important to learn about. The zoom slider on the right-hand side
                groups areas of knowledge under the banner of the topic that is
                required the most, i.e., has the highest number of arrows
                pointing toward it.
              </HowToTypography>
              <HowToImage src="HowTo-Toolbar.png" alt="Toolbar example" />
            </HowToSection>
          </Container>
        </Box>
      }
    />
  );
};
