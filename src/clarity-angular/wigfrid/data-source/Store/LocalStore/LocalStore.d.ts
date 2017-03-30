import { ArrayStore } from "./ArrayStore";
export declare class LocalStore extends ArrayStore {
    private _backend;
    constructor(options: any);
    clear(): void;
    _insertImpl(values: any): any;
    _updateImpl(key: any, values: any): any;
    _removeImpl(key: any): any;
}
