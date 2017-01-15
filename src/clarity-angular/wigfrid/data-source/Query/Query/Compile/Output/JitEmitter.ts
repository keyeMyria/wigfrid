

import * as o from './OutputAST';
import { OutputEmitter, EmitterVisitorContext } from "./AbstractEmitter";
import { AbstractJsEmitterVisitor } from "./AbstractJsEmitter";

export function sanitizeIdentifier(name: string): string {
    return name.replace(/\W/g, '_');
}

function evalExpression(
    sourceUrl: string, expr: string, declarations: string, vars: {[key: string]: any}): any {
    const fnBody               = `${declarations}\nreturn ${expr}\n//# sourceURL=${sourceUrl}`;
    const fnArgNames: string[] = [];
    const fnArgValues: any[]   = [];
    for (let argName in vars) {
        fnArgNames.push(argName);
        fnArgValues.push(vars[argName]);
    }
    return new Function(...fnArgNames.concat(fnBody))(...fnArgValues);
}

export function jitStatements(
    sourceUrl: string, statements: o.Statement[], resultVar: string): any {
    const converter = new JitEmitterVisitor();
    const ctx       = EmitterVisitorContext.createRoot([resultVar]);
    converter.visitAllStatements(statements, ctx);
    return evalExpression(sourceUrl, resultVar, ctx.toSource(), converter.getArgs());
}

class JitEmitterVisitor extends AbstractJsEmitterVisitor {
    private _evalArgNames: string[] = [];
    private _evalArgValues: any[] = [];

    getArgs(): {[key: string]: any} {
        const result = {};
        for (let i = 0; i < this._evalArgNames.length; i++) {
            (result as any /** TODO #9100 */)[this._evalArgNames[i]] = this._evalArgValues[i];
        }
        return result;
    }

    visitExternalExpr(ast: o.ExternalExpr, ctx: EmitterVisitorContext): any {
        const value = ast.value.reference;
        let id      = this._evalArgValues.indexOf(value);
        if (id === -1) {
            id = this._evalArgValues.length;
            this._evalArgValues.push(value);
            const name = ast.value.name ? sanitizeIdentifier(ast.value.name) : 'val';
            this._evalArgNames.push(sanitizeIdentifier(`jit_${name}${id}`));
        }
        ctx.print(this._evalArgNames[id]);
        return null;
    }
}
