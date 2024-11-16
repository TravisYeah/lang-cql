import { parser } from "lezer-cql";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import {
  cqlKeywordCompletionSource,
  cqlBuiltinFunctionCompletionSource,
  cqlConstantCompletionSource,
} from "./complete";

export function cql() {
  const extensions = [
    cqlKeywordCompletionExtension,
    cqlConstantCompletionExtension,
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

const cqlConstantCompletionExtension = cqlLanguage.data.of({
  autocomplete: cqlConstantCompletionSource(),
});

const cqlBuiltinFunctionCompletionExtension = cqlLanguage.data.of({
  autocomplete: cqlBuiltinFunctionCompletionSource(),
});
