import { Iterator } from "./Iterator";
export declare class GroupIterator extends Iterator {
    protected iter: any;
    protected getters: any[];
    protected groupedIter: any;
    constructor(iter: any, getters: any);
    thenBy(getter: any): this;
    next(): any;
    current(): any;
    reset(): void;
    countable(): boolean;
    count(): any;
    _ensureGrouped(): void;
    _deepGetter(parent: any, current: any, deep: any): void;
}
