import {
  completeFromList,
  Completion,
  CompletionContext,
  CompletionResult,
  CompletionSource,
  ifIn,
  insertCompletionText,
} from "@codemirror/autocomplete";
import { EditorView } from "@codemirror/view";

function reverseFind(text: string, char: string): number {
  let i = text.length
  while (i > 0) {
    if (text[i] === char) {
      return i
    }
    i--
  }
  return -1
}

export const cqlDateInstanceCompletionSource = (): CompletionSource => {
  return ifIn(
    ["DateInstantString"],
    (context: CompletionContext) => {
      const dateStrStart = reverseFind(context.state.sliceDoc(0, context.pos), "'") + 1
      const curStr = context.state.sliceDoc(dateStrStart, context.pos)
      const offset = context.pos - dateStrStart
      const completionTemplate = "1000-01-01"
      let completionText = curStr + completionTemplate.substring(offset)
      const completionResult: CompletionResult = ({
        from: dateStrStart, options: [{
          label: completionText, type: "constant",
        }]
      })
      return completionResult
    }
  );
};

export const cqlTimestampInstanceCompletionSource = (): CompletionSource => {
  return ifIn(
    ["TimestampInstantString"],
    (context: CompletionContext) => {
      const dateStrStart = reverseFind(context.state.sliceDoc(0, context.pos), "'") + 1
      const curStr = context.state.sliceDoc(dateStrStart, context.pos)
      const offset = context.pos - dateStrStart
      const dateStrEnd = context.pos + context.state.sliceDoc(context.pos).indexOf("'")
      const completionTemplate = "1000-01-01T00:00:00Z"
      let completionText = curStr + completionTemplate.substring(offset)
      const completionEndTemplate = "1000-01-01T23:59:59Z"
      let completionEndText = curStr + completionEndTemplate.substring(offset)
      const completionResult: CompletionResult = ({
        from: dateStrStart, to: dateStrEnd, options: [{
          label: completionText, type: "constant",
        }, {
          label: completionEndText, type: "constant",
        }]
      })
      return completionResult
    }
  );
};

export const cqlKeywordCompletionSource = (): CompletionSource => {
  return ifIn(
    ["BinaryComparisonPredicate", "BooleanExpression"],
    completeFromList([
      { displayLabel: "and", label: "and ", type: "keyword" },
      { displayLabel: "or", label: "or ", type: "keyword" },
      { displayLabel: "not", label: "not ", type: "keyword" },
      { displayLabel: "like", label: "like ", type: "keyword" },
      { displayLabel: "between", label: "between ", type: "keyword" },
      { displayLabel: "is", label: "is ", type: "keyword" },
      { displayLabel: "in", label: "in ", type: "keyword" },
    ]),
  );
};

export const cqlConstantCompletionSource = (): CompletionSource => {
  return ifIn(
    ["BinaryComparisonPredicate", "BooleanExpression"],
    completeFromList([
      { label: "null", type: "constant" },
      { label: "EMPTY", type: "constant" },
      { label: "true", type: "constant" },
      { label: "false", type: "constant" },
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
  const pos = from + text.length - 1;
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
  "TIMESTAMP",
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
