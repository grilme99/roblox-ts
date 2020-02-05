import * as lua from "LuaAST";
import { TransformState } from "TSTransformer";
import { transformExpression } from "TSTransformer/nodes/expressions/expression";
import { transformIdentifier } from "TSTransformer/nodes/expressions/identifier";
import ts from "typescript";

function transformVariableDeclaration(state: TransformState, node: ts.VariableDeclaration): lua.List<lua.Statement> {
	return state.statement(statements => {
		if (!ts.isIdentifier(node.name)) {
			throw new Error("Unsupported");
		}
		lua.list.push(
			statements,
			lua.create(lua.SyntaxKind.VariableDeclaration, {
				left: transformIdentifier(state, node.name, true),
				right:
					node.initializer !== undefined
						? transformExpression(state, node.initializer)
						: lua.create(lua.SyntaxKind.NilLiteral, {}),
			}),
		);
	});
}

export function transformVariableStatement(state: TransformState, node: ts.VariableStatement): lua.List<lua.Statement> {
	const statements = lua.list.make<lua.Statement>();
	for (const declaration of node.declarationList.declarations) {
		lua.list.pushList(statements, transformVariableDeclaration(state, declaration));
	}
	return statements;
}