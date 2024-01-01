import i18n from "src/i18n";
import * as yup from "yup";

// NOTE: this must be kept in sync with the backend's requirements!
// see https://github.com/suxatcode/learn-graph-backend/blob/68b56824fd48b7cc785a5e98ee83ef04d6a0f500/db/arangodb.go#L31
const username = {
  username: yup
    .string()
    .min(
      4,
      i18n.t("Username should be of minimum N characters length", { N: 4 }),
    )
    .required(i18n.t("Username is required")),
};

const email = {
  email: yup
    .string()
    .email(i18n.t("Enter a valid email"))
    .required(i18n.t("Email is required")),
};

const password = {
  password: yup
    .string()
    .min(
      10,
      i18n.t("Password should be of minimum N characters length", { N: 10 }),
    )
    .required(i18n.t("Password is required")),
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
