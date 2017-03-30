import { ArrayBase } from "./ArrayBase";
import { INotifyCollectionChanged } from "../collections/interface/INotifyCollectionChanged";
import { EventEmitter } from "@angular/core";
import { NotifyCollectionChangedEventArgs } from "./eventArgs/NotifyCollectionChangedEventArgs";
export declare class ObservableArray extends ArrayBase implements INotifyCollectionChanged {
    constructor(data?: any[]);
    /**
     * Appends an item to the array.
     *
     * @param item Item to add to the array.
     * @return The new length of the array.
     */
    push(item: any): number;
    pop(): any;
    /**
     * Removes and/or adds items to the array.
     *
     * @param index Position where items will be added or removed.
     * @param count Number of items to remove from the array.
     * @param items Item to add to the array.
     * @return An array containing the removed elements.
     */
    splice(index: number, count: number, ...items: any[]): any[];
    /**
     * Creates a shallow copy of a portion of an array.
     *
     * @param begin Position where the copy starts.
     * @param end Position where the copy ends.
     * @return A shallow copy of a portion of an array.
     */
    slice(begin?: number, end?: number): any[];
    /**
     * Searches for an item in the array.
     *
     * @param searchElement Element to locate in the array.
     * @param fromIndex The index where the search should start.
     * @return The index of the item in the array, or -1 if the item was not found.
     */
    indexOf(searchElement: any, fromIndex?: number): number;
    /**
     * Sorts the elements of the array in place.
     *
     * @param compareFn Specifies a function that defines the sort order.
     * If specified, the function should take two arguments and should return
     * -1, +1, or 0 to indicate the first argument is smaller, greater than,
     * or equal to the second argument.
     * If omitted, the elements are sorted in ascending, ASCII character order.
     * @return A copy of the sorted array.
     */
    sort(compareFn?: Function): any[];
    reverse(): any;
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
    /**
     * Removes an item at a specific position in the array.
     *
     * @param index Position of the item to remove.
     */
    removeAt(index: number): void;
    /**
     * Assigns an item at a specific position in the array.
     *
     * @param index Position where the item will be assigned.
     * @param item Item to assign to the array.
     */
    setAt(index: number, item: any): void;
    /**
     * Removes all items from the array.
     */
    clear(): void;
    /**
     * Occurs when the collection changes.
     * fixed
     */
    collectionChanged: EventEmitter<{}>;
    /**
     * Raises the {@link collectionChanged} event.
     *
     * @param e Contains a description of the change.
     */
    onCollectionChanged(e?: NotifyCollectionChangedEventArgs): void;
}
