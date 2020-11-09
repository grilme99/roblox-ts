import ts from "byots";

export const transformerErrors = new WeakMap<ts.Program, Array<ts.Diagnostic>>();
export function addDiagnosticFactory(program: ts.Program) {
	return (diag: ts.Diagnostic) => {
		const arr = transformerErrors.get(program) || [];
		arr.push(diag);
		transformerErrors.set(program, arr);
	};
}
