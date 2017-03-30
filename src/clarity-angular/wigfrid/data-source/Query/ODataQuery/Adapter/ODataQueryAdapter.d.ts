export declare class ODataQueryAdapter {
    private queryOptions;
    private _select;
    private _skip;
    private _take;
    private _countQuery;
    private _sorting;
    private _criteria;
    private _expand;
    private _oDataVersion;
    constructor();
    setOptions(queryOptions: any): void;
    private hasFunction(criterion);
    private hasSlice();
    private generateSelectExpand();
    private requestData();
    exec(url: any): any;
    multiSort(args: any): boolean;
    slice(skipCount: any, takeCount: any): boolean;
    filter(criterion: any): boolean;
    select(expr: any): boolean;
    count(): void;
}
