import { WrappedIterator } from "./WrappedIterator";
export declare class SelectIterator extends WrappedIterator {
    protected getter: any;
    constructor(iter: any, getter: any);
    current(): any;
    countable(): any;
    count(): any;
}
