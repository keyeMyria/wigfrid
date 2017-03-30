import { DeclareVarStmt, DeclareFunctionStmt, ExpressionStatement, ReturnStatement, ClassStmt, IfStmt, TryCatchStmt, ThrowStmt, CommentStmt } from "./Output/OutputAST";
export interface StatementVisitor {
    visitDeclareVarStmt(stmt: DeclareVarStmt, context: any): any;
    visitDeclareFunctionStmt(stmt: DeclareFunctionStmt, context: any): any;
    visitExpressionStmt(stmt: ExpressionStatement, context: any): any;
    visitReturnStmt(stmt: ReturnStatement, context: any): any;
    visitDeclareClassStmt(stmt: ClassStmt, context: any): any;
    visitIfStmt(stmt: IfStmt, context: any): any;
    visitTryCatchStmt(stmt: TryCatchStmt, context: any): any;
    visitThrowStmt(stmt: ThrowStmt, context: any): any;
    visitCommentStmt(stmt: CommentStmt, context: any): any;
}
