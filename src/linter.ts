import { syntaxTree } from "@codemirror/language"
import { linter, Diagnostic } from "@codemirror/lint"
import { SyntaxNode } from "@lezer/common"

function isType(arg: SyntaxNode | null | undefined, type: string): boolean {
  return arg?.name === type
}

export const cqlLinterExtension = linter(view => {
  let diagnostics: Diagnostic[] = []
  syntaxTree(view.state).cursor().iterate(node => {
    const functionName = node.node.firstChild
    const arg1 = functionName?.nextSibling
    const arg2 = arg1?.nextSibling
    if (node.name === "TemporalPredicate") {
      if (!isType(arg1, "TemporalExpression") || !isType(arg2, "TemporalExpression")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two temporal expression arguments.",
        })
      }
    } else if (node.name === "SpatialPredicate") {
      if (!isType(arg1, "GeomExpression") || !isType(arg2, "GeomExpression")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two spatial expression arguments.",
        })
      }
    } else if (node.name === "ArrayPredicate") {
      if (!isType(arg1, "ArrayOperand") || !isType(arg2, "ArrayOperand")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two array expression arguments.",
        })
      }
    }
  })
  return diagnostics
})
