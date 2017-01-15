import { Type, BOOL_TYPE, MapType, ExternalType, TypeModifier } from "../Types";
import { StatementVisitor } from "../StatementVisitor";
import { CompileIdentifierMetadata } from "../compile_metadata";
import {isString} from "../../../../../../core/index";
export enum BinaryOperator {
    Equals,
    NotEquals,
    Identical,
    NotIdentical,
    Minus,
    Plus,
    Divide,
    Multiply,
    Modulo,
    And,
    Or,
    Lower,
    LowerEquals,
    Bigger,
    BiggerEquals
}


export abstract class Expression {
    constructor(public type: Type) {}

    abstract visitExpression(visitor: ExpressionVisitor, context: any): any;

    prop(name: string): ReadPropExpr { return new ReadPropExpr(this, name); }

    key(index: Expression, type: Type = null): ReadKeyExpr {
        return new ReadKeyExpr(this, index, type);
    }

    callMethod(name: string|BuiltinMethod, params: Expression[]): InvokeMethodExpr {
        return new InvokeMethodExpr(this, name, params);
    }

    callFn(params: Expression[]): InvokeFunctionExpr { return new InvokeFunctionExpr(this, params); }

    instantiate(params: Expression[], type: Type = null): InstantiateExpr {
        return new InstantiateExpr(this, params, type);
    }

    conditional(trueCase: Expression, falseCase: Expression = null): ConditionalExpr {
        return new ConditionalExpr(this, trueCase, falseCase);
    }

    equals(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs);
    }
    notEquals(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs);
    }
    identical(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs);
    }
    notIdentical(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs);
    }
    minus(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs);
    }
    plus(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs);
    }
    divide(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs);
    }
    multiply(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs);
    }
    modulo(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs);
    }
    and(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs);
    }
    or(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs);
    }
    lower(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs);
    }
    lowerEquals(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs);
    }
    bigger(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs);
    }
    biggerEquals(rhs: Expression): BinaryOperatorExpr {
        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs);
    }
    isBlank(): Expression {
        // Note: We use equals by purpose here to compare to null and undefined in JS.
        return this.equals(NULL_EXPR);
    }
    cast(type: Type): Expression { return new CastExpr(this, type); }
    toStmt(): Statement { return new ExpressionStatement(this); }
}

export enum BuiltinVar {
    This,
    Super,
    CatchError,
    CatchStack
}

export class ReadVarExpr extends Expression {
    public name: string;
    public builtin: BuiltinVar;

    constructor(name: string|BuiltinVar, type: Type = null) {
        super(type);
        if (isString(name)) {
            this.name = <string>name;
            this.builtin = null;
        } else {
            this.name = null;
            this.builtin = <BuiltinVar>name;
        }
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitReadVarExpr(this, context);
    }

    set(value: Expression): WriteVarExpr { return new WriteVarExpr(this.name, value); }
}


export class WriteVarExpr extends Expression {
    public value: Expression;
    constructor(public name: string, value: Expression, type: Type = null) {
        super(type ? type : value.type);
        this.value = value;
    }

    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitWriteVarExpr(this, context);
    }

    toDeclStmt(type: Type = null, modifiers: StmtModifier[] = null): DeclareVarStmt {
        return new DeclareVarStmt(this.name, this.value, type, modifiers);
    }
}


export class WriteKeyExpr extends Expression {
    public value: Expression;
    constructor(
        public receiver: Expression, public index: Expression, value: Expression, type: Type = null) {
        super(type ? type : value.type);
        this.value = value;
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitWriteKeyExpr(this, context);
    }
}


export class WritePropExpr extends Expression {
    public value: Expression;
    constructor(
        public receiver: Expression, public name: string, value: Expression, type: Type = null) {
        super(type ? type : value.type);
        this.value = value;
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitWritePropExpr(this, context);
    }
}

export enum BuiltinMethod {
    ConcatArray,
    SubscribeObservable,
    Bind
}

export class InvokeMethodExpr extends Expression {
    public name: string;
    public builtin: BuiltinMethod;
    constructor(
        public receiver: Expression, method: string|BuiltinMethod, public args: Expression[],
        type: Type = null) {
        super(type);
        if (isString(method)) {
            this.name = <string>method;
            this.builtin = null;
        } else {
            this.name = null;
            this.builtin = <BuiltinMethod>method;
        }
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitInvokeMethodExpr(this, context);
    }
}

export class InvokeFunctionExpr extends Expression {
    constructor(public fn: Expression, public args: Expression[], type: Type = null) { super(type); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitInvokeFunctionExpr(this, context);
    }
}

export class InstantiateExpr extends Expression {
    constructor(public classExpr: Expression, public args: Expression[], type?: Type) { super(type); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitInstantiateExpr(this, context);
    }
}

export class LiteralExpr extends Expression {
    constructor(public value: any, type: Type = null) { super(type); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitLiteralExpr(this, context);
    }
}

export class ExternalExpr extends Expression {
    constructor(
        public value: CompileIdentifierMetadata, type: Type = null,
        public typeParams: Type[] = null) {
        super(type);
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitExternalExpr(this, context);
    }
}

export class ConditionalExpr extends Expression {
    public trueCase: Expression;
    constructor(
        public condition: Expression, trueCase: Expression, public falseCase: Expression = null,
        type: Type = null) {
        super(type ? type : trueCase.type);
        this.trueCase = trueCase;
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitConditionalExpr(this, context);
    }
}

export class NotExpr extends Expression {
    constructor(public condition: Expression) { super(BOOL_TYPE); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitNotExpr(this, context);
    }
}

export class CastExpr extends Expression {
    constructor(public value: Expression, type: Type) { super(type); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitCastExpr(this, context);
    }
}

export class FnParam {
    constructor(public name: string, public type: Type = null) {}
}

export class FunctionExpr extends Expression {
    constructor(public params: FnParam[], public statements: Statement[], type: Type = null) {
        super(type);
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitFunctionExpr(this, context);
    }

    toDeclStmt(name: string, modifiers: StmtModifier[] = null): DeclareFunctionStmt {
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
    }
}

export class BinaryOperatorExpr extends Expression {
    public lhs: Expression;
    constructor(
        public operator: BinaryOperator, lhs: Expression, public rhs: Expression, type: Type = null) {
        super(type ? type : lhs.type);
        this.lhs = lhs;
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitBinaryOperatorExpr(this, context);
    }
}

export class ReadPropExpr extends Expression {
    constructor(public receiver: Expression, public name: string, type: Type = null) { super(type); }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitReadPropExpr(this, context);
    }
    set(value: Expression): WritePropExpr {
        return new WritePropExpr(this.receiver, this.name, value);
    }
}

export class ReadKeyExpr extends Expression {
    constructor(public receiver: Expression, public index: Expression, type: Type = null) {
        super(type);
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitReadKeyExpr(this, context);
    }
    set(value: Expression): WriteKeyExpr {
        return new WriteKeyExpr(this.receiver, this.index, value);
    }
}

export class LiteralArrayExpr extends Expression {
    public entries: Expression[];
    constructor(entries: Expression[], type: Type = null) {
        super(type);
        this.entries = entries;
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitLiteralArrayExpr(this, context);
    }
}

export class LiteralMapExpr extends Expression {
    public valueType: Type = null;
    constructor(public entries: Array<Array<string|Expression>>, type: MapType = null) {
        super(type);
        if (type) {
            this.valueType = type.valueType;
        }
    }
    visitExpression(visitor: ExpressionVisitor, context: any): any {
        return visitor.visitLiteralMapExpr(this, context);
    }
}

export interface ExpressionVisitor {
    visitReadVarExpr(ast: ReadVarExpr, context: any): any;
    visitWriteVarExpr(expr: WriteVarExpr, context: any): any;
    visitWriteKeyExpr(expr: WriteKeyExpr, context: any): any;
    visitWritePropExpr(expr: WritePropExpr, context: any): any;
    visitInvokeMethodExpr(ast: InvokeMethodExpr, context: any): any;
    visitInvokeFunctionExpr(ast: InvokeFunctionExpr, context: any): any;
    visitInstantiateExpr(ast: InstantiateExpr, context: any): any;
    visitLiteralExpr(ast: LiteralExpr, context: any): any;
    visitExternalExpr(ast: ExternalExpr, context: any): any;
    visitConditionalExpr(ast: ConditionalExpr, context: any): any;
    visitNotExpr(ast: NotExpr, context: any): any;
    visitCastExpr(ast: CastExpr, context: any): any;
    visitFunctionExpr(ast: FunctionExpr, context: any): any;
    visitBinaryOperatorExpr(ast: BinaryOperatorExpr, context: any): any;
    visitReadPropExpr(ast: ReadPropExpr, context: any): any;
    visitReadKeyExpr(ast: ReadKeyExpr, context: any): any;
    visitLiteralArrayExpr(ast: LiteralArrayExpr, context: any): any;
    visitLiteralMapExpr(ast: LiteralMapExpr, context: any): any;
}

export let THIS_EXPR       = new ReadVarExpr(BuiltinVar.This);
export let SUPER_EXPR      = new ReadVarExpr(BuiltinVar.Super);
export let CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError);
export let CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack);
export const NULL_EXPR     = new LiteralExpr(null, null);



export function variable(name: string, type: Type = null): ReadVarExpr {
    return new ReadVarExpr(name, type);
}

export function importExpr(id: CompileIdentifierMetadata, typeParams: Type[] = null): ExternalExpr {
    return new ExternalExpr(id, null, typeParams);
}

export function importType(
    id: CompileIdentifierMetadata, typeParams: Type[] = null,
    typeModifiers: TypeModifier[] = null): ExternalType {
    return id ? new ExternalType(id, typeParams, typeModifiers) : null;
}

export function literalArr(values: Expression[], type: Type = null): LiteralArrayExpr {
    return new LiteralArrayExpr(values, type);
}

export function literalMap(
    values: Array<Array<string|Expression>>, type: MapType = null): LiteralMapExpr {
    return new LiteralMapExpr(values, type);
}

export function not(expr: Expression): NotExpr {
    return new NotExpr(expr);
}

export function fn(params: FnParam[], body: Statement[], type: Type = null): FunctionExpr {
    return new FunctionExpr(params, body, type);
}

export function literal(value: any, type: Type = null): LiteralExpr {
    return new LiteralExpr(value, type);
}


//statements
export enum StmtModifier {
    Final,
    Private
}

export abstract class Statement {
    constructor(public modifiers: StmtModifier[] = null) {
        if (!modifiers) {
            this.modifiers = [];
        }
    }

    abstract visitStatement(visitor: StatementVisitor, context: any): any;

    hasModifier(modifier: StmtModifier): boolean { return this.modifiers.indexOf(modifier) !== -1; }
}

export class AbstractClassPart {
    constructor(public type: Type = null, public modifiers: StmtModifier[]) {
        if (!modifiers) {
            this.modifiers = [];
        }
    }
    hasModifier(modifier: StmtModifier): boolean { return this.modifiers.indexOf(modifier) !== -1; }
}

export class ClassField extends AbstractClassPart {
    constructor(public name: string, type: Type = null, modifiers: StmtModifier[] = null) {
        super(type, modifiers);
    }
}


export class ClassMethod extends AbstractClassPart {
    constructor(
        public name: string, public params: FnParam[], public body: Statement[], type: Type = null,
        modifiers: StmtModifier[] = null) {
        super(type, modifiers);
    }
}


export class ClassGetter extends AbstractClassPart {
    constructor(
        public name: string, public body: Statement[], type: Type = null,
        modifiers: StmtModifier[] = null) {
        super(type, modifiers);
    }
}

export class ClassStmt extends Statement {
    constructor(
        public name: string, public parent: Expression, public fields: ClassField[],
        public getters: ClassGetter[], public constructorMethod: ClassMethod,
        public methods: ClassMethod[], modifiers: StmtModifier[] = null) {
        super(modifiers);
    }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitDeclareClassStmt(this, context);
    }
}

export class CommentStmt extends Statement {
    constructor(public comment: string) { super(); }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitCommentStmt(this, context);
    }
}

export class DeclareFunctionStmt extends Statement {
    constructor(public name: string, public params: FnParam[], public statements: Statement[],
                public type: Type = null, modifiers: StmtModifier[] = null) {
        super(modifiers);
    }

    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitDeclareFunctionStmt(this, context);
    }
}

export class DeclareVarStmt extends Statement {
    public type: Type;

    constructor(public name: string, public value: Expression, type: Type = null,
                modifiers: StmtModifier[] = null) {
        super(modifiers);
        this.type = type ? type : value.type;
    }

    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitDeclareVarStmt(this, context);
    }
}

export class ExpressionStatement extends Statement {
    constructor(public expr: Expression) { super(); }

    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitExpressionStmt(this, context);
    }
}

export class IfStmt extends Statement {
    constructor(
        public condition: Expression, public trueCase: Statement[],
        public falseCase: Statement[] = []) {
        super();
    }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitIfStmt(this, context);
    }
}

export class ReturnStatement extends Statement {
    constructor(public value: Expression) { super(); }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitReturnStmt(this, context);
    }
}

export class ThrowStmt extends Statement {
    constructor(public error: Expression) { super(); }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitThrowStmt(this, context);
    }
}

export class TryCatchStmt extends Statement {
    constructor(public bodyStmts: Statement[], public catchStmts: Statement[]) { super(); }
    visitStatement(visitor: StatementVisitor, context: any): any {
        return visitor.visitTryCatchStmt(this, context);
    }
}

