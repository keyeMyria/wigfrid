export declare class CompileCriteria {
    compile(crit: any): any;
    private _compileBinary(getter, op, value);
    private _compileEquals(getter, value, negate?);
    private _useStrictComparison(value);
    private _compileGroup(crit);
    toString(value: any): any;
}
