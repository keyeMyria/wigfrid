export declare class CompileIdentifierMetadata {
    reference: any;
    name: string;
    prefix: string;
    moduleUrl: string;
    value: any;
    constructor({reference, name, moduleUrl, prefix, value}?: {
        reference?: any;
        name?: string;
        moduleUrl?: string;
        prefix?: string;
        value?: any;
    });
    readonly identifier: CompileIdentifierMetadata;
}
