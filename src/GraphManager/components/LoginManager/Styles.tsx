import { Box, styled, TextField } from "@mui/material";
import { /*FormikValues,*/ useFormik } from "formik";
import { UserSignupInfo } from "src/GraphManager/hooks/useCreateUser";
import { UserLoginInfo } from "src/GraphManager/hooks/useLoginUser";

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "30vh",
}));
export const StyledBoxSX = { mt: 4, my: 3, mx: 3 };

// TODO(skep): is it possible to make this type generic?
//export interface TextFieldConfig<T extends FormikValues> {
//  formik: ReturnType<typeof useFormik<T>>;
//  fieldName: keyof T;
//  fieldLabel: string;
//}
//export const TextFieldFormikGenerator = <T extends FormikValues>(conf: T) => {
//  return (
//    <TextField
//      fullWidth
//      margin="normal"
//      id={conf.fieldName}
//      name={conf.fieldName}
//      label={conf.fieldLabel}
//      type="text"
//      required
//      value={conf.formik.values[conf.fieldName]}
//      onChange={conf.formik.handleChange}
//      onBlur={conf.formik.handleBlur}
//      error={
//        conf.formik.touched[conf.fieldName] &&
//        Boolean(conf.formik.errors[conf.fieldName])
//      }
//      helperText={
//        conf.formik.touched[conf.fieldName] &&
//        conf.formik.errors[conf.fieldName]
//      }
//      autoFocus
//    />
//  );
//}

export interface TextFieldConfigSignup {
  formik: ReturnType<typeof useFormik<UserSignupInfo>>;
  fieldName: keyof UserSignupInfo;
  fieldLabel: string;
}
export const TextFieldFormikSignup = (conf: TextFieldConfigSignup) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      id={conf.fieldName}
      name={conf.fieldName}
      label={conf.fieldLabel}
      type="text"
      required
      value={conf.formik.values[conf.fieldName]}
      onChange={conf.formik.handleChange}
      onBlur={conf.formik.handleBlur}
      error={
        conf.formik.touched[conf.fieldName] &&
        Boolean(conf.formik.errors[conf.fieldName])
      }
      helperText={
        conf.formik.touched[conf.fieldName] &&
        conf.formik.errors[conf.fieldName]
      }
      autoFocus
    />
  );
};

export interface TextFieldConfigLogin {
  formik: ReturnType<typeof useFormik<UserLoginInfo>>;
  fieldName: keyof UserLoginInfo;
  fieldLabel: string;
}
export const TextFieldFormikLogin = (conf: TextFieldConfigLogin) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      id={conf.fieldName}
      name={conf.fieldName}
      label={conf.fieldLabel}
      type="text"
      required
      value={conf.formik.values[conf.fieldName]}
      onChange={conf.formik.handleChange}
      onBlur={conf.formik.handleBlur}
      error={
        conf.formik.touched[conf.fieldName] &&
        Boolean(conf.formik.errors[conf.fieldName])
      }
      helperText={
        conf.formik.touched[conf.fieldName] &&
        conf.formik.errors[conf.fieldName]
      }
      autoFocus
    />
  );
};
