import { Editor, EditorStatus, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import { useFormik } from "formik";
import { NewNodeForm } from "./PopUp";

export interface MilkdownConfig {
  fieldName: string;
  fieldLabel: string;
  formik: ReturnType<typeof useFormik<NewNodeForm>>;
}
const MilkdownEditor = (props: MilkdownConfig) => {
  const { get } = useEditor((root) =>
    Editor.make()
      .config(nord)
      .config((ctx: any) => {
        ctx.set(rootCtx, root);
      })
      .config((ctx: any) => {
        ctx.set(defaultValueCtx, props.formik.initialValues.nodeResources);
      })
      .config((ctx: any) => {
        ctx
          .get(listenerCtx)
          .markdownUpdated(
            (_ctx: any, markdown: string, _prevMarkdown: string) => {
              console.log(markdown);
              const helpers = props.formik.getFieldHelpers(props.fieldName);
              helpers.setValue(markdown);
            },
          );
      })
      .use(commonmark.concat(listener)),
  );
  const onChange = (status: EditorStatus) => {
    console.log(`onChange: ${status}`);
  };
  get()?.onStatusChange(onChange);
  return <Milkdown />;
};
export const MilkdownEditorWrapper = (props: MilkdownConfig) => {
  return (
    <FormControl sx={{ padding: 1, paddingTop: 2 }}>
      <InputLabel
        htmlFor={props.fieldName} /*TODO(skep): needs focused=, etc.*/
      >
        {props.fieldLabel}
      </InputLabel>
      {/* <FormHelperText id={props.fieldName}>{props.fieldLabel}</FormHelperText> */}
      <MilkdownProvider>
        <MilkdownEditor {...props} />
      </MilkdownProvider>
    </FormControl>
  );
};
