import { ObservableArray } from "../../../../collections/ObservableArray";
import { RowCol } from "./RowCol";
import { SelMove } from "../enum/SelMove";
import { asNumber } from "../../../../core/index";
import { asType } from "../../../../core/index";
import { NotifyCollectionChangedEventArgs } from "../../../../collections/eventArgs/NotifyCollectionChangedEventArgs";
import { NotifyCollectionChangedAction } from "../../../../enum/collections/NotifyCollectionChangedAction";
import { EventEmitter, Inject } from "@angular/core";
import {FlexGridDirective} from "../FlexGridDirective";
/**
 * Abstract class that serves as a base for row and column collections.
 */
export abstract class RowColCollection extends ObservableArray {
    _g: FlexGridDirective;
    _frozen = 0;
    _szDef  = 28;
    /**
     * 用途
     * getTotalSize
     * @type {number}
     * @private
     */
    _szTot  = 0;
    _szMin: number;
    _szMax: number;

    /**
     * Initializes a new instance of a @see:_RowColCollection.
     *
     * @param grid The @see:FlexGrid that owns the collection.
     * @param defaultSize The default size of the elements in the collection.
     */
    constructor(grid: FlexGridDirective,
                defaultSize?: number) {
        super();
        this._g     = asType(grid, FlexGridDirective);
        if(defaultSize) {
            this._szDef = asNumber(defaultSize, false, true);
        }
        //多次属性变更, debounce 100ms无变动则更新
        this.propertyChanged.subscribe((e?) => {
            this._update();
        });
    }

    /**
     * Gets or sets the number of frozen rows or columns in the collection.
     *
     * Frozen rows and columns do not scroll, and instead remain at the top or left of
     * the grid, next to the fixed cells. Unlike fixed cells, however, frozen
     * cells may be selected and edited like regular cells.
     */
    get frozen(): number {
        return this._frozen;
    }

    set frozen(value: number) {
        if (value != this._frozen) {
            this._frozen = asNumber(value, false, true);
            // this._g.invalidate();
        }
    }

    /**
     * Checks whether a row or column is frozen.
     *
     * @param index The index of the row or column to check.
     */
    isFrozen(index: number): boolean {
        return index < this.frozen;
    }

    //region Size
    /**
     * Gets or sets the minimum size of elements in the collection.
     */
    get minSize(): number {
        return this._szMin;
    }

    set minSize(value: number) {
        if (value != this._szMin) {
            this._szMin = asNumber(value, true, true);
            // this._g.invalidate();
        }
    }

    /**
     * Gets or sets the maximum size of elements in the collection.
     */
    get maxSize(): number {
        return this._szMax;
    }

    set maxSize(value: number) {
        if (value != this._szMax) {
            this._szMax = asNumber(value, true, true);
            // this._g.invalidate();
        }
    }

    /**
     * Gets or sets the default size of elements in the collection.
     */
    get defaultSize(): number {
        return this._szDef;
    }

    set defaultSize(value: number) {
        if (this._szDef != value) {
            this._szDef = asNumber(value, false, true);
            this.onPropertyChanged();
        }
    }

    /**
     * Gets the total size of the elements in the collection.
     */
    getTotalSize(): number {
        //todo fixme try to remove this line
        // this._update();
        return this._szTot;
    }

    //endregion
    /**
     * Gets the index of the element at a given physical position.
     * @param position Position of the item in the collection, in pixels.
     */
    getItemAt(position: number): number {

        // update if necessary
        // this._update();
        // shortcut for common case
        if (position <= 0 && this.length > 0) {
            return 0;
        }
        // binary search
        // REVIEW: is this worth it? might be better to use a simpler method?
        let min = 0,
            max = this.length - 1,
            cur, item;
        while (min <= max) {
            cur  = (min + max) >>> 1;
            item = <RowCol>this[cur];
            if (item.pos > position) {
                max = cur - 1;
            } else if (item.pos + item.renderSize < position) {
                min = cur + 1;
            }
            else {
                return cur;
            }
        }
        // not found, return max
        return max;
    }

    /**
     * Finds the next visible cell for a selection change.
     * @param index Starting index for the search.
     * @param move Type of move (size and direction).
     * @param pageSize Size of a page (in case the move is a page up/down).
     */
    getNextCell(index: number, move: SelMove, pageSize: number) {
        let i, item;
        switch (move) {
            case SelMove.Next:
                for (i = index + 1; i < this.length; i++) {
                    if (this[i].renderSize > 0) return i;
                }
                break;
            case SelMove.Prev:
                for (i = index - 1; i >= 0; i--) {
                    if (this[i].renderSize > 0) return i;
                }
                break;
            case SelMove.End:
                for (i = this.length - 1; i >= 0; i--) {
                    if (this[i].renderSize > 0) return i;
                }
                break;
            case SelMove.Home:
                for (i = 0; i < this.length; i++) {
                    if (this[i].renderSize > 0) return i;
                }
                break;
            case SelMove.NextPage:
                item = this.getItemAt(this[index].pos + pageSize);
                return item < 0
                    ? this.getNextCell(index, SelMove.End, pageSize)
                    : item;
            case SelMove.PrevPage:
                item = this.getItemAt(this[index].pos - pageSize);
                return item < 0
                    ? this.getNextCell(index, SelMove.Home, pageSize)
                    : item;
        }
        return index;
    }

    /**
     * Checks whether an element can be moved from one position to another.
     *
     * @param src The index of the element to move.
     * @param dst The position to which to move the element, or specify -1 to append the element.
     * @return Returns true if the move is valid, false otherwise.
     */
    canMoveElement(src: number, dst: number): boolean {

        // no move?
        if (dst == src) {
            return false;
        }
        // invalid move?
        if (src < 0 || src >= this.length || dst >= this.length) {
            return false;
        }
        // illegal move?
        if (dst < 0) dst = this.length - 1;
        const start = Math.min(src, dst),
              end = Math.max(src, dst);
        for (let i = start; i <= end; i++) {
            if (!this[i].allowDragging) {
                return false;
            }
        }
        // can't move anything past the new row template (TFS 109012)
        // if (this[dst] instanceof _NewRowTemplate) {
        //     return false;
        // }
        // all seems OK
        return true;
    }

    /**
     * Moves an element from one position to another.
     * @param src Index of the element to move.
     * @param dst Position where the element should be moved to (-1 to append).
     */
    moveElement(src: number, dst: number) {
        if (this.canMoveElement(src, dst)) {
            const e = this[src];
            this.removeAt(src);
            if (dst < 0) dst = this.length;
            this.insert(dst, e);
        }
    }

    /**
     * Keeps track of dirty state and invalidate grid on changes.
     */
    onCollectionChanged(e: NotifyCollectionChangedEventArgs = NotifyCollectionChangedEventArgs.reset) {
        super.onCollectionChanged(e);
        // console.count('emit collection changed');
        if (
            e.action == NotifyCollectionChangedAction.Splice
            || e.action == NotifyCollectionChangedAction.Add
            || e.action == NotifyCollectionChangedAction.Remove
            || e.action == NotifyCollectionChangedAction.Change
        ) {
            e.removed.map((item: RowCol) => {
                item._idx  = -1;
                item._pos  = null;
                item._list = null;
            });
            e.added.map((item: RowCol, index) => {
                let _idx   = e.index + index;
                item._idx  = _idx;
                item._list = this;
            });
            //重置后面子元素的位置
        }
        this._update();
    }

    /**
     * Appends an item to the array.
     *
     * @param item Item to add to the array.
     * @return The new length of the array.
     */
    push(item: any): number {
        item._list = this;
        return super.push(item);
    }

    // /**
    //  * Removes or adds items to the array.
    //  *
    //  * @param index Position where items are added or removed.
    //  * @param count Number of items to remove from the array.
    //  * @param item Item to add to the array.
    //  * @return An array containing the removed elements.
    //  */
    // splice(index: number, count: number, ...item?: any): any[] {
    //     // if (item) {
    //     //     item._list = this;
    //     // }
    //     return super.splice(index, count, ...item);
    // }

    _update(): void {
        // console.count('rowcol run count');
        let pos = 0,
            rc: RowCol;
        for (let i = 0; i < this.length; i++) {
            rc       = this[i];
            rc._idx  = i;
            rc._list = this;
            rc._pos  = pos;
            pos += rc.renderSize;
        }
        this._szTot = pos;
        // console.log(this._szTot);
    }

    //region event
    public propertyChanged = new EventEmitter();

    public onPropertyChanged(propertyChangedEventArgs?) {
        this.propertyChanged.emit(propertyChangedEventArgs);
    }
    //endregion
}
