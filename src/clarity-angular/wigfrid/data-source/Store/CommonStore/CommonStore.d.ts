import { Store } from "../Store";
export declare class CommonStore extends Store {
    private _useDefaultSearch;
    private _loadFunc;
    private _totalCountFunc;
    private _byKeyFunc;
    private _insertFunc;
    private _updateFunc;
    private _removeFunc;
    constructor(options: any);
    createQuery(): void;
    _totalCountImpl(options: any): any;
    _loadImpl(options: any): any;
    _byKeyImpl(key: any, extraOptions: any): any;
    _insertImpl(values: any): any;
    _updateImpl(key: any, values: any): any;
    _removeImpl(key: any): any;
}
