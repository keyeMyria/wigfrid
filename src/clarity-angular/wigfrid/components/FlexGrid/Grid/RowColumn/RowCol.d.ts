import { RowColCollection } from "./RowColCollection";
import { RowColFlags } from "../enum/RowColFlags";
import { EventEmitter } from "@angular/core";
import { FlexGridComponent } from "../FlexGridComponent";
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
export declare abstract class RowCol {
    protected _list: RowColCollection;
    protected _sz: number;
    protected _szMin: number;
    protected _szMax: number;
    protected _f: RowColFlags;
    /**
     * @type {number}
     * @protected
     */
    protected _pos: any;
    /**
     * @type {number}
     * @protected
     */
    protected _idx: number;
    /**
     * Gets or sets a value indicating whether the row or column is visible.
     */
    visible: boolean;
    /**
     * Gets a value indicating whether the row or column is visible and not collapsed.
     *
     * This property is read-only. To change the visibility of a
     * row or column, use the @see:visible property instead.
     */
    readonly isVisible: boolean;
    constructor(_list: RowColCollection);
    /**
     * Gets the position of the row or column.
     */
    readonly pos: number;
    /**
     * Gets the index of the row or column in the parent collection.
     */
    readonly index: number;
    /**
     * Gets or sets the size of the row or column.
     * Setting this property to null or negative values causes the element to use the
     * parent collection's default size.
     */
    size: number;
    /**
     * Gets the render size of the row or column.
     * This property accounts for visibility, default size, and min and max sizes.
     */
    readonly renderSize: number;
    /**
     * Gets or sets a value indicating whether the user can resize the row or column with the mouse.
     */
    allowResizing: boolean;
    /**
     * Gets or sets a value indicating whether the user can move the row or column to a new position with the mouse.
     */
    allowDragging: boolean;
    /**
     * Gets or sets a value indicating whether cells in the row or column can be merged.
     */
    allowMerging: boolean;
    /**
     * Gets or sets a value indicating whether the row or column is selected.
     */
    isSelected: boolean;
    /**
     * Gets or sets a value indicating whether cells in the row or column can be edited.
     */
    isReadOnly: boolean;
    /**
     * Gets or sets a value indicating whether cells in the row or column contain HTML content rather than plain text.
     */
    isContentHtml: boolean;
    /**
     * Gets or sets a value indicating whether cells in the row or column wrap their content.
     */
    wordWrap: boolean;
    /**
     * Gets the FlexGrid that owns the row or column.
     */
    readonly grid: FlexGridComponent;
    propertyChanged: EventEmitter<{}>;
    /**
     * Marks the owner list as dirty and refreshes the owner grid.
     */
    onPropertyChanged(e?: any): void;
    _getFlag(flag: RowColFlags): boolean;
    _setFlag(flag: RowColFlags, value: boolean, quiet?: boolean): boolean;
}
