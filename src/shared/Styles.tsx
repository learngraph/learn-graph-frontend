import { Box, styled, TextField } from "@mui/material";
import { FormikValues, useFormik } from "formik";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";

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
  multiline?: boolean;
  disabled?: boolean;
}

const TextFieldFormikGeneratorInternal = <T extends FormikValues>(
  props: T & { required: boolean },
) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      id={props.fieldName}
      name={props.fieldName}
      label={props.fieldLabel}
      type={props.fieldName === "password" ? "password" : "text"}
      required={props.required}
      value={props.formik.values[props.fieldName]}
      onChange={props.formik.handleChange}
      onBlur={props.formik.handleBlur}
      error={
        props.formik.touched[props.fieldName] &&
        Boolean(props.formik.errors[props.fieldName])
      }
      helperText={
        props.formik.touched[props.fieldName] &&
        props.formik.errors[props.fieldName]
      }
      autoFocus={props.autoFocus ?? false}
      multiline={props.multiline ?? false}
      disabled={props.disabled ?? false}
    />
  );
};

export const TextFieldFormikGeneratorRequired = <T extends FormikValues>(
  conf: T,
) => {
  return <TextFieldFormikGeneratorInternal {...conf} required={true} />;
};
export const TextFieldFormikGenerator = <T extends FormikValues>(conf: T) => {
  return <TextFieldFormikGeneratorInternal {...conf} required={false} />;
};

type AutocompleteFormikProps = FormikValues & {
  // list of options that can be selected by the user
  options: any[];
  // display an option as a string to the user
  optionLabel: (op: any) => string;
  // assign a result that is passed to onFormSubmit
  optionValue: (op: any) => string;
  defaultValue?: any;
};

// TextFieldFormikGeneratorAutocomplete enables the user to freely type while
// autocompleting the options passed
export const TextFieldFormikGeneratorAutocomplete = (
  conf: AutocompleteFormikProps,
) => {
  const [selectedOption, setSelectedOption] = useState("");
  const handleInputChange = (_: any, option: any) => {
    setSelectedOption(option);
    conf.formik.setFieldValue(conf.fieldName, conf.optionValue(option));
  };
  useEffect(() => {
    if (!!conf.defaultValue) {
      handleInputChange(null, conf.defaultValue);
    }
  }, [conf.defaultValue]);
  //const handleKeyDown = (event: any) => {
  //  if (event.key === 'Tab') {
  //    select next entry?
  //  }
  //};
  return (
    <Autocomplete
      options={conf.options}
      getOptionLabel={conf.optionLabel}
      value={selectedOption}
      onChange={handleInputChange}
      defaultValue={""}
      freeSolo
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          autoFocus
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
          //onKeyDown={handleKeyDown}
        />
      )}
    />
  );
};

export const DialogueStyles = {
  dialogRoot: {
    padding: "20px",
    minWidth: "400px",
  },
  dialogButtons: {
    display: "flex",
    justifyContent: "space-evenly",
  },
};
