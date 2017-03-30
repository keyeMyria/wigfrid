import { WrappedIterator } from "./WrappedIterator";
export declare class MapIterator extends WrappedIterator {
    protected index: any;
    protected mapper: any;
    constructor(iter: any, mapper: any);
    current(): any;
    next(): any;
}
