import { syntaxTree } from "@codemirror/language"
import { linter, Diagnostic } from "@codemirror/lint"
import { SyntaxNode } from "@lezer/common"

function isType(arg: SyntaxNode | null | undefined, type: string, optional?: boolean): boolean {
  if (optional && !arg) {
    return true
  }
  return arg?.name === type
}

export const cqlLinterExtension = linter(view => {
  let diagnostics: Diagnostic[] = []
  syntaxTree(view.state).cursor().iterate(node => {
    const child1 = node.node.firstChild
    const child2 = child1?.nextSibling
    const child3 = child2?.nextSibling
    if (node.name === "TemporalPredicate") {
      if (!isType(child2, "TemporalExpression") || !isType(child3, "TemporalExpression")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two temporal expression arguments.",
        })
      }
    } else if (node.name === "SpatialPredicate") {
      if (!isType(child2, "GeomExpression") || !isType(child3, "GeomExpression")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two spatial expression arguments.",
        })
      }
    } else if (node.name === "ArrayPredicate") {
      if (!isType(child2, "ArrayOperand") || !isType(child3, "ArrayOperand")) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two array expression arguments.",
        })
      }
    } else if (node.name === "Point") {
      if (!isType(child1, "NumericLiteral") || !isType(child2, "NumericLiteral") || !isType(child3, "NumericLiteral", true)) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting 2-3 numeric arguments.",
        })
      }
    }
  })
  return diagnostics
})
