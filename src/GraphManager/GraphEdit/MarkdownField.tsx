import { $getRoot, $getSelection, EditorState, LexicalEditor } from "lexical";
import { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { useRef } from "react";

import { NewNodeForm } from "./PopUp";
import { useTheme } from "@mui/styles";

export interface MarkdownConfig {
  fieldName: string;
  fieldLabel: string;
  formik: ReturnType<typeof useFormik<NewNodeForm>>;
}
const MarkdownEditor = (props: MarkdownConfig) => {
  const theme = useTheme();
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (...err: any[]) => {
      console.log(...err);
    },
  };
  const onChange = (
    editorState: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) => {
    console.log(editorState.toJSON(), editor, tags);
    const helpers = props.formik.getFieldHelpers(props.fieldName);
    helpers.setValue(editorState.toJSON());
  };
  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div>Enter some text...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
      </LexicalComposer>
    </Box>
  );
};
export const MarkdownEditorWrapper = (props: MarkdownConfig) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <FormControl sx={{ padding: 1, paddingTop: 2 }} onClick={handleClick}>
      <InputLabel
        htmlFor={props.fieldName} /*TODO(skep): needs focused=, etc.*/
      >
        {props.fieldLabel}
      </InputLabel>
      {/*<FormHelperText id={props.fieldName}>{props.fieldLabel}</FormHelperText>*/}
      <MarkdownEditor {...props} />
    </FormControl>
  );
};
