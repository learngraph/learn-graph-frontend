// TODO(skep): translate this file!
import {
  Box,
  Typography,
  Divider,
  Link as MuiLink,
  useTheme,
} from "@mui/material";
import { NavigationWithContent } from "./Navigation";

const TypographyMaxWidth = (props: any) => {
  return <Typography sx={{ maxWidth: "80ch", ...props.sx }} {...props} />;
};
const Href = (props: any) => {
  return <MuiLink {...props} target="_blank" rel="noopener noreferrer" />;
};

export const About = () => {
  const theme = useTheme();
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
            About Us
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Our mission: Free education for everyone.
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Education goes beyond learning resources &mdash; learning requires
            to find a path through the map of knowledge of humankind. This map
            is the learngraph.
          </TypographyMaxWidth>

          <Divider sx={{ margin: "20px 0" }} />
          <TypographyMaxWidth variant="h5" gutterBottom id="gettinginvolved">
            Getting Involved!
          </TypographyMaxWidth>
          <TypographyMaxWidth paragraph>
            Join our{" "}
            <Href href="https://discord.gg/DatEV4kNp6">discord server</Href>!
          </TypographyMaxWidth>
        </Box>
      }
    />
  );
};
