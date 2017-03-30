import { Iterator } from "./Iterator";
export declare class SortIterator extends Iterator {
    protected iter: any;
    protected rules: any;
    protected sortedIter: any;
    constructor(iter: any, getter: any, desc: any);
    thenBy(getter: any, desc: any): SortIterator;
    next(): any;
    current(): any;
    reset(): void;
    countable(): any;
    count(): any;
    _ensureSorted(): void;
    _wrap(record: any, index: any): {
        index: any;
        value: any;
    };
    _unwrap(wrappedItem: any): any;
    _compare(x: any, y: any): number;
}
