import { EventEmitter } from "@angular/core";
import { CellRangeEventArgs } from "../CellRangeEventArgs";
import { AllowResizing } from "../enum/AllowResizing";
import { FlexGridComponent } from "../FlexGridComponent";
import { AutoSizeMode } from "../enum/AutoSizeMode";
export declare class ResizeHandlerDirective {
    private grid;
    private _deferResizing;
    private _allowResizing;
    private _autoSizeMode;
    constructor(grid: FlexGridComponent);
    /**
     * Gets or sets whether users may resize rows and/or columns
     * with the mouse.
     *
     * If resizing is enabled, users can resize columns by dragging
     * the right edge of column header cells, or rows by dragging the
     * bottom edge of row header cells.
     *
     * Users may also double-click the edge of the header cells to
     * automatically resize rows and columns to fit their content.
     * The autosize behavior can be customized using the {@link autoSizeMode}
     * property.
     */
    allowResizing: AllowResizing;
    /**
     * Gets or sets which cells should be taken into account when auto-sizing a
     * row or column.
     *
     * This property controls what happens when users double-click the edge of
     * a column header.
     *
     * By default, the grid will automatically set the column width based on the
     * content of the header and data cells in the column. This property allows
     * you to change that to include only the headers or only the data.
     */
    autoSizeMode: AutoSizeMode;
    /**
     * Gets or sets whether row and column resizing should be deferred until
     * the user releases the mouse button.
     *
     * By default, {@link deferResizing} is set to false, causing rows and columns
     * to be resized as the user drags the mouse. Setting this property to true
     * causes the grid to show a resizing marker and to resize the row or column
     * only when the user releases the mouse button.
     */
    deferResizing: boolean;
    /**
     * Occurs as columns are resized.
     */
    resizingColumn: EventEmitter<{}>;
    /**
     * Raises the {@link resizingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onResizingColumn(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when the user finishes resizing a column.
     */
    resizedColumn: EventEmitter<{}>;
    /**
     * Raises the {@link resizedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onResizedColumn(e: CellRangeEventArgs): void;
    /**
     * Occurs before the user auto-sizes a column by double-clicking the
     * right edge of a column header cell.
     */
    autoSizingColumn: EventEmitter<any>;
    /**
     * Raises the {@link autoSizingColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizingColumn(e: CellRangeEventArgs): boolean;
    /**
     * Occurs after the user auto-sizes a column by double-clicking the
     * right edge of a column header cell.
     */
    autoSizedColumn: EventEmitter<any>;
    /**
     * Raises the {@link autoSizedColumn} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizedColumn(e: CellRangeEventArgs): void;
    /**
     * Occurs as rows are resized.
     */
    resizingRow: EventEmitter<{}>;
    /**
     * Raises the {@link resizingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     * @return True if the event was not canceled.
     */
    onResizingRow(e: CellRangeEventArgs): boolean;
    /**
     * Occurs when the user finishes resizing rows.
     */
    resizedRow: EventEmitter<{}>;
    /**
     * Raises the {@link resizedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onResizedRow(e: CellRangeEventArgs): void;
    /**
     * Occurs before the user auto-sizes a row by double-clicking the
     * bottom edge of a row header cell.
     */
    autoSizingRow: EventEmitter<{}>;
    /**
     * Raises the {@link autoSizingRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizingRow(e: CellRangeEventArgs): boolean;
    /**
     * Occurs after the user auto-sizes a row by double-clicking the
     * bottom edge of a row header cell.
     */
    autoSizedRow: EventEmitter<{}>;
    /**
     * Raises the {@link autoSizedRow} event.
     *
     * @param e {@link CellRangeEventArgs} that contains the event data.
     */
    onAutoSizedRow(e: CellRangeEventArgs): void;
}
