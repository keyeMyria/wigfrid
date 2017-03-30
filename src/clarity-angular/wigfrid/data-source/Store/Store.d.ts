import { Subject } from "rxjs";
import { StoreOptions } from "./StoreOptions";
export declare abstract class Store<T> {
    private _key;
    protected _errorHandler: any;
    private _useDefaultSearch;
    private _keyGetter;
    protected _storeKeyMap: WeakMap;
    constructor(storeOptions: StoreOptions);
    /**
     * @deprecated
     * @private
     */
    abstract _customLoadOptions(): any;
    key(): any;
    keyOf(obj: any): any;
    _requireKey(): void;
    load(options?: {}): any;
    _loadImpl(options: any): any;
    abstract createQuery(): any;
    totalCount(options: any): any;
    _totalCountImpl(options: any): any;
    byKey(key: any, extraOptions?: any): any;
    abstract _byKeyImpl(key: any, options?: any): any;
    insert(values: any): any;
    abstract _insertImpl(values: any): any;
    update(key: any, values: any): any;
    abstract _updateImpl(key: any, values: any): any;
    remove(key: any): any;
    abstract _removeImpl(key: any): any;
    _addFailHandlers(observable: any): any;
    loaded: Subject<{}>;
    loading: Subject<{}>;
    inserted: Subject<{}>;
    inserting: Subject<{}>;
    updated: Subject<{}>;
    updating: Subject<{}>;
    removed: Subject<{}>;
    removing: Subject<{}>;
    modified: Subject<{}>;
    modifying: Subject<{}>;
    dispose(): void;
}
