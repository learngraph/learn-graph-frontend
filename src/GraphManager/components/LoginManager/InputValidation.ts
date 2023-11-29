import * as yup from "yup";

// NOTE: this must be kept in sync with the backend's requirements!
// see https://github.com/suxatcode/learn-graph-backend/blob/68b56824fd48b7cc785a5e98ee83ef04d6a0f500/db/arangodb.go#L31
const username = {
  username: yup
    .string()
    .min(4, "Username should be of minimum 4 characters length")
    .required("Username is required"),
};

const email = {
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
};

const password = {
  password: yup
    .string()
    .min(10, "Password should be of minimum 10 characters length")
    .required("Password is required"),
};

export const validateUserSignupRequest = yup.object({
  ...username,
  ...email,
  ...password,
});

export const validateUserLoginRequest = yup.object({
  ...email,
  ...password,
});
