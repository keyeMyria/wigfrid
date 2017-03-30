import { ObservableArray } from "../../../../collections/ObservableArray";
import { SelMove } from "../enum/SelMove";
import { NotifyCollectionChangedEventArgs } from "../../../../collections/eventArgs/NotifyCollectionChangedEventArgs";
import { EventEmitter } from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
/**
 * Abstract class that serves as a base for row and column collections.
 */
export declare abstract class RowColCollection extends ObservableArray {
    _g: FlexGridComponent;
    _frozen: number;
    _szDef: number;
    /**
     * 用途
     * getTotalSize
     * @type {number}
     * @private
     */
    _szTot: number;
    _szMin: number;
    _szMax: number;
    /**
     * Initializes a new instance of a @see:_RowColCollection.
     *
     * @param grid The @see:FlexGrid that owns the collection.
     * @param defaultSize The default size of the elements in the collection.
     */
    constructor(grid: FlexGridComponent, defaultSize?: number);
    /**
     * Gets or sets the number of frozen rows or columns in the collection.
     *
     * Frozen rows and columns do not scroll, and instead remain at the top or left of
     * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
     * cells may be selected and edited like regular cells.
     */
    frozen: number;
    /**
     * Checks whether a row or column is frozen.
     *
     * @param index The index of the row or column to check.
     */
    isFrozen(index: number): boolean;
    /**
     * Gets or sets the minimum size of elements in the collection.
     */
    minSize: number;
    /**
     * Gets or sets the maximum size of elements in the collection.
     */
    maxSize: number;
    /**
     * Gets or sets the default size of elements in the collection.
     */
    defaultSize: number;
    /**
     * Gets the total size of the elements in the collection.
     */
    getTotalSize(): number;
    /**
     * Gets the index of the element at a given physical position.
     * @param position Position of the item in the collection, in pixels.
     */
    getItemAt(position: number): number;
    /**
     * Finds the next visible cell for a selection change.
     * @param index Starting index for the search.
     * @param move Type of move (size and direction).
     * @param pageSize Size of a page (in case the move is a page up/down).
     */
    getNextCell(index: number, move: SelMove, pageSize: number): any;
    /**
     * Checks whether an element can be moved from one position to another.
     *
     * @param src The index of the element to move.
     * @param dst The position to which to move the element, or specify -1 to append the element.
     * @return Returns true if the move is valid, false otherwise.
     */
    canMoveElement(src: number, dst: number): boolean;
    /**
     * Moves an element from one position to another.
     * @param src Index of the element to move.
     * @param dst Position where the element should be moved to (-1 to append).
     */
    moveElement(src: number, dst: number): void;
    /**
     * Keeps track of dirty state and invalidate grid on changes.
     */
    onCollectionChanged(e?: NotifyCollectionChangedEventArgs): void;
    /**
     * Appends an item to the array.
     *
     * @param item Item to add to the array.
     * @return The new length of the array.
     */
    push(item: any): number;
    _update(): void;
    propertyChanged: EventEmitter<{}>;
    onPropertyChanged(propertyChangedEventArgs?: any): void;
}
