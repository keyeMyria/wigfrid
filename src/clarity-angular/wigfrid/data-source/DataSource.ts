import { mapDataRespectingGrouping } from "./util";
import * as _ from "lodash";
import { CommonStore } from "./Store/CommonStore/CommonStore";
import { Subject, Observable } from "rxjs/Rx";
import { Pagination } from "./Pagination";
import { Store } from "./Store/Store";
import { Queue } from "./Utils/Queue";
// var operationManager = new OperationManager();
const CANCELED_TOKEN = "canceled";
export class DataSource<T, R> {
    private _store: Store<any>;
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
    get items() {return this._items}

    private _userData;
    // private _totalCount: number;
    private _isLoaded;
    // private _isLastPage;
    private _delayedLoadTask;
    private _disposed;
    /**
     * Pagination
     */
    public _pagination: Pagination;
    // constructor(url: string);
    // constructor(data: Array<any>);
    // constructor(options: CustomStoreOptions);
    // constructor(options: DataSourceOptions);
    constructor(store: Store<T>, {
        // filter,
        // group,
        map,
        // pageIndex,
        // pageSize,
        // paginate,
        postProcess,
        searchExpr,
        searchOperation,
        searchValue,
        // select,
        // expand,
        customQueryParams,
        // requireTotalCount,
        // sort,
        // store,
        onChanged,
        onLoadingChanged,
        onLoadError,
        pagination = new Pagination(),
        // storeLoadOptions
        filter,
        sort,
        select,
        expand,
        group,
        skip,
        take,
        userData,
        requireTotalCount
    }: {
        map?: (record: any) => any,
        pageSize?: number,
        paginate?: boolean,
        postProcess?: (data: any[]) => any[],
        searchExpr?: Object,
        searchOperation?: string,
        searchValue?: Object,
        customQueryParams?: Object,
        // store?: Store<T>,
        onChanged?: () => void,
        onLoadingChanged?: (isLoading: boolean) => void,
        onLoadError?: (e?: Error) => void,

        pagination?: Pagination,
        // storeLoadOptions?: {
        filter?: Object,
        sort?: Object,
        select?: Object,
        expand?: Object,
        group?: Object,
        skip?: number,
        take?: number,
        userData?: Object,
        requireTotalCount?: boolean
        // }
    } = {}) {
        const that             = this;
        // options                = normalizeDataSourceOptions(options);
        this._store            = store;
        this._storeLoadOptions = {
            filter,
            sort,
            select,
            expand,
            group,
            skip,
            take,
            userData,
            requireTotalCount
        };
        this._mapFunc          = map;
        this._postProcessFunc  = postProcess;
        // this._pageIndex        = void 0 !== pageIndex ? pageIndex : 0;
        // this._pageSize         = void 0 !== pageSize ? pageSize : 20;
        this._loadingCount    = 0;
        this._loadQueue       = this._createLoadQueue();
        this._searchValue     = void 0 !== searchValue ? searchValue : null;
        this._searchOperation = searchOperation || "contains";
        this._searchExpr      = searchExpr;
        this._pagination      = pagination;
        this._init()
    }

    _init() {
        this._items    = [];
        this._userData = {};
        //     // // this._totalCount = -1;
        this._isLoaded = false;
        //     // if (_.isUndefined(this._paginate)) {
        //     //     this._paginate = !this.group()
        //     // }
        //     // this._isLastPage = !this._paginate();
        //     // this._pagination = new Pagination();
    }

    dispose() {
        this._disposeEvents();
        this.store().dispose();
        delete this._store;
        if (this._delayedLoadTask) {
            this._delayedLoadTask.abort()
        }
        this._disposed = true
    }

    private _disposeEvents() {
        this.changed.unsubscribe();
        this.loadError.unsubscribe();
        this.loadingChanged.unsubscribe();
        this.customizeLoadResult.unsubscribe();
        this.customizeStoreLoadOptions.unsubscribe();
    }

    loadOptions() {
        return this._storeLoadOptions
    }

    searchValue(value) {
        if (arguments.length < 1) {
            return this._searchValue
        }
        this._searchValue = value;
        // this._pagination.pageIndex = 0;
        // this.pageIndex(0)
        this._pagination.moveToFirstPage()
    }

    searchOperation(op) {
        if (!_.isString(op)) {
            return this._searchOperation
        }
        this._searchOperation = op;
        // this._pagination.pageIndex = 0;
        // this.pageIndex(0)
        this._pagination.moveToFirstPage();
    }

    searchExpr(expr) {
        const argc = arguments.length;
        if (0 === argc) {
            return this._searchExpr
        }
        if (argc > 1) {
            expr = $.makeArray(arguments)
        }
        this._searchExpr = expr;
        // this._pagination.pageIndex = 0;
        // this.pageIndex(0)
        this._pagination.moveToFirstPage();
    }

    key() {
        return this._store && this._store.key()
    }

    totalCount() {
        return this._pagination.totalCount
    }

    isLoaded() {
        return this._isLoaded
    }

    isLoading() {
        return this._loadingCount > 0
    }

    _createLoadQueue() {
        return new Queue();
        // return queue.create()
    }

    _changeLoadingCount(increment) {
        let newLoading;
        const oldLoading = this.isLoading();
        this._loadingCount += increment;
        newLoading       = this.isLoading();
        if (oldLoading ^ newLoading) {
            // this.fireEvent("loadingChanged", [newLoading]);
            this.loadingChanged.next([newLoading]);
        }
    }

    /**
     *
     * @param observable
     * @private
     */
    scheduleCallbacks(observable: Observable<T>): Observable<T> {
        this._changeLoadingCount(1);
        return observable.do(()=> {
            this._changeLoadingCount(-1);
        }, (error) => {
            this._changeLoadingCount(-1);
            if (error[0] !== CANCELED_TOKEN) {
                this.loadError.next(error);
            }
        }, () => {
            this.changed.next(null);
        });
    }

    loadSingle(propName, propValue) {
        const that       = this;
        const key        = this.key(),
              store      = this._store,
              options    = this._createStoreLoadOptions(),
              handleDone = function (data, observer) {
                  if (_.isUndefined(data) || _.isArray(data) && _.isEmpty(data)) {
                      observer.error(new Error("Data item cannot be found"))
                  } else {
                      observer.next(that._applyMapFunction(_.toArray(data))[0])
                  }
              };
        // this._scheduleFailCallbacks(subject);
        // subject.catch((error) => {
        //     this._changeLoadingCount(-1);
        //     if (error[0] !== CANCELED_TOKEN) {
        //         this.loadError.next(error);
        //     }
        // });
        if (arguments.length < 2) {
            propValue = propName;
            propName  = key
        }
        delete options.skip;
        delete options.group;
        delete options.refresh;
        delete options.pageIndex;
        delete options.searchString;
        return (function () {
            if (propName === key || store instanceof CommonStore) {
                return store.byKey(propValue, options)
            }
            options.take   = 1;
            options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
            return store.load(options)
        })()
        // .catch(_=>subject.error(_))
            .mergeMap((data) => Observable.create((observer) => {
                    handleDone(data, observer);
                    observer.complete();
                }).catch((error) => {
                    this._changeLoadingCount(-1);
                    if (error[0] !== CANCELED_TOKEN) {
                        this.loadError.next(error);
                    }
                })
            );
        // return subject;
        // return subject.promise()
    }

    /**
     * load 意味着直接获取到了数据. 而iterator不是
     * @returns {IteratorResult<T>|any|boolean|any|boolean|any|IteratorResult<T>|JQuery|JQuery}
     */
    load() {
        // var loadOperation, that = this,
        // subject             = new Subject(),
        // loadTask            = () => {
        //     if (that._disposed) {
        //         return
        //     }
        //     // if (!isPending(subject)) {
        //     //     return
        //     // }
        //     return that._loadFromStore(loadOperation)
        // };
        // subject       = <Subject>this.scheduleCallbacks(subject);
        // loadOperation = this.createLoadOperation(subject);
        // this.customizeStoreLoadOptions.next([loadOperation]);
        // this._loadQueue.add("number" === typeof loadOperation.delay ? this._loadFromStore(loadOperation).delay(loadOperation.delay) : this._loadFromStore(loadOperation, subject));
        // return subject.next({operationId: loadOperation.operationId});
        // return subject.promise({
        //     operationId: loadOperation.operationId
        // })
        //todo add queue schedule to control only one load can operate
        return this._loadFromStore({storeLoadOptions: this._createStoreLoadOptions()});
    }

    createLoadOperation(observable: Subject) {
        const id      = operationManager.add(observable),
              options = this._createStoreLoadOptions();
        // deferred.always(function () {
        //     operationManager.remove(id)
        // });
        // observable.subscribe( _ =>{
        //     observable.complete();
        // });
        return {
            operationId:      id,
            storeLoadOptions: options
        }
    }

    reload() {
        this._init();
        return this.load()
    }

    cancel(operationId) {
        return operationManager.cancel(operationId)
    }

    _addSearchOptions(storeLoadOptions) {
        if (this._disposed) {
            return
        }
        if (this.store._useDefaultSearch) {
            this._addSearchFilter(storeLoadOptions)
        } else {
            storeLoadOptions.searchOperation = this._searchOperation;
            storeLoadOptions.searchValue     = this._searchValue;
            storeLoadOptions.searchExpr      = this._searchExpr
        }
    }

    _createStoreLoadOptions() {
        const result = _.assign({}, this._storeLoadOptions);
        this._addSearchOptions(result);
        if (this._pagination.enabled) {
            if (this._pagination.pageSize) {
                result.skip = this._pagination.skip();
                result.take = this._pagination.take();
            }
        }
        result.userData = this._userData;
        return result
    }

    _addSearchFilter(storeLoadOptions) {
        let value          = this._searchValue;
        const op           = this._searchOperation;
        let selector       = this._searchExpr;
        const searchFilter = [];
        if (!value) {
            return
        }
        if (!selector) {
            selector = "this"
        }
        if (!$.isArray(selector)) {
            selector = [selector]
        }
        $.each(selector, function (i, item) {
            if (searchFilter.length) {
                searchFilter.push("or")
            }
            searchFilter.push([item, op, value])
        });
        if (storeLoadOptions.filter) {
            storeLoadOptions._filter = [searchFilter, storeLoadOptions.filter]
        } else {
            storeLoadOptions._filter = searchFilter
        }
    }

    _loadFromStore(loadOptions/*, pendingDeferred*/) {
        if (loadOptions.data) {
            // return $.Deferred().resolve(loadOptions.data).done(handleSuccess)
            return Observable.of(loadOptions.data).do(this.handleSuccess);
        }
        return this.store().load(loadOptions.storeLoadOptions).do(_ => this.handleSuccess(_, loadOptions.storeLoadOptions)/*, pendingDeferred.reject*/);
        // return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject)
    }

    private handleSuccess(data, storeLoadOptions) {
        let response, extra;
        if (this._disposed) {
            return
        }
        if (data && !_.isArray(data) && data.data) {
            extra = data;
            data  = data.data
        }
        response = {
            data:             data,
            extra:            extra,
            storeLoadOptions: storeLoadOptions
        };
        // that.fireEvent("customizeLoadResult", [loadResult]);
        this.customizeLoadResult.next(response);
        response.data = data;
        this._processStoreLoadResult(response);
    }

    _processStoreLoadResult(response) {
        let data             = _.toArray(response.data);
        const extra          = response.extra,
            storeLoadOptions = response.storeLoadOptions;
        // let resolvePendingDeferred = () => {
        //     this._isLoaded   = true;
        //     this._pagination.totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
        //     return pendingDeferred.resolve(data, extra)
        // };
        if (this._disposed) {
            return
        }
        data = this._applyPostProcessFunction(this._applyMapFunction(data));
        // if (!$.isPlainObject(extra)) {
        //     extra = {}
        // }
        this._items = data;
        // if (!data.length || !this._pagination.enabled || this._pagination.pageSize && data.length < this._pagination.pageSize) {
        //     this._pagination.isLastPage = true
        // }
        if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
            this._store.totalCount(storeLoadOptions).do((count) => {
                extra.totalCount            = count;
                this._isLoaded              = true;
                this._pagination.totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
                // return pendingDeferred.resolve(data, extra)
            })
        }
        /*else {
         resolvePendingDeferred()
         }*/
    }

    private _applyMapFunction(data) {
        if (this._mapFunc) {
            return mapDataRespectingGrouping(data, this._mapFunc, this.group())
        }
        return data
    }

    private _applyPostProcessFunction(data) {
        if (this._postProcessFunc) {
            return this._postProcessFunc(data)
        }
        return data
    }

    /**====================================================*/
    store(): Store<T> {
        return <T>this._store;
    }

    changed                   = new Subject();
    loadError                 = new Subject();
    loadingChanged            = new Subject();
    customizeLoadResult       = new Subject();
    customizeStoreLoadOptions = new Subject();

    sort(value) {
        this._storeLoadOptions.sort = value;
    }

    filter(value) {
        this._storeLoadOptions.filter = value;
        // this._pagination.pageIndex    = 0;
        this._pagination.moveToFirstPage();
    }

    select(value) {
        this._storeLoadOptions.select = value;
    }

    group(value) {
        this._storeLoadOptions.group = value;
    }

    requireTotalCount(value) {
        this._storeLoadOptions.requireTotalCount = value;
    }

    moveCurrentToPosition() {
        console.debug('moveCurrentToPosition unimplemented, and it should not be implemented')
    }
}
