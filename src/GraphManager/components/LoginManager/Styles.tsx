import { Box, styled, TextField } from "@mui/material";
import { FormikValues, useFormik } from "formik";

export const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "30vh",
}));
export const StyledBoxSX = { mt: 4, my: 3, mx: 3 };

export interface TextFieldConfig<T extends FormikValues> {
  formik: ReturnType<typeof useFormik<T>>;
  fieldName: keyof T;
  fieldLabel: string;
  autoFocus?: boolean;
}
export const TextFieldFormikGenerator = <T extends FormikValues>(conf: T) => {
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
      autoFocus={conf.autoFocus ?? false}
    />
  );
};
