export declare class ODataCompileCriteria {
    createBinaryOperationFormatter(op: any): (prop: any, val: any) => string;
    createStringFuncFormatter(op: any, reverse?: any): (prop: any, val: any) => string;
    formatters: {
        "=": (prop: any, val: any) => string;
        "<>": (prop: any, val: any) => string;
        ">": (prop: any, val: any) => string;
        ">=": (prop: any, val: any) => string;
        "<": (prop: any, val: any) => string;
        "<=": (prop: any, val: any) => string;
        startswith: (prop: any, val: any) => string;
        endswith: (prop: any, val: any) => string;
    };
    formattersV2: {} & {
        "=": (prop: any, val: any) => string;
        "<>": (prop: any, val: any) => string;
        ">": (prop: any, val: any) => string;
        ">=": (prop: any, val: any) => string;
        "<": (prop: any, val: any) => string;
        "<=": (prop: any, val: any) => string;
        startswith: (prop: any, val: any) => string;
        endswith: (prop: any, val: any) => string;
    } & {
        contains: (prop: any, val: any) => string;
        notcontains: (prop: any, val: any) => string;
    };
    formattersV4: {} & {
        "=": (prop: any, val: any) => string;
        "<>": (prop: any, val: any) => string;
        ">": (prop: any, val: any) => string;
        ">=": (prop: any, val: any) => string;
        "<": (prop: any, val: any) => string;
        "<=": (prop: any, val: any) => string;
        startswith: (prop: any, val: any) => string;
        endswith: (prop: any, val: any) => string;
    } & {
        contains: (prop: any, val: any) => string;
        notcontains: (prop: any, val: any) => string;
    };
    private _compileBinary(criteria, protocolVersion);
    private _compileGroup(criteria, protocolVersion);
    private _compileCore(criteria, protocolVersion);
    compile(criteria: any, protocolVersion: any): any;
}
