import { Avatar, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {
  CreateUserWithMailFn,
  UserSignupInfo,
} from "src/GraphManager/hooks/useCreateUser";
import { validateUserSignupRequest } from "./InputValidation";
import { StyledBox, StyledBoxSX, TextFieldFormikGenerator } from "./Styles";

interface SignUpFormProps {
  onSubmit: CreateUserWithMailFn;
}

export const SignUpForm = (props: SignUpFormProps) => {
  const formik = useFormik<UserSignupInfo>({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validateUserSignupRequest,
    onSubmit: props.onSubmit,
  });
  return (
    <StyledBox sx={StyledBoxSX}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonAddAltIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextFieldFormikGenerator
          fieldName="username"
          fieldLabel="User Name"
          formik={formik}
          autoFocus
        />
        <TextFieldFormikGenerator
          fieldName="email"
          fieldLabel="Email Address"
          formik={formik}
        />
        <TextFieldFormikGenerator
          fieldName="password"
          fieldLabel="Password"
          formik={formik}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </StyledBox>
  );
};
