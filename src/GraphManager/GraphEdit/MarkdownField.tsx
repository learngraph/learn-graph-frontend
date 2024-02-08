import { EditorState, LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoLinkNode, LinkNode } from '@lexical/link'; 
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { useRef } from "react";

import { NewNodeForm } from "./PopUp";

const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;

const MATCHERS = [
  (text: string) => {
    console.log(`YYY: ${text}`)
    const match = URL_MATCHER.exec(text);
    if (!match || match.length === 0) {
      return null;
    }
    const fullMatch = match[0];
    console.log(`XXX: ${fullMatch}`)
    return {
      index: match.index,
      length: fullMatch.length,
      text: fullMatch,
      url: fullMatch.startsWith('http') ? fullMatch : `https://${fullMatch}`,
      // attributes: { rel: 'noreferrer', target: '_blank' }, // Optional link attributes
    };
  },
];

export interface MarkdownConfig {
  fieldName: string;
  fieldLabel: string;
  formik: ReturnType<typeof useFormik<NewNodeForm>>;
}
const MarkdownEditor = (props: MarkdownConfig) => {
  const theme = {}; // see https://lexical.dev/docs/getting-started/theming
  const initialConfig = {
    namespace: "NodeResourcesEditor",
    theme,
    onError: (...err: any[]) => {
      console.log(...err);
    },
    history: true,
    linkPasting: true,
    listEditing: true,
    textFormatting: true,
    imageEditing: true,
    hashtagEditing: true,
    tableEditing: true,
    blockquoteEditing: true,
    codeEditing: true,
    keyboardShortcuts: true,
    mentions: true,
    markdownShortcuts: true,
    markdownPaste: true,
    nodes: [AutoLinkNode, LinkNode],
  };
  const onChange = (
    editorState: EditorState,
    _editor: LexicalEditor,
    _tags: Set<string>,
  ) => {
    //console.log(editorState.toJSON(), editor, tags);
    const helpers = props.formik.getFieldHelpers(props.fieldName);
    helpers.setValue(editorState.toJSON().toString());
  };
  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<Box id={`placeholder-${props.fieldName}`}>Add the resources you used for learning!</Box>/*TODO: translate*/}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={onChange} />
        <LinkPlugin />
        <AutoLinkPlugin matchers={MATCHERS} />
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
