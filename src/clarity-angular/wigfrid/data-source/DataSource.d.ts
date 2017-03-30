import { Subject, Observable } from "rxjs/Rx";
import { Pagination } from "./Pagination";
import { Store } from "./Store/Store";
import { Queue } from "./Utils/Queue";
export declare class DataSource<T, R> {
    private _store;
    private _storeLoadOptions;
    private _mapFunc;
    private _postProcessFunc;
    private _loadingCount;
    private _loadQueue;
    private _searchValue;
    private _searchOperation;
    private _searchExpr;
    private _items;
    /**
     * @readonly
     * @returns array
     */
    readonly items: any;
    private _userData;
    private _isLoaded;
    private _delayedLoadTask;
    private _disposed;
    /**
     * Pagination
     */
    _pagination: Pagination;
    constructor(store: Store<T>, {map, postProcess, searchExpr, searchOperation, searchValue, customQueryParams, onChanged, onLoadingChanged, onLoadError, pagination, filter, sort, select, expand, group, skip, take, userData, requireTotalCount}?: {
        map?: (record: any) => any;
        pageSize?: number;
        paginate?: boolean;
        postProcess?: (data: any[]) => any[];
        searchExpr?: Object;
        searchOperation?: string;
        searchValue?: Object;
        customQueryParams?: Object;
        onChanged?: () => void;
        onLoadingChanged?: (isLoading: boolean) => void;
        onLoadError?: (e?: Error) => void;
        pagination?: Pagination;
        filter?: Object;
        sort?: Object;
        select?: Object;
        expand?: Object;
        group?: Object;
        skip?: number;
        take?: number;
        userData?: Object;
        requireTotalCount?: boolean;
    });
    _init(): void;
    dispose(): void;
    private _disposeEvents();
    loadOptions(): any;
    searchValue(value: any): any;
    searchOperation(op: any): any;
    searchExpr(expr: any): any;
    key(): any;
    totalCount(): (value: number) => Pagination;
    isLoaded(): any;
    isLoading(): boolean;
    _createLoadQueue(): Queue;
    _changeLoadingCount(increment: any): void;
    /**
     *
     * @param observable
     * @private
     */
    scheduleCallbacks(observable: Observable<T>): Observable<T>;
    loadSingle(propName: any, propValue: any): any;
    /**
     * load 意味着直接获取到了数据. 而iterator不是
     * @returns {IteratorResult<T>|any|boolean|any|boolean|any|IteratorResult<T>|JQuery|JQuery}
     */
    load(): any;
    createLoadOperation(observable: Subject): {
        operationId: any;
        storeLoadOptions: any;
    };
    reload(): any;
    cancel(operationId: any): any;
    _addSearchOptions(storeLoadOptions: any): void;
    _createStoreLoadOptions(): any;
    _addSearchFilter(storeLoadOptions: any): void;
    _loadFromStore(loadOptions: any): any;
    private handleSuccess(data, storeLoadOptions);
    _processStoreLoadResult(response: any): void;
    private _applyMapFunction(data);
    private _applyPostProcessFunction(data);
    /**====================================================*/
    store(): Store<T>;
    changed: Subject<{}>;
    loadError: Subject<{}>;
    loadingChanged: Subject<{}>;
    customizeLoadResult: Subject<{}>;
    customizeStoreLoadOptions: Subject<{}>;
    sort(value: any): void;
    filter(value: any): void;
    select(value: any): void;
    group(value: any): void;
    requireTotalCount(value: any): void;
    moveCurrentToPosition(): void;
}
