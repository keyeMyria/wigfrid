import {EventEmitter} from "@angular/core";

export enum ObservableArrayChangedAction {
    /** items was added to the observable array. */
    Add,
    /** items was removed from the observable array. */
    Remove,
    /** items was changed or replaced. */
    Change,
    /**
     * Several items changed simultaneously, or index change
     * (sorted, reverse, filtered, or grouped).
     */
    Reset,
    /** items was removed or added from the observable array. */
    Splice
}

export class ObservableArrayChangedEvent {

    /**
     * Provides a reset notification.
     */
    static reset = new ObservableArrayChangedEvent(ObservableArrayChangedAction.Reset);

    /**
     * Initializes a new instance of an {@link ObservableArrayChangedEvent}.
     *
     * @param action Type of action that caused the event to fire.
     * @param index Index of the item.
     * @param removed Item that was removed.
     * @param addedLength Item that was added.
     */
    constructor(public action: ObservableArrayChangedAction,
                public index = -1,
                public removed: any[] = [],
                public addedLength = 0) {
    }
}


export class ObservableArray<T> {
    private _array: Array<T> = [];

    constructor() {
        if (arguments.length === 1 && Array.isArray(arguments[0])) {
            this._array = arguments[0].slice();
        }
        else {
            this._array = Array.apply(null, arguments);
        }
    }

    /**
     * Returns the index of the first occurrence of a value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.
     */
    indexOf(searchElement: T, fromIndex?: number): number {
        return this._array.indexOf(searchElement, fromIndex);
    }

    /**
     * Returns the index of the last occurrence of a specified value in an array.
     * @param searchElement The value to locate in the array.
     * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.
     */
    lastIndexOf(searchElement: T, fromIndex?: number): number {
        return this._array.lastIndexOf(searchElement, fromIndex);
    }

    getItem(index: number): T {
        return this._array[index];
    }

    setItem(index: number, value: T) {
        let oldValue = this._array[index];
        this._array[index] = value;
        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Change,
            index,
            [oldValue],
            1
        );
    }

    getAt(index) {
        return this.getItem(index);
    }

    /**
     * Assigns an item at a specific position in the array.
     *
     * @param index Position where the item will be assigned.
     * @param item Item to assign to the array.
     */
    setAt(index: number, item: any) {
        this.setItem(index, item);
    }


    get length(): number {
        return this._array.length;
    }

    toString(): string {
        return this._array.toString();
    }

    toLocaleString(): string {
        return this._array.toLocaleString();
    }

    //region modify

    /**
     * push an item or items to the array.
     * if you want to use array not spread array, use {@link addAll} instead
     *
     * @param items an item or items to add to the array.
     * @return The new length of the array.
     */
    push(...items: T[]);
    push(): number {
        let addIndex = this.length;
        let rv = Array.prototype.push.apply(this._array, arguments);

        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Add, addIndex, [], arguments.length
        );
        return rv;
    }

    /**
     * Removes the last element from an array and returns it.
     */
    pop(): T {

        let result = this._array.pop();

        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Remove, this.length, [result]
        );
        this.notifyCollectionLengthChanged();
        return result;
    }


    addAll(items);

    addAll(index: number, items?: T[]) {
        if (arguments.length == 1) {
            index = this._array.length;
            Array.prototype.push.apply(this._array, items);
        } else {
            this._array.splice(index, 0, ...items);//Array.prototype.splice.apply(this._array, [index, 0].concat(items);
        }
        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Add, index, [], items.length
        );
        this.notifyCollectionLengthChanged();
        return this.length;
    }


    /**
     * Inserts an item at a specific position in the array.
     *
     * @param index Position where the item will be added.
     * @param item Item to add to the array.
     */
    insert(index: number, item: any) {
        this.splice(index, 0, item);
    }

    /**
     * Removes an item from the array.
     *
     * @param item Item to remove.
     * @return True if the item was removed, false if it wasn't found in the array.
     */
    remove(item: any): boolean {
        let index = this.indexOf(item);
        if (index > -1) {
            this.removeAt(index);
            return true;
        }
        return false;
    }

    removeAll(items: Array<T>) {
        let removed = false;
        for (let i = 0; i < items.length; i++) {
            let index = this._array.indexOf(items[i]);
            if (index != -1) {
                this._array.splice(index, 1);
                removed = true;
            }
        }
        if (removed) {
            this.notifyCollectionChanged(ObservableArrayChangedAction.Reset);
        }
    }

    /**
     * Removes an item at a specific position in the array.
     *
     * @param index Position of the item to remove.
     */
    removeAt(index: number) {
        this.splice(index, 1);
    }

    /**
     * Removes all items from the array.
     */
    clear() {
        if (this.length !== 0) {
            this._array.length = 0; // fastest way to clear an array
            this.notifyCollectionChanged(ObservableArrayChangedAction.Reset);
        }
    }

    /**
     * Removes the first element from an array and returns it.
     */
    shift(): T {
        let result = this._array.shift();
        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Remove,
            0,
            [result],
        );
        this.notifyCollectionLengthChanged();

        return result;
    }

    /**
     * Inserts new elements at the start of an array.
     * @param items  Elements to insert at the start of the Array.
     */
    unshift(): number {
        let length = this._array.length;
        let result = Array.prototype.unshift.apply(this._array, arguments);

        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Add,
            0,
            [],
            result - length
        );
        this.notifyCollectionLengthChanged();

        return result;
    }


    reverse() {
        let rv = this._array.reverse();
        this.notifyCollectionChanged(ObservableArrayChangedAction.Reset);
        return rv;
    }

    /**
     * Sorts an array.
     * @param compareFn The name of the function used to determine the order of the elements. If omitted, the elements are sorted in ascending, ASCII character order.
     */
    sort(compareFn?: (a: T, b: T) => number): T[] {
        let rv = this._array.sort(compareFn);
        this.notifyCollectionChanged(ObservableArrayChangedAction.Reset);
        return rv;
    }

    splice(index: number, deleteCount, ...items: Array<T>);
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     */
    splice(start: number, deleteCount?: number): T[] {
        let length = this._array.length;
        let result = Array.prototype.splice.apply(this._array, arguments);

        this.notifyCollectionChanged(
            ObservableArrayChangedAction.Splice,
            start,
            result,
            this._array.length > length ? this._array.length - length : 0
        );
        if (this._array.length !== length) {
            this.notifyCollectionLengthChanged();
        }

        return result;
    }

    //endregion

    //region copy

    /**
     * Returns a shadow copy section of an array.
     * @param start The beginning of the specified portion of the array.
     * @param end The end of the specified portion of the array.
     */
    slice(start?: number, end?: number): T[] {
        return this._array.slice(start, end);
    }

    /**
     * Combines two or more arrays.
     * @param items Additional items to add to the end of array1.
     */
    concat(): T[] {
        return Array.prototype.concat.apply(this._array, arguments);
    }

    /**
     * Adds all the elements of an array separated by the specified separator string.
     * @param separator A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.
     */
    join(separator?: string): string {
        return this._array.join(separator);
    }

    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param callbackfn A function that accepts up to three arguments. The every method calls the callbackfn function for each element in array1 until the callbackfn returns false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._array.every(callbackfn, thisArg);
    }

    /**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param callbackfn A function that accepts up to three arguments. The some method calls the callbackfn function for each element in array1 until the callbackfn returns true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean {
        return this._array.some(callbackfn, thisArg);
    }

    /**
     * Performs the specified action for each element in an array.
     * @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
     * @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void {
        this._array.forEach(callbackfn, thisArg);
    }

    /**
     * Calls a defined callback function on each element of an array, and returns an array that contains the results.
     * @param callbackfn A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
        return this._array.map(callbackfn, thisArg);
    }

    /**
     * Returns the elements of an array that meet the condition specified in a callback function.
     * @param callbackfn A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
     */
    filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] {
        return this._array.filter(callbackfn, thisArg);
    }

    /**
     * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T {
        return this._array.reduce(callbackfn, initialValue);
    }

    /**
     * Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
     * @param callbackfn A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.
     * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.
     */
    reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T {
        return this._array.reduceRight(callbackfn, initialValue);
    }

    //endregion

    /**
     * Occurs when the collection changes.
     */
    collectionChanged = new EventEmitter(true);

    collectionLengthChanged = new EventEmitter(true);

    /**
     * Raises the {@link collectionChanged} event.
     *
     * @param action
     * @param index
     * @param removed
     * @param addedLength
     */
    notifyCollectionChanged(action: ObservableArrayChangedAction,
                            index = -1,
                            removed: any[] = [],
                            addedLength = 0) {
        this.collectionChanged.emit(
            new ObservableArrayChangedEvent(
                action,
                index,
                removed,
                addedLength
            )
        );
    }

    notifyCollectionLengthChanged() {
        this.collectionLengthChanged.emit(this.length);
    }
}
