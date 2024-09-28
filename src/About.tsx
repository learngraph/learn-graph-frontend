// TODO(skep): translate this file!
import { Box, Typography, Divider, useTheme, Grid } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Trans, useTranslation } from "react-i18next";
import { NavigationWithContent } from "./Navigation";
import Image from "mui-image";
import { Href } from "./shared/Components";
import { styled } from '@mui/material/styles';

// Updated TeamMember component with 'role' prop
interface TeamMemberProps {
  imageSrc: string;
  name: string;
  description: string;
  linkedInUrl: string;
}

const TeamMember = ({
  imageSrc,
  name,
  description,
  linkedInUrl,
}: TeamMemberProps) => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={2}
    >
      <Image src={imageSrc} alt={name} width={150} height={150} />
      <Typography variant="h6" marginTop={1} textAlign="center">
        {name}
        <Href
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ marginLeft: 8 }}
        >
          <LinkedInIcon fontSize="small" />
        </Href>
      </Typography>
      {/* Display the role below the name */}
      <Typography
        variant="subtitle1"
        color={theme.palette.text.secondary}
        textAlign="center"
      >
        {description}
      </Typography>
    </Box>
  );
};



const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};

export const About = () => {
  const theme = useTheme();
  const { t } = useTranslation();

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
            {t('about.headline-About Us')}
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            <Trans i18nKey="about.who-are-we-story" />
          </TypographyMaxWidth>

          <Divider sx={{ margin: '20px 0' }} />

          <TypographyMaxWidth variant="h5" gutterBottom id="whoarewe">
            {t('about.headline-Who Are We')}
          </TypographyMaxWidth>

          {/* Use Grid to layout team members */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember
                imageSrc="team-laurin.png"
                name="Laurin Hagemann"
                description={t('about.team-Laurin')}
                linkedInUrl="https://www.linkedin.com/in/laurin-hagemann/"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember
                imageSrc="team-namatama.png"
                name="Namatama Theresa Katanekwa"
                description={t('about.team-Namatama')}
                linkedInUrl="https://www.linkedin.com/in/namatama-theresa-katanekwa-5697b3196/"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TeamMember
                imageSrc="team-efecan.jpeg"
                name="Efecan Köse"
                description={t('about.team-Efecan')}
                linkedInUrl="https://www.linkedin.com/in/efecan-k%C3%B6se-3b45a432a/"
              />
            </Grid>
          </Grid>

          <Divider sx={{ margin: '20px 0' }} />

          <TypographyMaxWidth variant="h5" gutterBottom id="gettinginvolved">
            {t('about.headline-getting-involved')}
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            <Trans
              i18nKey="about.getting-involved"
              components={{
                mailtocontact: <Href href="mailto:contact@learngraph.org" />,
                linktodiscord: <Href href="https://discord.gg/DatEV4kNp6" />,
              }}
            />
          </TypographyMaxWidth>
        </Box>
      }
    />
  );
};

