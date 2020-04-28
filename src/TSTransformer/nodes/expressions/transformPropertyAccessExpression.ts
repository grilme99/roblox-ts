import * as lua from "LuaAST";
import { diagnostics } from "TSTransformer/diagnostics";
import { TransformState } from "TSTransformer/TransformState";
import { isMethod } from "TSTransformer/util/isMethod";
import { transformOptionalChain } from "TSTransformer/util/optionalChain";
import ts from "typescript";

export function transformPropertyAccessExpressionInner(
	state: TransformState,
	node: ts.PropertyAccessExpression,
	expression: lua.IndexableExpression,
	name: string,
) {
	if (isMethod(state, node)) {
		state.addDiagnostic(diagnostics.noIndexWithoutCall(node));
	}
	return lua.create(lua.SyntaxKind.PropertyAccessExpression, { expression, name });
}

export function transformPropertyAccessExpression(state: TransformState, node: ts.PropertyAccessExpression) {
	return transformOptionalChain(state, node);
}