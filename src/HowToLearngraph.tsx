//TODO: Translation
import { ReactNode, useLayoutEffect, useRef, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "mui-image";
import { NavigationWithContent } from "./Navigation";
import { Rectangle } from "./GraphManager/utils";
import { Add, Edit } from "@mui/icons-material";

const HowToImage = (props: { availableSpace: Rectangle; src: string }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Image
        src={props.src}
        fit="contain"
        width={props.availableSpace.width / 2}
        height={props.availableSpace.height / 2}
      />
    </Box>
  );
};
const HowToTypography = (props: { children: ReactNode }) => {
  return <Typography sx={{ maxWidth: "100ch" }}>{props.children}</Typography>;
};

export const HowToLearngraph = () => {
  const theme = useTheme();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const defaultSize = {
    height: 400,
    width: 600,
  };
  const [availableSpace, setAvailableSpace] = useState<Rectangle>(defaultSize);
  useLayoutEffect(() => {
    setAvailableSpace(
      wrapperRef.current?.getBoundingClientRect() ?? defaultSize,
    );
  }, []);
  return (
    <>
      <NavigationWithContent
        withSideNavigation={true}
        content={
          <Box
            sx={{
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              padding: theme.spacing(4),
              maxWidth: "100ch",
              width: "100%",
            }}
            component="main"
            /* sx={(theme) => ({
              flexGrow: 1,
              padding: 3,
              backgroundColor: theme.palette.background.default,
            })}*/
            ref={wrapperRef}
          >
            <Typography sx={{ paddingBottom: theme.spacing(4) }} variant="h1">
              How to use the Learngraph {/*TODO(skep): lg-logo*/}
            </Typography>
            <HowToTypography>
              The Learngraph is a map of Learning dependencies. In this image
              you can see that in order to understand multiplication you need to
              learn about addition.
            </HowToTypography>
            <HowToImage src="HowTo-link.png" availableSpace={availableSpace} />
            <HowToTypography>
              There is no way around learning addition first so the connection
              between them is strong. The connection is always pointed so that
              you find your learning prerequisites for any topic by following
              the arrow. Clicking on a topic reveals learning resources and
              infos about the most important learning dependencies.
            </HowToTypography>
            <Typography
              sx={{
                paddingBottom: theme.spacing(2),
                paddingTop: theme.spacing(2),
              }}
              variant="h2"
            >
              Add your knowledge
            </Typography>
            <HowToTypography>
              The <Edit fontSize="small" /> icon lets you switch between edit
              and read-only mode. Move the abstract concept toward its
              prerequisite knowledge to create a new link. Alternatively use the{" "}
              <Add fontSize="small" /> icon &gt; "New depency" dialouge Select
              an existing link to vote on the strength of the connection. To add
              a new Topic use the <Add fontSize="small" /> icon &gt; "New
              subject" dialouge.
            </HowToTypography>
            <HowToImage
              src="HowTo-Toolbar.png"
              availableSpace={availableSpace}
            />
          </Box>
        }
      />
    </>
  );
};
