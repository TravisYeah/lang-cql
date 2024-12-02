import { syntaxTree } from "@codemirror/language"
import { linter, Diagnostic } from "@codemirror/lint"
import { SyntaxNode } from "@lezer/common"

function isTemporalExpression(arg: SyntaxNode | null | undefined): boolean {
  return arg?.name === "TemporalExpression"
}

export const cqlLinterExtension = linter(view => {
  let diagnostics: Diagnostic[] = []
  syntaxTree(view.state).cursor().iterate(node => {
    console.log(node.name)
    if (node.name === "TemporalPredicate") {
      const functionName = node.node.firstChild
      const arg1 = functionName?.nextSibling
      const arg2 = arg1?.nextSibling
      if (!isTemporalExpression(arg1) || !isTemporalExpression(arg2)) {
        diagnostics.push({
          from: node.from,
          to: node.to,
          severity: "error",
          message: "Expecting two temporal expression arguments.",
        })
      }
    }
  })
  return diagnostics
})
