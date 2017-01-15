import {RowColCollection} from "./RowColCollection";
import {RowColFlags} from "../enum/RowColFlags";
import {asNumber, clamp} from "../../../../core/index";
import {EventEmitter, Injectable} from "@angular/core";
import {FlexGridDirective} from "../FlexGridDirective";
/**
 * An abstract class that serves as a base for the @see:Row and @see:Column classes.
 * - Q: RowCol的基类有什么作用
 * - A: RowCol是Row和Column的基类, 他们共享一些公用的方法, 并尽可能的提供Row和Col相关的信息.
 * pos/_pos 相当于index, 但是存的是偏移位置, 行存的是top偏移, 列则存的是left偏移.
 * index/_idx 则是在RowCollection/ColCollection里的index
 * visible|allowResizing|allowingDragging|allowingMerging|isSelected|isReadOnly|isContentHtml/_f 则是当前row/col是否可视
 * size/_sz 则是偏移
 * - Q: 可以看见有一个update函数, 在ng中是用detectChange, 那么在此是否仍可改用detectChange
 * - A: update是不可靠的, 这里应改为detectChange相应的方法来处理, update改写的属性有
 *      - pos
 *      - idx
 *      - totalSize
 *      由于totalSize的特殊性, 必须遍历完毕才可以计算出来, 所以仍要有类似update的调用方法, update在collection中.
 *      TODO REVIEW!!!
 * - Q: CssClass 是否可以删掉
 * - A: 由于单元格渲染将独立出去, 因些样式相关信息不应该保存此. 如何存储调用这些信息也是要考虑到的
 * - Q: 是否可以考虑用策略模式
 * - A: 肯定将采用策略模式, TODO REVIEW, 这里只是存了一些信息
 *     ---Root---
 *
 *          DefaultCellStrategy
 *       /        \                 \
 *      /          \                 \
 *     /            \                 \
 * renderBehaviour  editorBehaviour  iteratorBehaviour
 *
 *
 */
@Injectable()
export abstract class RowCol {
    protected _sz: number; // null or < 0 means use default
    protected _szMin: number;
    protected _szMax: number;

    public grid: FlexGridDirective;

    /*protected _list: RowColCollection = null;*/
    protected _f: RowColFlags;
    /**
     * @type {number}
     * @protected
     */
              protected _pos = null;
    /**
     * @type {number}
     * @protected
     */
              protected _idx = -1;
    //region visible/hidden column
    /**
     * Gets or sets a value indicating whether the row or column is visible.
     */
    get visible(): boolean {
        return this._getFlag(RowColFlags.Visible);
    }

    set visible(value: boolean) {
        this._setFlag(RowColFlags.Visible, value);
    }

    /**
     * Gets a value indicating whether the row or column is visible and not collapsed.
     *
     * This property is read-only. To change the visibility of a
     * row or column, use the @see:visible property instead.
     */
    get isVisible(): boolean {
        return this._getFlag(RowColFlags.Visible) && !this._getFlag(RowColFlags.ParentCollapsed);
    }

    //endregion
    constructor(
        protected _list: RowColCollection,
    ) {

    }

    /**
     * Gets the position of the row or column.
     */
    get pos(): number {
        return this._pos;
    }

    /**
     * Gets the index of the row or column in the parent collection.
     */
    get index(): number {
        if (this._idx == -1) {
            this._idx = this._list.indexOf(this);
        }
        return this._idx;
    }

    //region Size
    /**
     * Gets or sets the size of the row or column.
     * Setting this property to null or negative values causes the element to use the
     * parent collection's default size.
     */
    get size(): number {
        return this._sz;
    }

    set size(value: number) {
        if (value != this._sz) {
            this._sz = asNumber(value, true);
            this.onPropertyChanged();
        }
    }

    /**
     * Gets the render size of the row or column.
     * This property accounts for visibility, default size, and min and max sizes.
     */
    get renderSize(): number {
        if (!this.isVisible) {
            return 0;
        }
        let sz     = this._sz;
        const list = this._list;
        // default size
        if ((sz == null || sz < 0) && list != null) {
            return Math.round((<RowColCollection>(list)).defaultSize);
        }
        // min/max
        if (list != null) {
            sz = clamp(sz, list.minSize, list.maxSize);
        }
        sz = clamp(sz, this._szMin, this._szMax);
        // done
        return Math.round(sz);
    }

    //endregion
    /**
     * Gets or sets a value indicating whether the user can resize the row or column with the mouse.
     */
    get allowResizing(): boolean {
        return this._getFlag(RowColFlags.AllowResizing);
    }

    set allowResizing(value: boolean) {
        this._setFlag(RowColFlags.AllowResizing, value);
    }

    /**
     * Gets or sets a value indicating whether the user can move the row or column to a new position with the mouse.
     */
    get allowDragging(): boolean {
        return this._getFlag(RowColFlags.AllowDragging);
    }

    set allowDragging(value: boolean) {
        this._setFlag(RowColFlags.AllowDragging, value);
    }

    /**
     * Gets or sets a value indicating whether cells in the row or column can be merged.
     */
    get allowMerging(): boolean {
        return this._getFlag(RowColFlags.AllowMerging);
    }

    set allowMerging(value: boolean) {
        this._setFlag(RowColFlags.AllowMerging, value);
    }

    /**
     * Gets or sets a value indicating whether the row or column is selected.
     */
    get isSelected(): boolean {
        return this._getFlag(RowColFlags.Selected);
    }

    set isSelected(value: boolean) {
        this._setFlag(RowColFlags.Selected, value);
    }

    /**
     * Gets or sets a value indicating whether cells in the row or column can be edited.
     */
    get isReadOnly(): boolean {
        return this._getFlag(RowColFlags.ReadOnly);
    }

    set isReadOnly(value: boolean) {
        this._setFlag(RowColFlags.ReadOnly, value);
    }

    /**
     * Gets or sets a value indicating whether cells in the row or column contain HTML content rather than plain text.
     */
    get isContentHtml(): boolean {
        return this._getFlag(RowColFlags.HtmlContent);
    }

    set isContentHtml(value: boolean) {
        if (this.isContentHtml != value) {
            this._setFlag(RowColFlags.HtmlContent, value);
        }
    }

    /**
     * Gets or sets a value indicating whether cells in the row or column wrap their content.
     */
    get wordWrap(): boolean {
        return this._getFlag(RowColFlags.WordWrap);
    }

    set wordWrap(value: boolean) {
        this._setFlag(RowColFlags.WordWrap, value);
    }

    /**
     * Gets the FlexGrid that owns the row or column.
     */
    get grid(): FlexGridDirective {
        return this._list ? (<RowColCollection>this._list)._g : null;
    }

    propertyChanged = new EventEmitter();

    /**
     * Marks the owner list as dirty and refreshes the owner grid.
     */
    onPropertyChanged(e?) {
        this.propertyChanged.emit(e);
        if (this._list) {
            this._list.propertyChanged.emit(e);
        }
    }

    // Gets the value of a flag.
    _getFlag(flag: RowColFlags): boolean {
        return (this._f & flag) != 0;
    }

    // Sets the value of a flag, with optional notification.
    _setFlag(flag: RowColFlags, value: boolean, quiet?: boolean): boolean {
        if (value != this._getFlag(flag)) {
            let oldValue = this._f;
            this._f = value ? (this._f | flag) : (this._f & ~flag);
            if (!quiet) {
                this.onPropertyChanged();
            }
            return true;
        }
        return false;
    }
}
class RowColumnSizeChangedArgs {
    constructor(private oldSize, private newSize) {}
}
