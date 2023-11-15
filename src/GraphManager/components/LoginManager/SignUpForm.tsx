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

// NOTE: this must be kept in sync with the backend's requirements!
// see https://github.com/suxatcode/learn-graph-backend/blob/68b56824fd48b7cc785a5e98ee83ef04d6a0f500/db/arangodb.go#L31
const validationSchema = yup.object({
  username: yup
    .string()
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required"),
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
  const onSubmit = (user: SignUpRequestData) => {
    props.onSubmit(user);
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });
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
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          id="username"
          name="username"
          label="User Name"
          type="text"
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          autoFocus
        />
        <TextField
          fullWidth
          margin="normal"
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
          margin="normal"
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
        <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};
