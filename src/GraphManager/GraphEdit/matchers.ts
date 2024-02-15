import { createLinkMatcherWithRegExp } from "@lexical/react/LexicalAutoLinkPlugin";

export const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/;

export const MATCHERS = [
  createLinkMatcherWithRegExp(URL_MATCHER, (text: string) => text),
];
