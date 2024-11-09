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
      { label: "T_AFTER", type: "builtin" },
      { label: "T_BEFORE", type: "builtin" },
      { label: "T_CONTAINS", type: "builtin" },
      { label: "T_DISJOINT", type: "builtin" },
      { label: "T_DURING", type: "builtin" },
      { label: "T_EQUALS", type: "builtin" },
      { label: "T_FINISHEDBY", type: "builtin" },
      { label: "T_FINISHES", type: "builtin" },
      { label: "T_INTERSECTS", type: "builtin" },
      { label: "T_MEETS", type: "builtin" },
      { label: "T_METBY", type: "builtin" },
      { label: "T_OVERLAPPEDBY", type: "builtin" },
      { label: "T_OVERLAPS", type: "builtin" },
      { label: "T_STARTEDBY", type: "builtin" },
      { label: "T_STARTS", type: "builtin" },
      { label: "S_INTERSECTS", type: "builtin" },
      { label: "S_EQUALS", type: "builtin" },
      { label: "S_DISJOINT", type: "builtin" },
      { label: "S_TOUCHES", type: "builtin" },
      { label: "S_WITHIN", type: "builtin" },
      { label: "S_OVERLAPS", type: "builtin" },
      { label: "S_CROSSES", type: "builtin" },
      { label: "S_CONTAINS", type: "builtin" },
      { label: "A_EQUALS", type: "builtin" },
      { label: "A_CONTAINS", type: "builtin" },
      { label: "A_CONTAINEDBY", type: "builtin" },
      { label: "A_OVERLAPS", type: "builtin" },
      { label: "CASEI", type: "builtin" },
      { label: "ACCENTI", type: "builtin" },
      { label: "DATE", type: "builtin" },
      { label: "TIMSTAMP", type: "builtin" },
      { label: "INTERVAL", type: "builtin" },
      { label: "POINT", type: "builtin" },
      { label: "LINESTRING", type: "builtin" },
      { label: "POLYGON", type: "builtin" },
      { label: "MULTIPOINT", type: "builtin" },
      { label: "MULTILINESTRING", type: "builtin" },
      { label: "MULTIPOLYGON", type: "builtin" },
      { label: "GEOMETRYCOLLECTION", type: "builtin" },
      { label: "BBOX", type: "builtin" },
    ]),
  );
};
