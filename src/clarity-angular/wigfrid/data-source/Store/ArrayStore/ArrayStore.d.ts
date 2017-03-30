import { Store } from "../Store";
import { Observable } from "rxjs";
import { ArrayQuery } from "../../Query/ArrayQuery/ArrayQuery";
export declare class ArrayStore extends Store {
    private _array;
    constructor(options?: any);
    createQuery(): ArrayQuery;
    _customLoadOptions(): void;
    _byKeyImpl(key: any): Observable<{}>;
    _insertImpl(values: any): any;
    _updateImpl(key: any, values: any): any;
    _removeImpl(key: any): Observable<{}>;
    _indexByKey(key: any): number;
    clear(): Observable<{}>;
}
