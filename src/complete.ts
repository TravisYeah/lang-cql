import {
  completeFromList,
  Completion,
  CompletionSource,
  ifIn,
  insertCompletionText,
} from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";

export const cqlKeywordCompletionSource = (): CompletionSource => {
  return ifIn(
    ["BinaryComparisonPredicate", "BooleanExpression"],
    completeFromList([
      { label: "and", type: "keyword" },
      { label: "or", type: "keyword" },
      { label: "not", type: "keyword" },
      { label: "like", type: "keyword" },
      { label: "between", type: "keyword" },
      { label: "is", type: "keyword" },
      { label: "in", type: "keyword" },
      { label: "null", type: "keyword" },
    ]),
  );
};

function applyFunctionCompletion(
  view: EditorView,
  completion: Completion,
  from: number,
  to: number,
) {
  const text = completion.label + "()";
  const pos = text.length - 1;
  view.dispatch(insertCompletionText(view.state, text, from, to));
  view.dispatch({
    selection: { anchor: pos, head: pos },
  });
}

function createFunctionCompetion(label: string): Completion {
  return {
    label,
    type: "function",
    apply: applyFunctionCompletion,
  };
}

const functionCompletionList: Completion[] = [
  "T_AFTER",
  "T_BEFORE",
  "T_CONTAINS",
  "T_DISJOINT",
  "T_DURING",
  "T_EQUALS",
  "T_FINISHEDBY",
  "T_FINISHES",
  "T_INTERSECTS",
  "T_MEETS",
  "T_METBY",
  "T_OVERLAPPEDBY",
  "T_OVERLAPS",
  "T_STARTEDBY",
  "T_STARTS",
  "S_INTERSECTS",
  "S_EQUALS",
  "S_DISJOINT",
  "S_TOUCHES",
  "S_WITHIN",
  "S_OVERLAPS",
  "S_CROSSES",
  "S_CONTAINS",
  "A_EQUALS",
  "A_CONTAINS",
  "A_CONTAINEDBY",
  "A_OVERLAPS",
  "CASEI",
  "ACCENTI",
  "DATE",
  "TIMSTAMP",
  "INTERVAL",
  "POINT",
  "LINESTRING",
  "POLYGON",
  "MULTIPOINT",
  "MULTILINESTRING",
  "MULTIPOLYGON",
  "GEOMETRYCOLLECTION",
  "BBOX",
].map(createFunctionCompetion);

export const cqlBuiltinFunctionCompletionSource = (): CompletionSource => {
  return ifIn(["Identifier"], completeFromList(functionCompletionList));
};
