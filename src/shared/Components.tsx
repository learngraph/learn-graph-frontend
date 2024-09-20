import { Link as MuiLink } from "@mui/material";

export const Href = (props: any) => {
  return <MuiLink {...props} target="_blank" rel="noopener noreferrer" />;
};
