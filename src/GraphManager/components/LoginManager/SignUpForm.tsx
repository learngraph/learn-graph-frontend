import { Avatar, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { UserSignupInfo } from "src/GraphManager/hooks/useCreateUser";
import { validateUserSignupRequest } from "./InputValidation";
import {
  StyledBox,
  StyledBoxSX,
  TextFieldFormikGeneratorRequired,
} from "src/shared/Styles";
import { useTranslation } from "react-i18next";

interface SignUpFormProps {
  onSubmit: (data: UserSignupInfo) => void;
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
  const { t } = useTranslation();
  return (
    <StyledBox sx={StyledBoxSX}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonAddAltIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        {t("Signup")}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextFieldFormikGeneratorRequired
          fieldName="username"
          fieldLabel={t("User Name")}
          formik={formik}
          autoFocus
        />
        <TextFieldFormikGeneratorRequired
          fieldName="email"
          fieldLabel={t("Email Address")}
          formik={formik}
        />
        <TextFieldFormikGeneratorRequired
          fieldName="password"
          fieldLabel={t("Password")}
          formik={formik}
        />
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          {t("Submit")}
        </Button>
      </Box>
    </StyledBox>
  );
};
