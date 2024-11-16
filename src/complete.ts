import {
  completeFromList,
  CompletionSource,
  ifIn,
} from "@codemirror/autocomplete";

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

export const cqlBuiltinFunctionCompletionSource = (): CompletionSource => {
  return ifIn(
    ["Identifier"],
    completeFromList([
      { label: "T_AFTER", type: "function" },
      { label: "T_BEFORE", type: "function" },
      { label: "T_CONTAINS", type: "function" },
      { label: "T_DISJOINT", type: "function" },
      { label: "T_DURING", type: "function" },
      { label: "T_EQUALS", type: "function" },
      { label: "T_FINISHEDBY", type: "function" },
      { label: "T_FINISHES", type: "function" },
      { label: "T_INTERSECTS", type: "function" },
      { label: "T_MEETS", type: "function" },
      { label: "T_METBY", type: "function" },
      { label: "T_OVERLAPPEDBY", type: "function" },
      { label: "T_OVERLAPS", type: "function" },
      { label: "T_STARTEDBY", type: "function" },
      { label: "T_STARTS", type: "function" },
      { label: "S_INTERSECTS", type: "function" },
      { label: "S_EQUALS", type: "function" },
      { label: "S_DISJOINT", type: "function" },
      { label: "S_TOUCHES", type: "function" },
      { label: "S_WITHIN", type: "function" },
      { label: "S_OVERLAPS", type: "function" },
      { label: "S_CROSSES", type: "function" },
      { label: "S_CONTAINS", type: "function" },
      { label: "A_EQUALS", type: "function" },
      { label: "A_CONTAINS", type: "function" },
      { label: "A_CONTAINEDBY", type: "function" },
      { label: "A_OVERLAPS", type: "function" },
      { label: "CASEI", type: "function" },
      { label: "ACCENTI", type: "function" },
      { label: "DATE", type: "function" },
      { label: "TIMSTAMP", type: "function" },
      { label: "INTERVAL", type: "function" },
      { label: "POINT", type: "function" },
      { label: "LINESTRING", type: "function" },
      { label: "POLYGON", type: "function" },
      { label: "MULTIPOINT", type: "function" },
      { label: "MULTILINESTRING", type: "function" },
      { label: "MULTIPOLYGON", type: "function" },
      { label: "GEOMETRYCOLLECTION", type: "function" },
      { label: "BBOX", type: "function" },
    ]),
  );
};
