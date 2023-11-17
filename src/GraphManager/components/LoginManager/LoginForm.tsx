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
import { StyledBox, StyledBoxSX, TextFieldFormikLogin } from "./Styles";
import { useFormik } from "formik";
import {
  LoginUserFnResponse,
  UserLoginInfo,
} from "src/GraphManager/hooks/useLoginUser";
import { validateUserLoginRequest } from "./InputValidation";

interface LoginFormProps {
  onSubmit: (data: UserLoginInfo) => Promise<LoginUserFnResponse>;
}

export default function LoginForm(props: LoginFormProps) {
  const formik = useFormik<UserLoginInfo>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateUserLoginRequest,
    onSubmit: props.onSubmit,
  });
  return (
    <StyledBox sx={StyledBoxSX}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextFieldFormikLogin
          fieldName="email"
          fieldLabel="Email Address"
          formik={formik}
        />
        <TextFieldFormikLogin
          fieldName="password"
          fieldLabel="Password"
          formik={formik}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
}
