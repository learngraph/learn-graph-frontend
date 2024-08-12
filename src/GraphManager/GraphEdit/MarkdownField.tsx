import { EditorState, LexicalEditor } from "lexical";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { AutoLinkNode, LinkNode } from "@lexical/link"; // Link Node is (I think) not where the appearance of the link is defined.
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
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
} from "@lexical/markdown";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import NotchedOutline from "@mui/material/OutlinedInput/NotchedOutline";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { MATCHERS } from "./matchers";
import { useTheme } from "@emotion/react";

const urlRegExp = new RegExp(
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/,
);
const validateUrl = (url: string): boolean => {
  return url === "https://" || urlRegExp.test(url);
};

export interface MarkdownConfig {
  fieldName: string;
  fieldLabel: string;
  initialMarkdownContent: string;
  setValueOnChange: (markdown: string) => void;
  isEditingEnabled: boolean;
}
interface MarkdownEditorConfig extends MarkdownConfig {
  isEmpty: boolean;
  setIsEmpty: Dispatch<SetStateAction<boolean>>;
  isFocused: boolean;
  // XXX(skep): This is a hack to focus on editor, even if user misses the
  // editor window. The proper solution should align the editor size exactly
  // with the NotchedOutline component.
  onClickStateChange: number;
}

const FocusWhenStateChangePlugin = (props: {
  onClickStateChange: number;
  isEditingEnabled: boolean;
}) => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    if (props.onClickStateChange === 0) {
      editor.setEditable(false);
      return;
    }
    if (!props.isEditingEnabled) {
      return;
    }
    editor.setEditable(true);
    // XXX(skep): if this timeout hack is not used the user would have to click
    // 2 times, which is confusing, but why is it needed?!
    setTimeout(() => editor.focus(), 10);
  }, [props.onClickStateChange]);
  return null;
};

const MarkdownEditor = (props: MarkdownEditorConfig) => {
  const theme = useTheme(); // see https://lexical.dev/docs/getting-started/theming
  const loadInitialEditorState = () => {
    props.setIsEmpty(!props.initialMarkdownContent);
    $convertFromMarkdownString(
      props.initialMarkdownContent,
      TRANSFORMERS_MARKDOWN,
    );
  };
  const initialConfig: InitialConfigType = {
    namespace: "NodeResourcesEditor",
    theme,
    editable: false,
    onError: (...err: any[]) => {
      console.log(...err);
    },
    editorState: loadInitialEditorState,
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
    editorState: EditorState,
    _editor: LexicalEditor,
    _tags: Set<string>,
  ) => {
    let markdown = "";
    editorState.read(() => {
      markdown = $convertToMarkdownString(TRANSFORMERS_MARKDOWN);
    });
    props.setValueOnChange(markdown);
    props.setIsEmpty(markdown === "");
  };
  return (
    <Box>
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<></>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS_MARKDOWN} />
        <OnChangePlugin onChange={onChange} />
        <LinkPlugin validateUrl={validateUrl} />
        <AutoLinkPlugin matchers={MATCHERS} />
        <HistoryPlugin />
        <FocusWhenStateChangePlugin
          onClickStateChange={props.onClickStateChange}
          isEditingEnabled={props.isEditingEnabled}
        />
      </LexicalComposer>
      <NotchedOutline
        notched={true}
        focused={props.isFocused}
        label={props.isFocused || !props.isEmpty ? props.fieldLabel : ""}
      />
    </Box>
  );
};
export const MarkdownEditorWrapper = (props: MarkdownConfig) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [onClickStateChange, setOnClickStateChange] = useState(0);
  const handleClick: MouseEventHandler<HTMLDivElement> = (_) => {
    setOnClickStateChange(1);
    if (!props.isEditingEnabled) {
      return;
    }
    setIsFocused(true);
  };
  const handleUnfocus = () => {
    setIsFocused(false);
    setOnClickStateChange(0);
  };
  return (
    <FormControl
      fullWidth={true}
      sx={{ padding: 1 }}
      onClick={handleClick}
      onBlur={handleUnfocus}
    >
      <InputLabel
        htmlFor={props.fieldName} /*TODO(skep): needs focused=, etc.*/
        focused={isFocused}
        shrink={isFocused || !isEmpty}
      >
        {props.fieldLabel}
      </InputLabel>
      <MarkdownEditor
        {...props}
        isEmpty={isEmpty}
        setIsEmpty={setIsEmpty}
        isFocused={isFocused}
        onClickStateChange={onClickStateChange}
      />
    </FormControl>
  );
};
