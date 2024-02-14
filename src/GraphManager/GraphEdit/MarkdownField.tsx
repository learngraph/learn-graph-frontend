import { EditorState, LexicalEditor } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeNode } from "@lexical/code";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  $convertFromMarkdownString,
  $convertToMarkdownString,
  TRANSFORMERS as TRANSFORMERS_MARKDOWN,
} from '@lexical/markdown';


import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import Box from "@mui/material/Box";
import { useRef } from "react";

import { NewNodeForm } from "./PopUp";

export const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;

export const MATCHERS = [
  createLinkMatcherWithRegExp(URL_MATCHER, (text: string) => text),
];

const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);
const validateUrl = (url: string): boolean => {
  return url === "https://" || urlRegExp.test(url);
};

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
    editorState: () => $convertFromMarkdownString(props.formik.initialValues.nodeResources, TRANSFORMERS_MARKDOWN),
    nodes: [
      AutoLinkNode,
      LinkNode,
      HeadingNode,
      QuoteNode,
      CodeNode,
      ListNode,
      ListItemNode,
      LinkNode,
    ],
  };
  const onChange = (
    _editorState: EditorState,
    _editor: LexicalEditor,
    _tags: Set<string>,
  ) => {
    //console.log(editorState.toJSON(), editor, tags);
    const helpers = props.formik.getFieldHelpers(props.fieldName);
    helpers.setValue($convertToMarkdownString(TRANSFORMERS_MARKDOWN));
  };
  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={
            <Box id={`placeholder-${props.fieldName}`}>
              Add the resources you used for learning!
            </Box> /*TODO: translate*/
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS_MARKDOWN} />
        <OnChangePlugin onChange={onChange} />
        <LinkPlugin validateUrl={validateUrl} />
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
