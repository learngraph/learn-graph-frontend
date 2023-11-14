import { SignUpRequestData, SignUpRequestReturn } from "./LoginSignupMenu";
import {
  Avatar,
  Box,
  Button,
  //styled,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import * as yup from "yup";

interface SignUpFormProps {
  onSubmit: (data: SignUpRequestData) => Promise<SignUpRequestReturn>;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(10, "Password should be of minimum 10 characters length")
    .required("Password is required"),
});

// TODO(skep): extract styles to reuse them
//const StyledBox = styled(Box)(({ theme }: any) => ({
//  width: "100%",
//  minWidth: '50vh',
//  padding: theme.spacing(3),
//  display: "flex",
//  flexDirection: "column",
//  alignItems: "center",
//  textAlign: "center",
//}));

export const SignUpForm = (props: SignUpFormProps) => {
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: () => {},
  });
  const onSubmit = (event: any) => {
    event?.preventDefault();
    const { userName: username, email, password } = formik.values;
    props.onSubmit({ username, email, password });
  };
  return (
    <Box
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "50vh",
        my: 3,
        mx: 3,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonAddAltIcon />
      </Avatar>
      <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
        Sign Up
      </Typography>
      <Box component="form" onSubmit={onSubmit}>
        <TextField
          fullWidth
          id="userName"
          name="userName"
          label="User Name"
          type="text"
          required
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
          autoFocus
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email Address"
          type="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Box>
  );
};
