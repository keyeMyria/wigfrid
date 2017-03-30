export declare class ODataV4Generator {
    _expand: any;
    _select: any;
    format(hash: any): string;
    parseTree(exprs: any, root: any, stepper: any): void;
    constructor({expand, select}: {
        expand?: any;
        select?: any;
    });
    generate(): string;
    hasDot(x: any): boolean;
}
