// TODO(skep): translate this file!
import {
  Box,
  Typography,
  Divider,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import Image from "mui-image";

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};
const Href = (props: any) => {
  return <MuiLink {...props} target="_blank" rel="noopener noreferrer" />;
};

const TeamMember = ({
  imageSrc,
  name,
  description,
  linkedInUrl,
}: {
  imageSrc: string;
  name: string;
  description: string;
  linkedInUrl: string;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      marginTop={2}
      marginBottom={2}
      marginLeft={5}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginRight={3}
      >
        <Image src={imageSrc} alt={name} width={150} height={150} />
        <TypographyMaxWidth variant="h6" marginTop={1}>
          {name}
          <Href
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ marginLeft: 1 }}
          >
            <LinkedInIcon />
          </Href>
        </TypographyMaxWidth>
      </Box>
      <TypographyMaxWidth paragraph>{description}</TypographyMaxWidth>
    </Box>
  );
};

export const About = () => {
  const theme = useTheme();
  const { t } = useTranslation("about");
  return (
    <NavigationWithContent
      withSideNavigation={true}
      content={
        <Box
          component="main"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            flexGrow: 1,
            padding: 3,
          }}
        >
          <TypographyMaxWidth variant="h4" gutterBottom id="about">
            {t("headline-About Us")}
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            {t("mission-statement")}
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            {t("what-is-learngraph")}
          </TypographyMaxWidth>

          <Divider sx={{ margin: "20px 0" }} />
          <TypographyMaxWidth variant="h5" gutterBottom id="whoarewe">
            {t("headline-Who Are We")}
          </TypographyMaxWidth>
          <TeamMember
            imageSrc="public/team-laurin.png"
            name="Laurin Hagemann"
            description={t("team-Laurin")}
            linkedInUrl="https://www.linkedin.com/in/laurin-hagemann-573616201/"
          />
          <TeamMember
            imageSrc="public/team-placeholder.png"
            name={t("team-placeholder")}
            description={t("team-placeholder")}
            linkedInUrl="https://www.linkedin.com/in/"
          />

          <Divider sx={{ margin: "20px 0" }} />
          <TypographyMaxWidth variant="h5" gutterBottom id="gettinginvolved">
            {t("headline-getting-involved")}
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            {t("Join our-followed-by-link") + " "}
            <Href href="https://discord.gg/DatEV4kNp6">Discord Server</Href>!
          </TypographyMaxWidth>
        </Box>
      }
    />
  );
};
