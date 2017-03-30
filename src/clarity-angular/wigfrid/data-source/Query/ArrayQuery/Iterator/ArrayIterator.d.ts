import { Iterator } from "./Iterator";
export declare class ArrayIterator extends Iterator {
    protected array: any;
    protected index: any;
    constructor(array: any);
    next(): boolean;
    current(): any;
    reset(): void;
    toArray(): any;
    countable(): boolean;
    count(): any;
}
