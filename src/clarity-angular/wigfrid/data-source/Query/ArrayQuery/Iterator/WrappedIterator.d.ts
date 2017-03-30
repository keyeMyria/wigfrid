import { Iterator } from "./Iterator";
export declare class WrappedIterator extends Iterator {
    protected iter: any;
    constructor(iter: any);
    next(): any;
    current(): any;
    reset(): any;
}
