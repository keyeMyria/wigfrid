/**
 * Base class for Array classes with notifications.
 */
export declare class ArrayBase {
    /**
     * Initializes a new instance of an @see:ArrayBase.
     */
    constructor();
    pop(): any;
    push(value: any): number;
    splice(index: number, count: number, value?: any): any[];
    slice(begin: number, end?: number): any[];
    indexOf(searchElement: any, fromIndex?: number): number;
    sort(compareFn?: Function): any[];
    reverse(): any;
    length: number;
}
