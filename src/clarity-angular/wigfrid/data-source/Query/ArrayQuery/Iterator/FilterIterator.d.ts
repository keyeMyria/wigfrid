import { WrappedIterator } from "./WrappedIterator";
export declare class FilterIterator extends WrappedIterator {
    protected iter: any;
    protected predicate: any;
    /**
     *
     * @param iter
     * @param predicate compiled criteria
     */
    constructor(iter: any, predicate: any);
    next(): boolean;
}
