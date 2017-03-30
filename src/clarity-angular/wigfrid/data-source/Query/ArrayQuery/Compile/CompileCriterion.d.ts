import * as o from "../../Query/Compile/Output/OutputAST";
export declare class CompileCriterion {
    comparisonMethods: CompileMethod[];
    filterMethod: CompileMethod;
    matchMethod: CompileMethod;
    getterDependencies: any[];
    sortDescriptions: any[];
    constructor();
    private generateConstructorMethod();
    private generateFilterMethod();
    private generateComparisonMethod();
    private generateMatchMethod();
    private generateComparisonClass();
    generate(): o.ClassStmt[];
    generateGroupMethod(): void;
    addGetterDependence(dependence: any): o.ExternalExpr;
}
export declare class CompileMethod {
    private _bodyStatements;
    addStmt(stmt: o.Statement): void;
    addStmts(stmts: o.Statement[]): void;
    finish(): o.Statement[];
    isEmpty(): boolean;
}
