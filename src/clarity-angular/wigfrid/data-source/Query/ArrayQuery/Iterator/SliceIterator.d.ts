import { WrappedIterator } from "./WrappedIterator";
export declare class SliceIterator extends WrappedIterator {
    protected skip: any;
    protected take: any;
    protected pos: any;
    constructor(iter: any, skip: any, take: any);
    next(): any;
    reset(): void;
    countable(): any;
    count(): number;
}
