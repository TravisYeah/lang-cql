import { parser } from "lezer-cql";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import {
  cqlKeywordCompletionSource,
  cqlBuiltinFunctionCompletionSource,
} from "./complete";

export function cql() {
  const extensions = [
    cqlKeywordCompletionExtension,
    cqlBuiltinFunctionCompletionExtension,
  ];
  return new LanguageSupport(cqlLanguage, extensions);
}

export const cqlLanguage = LRLanguage.define({
  parser: parser.configure({}),
  languageData: {
    closeBrackets: { brackets: ["(", "'", '"'] },
  },
});

const cqlKeywordCompletionExtension = cqlLanguage.data.of({
  autocomplete: cqlKeywordCompletionSource(),
});

const cqlBuiltinFunctionCompletionExtension = cqlLanguage.data.of({
  autocomplete: cqlBuiltinFunctionCompletionSource(),
});
