export declare class ODataV2Generator {
    _expand: any;
    _select: any;
    _hash: any;
    constructor({expand, select}: {
        expand: any;
        select: any;
    });
    private _format();
    generate(): string;
}
