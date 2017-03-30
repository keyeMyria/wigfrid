export declare class Pagination {
    private _pageCount;
    private _totalCount;
    private _skip;
    private _take;
    private _pageIndex;
    private _enabled;
    /**
     * pageCount
     */
    readonly pageCount: number;
    readonly isLastPage: boolean;
    totalCount(value: number): this;
    /**
     * pageSize
     */
    readonly pageSize: number;
    /**
     * pageIndex
     */
    readonly pageIndex: number;
    forPage(pageIndex: any, pageSize: any): void;
    skip(value?: number): any;
    limit(value?: number): number | this;
    take(value?: number): number | this;
    readonly isEnabled: boolean;
    enabled(value: boolean): this;
    moveToPage(pageIndex: any): this;
    moveToFirstPage(): this;
    moveToLastPage(): this;
}
