import { EventEmitter } from "@angular/core";
export declare enum ObservableArrayChangedAction {
    /** items was added to the observable array. */
    Add = 0,
    /** items was removed from the observable array. */
    Remove = 1,
    /** items was changed or replaced. */
    Change = 2,
    /**
     * Several items changed simultaneously, or index change
     * (sorted, reverse, filtered, or grouped).
     */
    Reset = 3,
    /** items was removed or added from the observable array. */
    Splice = 4,
}
export declare class ObservableArrayChangedEvent {
    action: ObservableArrayChangedAction;
    index: number;
    removed: any[];
    addedLength: number;
    /**
     * Provides a reset notification.
     */
    static reset: ObservableArrayChangedEvent;
    /**
     * Initializes a new instance of an {@link ObservableArrayChangedEvent}.
     *
     * @param action Type of action that caused the event to fire.
     * @param index Index of the item.
     * @param removed Item that was removed.
     * @param addedLength Item that was added.
     */
    constructor(action: ObservableArrayChangedAction, index?: number, removed?: any[], addedLength?: number);
}
export declare class ObservableArray<T> {
    private _array;
    constructor();
    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf(searchElement: T, fromIndex?: number): number;
    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number;
    getItem(index: number): T;
    setItem(index: number, value: T): void;
    getAt(index: any): T;
    /**
     * Assigns an item at a specific position in the array.
     *
     * @param index Position where the item will be assigned.
     * @param item Item to assign to the array.
     */
    setAt(index: number, item: any): void;
    readonly length: number;
    toString(): string;
    toLocaleString(): string;
    /**
     * push an item or items to the array.
     * if you want to use array not spread array, use {@link addAll} instead
     *
     * @param items an item or items to add to the array.
     * @return The new length of the array.
     */
    push(...items: T[]): any;
    /**
     * Removes the last element from an array and returns it.
     */
    pop(): T;
    addAll(items: any): any;
    /**
     * Inserts an item at a specific position in the array.
     *
     * @param index Position where the item will be added.
     * @param item Item to add to the array.
     */
    insert(index: number, item: any): void;
    /**
     * Removes an item from the array.
     *
     * @param item Item to remove.
     * @return True if the item was removed, false if it wasn't found in the array.
     */
    remove(item: any): boolean;
    removeAll(items: Array<T>): void;
    /**
     * Removes an item at a specific position in the array.
     *
     * @param index Position of the item to remove.
     */
    removeAt(index: number): void;
    /**
     * Removes all items from the array.
     */
    clear(): void;
    /**
     * Removes the first element from an array and returns it.
     */
    shift(): T;
    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift(): number;
    reverse(): T[];
    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    sort(compareFn?: (a: T, b: T) => number): T[];
    splice(index: number, deleteCount: any, ...items: Array<T>): any;
    /**
     * Returns a shadow copy section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice(start?: number, end?: number): T[];
    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(): T[];
    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string;
    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
    /**
     * Occurs when the collection changes.
     */
    collectionChanged: EventEmitter<{}>;
    collectionLengthChanged: EventEmitter<{}>;
    /**
     * Raises the {@link collectionChanged} event.
     *
     * @param action
     * @param index
     * @param removed
     * @param addedLength
     */
    notifyCollectionChanged(action: ObservableArrayChangedAction, index?: number, removed?: any[], addedLength?: number): void;
    notifyCollectionLengthChanged(): void;
}
