import '@bangle.dev/core/style.css';
import {
  BangleEditor,
  BangleEditorState,
  SpecRegistry,
} from '@bangle.dev/core';
import { markdownParser, markdownSerializer } from '@bangle.dev/markdown';
import {
  blockquote,
  bold,
  bulletList,
  code,
  codeBlock,
  hardBreak,
  heading,
  horizontalRule,
  image,
  italic,
  link,
  listItem,
  orderedList,
  paragraph,
  strike,
  underline,
} from '@bangle.dev/base-components';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import { useRef } from "react";

import { NewNodeForm } from "./PopUp";

const specRegistry = new SpecRegistry([
  blockquote.spec(),
  bold.spec(),
  bulletList.spec(),
  code.spec(),
  codeBlock.spec(),
  hardBreak.spec(),
  heading.spec(),
  horizontalRule.spec(),
  image.spec(),
  italic.spec(),
  link.spec(),
  listItem.spec(),
  orderedList.spec(),
  paragraph.spec(),
  strike.spec(),
  underline.spec(),
]);
const parser = markdownParser(specRegistry);
const serializer = markdownSerializer(specRegistry);
const bangleEditorComponent = (domNode: any, config: MarkdownConfig) => {
  const state = new BangleEditorState({
    specRegistry,
    plugins: () => [
      blockquote.plugins(),
      bold.plugins(),
      bulletList.plugins(),
      code.plugins(),
      codeBlock.plugins(),
      hardBreak.plugins(),
      heading.plugins(),
      horizontalRule.plugins(),
      image.plugins(),
      italic.plugins(),
      link.plugins(),
      listItem.plugins(),
      orderedList.plugins(),
      paragraph.plugins(),
      strike.plugins(),
      underline.plugins(),
    ],
    initialValue: parser.parse(config.formik.initialValues.nodeResources ?? ""),
  });
  const editor = new BangleEditor(domNode, { state });
  return editor;
}
const serializeMarkdown = (editor: any) => {
  return serializer.serialize(editor.view.state.doc);
}

export interface MarkdownConfig {
  fieldName: string;
  fieldLabel: string;
  formik: ReturnType<typeof useFormik<NewNodeForm>>;
}
const MarkdownEditor = (props: MarkdownConfig) => {
  const bangleRef = useRef();
  bangleEditorComponent()
  return (<Box>
    <div id="bandle-editor-root" ref={bangleRef} ></div>
  </Box>);
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
