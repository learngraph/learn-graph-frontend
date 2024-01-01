import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import {
  StyledBox,
  StyledBoxSX,
  TextFieldFormikGenerator,
} from "src/shared/Styles";
import { useFormik } from "formik";
import { UserLoginInfo } from "src/GraphManager/hooks/useLoginUser";
import { validateUserLoginRequest } from "./InputValidation";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  onSubmit: (data: UserLoginInfo) => void;
}

interface LoginFormValues extends UserLoginInfo {
  rememberme: boolean;
}

export default function LoginForm(props: LoginFormProps) {
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberme: false,
    },
    validationSchema: validateUserLoginRequest,
    onSubmit: props.onSubmit,
  });
  const { t } = useTranslation();
  return (
    <StyledBox sx={StyledBoxSX}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        {t("Login")}
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextFieldFormikGenerator
          fieldName="email"
          fieldLabel={t("Email Address")}
          formik={formik}
          autoFocus
        />
        <TextFieldFormikGenerator
          fieldName="password"
          fieldLabel={t("Password")}
          formik={formik}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="remember"
              color="primary"
              checked={formik.values.rememberme}
            />
          }
          label={t("Remember me")} // TODO(skep): this is currently on by default, quite missleading :(
          name="rememberme"
          onChange={formik.handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t("Sign In")}
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              {t("Forgot password?")}
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {t("Don't have an account? Sign Up")}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
}
